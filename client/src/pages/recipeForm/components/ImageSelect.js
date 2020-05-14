import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import Modal from 'react-modal';
import 'react-image-crop/dist/ReactCrop.css';
import './ImageSelect.scss';

Modal.setAppElement('#root');

const modalStyles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

const ImageSelect = ({ updateImg }) => {
  const fileRef = useRef(null);
  const imgRef = useRef(null);

  const [imgData, setImgData] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%', width: 100, height: 100,
  });

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgData(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setImgFile(e.target.files[0]);
    }
  };

  const save = async () => {
    if (imgRef.current) {
      const image = imgRef.current;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const serverCrop = {
        left: Math.round(crop.x * scaleX),
        top: Math.round(crop.y * scaleY),
        width: Math.round(crop.width * scaleX),
        height: Math.round(crop.height * scaleY),
      };
      let url = '/api/upload/image';
      if (
        serverCrop.left
        || serverCrop.top
        || serverCrop.width !== image.naturalWidth
        || serverCrop.height !== image.naturalHeight
      ) {
        const params = new URLSearchParams(serverCrop);
        url += `?${params.toString()}`;
      }
      const body = new FormData();
      body.append('file', imgFile);
      const res = await fetch(url, {
        method: 'POST',
        body,
        credentials: 'include',
      });
      const { url: imgUrl } = await res.json();
      updateImg(imgUrl);
      setImgData(null);
    }
  };

  return (
    <>
      <input ref={fileRef} type="file" accept="image/*" onChange={onSelectFile} style={{ display: 'none' }} />
      <button type="button" className="button" onClick={() => fileRef.current.click()}>Neues Bild</button>
      <Modal
        isOpen={Boolean(imgData)}
        style={modalStyles}
        onRequestClose={() => setImgData(null)}
        contentLabel="Bild zuschneiden"
      >
        <h2>Bild zuschneiden</h2>
        <ReactCrop
          src={imgData} crop={crop}
          onChange={(newCrop) => setCrop(newCrop)}
          onImageLoaded={onLoad}
          imageStyle={{ height: '100%' }}
          style={{ display: 'flex' }}
        />
        <button type="button" className="button inverted" onClick={save}>Speichern</button>
      </Modal>
    </>
  );
};

ImageSelect.propTypes = {
  updateImg: PropTypes.func.isRequired,
};

export default ImageSelect;
