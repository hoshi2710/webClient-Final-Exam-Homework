import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  handleCreateChatroom,
  handleFetchMessages,
  handleSendMessage,
  handleFetchChatRoomList,
} from "./controllers/chat.controller.js";
import {
  handleUserRegister,
  handleUserLogin,
} from "./controllers/user.controller.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.post("/chat/new", handleCreateChatroom);
app.get("/chat/list", handleFetchChatRoomList);
app.post("/chat/:chatRoomId", handleSendMessage);
app.get("/chat/:chatRoomId", handleFetchMessages);
app.post("/user/register", handleUserRegister);
app.post("/user/login", handleUserLogin);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
