const users = [];
export const addUser = async (data) => {
  users.push(data);
  return data.userId;
};
export const getUserName = async (userId) => {
  const user = users.find((user) => user.userId === userId);
  if (user === undefined) return null;
  return user.userName;
};
export const verifyUser = async (data) => {
  const user = users.find(
    (user) =>
      user.userName === data.userName && user.password === data.password,
  );
  if (user === undefined) return null;
  return user.userId;
};
