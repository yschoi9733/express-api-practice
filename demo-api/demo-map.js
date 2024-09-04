const express = require('express');
const app = express();

app.listen(1234);

let db = new Map();

let notebook = {
    productName : "Notebook",
    price : 2000000,
}

let cup = {
    productName : "Cup",
    price : 2000000,
}

let chair = {
    productName : "Chair",
    price : 100000,
}

let poster = {
    productName : "Poster",
    price : 20000,
}

db.set(1, notebook);
db.set(2, cup);
db.set(3, chair);
db.set(4, poster);

// localhost:1234/1 => NoteBook
// localhost:1234/2 => Cup
// localhost:1234/3 => Chair
app.get('/:id', function(req, res){
    let {id} = req.params;
    id = parseInt(id);

    if (db.get(id) === undefined){
        res.json({
            message: "없는 상품입니다.",
        })
    } else {
        product = db.get(id)
        product["id"] = id;
        res.json(product);
    }
})
