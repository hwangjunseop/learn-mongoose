const { type } = require('express/lib/response');
const mongoose = require('mongoose'); // mongoose 모듈

// mongoose에서 Schema를 가져와 Schema변슈에 할당
const {Schema} = mongoose;

// mongoose 의 Types에서 ObjectId를 가져와 ObjectId 변수에 할당
const {Type: {ObjectId}} = Schema;

// 댓글 스키마 정의
const commentSchema = new Schema({
    // 댓글 작성자 필드 정의
    commenter: {
        type: ObjectId, // 데이터 타입 -> ObjectId
        required: true, // 필수 필드로 설정
        ref: 'User', // 'User' 모델과의 관계 설정
    },
    // 댓글 내용 필드 정의
    comment: {
        type: String, // 데이터 타입 -> 문자열
        required: true, // 필수 필드로 설정
    },
    // 생성일 필드 정의
    createdAT: {
        type: Date, // 데이터 타입 -> 날짜
        default: Date.now, // 기본값 -> 현재 날짜 사용
    },
});

// Comment 모델 생성 -> 외부에서 사용할 수 있도록 모듈로 내보냄.
module.exports = mongoose.model('Comment', commentSchema);