const scrollBottom = () => {
    const messagesArea = document.getElementsByClassName("chats")[0];
    messagesArea.scrollTop = messagesArea.scrollHeight;
}
let messageLengths;
const fetchMessages = () => {
    const urlSearch = new URLSearchParams(location.search);
    const roomId = urlSearch.get('room');
    const messagesArea = document.getElementsByClassName("chats")[0];

    fetch("/chat/" + roomId).then(async (res) => {
        const messages = (await res.json()).success.messages;
        if (messages.length === messageLengths) {
            return;
        }
        messageLengths = messages.length;
        messagesArea.innerHTML = "";
        console.log(messageLengths)
        messages.forEach((message) => {
            const username = localStorage.getItem('username');
            const isSentMySelf = username === message.userName ? "me" : "others"
            messagesArea.innerHTML += `<div class='message ${isSentMySelf}'><div><p class='sent-from'>${message.userName}</p><p class='sent-message'>${message.message}</p> <p class='sent-at'>${message.createdAt}</p></div></div>`
        })
        scrollBottom();
    })
}
const sendMessage = () => {
    const content = document.getElementsByClassName("message-input-field")[0].value;
    if (content === "") {
        alert("메시지를 입력해주세요");
        return;
    }
    const userId = parseInt(localStorage.getItem('userid'));
    const urlSearch = new URLSearchParams(location.search);
    const roomId = urlSearch.get('room');
    const jsonData = JSON.stringify({
        userId, content
    })
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    fetch("/chat/" + roomId, {
        method: 'POST',
        headers: headers,
        body: jsonData
    }).then(() => {
        fetchMessages();
        document.getElementsByClassName("message-input-field")[0].value = "";
    })
}
const checkLogin = () => {
    const username = localStorage.getItem('username');
    if (!username) {
        alert('로그인 상태가 아닙니다.');
        window.location.href = "/login.html"
        return;
    }
}
window.onload = () => {
    checkLogin();
    const sendButton = document.getElementsByClassName("send-button")[0];

    sendButton.addEventListener("click", sendMessage);
    fetchMessages();
    setInterval(fetchMessages, 1000);
}