const express = require('express');
const mongoose = require('mongoose');
const app = express();
// const Task=require('models/Task');
const PORT = process.env.PORT || 8081;  //This line sets the PORT variable. It first checks if the environment variable PORT is defined (often set in cloud hosting environments) and uses that value. If PORT is not defined, it defaults to 5000

// MiddleWare for parsing JSON
//http://localhost:5000/api/tasks
app.use(express.json());

const cors = require('cors');
app.use(cors());

// connect to mongodb

mongoose.connect('mongodb://localhost:27017/myToDo_App_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.get('/', (req, res) => {
    res.send('Backend is running');
})

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
//// Task Schemma 
const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
   
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: {
        type: Date,
        required: false,
    },
    

})

taskSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Task = mongoose.model('Task', taskSchema);


// Post 

app.post('/api/tasks', async (req, res) => {
    const { title, description, priority, dueDate } = req.body;

    try {
        const newTask = new Task({
            title,
            description,
            priority,
            dueDate,
        });

        const savedTask = await newTask.save(); // Save the new Task to the database
        res.status(201).json(savedTask);
    }
    catch (err) {
        console.error('Error saving task:', err); // Log the error
        res.status(500).json({ message: 'server error' })
    }
})

// get api

app.get('/api/tasks' ,async (req,res)=>{
   try{
      const tasks=await Task.find(); // fetch all the tasks
      res.json(tasks);

   }
   catch(err){
       res.status(500).json({message:'server error'});
   }
})
