import {
  bodyToRegisterRequest,
  bodyToLoginRequest,
} from "../dtos/user.dtos.js";
import { userRegister, userLogin } from "../services/user.services.js";
import { StatusCodes } from "http-status-codes";

export const handleUserRegister = async (req, res, next) => {
  console.log("회원가입 요청이 발생하였습니다!");
  console.log("body: ", req.body);
  const user = await userRegister(bodyToRegisterRequest(req.body));
  res.status(StatusCodes.OK).success(user);
};
export const handleUserLogin = async (req, res, next) => {
  console.log("로그인 요청이 발생하였습니다!");
  console.log("body: ", req.body);
  const user = await userLogin(bodyToLoginRequest(req.body));
  res.status(StatusCodes.OK).success(user);
};
