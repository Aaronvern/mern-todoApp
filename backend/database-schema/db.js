const mongoose = require ('mongoose')

mongoose.connect('mongodb+srv://aaronvernekar:m0End1zwCOHWxrL4@cluster0.sqhe0ak.mongodb.net/simple-mern-todoApp')

const todoSchema = mongoose.Schema({
    title :String,
    description:String,
    completed:Boolean
})

const todo = mongoose.model('todos',todoSchema)

module.exports = {
    todo
}