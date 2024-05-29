const mongoose = require('mongoose'); // 몽구스 모듈

// 데이터베이스 연결 함수 정의
const connect = () => {
    // 개발 환경이 아닌 경우 -> 몽구스 디버그 모드 활성화
    if (proces.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }

    // 몽구스 <-> 몽고디비 연결
    // 주소형식 mongodb: //[username:password@]host[ :port] [/[database] [?options] ]
    // mongodb : //이름: 비밀번호@DB서버ip주소 :27017/admin
    mongoose.connect('mongodb://mongodb:mongodb@localhost:27017/admin', {
        dbName: 'nodejs', // 연결할 데이터베이스 이름
        useNewUrlParser: true, // useNewUrlParser 옵션을 true로 설정합니다. (선택사항)
    }).then(() => {
        console.log("몽고디비 연결 성공"); // 연결 성공 메시지 출력
    }).catch((err) => {
        console.error("몽고디비 연결 에러", err); // 연결 중 오류 발생 -> 에러 출력
    });
};

// 몽구스 연결 객체의 'error" 이벤트 리스너 설정
mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error); // 연결 중 오류 발생 -> 에러 출력
});

// 몽구스 연결 객체의 'disconnected' 이벤트 리스너 설정
mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.'); // 연결이 끊긴 경우 -> 메시지 출력
    connect(); //연결울 재시도하기 위해 connect 함수 호출
});

// 모듈에 connect 함수 할당 -> 외부사용 가능
module.exports = connect;