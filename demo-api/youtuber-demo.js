// express 모듈 셋팅
const express = require('express');
const app = express();
app.listen(1234);

// 데이터 셋팅

// 채널 주소 : https://www.youtube.com/@15ya.fullmoon
// 채널 주소 : https://www.youtube.com/@ChimChakMan_Official
// 채널 주소 : https://www.youtube.com/@TEO_universe
let youtuber1 = {
    channelTitle : "십오야",
    sub : "593만명",
    videoNum : "993개"
}

let youtuber2 = {
    channelTitle : "침착맨",
    sub : "227만명",
    videoNum : "6.6천개"
}

let youtuber3 = {
    channelTitle : "테오",
    sub : "54.8만명",
    videoNum : "726천개"
}

let db = new Map();
let id = 1;
db.set(id++, youtuber1);
db.set(id++, youtuber2);
db.set(id++, youtuber3);

// REST API 설계
app.get('/youtubers', (req, res) => {
    res.json(db);
})

app.get('/youtuber/:id', function(req, res){
    let {id} = req.params;
    id = parseInt(id);

    const youtuber = db.get(id);
    if (youtuber === undefined){
        res.json({
            message: "유튜버 정보를 찾을 수 없습니다.",
        })
    } else {
        let product = youtuber;
        product["id"] = id;
        res.json(product);
    }
})

app.use(express.json()); // http 외 모듈인 '미들웨어':json 설정
app.post('/youtuber', (req, res) => {
  // body에 숨겨져서 들어온 데이터를 화면에 뿌려줘볼까?
    console.log(req.body);

    db.set(id++, req.body);

    res.json({
        message : `${db.get(id-1).channelTitle}님의 유튜버 생활을 응원합니다!`
    });
})