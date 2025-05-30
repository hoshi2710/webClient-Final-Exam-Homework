export const bodyToRegisterRequest = (body) => {
  return {
    name: body.name,
    password: body.password,
  };
};
export const responseFromRegisterRequest = (data) => {
  return {
    name: data.userName,
  };
};
export const bodyToLoginRequest = (body) => {
  return {
    userName: body.name,
    password: body.password,
  };
};
export const responseFromLoginRequest = (data) => {
  return {
    userId: data.userId,
  };
};
