import { getUserName } from "./user.repository.js";

const chatrooms = [];
export const createRoom = async (data) => {
  chatrooms.push(data);
  return data.id;
};
export const sendMessage = async (message, chatRoomId) => {
  const target = chatrooms.find((chatroom) => chatroom.id === chatRoomId);
  if (target === undefined) return null;
  target.messages.push(message);
  const sendedMessage = target.messages[target.messages.length - 1];
  return sendedMessage;
};
export const fetchMessages = async (chatRoomId) => {
  const target = chatrooms.find((chatroom) => chatroom.id === chatRoomId);
  if (target === undefined) return null;
  return target.messages;
};
export const fetchChatRooms = async () => {
  return chatrooms;
};
