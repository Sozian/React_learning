const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// const multer = require('multer');
const cors = require('cors');
const app = express();
const port = 3019;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://127.0.0.1:27017/Student_db',{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const db=mongoose.connection;

const loginSchema=new mongoose.Schema({
    name:String, 
    email:String,
    password:String

});

const Student=mongoose.model('Student',loginSchema);

app.post('/post',async(req,res)=>{
    try{
    const{name,email,password}=req.body;
    const student=new Student({
        name,
        email,
        password,
    });
    await student.save(); // Save the student to the database

     res.status(201).json({ message: 'Student added successfully' });
     } catch(error) {
     res.status(500).json({ message: 'Error adding student', error });
}
});
app.get('/getStudent',async(req,res)=>{
  try{
     const student=await Student.find().select('email password');
     res.json(student);
  }
  catch(err){
    res.status(500).send(err);
  }
})
app.post('/login',async(req,res)=>{

      const{email,password}=req.body;

      try{
        const student=await Student.findOne({email});

        if(!student){
            return res.status(400).json({message:'Invalid email or password'});
        }
        if (student.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password' });
         }
         res.status(200).json({ message: 'Login successful' });
      } catch(error){
         res.status(500).json({message:'Server error',error});
      }
});

db.once('open', () => {
    console.log("MongoDB connection successful");
});

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
