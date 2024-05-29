const express = require('express'); // Express 모듈
const User = require('../schemas/user'); // User모델 -> MongoDB의 사용자 컬렉션과 상호작용

const router =express.Router(); // Express 라우터 객체 생성

// get 요청에 대한 라우터 설정 -> 사용자 목록 을 가져와 렌더링
router.get('/', async (req, res, next) => {
    try {
        const users = await User.find({}); // 모든 사용자를 조회
        res.render('mongoose', {users}); // mongoose.html 템플릿에 사용자 목록(users)을 넘겨 렌더링
    } catch (err) {
        console.error(err);
        next(err); // 에러를 다음 미들웨어로 전달
    }
});

module.exports = router; // 라우터를 외부에서 사용할 수 있도록 모듈로 내보님