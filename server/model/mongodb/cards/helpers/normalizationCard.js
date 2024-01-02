const generateBizNumber = require("./generateBizNumber");

const normalizeCard = async (card, userId) => {
  return {
    ...card,

    user_id: card.user_id || userId,
  };
};

module.exports = normalizeCard;
