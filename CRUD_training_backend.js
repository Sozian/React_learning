const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const app = express();
const port = 3019;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://127.0.0.1:27017/employee', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const db = mongoose.connection;

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    employeeId: String,
    designation: String,
    joiningDate: Date,
    image: String,
    salary:String,
    address:String,
    location:String,
});

const textSchema = new mongoose.Schema({
    content: String,
});
const locationSchema = new mongoose.Schema({
    latitude: String,
    longitude: String,
    locationName: String,
});
const User = mongoose.model('User', userSchema);
const Text = mongoose.model('Text', textSchema);
const Location = mongoose.model('Location', locationSchema);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/post', upload.single('image'), async (req, res) => {
    const { name, email, phone, employeeId, designation,salary, joiningDate,address,location } = req.body;
    const image = req.file ? req.file.path : null;

    const user = new User({
        name,
        email,
        phone,
        employeeId,
        designation,
        salary,
        joiningDate,
        image,
        address,
        location,
    });

    try {
        await user.save();
        res.send("Form submission successful");
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred");
    }
});

app.post('/postText', async (req, res) => {
    try {
        const { content } = req.body;

        // Logging request body to check content
        console.log('Request Body:', req.body);

        if (!content) {
            return res.status(400).send('Content is required');
        }

        const newText = new Text({ content });
        await newText.save();
        res.status(200).send('Text saved successfully');
    } catch (error) {
        console.error('Failed to save text:', error);
        res.status(500).send('Failed to save text: ' + error.message);
    }
});
app.post('/postLocation', async (req, res) => {
    const { latitude, longitude, locationName } = req.body;

    // Check if the fields are being received correctly
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
    console.log("Location Name:", locationName);

    const location = new Location({
        latitude,
        longitude,
        locationName,
    });

    try {
        await location.save();
        res.send("Location added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred");
    }
});

app.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/getTexts', async (req, res) => {
    try {
        const texts = await Text.find();
        res.json(texts);
    } catch (err) {
        res.status(500).send(err);
    }
});
app.get('/getLocation',async(req,res)=>{
    try{
        const locations=await Location.find();
        res.json(locations);
    }
    catch (err){
         res.status(500).send(err);
    }
})

app.get('/getTexts/:id', async (req, res) => {
    try {
        const text = await Text.findById(req.params.id);
        if (text) {
            res.json(text);
        } else {
            res.status(404).send("Text not found");
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/getUser/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/deleteUser/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.send("User deleted successfully");
    } catch (err) {
        res.status(500).send(err);
    }
});
app.delete('/deleteTexts/:id', async (req, res) => {
    try {
        await Text.findByIdAndDelete(req.params.id);
        res.send("text deleted sucessfully")
    } catch (err) {
        res.status(500).send(err);
    }
});
app.delete('/deleteLocation/:id',async(req,res)=>{
    try{
        await Location.findByIdAndDelete(req.params.id);
        res.send("location deleted sucessfully")
    }
    catch(err){
        res.status(500).send(err);
    }
})

app.put('/updateUser/:id', upload.single('image'), async (req, res) => {
    const { name, email, phone, employeeId, designation, salary,joiningDate,address,location} = req.body;
    const image = req.file ? req.file.path : null;

    try {
        const updateData = {
            name,
            email,
            phone,
            employeeId,
            designation,
            salary,
            joiningDate,
            address,
            location
        };

        if (image) {
            updateData.image = image;
        }

        await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.send("User updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred");
    }
});

app.put('/updateText/:id', async (req, res) => {
    try {
        const { content } = req.body;
        const updatedText = await Text.findByIdAndUpdate(req.params.id, { content }, { new: true });
        if (updatedText) {
            res.status(200).send("Text updated successfully");
        } else {
            res.status(404).send('Text not found');
        }
    } catch (error) {
        console.error('Failed to update text:', error);
        res.status(500).send('Failed to update text: ' + error.message);
    }
});
app.put('/updateLocation/:id',async(req,res) =>{
    try{
        const {latitude,longitude,locationName}=req.body;
        const updatedLocation=await Location.findByIdAndUpdate(req.params.id, {latitude,longitude,locationName}, {new :true});
        if (updatedLocation) {
            res.status(200).send("Text updated successfully");
        } else {
            res.status(404).send('Text not found');
        }
    } catch (error) {
        console.error('Failed to update text:', error);
        res.status(500).send('Failed to update text: ' + error.message);
    }
    }
);

db.once('open', () => {
    console.log("MongoDB connection successful");
});

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
