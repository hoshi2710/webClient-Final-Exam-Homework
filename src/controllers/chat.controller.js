import {
  bodyToCreateRoomRequest,
  bodyToFetchChatRoomListRequest,
  bodyToFetchMessagesRequest,
  bodyToSendMessageRequest,
} from "../dtos/chat.dtos.js";
import {
  createChatroom,
  fetchChatRoomList,
  fetchMessagesFromRoom,
  sendMessageToRoom,
} from "../services/chat.service.js";
import { StatusCodes } from "http-status-codes";

export const handleCreateChatroom = async (req, res, next) => {
  console.log("새로운 채팅방 개설 요청이 발생하였습니다!");
  console.log("body: ", req.body);
  const chat = await createChatroom(bodyToCreateRoomRequest(req.body));
  res.status(StatusCodes.CREATED).success(chat);
};

export const handleSendMessage = async (req, res, next) => {
  console.log("새로운 메시지 전송 요청이 발생하였습니다!");
  console.log("body: ", req.body);
  const chat = await sendMessageToRoom(
    bodyToSendMessageRequest(req.body, req.params),
  );
  res.status(StatusCodes.OK).success(chat);
};

export const handleFetchMessages = async (req, res, next) => {
  console.log("메시지 로딩 요청이 발생하였습니다!");
  console.log("body: ", req.body);
  const chat = await fetchMessagesFromRoom(
    bodyToFetchMessagesRequest(req.params),
  );
  res.status(StatusCodes.OK).success(chat);
};

export const handleFetchChatRoomList = async (req, res, next) => {
  console.log("채팅방 리스트 로딩 요청이 발생하였습니다!");
  console.log("body: ", req.body);
  const chat = await fetchChatRoomList(
    bodyToFetchChatRoomListRequest(req.body),
  );
  res.status(StatusCodes.OK).success(chat);
};
