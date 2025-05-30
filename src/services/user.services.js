import {
  responseFromRegisterRequest,
  responseFromLoginRequest,
} from "../dtos/user.dtos.js";
import { WrongUserNamePassword } from "../error.js";
import {
  addUser,
  getUserName,
  verifyUser,
} from "../repositories/user.repository.js";

class User {
  constructor(name, pw, id) {
    this.userName = name;
    this.password = pw;
    this.userId = id;
  }
}

export const userRegister = async (data) => {
  if (global.userId === undefined) global.userId = 0;
  const userId = await addUser(
    new User(data.name, data.password, global.userId++),
  );
  const userName = await getUserName(userId);
  return responseFromRegisterRequest({ userName });
};

export const userLogin = async (data) => {
  const userId = await verifyUser(data);
  if (userId === null) {
    throw new WrongUserNamePassword(
      "유저 이름 혹은 패스워드가 잘못되었습니다.",
      data,
    );
  }
  return responseFromLoginRequest({ userId });
};
