function register() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if (!username || !password) {
        alert('사용자 이름과 비밀번호를 입력하세요.');
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/user/register', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert('회원가입 성공! 로그인 해주세요.');
            window.location.href = '/login.html';
        }
    };
    xhr.send(JSON.stringify({ name: username, password }));
}

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if (!username || !password) {
        alert('사용자 이름과 비밀번호를 입력하세요.');
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/user/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const res = JSON.parse(xhr.response);
            localStorage.setItem('userid', res.success.userId);
            localStorage.setItem('username', username);
            alert("로그인 성공!");
            window.location.href = "/list.html"
        } else if (xhr.status === 401) {
            alert('로그인 실패. 사용자 이름 또는 비밀번호를 확인하세요.');
        }
    };
    xhr.send(JSON.stringify({ name: username, password }));
}

function logout() {
    const username = localStorage.getItem('username');
    if (!username) {
        alert('로그인 상태가 아닙니다.');
        return;
    }
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
    window.location.href = "/login.html"
}