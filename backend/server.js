//Express
const express= require('express');
const app =express();
const mongoose=require('mongoose')
const cors= require('cors')

//middleware
app.use(express.json())
app.use(cors())


//let todos=[];
//connecting mongodb
mongoose.connect('mongodb://localhost:27017/mern-todo')
.then(()=>{
 console.log("db connected")

}).catch((err)=>{
    console.log(err)
})

//creating scheme
const todoSchema= new mongoose.Schema({

    title: {
        type:String,
        required:true

    },

    description:String

   })
//Creating model
const todoModel=mongoose.model('Todo',todoSchema)




app.post('/todos',async(req,res)=>{

    const {title,description}=req.body;
   
    try {
        const newTodo= new todoModel({title,description})
        await newTodo.save();
        res.status(201).json(newTodo)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
   
    
})


//get all item
app.get('/todos',async (req,res)=>{
    try {
       const todos= await todoModel.find();
       res.json(todos);
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
    

})

app.put("/todos/:id",async(req,res)=>{


    try {

    const{title,description}=req.body;
    const id =req.params.id
    const updatedTodo=await todoModel.findByIdAndUpdate(
        id,
        {  title, description},
        {new:true}

      
    )
    if(!updatedTodo){
        return res.status(404).json({message:"Todo not Found"})
    }
    res.json(updatedTodo)

        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})

        
    }
    



})

//Delete a todo item

app.delete("/todos/:id",async (req,res)=>{
    try {
        const id =req.params.id;
        const kk =await todoModel.findByIdAndDelete(id)
         res.status(204).end()
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
        
    }
   


})

const port = 8000;
app.listen(port,()=>{

    console.log(`server is running on port ${port}`)

})