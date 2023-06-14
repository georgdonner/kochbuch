import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import { toast } from 'react-toastify';

import MainContext from '../../services/context';
import api from '../../services/api';
import ListDb, { sendRemovedItemBeacon } from '../../services/list';

import ToastUndo from '../../components/ToastUndo';
import Loading from '../../components/Loading';
import NoList from './components/NoList';
import ListItems from './components/ListItems';
import ListNav from './components/ListNav';
import ListInput from './components/ListInput';
import ProfileModal from './components/ProfileModal';
import './List.scss';

const List = () => {
  const { user } = useContext(MainContext);

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState();
  const [profiles, setProfiles] = useState();
  const [categories, setCategories] = useState();
  const [editItem, setEditItem] = useState();
  const [itemToRemove, setItemToRemove] = useState();
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Track item to remove in ref so we can remove on unmount
  const itemToRemoveRef = useRef(itemToRemove);
  useEffect(() => {
    itemToRemoveRef.current = itemToRemove;
  }, [itemToRemove]);

  const updateList = (dbList) => {
    setList(dbList.list);
    setProfiles(dbList.profiles);
  };

  const listDb = useRef(new ListDb(user.listCode, {
    onUpdate: updateList,
  }));

  const fetchCategories = async () => {
    const availableCategories = await api.get('/list/profile/categories');
    setCategories(availableCategories);
  };

  const fetchList = async () => {
    let dbList = await listDb.current.getList(5000);
    if (user.listCode && !dbList) {
      dbList = { name: user.listCode, list: [] };
      await listDb.current.updateLocalList(dbList);
    }
    updateList(dbList);
  };

  useEffect(() => {
    document.title = 'Einkaufsliste';
    return () => {
      if (itemToRemoveRef.current) {
        sendRemovedItemBeacon(itemToRemoveRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      await fetchList();
      await fetchCategories();
      setLoading(false);
    };

    fetchAll();

    return toast.dismiss;
  }, [user.listCode]);

  useEffect(() => {
    const onRemove = () => {
      if (itemToRemove) {
        sendRemovedItemBeacon(itemToRemove);
      }
    };
    window.addEventListener('unload', onRemove);
    return () => window.removeEventListener('unload', onRemove);
  }, [itemToRemove]);

  const onUpdateCode = async (code) => {
    await listDb.current.clear();
    listDb.current.name = code;
    await fetchList();
  };

  const removeItemInQueue = async () => {
    if (itemToRemove) {
      toast.dismiss();
      await listDb.current.removeItems(itemToRemove);
      setItemToRemove(null);
    }
  };

  const addItem = async (name) => {
    await removeItemInQueue();

    if (name.length) {
      await listDb.current.addItems(name);
    }
  };

  const updateItem = async ({ name, category }) => {
    await removeItemInQueue();

    if (editItem && name.length) {
      await listDb.current.updateItem(editItem.id, { name, category });
    }

    setEditItem(null);
  };

  const removeItem = async (id) => {
    await removeItemInQueue();

    const origItem = list.find((item) => item.id === id);
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
    setItemToRemove(id);

    const undo = () => {
      setList(updatedList.concat([origItem]));
      setItemToRemove(null);
    };

    toast(<ToastUndo undo={undo} label={`${origItem.name} entfernt.`} />, {
      onClose: async () => {
        if (itemToRemove === id) {
          await listDb.current.removeItems(itemToRemove);
          setItemToRemove(null);
        }
      },
      closeOnClick: false,
    });
  };

  const listItems = (list || []).filter(({ id }) => id !== itemToRemove);
  const isSorted = listItems.some(({ category }) => category);

  return (
    <>
      <ListNav
        onSort={async () => {
          if (profiles && profiles.length > 1) {
            setShowProfileModal(true);
          } else {
            const sortedList = await api.get('/list/sort');
            await listDb.current.updateLocalList(sortedList);
          }
        }}
      />
      {loading && <Loading />}
      {(!loading && !list) && (
        <NoList onUpdate={onUpdateCode} />
      )}
      {!loading && (
        <div id="list-wrapper">
          <ProfileModal
            show={showProfileModal}
            profiles={profiles}
            onClose={() => setShowProfileModal(false)}
            onSelect={async (profile) => {
              const sortedList = await api.get(`/list/sort?profile=${profile._id}`);
              await listDb.current.updateLocalList(sortedList);
              setShowProfileModal(false);
            }}
          />
          {categories && (
            <ListInput
              categories={categories}
              editItem={editItem}
              isSorted={isSorted}
              onUpdate={updateItem}
              onAdd={addItem}
            />
          )}
          <ListItems
            items={listItems}
            isSorted={isSorted}
            onEdit={setEditItem}
            onSort={({ oldIndex, newIndex }) => {
              if (oldIndex !== newIndex) {
                listDb.current.moveItem(list[oldIndex].id, newIndex);
              }
            }}
            onRemove={removeItem}
            onRemoveAll={() => listDb.current.removeItems(list.map(({ id }) => id))}
          />
        </div>
      )}
    </>
  );
};

export default List;
