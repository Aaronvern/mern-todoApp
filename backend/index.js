const express = require ('express');
const { createTodo, updateTodo } = require('./types');
const {todo} = require('./database-schema/db.js')
const cors = require('cors')
const app = express();
const port = 3000 ;
//testing
app.use(cors())
app.use(express.json())

app.post('/todo',async (req,res)=>{
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload)
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"wrong todo inputs"
        })
    }
    const response = await todo.create({
        title: createPayload.title,
        description : createPayload.description,
        completed : false
    })
    if(!response){
        res.status(400).json({
            msg:"server error todo not stored in server"
        })
    }else{
        res.status(200).json({
            msg:"todo created"
        })
    }

})

app.get('/todos',async (req,res)=>{
    
    const todos = await todo.find({})
    if(!todos){
        res.status(500).json({
            msg:"server error couldnt fetch todos from backend"
        })
        return 
    }
    res.json({
        todos
    })
    

})

app.put('/completed',async (req,res)=>{
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload)
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"wrong update inputs"
        })
        return
    }
    await todo.update({
        _id:req.body.id,

    },{
        completed : true
    })

})

app.use((err, req, res, next) => {
    res.status(500).send('Something broke!');
  });

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})