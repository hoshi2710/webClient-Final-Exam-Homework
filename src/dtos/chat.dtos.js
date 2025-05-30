export const bodyToCreateRoomRequest = (body) => {
  return {
    name: body.name,
  };
};

export const responseFromCreateRoomRequest = (data) => {
  return {
    chatRoomId: data.chatRoomId,
  };
};

export const bodyToSendMessageRequest = (body, params) => {
  return {
    chatRoomId: parseInt(params.chatRoomId),
    userId: body.userId,
    content: body.content,
  };
};

export const responseFromSendMessageRequest = (data) => {
  return {
    createdAt: data.message.createdAt,
    userName: data.sentFrom,
    message: data.message.message,
  };
};

export const bodyToFetchMessagesRequest = (params) => {
  return {
    chatRoomId: parseInt(params.chatRoomId),
  };
};
export const responseFromFetchMessagesRequest = (data) => {
  return {
    messages: data,
  };
};
export const bodyToFetchChatRoomListRequest = (body) => {};
export const responseFromFetchChatRoomRequest = (data) => {
  return {
    chatrooms: data,
  };
};
export const bodyToLoginRequest = (body) => {
  return {
    userName: body.name,
    password: body.password,
  };
};
