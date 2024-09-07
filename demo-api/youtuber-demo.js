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
let idCount = 1;
db.set(idCount++, youtuber1);
db.set(idCount++, youtuber2);
db.set(idCount++, youtuber3);

// REST API 설계
app.get('/youtubers', (req, res) => {
    let youtubers = {};
    db.forEach((value, key) => {
        youtubers[key] = value;
    })

    res.json(youtubers);
})

app.get('/youtubers/:id', function(req, res){
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
app.post('/youtubers', (req, res) => {
  // body에 숨겨져서 들어온 데이터를 화면에 뿌려줘볼까?
    console.log(req.body);

    db.set(idCount++, req.body);

    res.json({
        message : `${db.get(idCount-1).channelTitle}님의 유튜버 생활을 응원합니다!`
    });
})

app.delete('/youtubers/:id', (req, res) => {
    let {id} = req.params;
    id = parseInt(id);

    const youtuber = db.get(id);
    const channelTitle = youtuber.channelTitle;
    if (youtuber === undefined){


        res.json({
            message: `요청하신 ${id}번은 없는 유튜버입니다.`,
        })
    } else {
        db.delete(id);
        if (id === idCount - 1){
            while (idCount !== 1){
                idCount--;
                if (db.get(idCount -1) !== undefined) break;
            }
        }

        res.json({
            message : `${channelTitle}님, 잘 가요`,
        })
    }
})

app.delete('/youtubers', (req, res) => {
    if (db.size >= 1){
        db.clear();
        idCount = 1;
        res.json({
            message : "전체 유튜버가 삭제되었습니다.",
        })
    } else {
        res.json({
            message : "삭제할 유튜버가 없습니다.",
        })
    }
})

app.put('/youtubers/:id', (req, res) => {
    let {id} = req.params;
    id = parseInt(id);

    let youtuber = db.get(id);
    let oldTitle = youtuber.channelTitle;

    if (youtuber === undefined){
        res.json({
            message : `요청하신 ${id}번은 없는 유튜버입니다.`,
        })
    } else {
        let newTitle = req.body.channelTitle;

        youtuber.channelTitle = newTitle;
        db.set(id, youtuber);

        res.json({
            message : `${oldTitle}님, 채널명이 ${newTitle}로 수정되었습니다`,
        })
    }
})