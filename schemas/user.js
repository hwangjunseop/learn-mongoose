const mongoose = require('mongoose'); // mongoose 모듈

// mongoose 에서 Schema를 가져와 Schema  변수에 할당
const { Schema } = mongoose;

// 사용자 스키마 정의
const userSchema = new Schema({
    // 사용자 스키마 정의
    name: {
        type: String, // 데이터타입 -> 문자열
        required: true, // 필수 필드로 설정
        unique: true, // 고유한 값으로 지정
    },
    // 사용자 나이 필드 정의
    age: {
        type: Number, // 데이터 타입 -> 숫자
        required: true, // 필수 필드로 설정
    },
    // 사용자 결혼 여부 필드 정의
    married: {
        type: Boolean, // 데이터 타입 -> 불리언 (참/거짓)
        required: true, // 필수 필드로 설정
    },
    // 사용자 댓글 필드 정의
    comment: String, // 문자열 형식의 댓글
    // 생성일 필드 정의
    createdAT: {
        type: Date, // 데이터 타입 -> 날짜
        default: Date.now, // 기본값 -> 현재 날짜 사용
    },
});

// User  모델 생성 -> 외부에서 사용할 수 있도록 모듈로 내보냄
module.exports = mongoose.model('User',userSchema);