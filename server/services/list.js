const List = require('../models/shoppinglist');

module.exports.getByUser = async (userId) => {
  const list = await List
    .find({
      owner: userId,
    });

  return list;
};
