const fetchRoomList = () => {
    const listArea = document.getElementsByClassName("chatroom-list")[0];
    listArea.innerHTML = "";
    fetch("/chat/list").then(async (res) => {
        const chatrooms = (await res.json()).success.chatrooms;
        chatrooms.forEach(element => {
            listArea.innerHTML += `<a class='list-group-item list-group-item-action' href='/chatroom.html?room=${element.chatRoomId}'>${element.chatRoomName}</a>`
        });
    })
}
const createNewChatRoom = async () => {
    const roomNameField = document.getElementsByClassName("new-room-name")[0];
    const createRoomButton = document.getElementsByClassName("create-room-button")[0];
    const name = roomNameField.value;
    const jsonData = JSON.stringify({
        name
    })
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    fetch("/chat/new", {
        method: 'POST',
        headers: headers,
        body: jsonData
    }).then(() => {
        roomNameField.value = "";
        createRoomButton.classList.add("disabled");
        fetchRoomList();
    })
}
const roomNameFieldChangeEventHandler = (e) => {
    const createRoomButton = document.getElementsByClassName("create-room-button")[0];
    if (e.target.value === "") {
        createRoomButton.classList.add("disabled");
    } else {
        createRoomButton.classList.remove("disabled");
    }
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
    const createRoomButton = document.getElementsByClassName("create-room-button")[0];
    const roomNameField = document.getElementsByClassName("new-room-name")[0];
    createRoomButton.addEventListener('click', createNewChatRoom);
    roomNameField.addEventListener('input', roomNameFieldChangeEventHandler);
    fetchRoomList();
}