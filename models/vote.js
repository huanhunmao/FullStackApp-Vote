const mongoose = require('mongoose')

const voteSchema = new mongoose.Schema({
    camp1: Number,
    camp2: Number,
})

const Vote = mongoose.model('Vote', voteSchema)

module.exports = Vote