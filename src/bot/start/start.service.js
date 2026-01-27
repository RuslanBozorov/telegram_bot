import { userModel } from "../../models/user.model.js";

export const setName = async (chatId, fullname) => {
  const newUser = await userModel.updateOne(
    { chat_id: chatId },
    { fullname: fullname },
  );
  return newUser;
};

export const setPhone = async (chatId, phone) => {
  const newPhone = await userModel.updateOne(
    { chat_id: chatId },
    { contact: phone },
  );
  return newPhone;
};
