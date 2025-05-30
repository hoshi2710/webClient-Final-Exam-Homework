export class ChatRoomNotFound extends Error {
  errorCode = "C001";
  statusCode = 404;
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
export class UserNotFound extends Error {
  errorCode = "U001";
  statusCode = 404;
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
export class WrongUserNamePassword extends Error {
  errorCode = "U002";
  statusCode = 401;
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
