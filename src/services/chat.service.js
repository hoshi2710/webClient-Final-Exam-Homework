import {
  responseFromCreateRoomRequest,
  responseFromFetchChatRoomRequest,
  responseFromFetchMessagesRequest,
  responseFromSendMessageRequest,
} from "../dtos/chat.dtos.js";
import { ChatRoomNotFound, UserNotFound } from "../error.js";
import {
  createRoom,
  sendMessage,
  fetchMessages,
  fetchChatRooms,
} from "../repositories/chat.repository.js";
import { getUserName } from "../repositories/user.repository.js";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const sec = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
};
class Chatroom {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.messages = [];
  }
}
class Message {
  constructor(userId, message) {
    this.userId = userId;
    this.message = message;
    this.createdAt = formatDate(new Date());
  }
}

export const createChatroom = async (data) => {
  if (global.chatroomId === undefined) global.chatroomId = 0;
  const chatRoomId = await createRoom(
    new Chatroom(data.name, global.chatroomId++),
  );

  return responseFromCreateRoomRequest({ chatRoomId });
};
export const sendMessageToRoom = async (data) => {
  const message = await sendMessage(
    new Message(data.userId, data.content),
    data.chatRoomId,
  );
  if (message === null) {
    throw new ChatRoomNotFound("채팅방을 찾을 수 없습니다.", data);
  }
  const sentFrom = await getUserName(message.userId);
  if (sentFrom === null) {
    throw new UserNotFound("사용자를 찾을 수 없습니다.", data);
  }
  return responseFromSendMessageRequest({ message, sentFrom });
};
export const fetchMessagesFromRoom = async (data) => {
  const messages = await fetchMessages(data.chatRoomId);
  if (messages === null) {
    throw new ChatRoomNotFound("채팅방을 찾을 수 없습니다", data);
  }
  const converted = [];
  await messages.forEach(async (message) => {
    const sentFrom = await getUserName(message.userId);
    converted.push({
      userName: sentFrom,
      message: message.message,
      createdAt: message.createdAt,
    });
  });
  return responseFromFetchMessagesRequest(converted);
};
export const fetchChatRoomList = async (data) => {
  const chatRooms = await fetchChatRooms();
  const converted = [];
  chatRooms.forEach((chatroom) => {
    converted.push({
      chatRoomName: chatroom.name,
      chatRoomId: chatroom.id,
    });
  });
  return responseFromFetchChatRoomRequest(converted);
};
