// 사용자 이름을 눌렀을 때 댓글 로딩
document.querySelectorAll('#user-list tr').forEach((el) => {
    el.addEventListener('click,' function () {
        const id = el.querySelector('id').textContent; // 클릭한 행의 첫 번쨰 셀에 있는 텍스트 콘텐츠 (사용자ID)를 가져옵니다.
        getComment(id); // 해당 사용자의 댓글을 가져옵니다
    });
});

    // 사용자 로딩
async function getUser() {
    try {
        const res = await axios.get('/users'); // 서버에서 사용자 정보를 가져옵니다.
        const users = res.data; // 가져온 사용자 정보를 변수에 저장
        console.log(users); // 사용자 정보를 콘솔에 출력
        const tbody = document.querySelector('#user-list tbody'); // 사용자 목록이 표시될 테이블의 tbody를 선택
        tbody.innerHTML = ''; // 이전에 추가된 내용 삭제
        // 사용자 정보를 순회하며 테이블에 사용자를 추가
        users.map(function (user) {
            const row = document.createElement('tr'); // 새로운 행을 생성
            row.addEventListener('click', () => {
                getComment(user._id); // 해당 사용자의 댓글을 가져오는 함수를 호출
            });
            // 로우 셀 추가 -> 각 사용자의 정보를 테이블에 추가
            let td = document.createElement('td');
            td.textContent = user._id; // 사용자 ID를 셀에 추가
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.name; // 사용자 이름을 셀에 추가
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.age; // 사용자 나이를 셀에 추가
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.married? '기혼' : '미혼'; // 사용자의 결혼 상태를 셀에 추가
            row.appendChild(td);
            tbody.appendChild(row); // 행을 tbody에 추가
        });
    } catch (err) {
        console.error(err); // 오류가 발생한 경우 콘솔에 오류를 출력
    }
}

// 댓글 로딩
async function getComment(id) {
    try {
        const res = await axios.get(`/users/${id}/comments`); // 서버로부터 해당 사용자의 댓글을 가져옵니다
        const comments = res.data; // 가져온 댓글 정보를 변수에 저장
        const tbody = document.querySelector('#comment-list tbody'); // 댓글 목록이 표시될 테이블의 tbody를 선택
        tbody.innerHTML = ''; // 이전에 추가된 내용 삭제
        //가져온 댓글 정보를 순회하며 테이블에 댓글을 추가
        comments.map(function (comment) {
            // 각 댓글의 정보를 담는 새로운 행을 생성
            const row = document.createElement('tr');
            // 댓글의 ID를 표시하는 셀을 생성하고 콘텐츠를 추가
            let td = document.createElement('td');
            td.textContent = comment._id;
            row.appendChild(td);
            // 댓글 작성자의 이름을 표시하는 셀을 생성하고 콘텐츠를 추가
            td = document.createElement('td');
            td.textContent = comment.commenter.name;
            row.appendChild(td);
            // 댓글 내용을 표시하는 셀을 생성하고 콘텐츠를 추가
            td = document.createElement('td');
            td.textContent = comment.comment;
            row.appendChild(td);
            // 댓글 수정 버튼을 생성하고 클릭 이벤트를 추가
            const edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click', async () => {
                // 수정버튼을 클릭했을때의 동작을 정의
                const newComment = prompt('바꿀 내용을 입력하세요'); // 사용자에게 새로운 댓글 내용을 입력받음
                if (!newComment) {
                    return alert('내용을 반드시 입력하셔야 합니다'); // 새로운 댓글 내용이 없는 경우 경고를 표시하고 함수를 종료
                }
                try {
                    await axios.patch(`/comments/${comment._id}`,{comment: newComment}); // 서버에 댓글 수정 요청을 보냅니다.
                    getComment(id); //수정된 댓글 목록을 다시 가져옵니다
                } catch (err) {
                    console.error(err); // 오류가 발생한 경우 콘솔에 오류를 출력
                }
            });
            // 댓글 삭제 버튼을 생성하고 클릭 이벤트를 추가
            const remove = document.createElement('button');
            remove.textContent = '삭제';
            remove.addEventListener('click', async () => {
                // 삭제 버튼을 클릭했을 때의 동작을 정의
                try {
                    await axios.delete(`/comments/${comment._id}`); // 서버에 댓글 삭제 요청 전송
                    getComment(id); // 삭제된 댓글 목록을 다시 가져옵니다.
                } catch(err) {
                    console.error(err); // 오류가 발생한 경우 콘솔에 오류를 출력
                }
            });
            // 수정 및 삭제 버튼을 셀에 추가
            td = document.createElement('td');
            td.appendChild(edit);
            row.appendChild(td);
            td = document.createElement('td');
            td.appendChild(remove);
            row.appendChild(td);
            tbody.appendChild(row); // 행을 tbody에 추가
        });
    } catch (err) {
        console.error(err); // 오류가 발생한 경우 콘솔에 오류를 출력
    }
}

// 사용자 등록 -> 사용자 등록 폼의 submit 이벤트 처리
document.getElementById('user-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // 기본 동작을 막습니다(페이지 새로고침 방지).
    const name = e.target.username.value; // 입력된 사용자 이름을 가져옵니다
    const age = e.target.age.value; // 입력된 사용자 나이를 가져옵니다
    const married = e.target.married.checked; // 결혼 여부를 가져옵니다.
    if (!name) {
        return alert('이름을 입력하세요'); // 이름이 입력되지 않는 경우 경고를 표시하고 함수 종료
    }
    if (!age) {
        return alert('나이를 입력하세요'); // 나이가 입력되지 않은 경우 경고를 표시하고 함수 종료
    }
    try {
        await axios.post('/users', { name, age, married}); // 서버에 새 사용자 정보 등록
        getUser(); // 사용자 목록을 다시 가져옵니다
    } catch (err) {
        console.error(err); // 오류가 발생한 경우 콘솔에 오류를 출력
    }
    // 폼 입력 필드를 초기화
    e.target.username.value = '';
    e.target.age.value = '';
    e.target.married.checked = false;
});

// 댓글 등록 -> 댓글 등록 폼의 submit 이벤트 처리
document.getElementById('comment-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // 기본 동작을 막습니다(페이지 새로고침 방지).
    const id = e.target.userid.value; // 입력된 사용자 ID를 가져옵니다.
    const comment = e.target.comment.value; // 입력된 댓글 내용을 가져옵니다
    if (!id) {
        return alert('아이디를 입력하세요'); // 사용자 ID가 입력되지 않는 경우 경고를 표시하고 함수 종료
    }
    if (!comment) {
        await axios('댓글을 입력하세요'); // 댓글 내용이 입력되지 않은 경우 경고를 표시하고 함수 종료다.
    }
    try {
        await axios.post('/comments', {id, comment}); // 서버에 새 댓글 정보 등록
        getComment(id); // 해당 사용자의 댓글 목록을 다시 가져옵니다.
    } catch (err) {
        console.error(err); // 오류가 발생한 경우 콘솔에 오류출력
    }
    // 폼 입력 필드 초기화
    e.target.userid.value = '';
    e.target.comment.value = '';
});