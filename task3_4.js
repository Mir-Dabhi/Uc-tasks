const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app = express();
const port =  3000;

app.use(express.json());


const connectionURL = 'mongodb://localhost:27017/harrypotter';

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected ');
}).catch((error) => {
    console.error('Error connecting', error);
});


const studentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    house: {
        type: String,
        required: true
    },
    wizard: {
        type: Boolean,
        required: true
    }
});
const Student = mongoose.model('Student', studentSchema);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const houses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
app.get('/', (req, res) => {
    res.send(`
      <a href="http://localhost:3000/addstudent" target="_blank">Add Student</a><br>
      <a href="http://localhost:3000/deletestudent" target="_blank">Delete Student</a>
    `);
  });
app.get('/addstudent', (req, res) => {
    res.send(`
      <form action="/students" method="POST">
        <input type="text" placeholder="name" name="name" />
        <input type="text" placeholder="gender" name="gender" />
        <input type="text" placeholder="wizard" name="wizard" />
        <input type="text" placeholder="id" name="id" />
        <button type="submit">add</button>
      </form>
    `);
  });
// POST request to create a new student
app.post('/students', async (req, res) => {
    try {
        const  id = req.body["id"]
        const name =req.body["name"]
        const gender =req.body["gender"] 
        const wizard = req.body["wizard"]
        const house = houses[Math.floor(Math.random() * houses.length)];

        const newStudent = new Student({
            id,
            name,
            gender,
            house,
            wizard
        });

        await newStudent.save();
        res.status(201).send(`
          <p>Student added successfully</p>
          <a href="/">Go back to home</a>
        `);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }

});
app.get('/deletestudent',(req,res)=>{
    res.send(`
        <form action="/deletestudent" method="POST">
          <input type="text" placeholder="id" name="idd" />
          <button type="submit">delete</button>
        </form>
      `);
})
app.post('/deletestudent', async (req, res) => {
  try {
      const id = req.body["idd"];
      const student = await Student.findOne({ id });

      if (!student) {
          return res.status(404).send({ error: 'Student not found' });
      }

      await Student.deleteOne({ id });

      res.send(`
        <p>Student with ID ${id} has been deleted.</p>
        <a href="/">Go back to home</a>
      `);
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
