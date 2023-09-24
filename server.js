const path = require('path');

const express =  require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000
const Vote = require('./models/vote')

// 这告诉Express从public目录提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 使用body-parser处理post请求数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 连接到 mongoDB
mongoose.connect('mongodb://localhost:27017/votingApp', {
    useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.on('open', async function(){
    console.log("Connected to MongoDB");

    // 初始化数据库
    const votes = await Vote.findOne()
    if(!votes){
        const initialVote = new Vote({camp1: 0, camp2: 0})
        await initialVote.save()
        console.log('Initialized votes');
    }
})

// 存储投票数据
// let votes = {
//     camp1: 0,
//     camp2: 0
// }

// 获取投票数据
app.get('/votes', async (req, res) => {
    try{
        const votes = await Vote.findOne()
        res.json(votes);
    }catch(err){
        res.status(500).json({ message: "Error fetching votes" });
    }
})

// 投票操作
app.post('/vote', async (req, res) => {
    const {camp}  =req.body

    try{
        const votes = await Vote.findOne()
        if(votes && votes[camp] !== undefined) {
            votes[camp] ++ 
            await votes.save()
            
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
    }catch(e){
        res.status(500).json({ message: "Error recording vote" });
    }


})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})