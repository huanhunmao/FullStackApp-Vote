const path = require('path');

const express =  require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000

// 这告诉Express从public目录提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 使用body-parser处理post请求数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 存储投票数据
let votes = {
    camp1: 0,
    camp2: 0
}

// 获取投票数据
app.get('/votes', (req, res) => {
    res.json(votes);
})

// 投票操作
app.post('/vote', (req, res) => {
    const {camp}  =req.body

    if(votes[camp] !== undefined) {
        votes[camp] ++ 
        res.json({
            success: true,
            votes
        })
    }else{
        res.json({
            success: false,
            message: 'Invalid vote'
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})