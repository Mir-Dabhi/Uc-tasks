import express from "express";
import axios from "axios";
const BASE_URL = 'https://hp-api.onrender.com/api';

const app = express();
const PORT = 3000;

const books = [
    { id: 1, title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling" },
    { id: 2, title: "Harry Potter and the Chamber of Secrets", author: "J.K. Rowling" },
    { id: 3, title: "Harry Potter and the Prisoner of Azkaban", author: "J.K. Rowling" },
    { id: 4, title: "Harry Potter and the Goblet of Fire", author: "J.K. Rowling" },
    { id: 5, title: "Harry Potter and the Order of the Phoenix", author: "J.K. Rowling" },
    { id: 6, title: "Harry Potter and the Half-Blood Prince", author: "J.K. Rowling" },
    { id: 7, title: "Harry Potter and the Deathly Hallows", author: "J.K. Rowling" }
];


app.get('/books', (req, res) => {
    res.json(books);
});

// Root route
app.get('/', (req, res) => {
    res.send(`
        To fetch books, search URL '/books'
        To fetch characters, search '/characters'
        To fetch spells, search URL '/spells'
        To fetch Hogwarts staff, search '/hogwarts-staff'
        To fetch Hogwarts students, search URL '/hogwarts-students'
        To fetch a character by ID, search '/character/:id'
    `);
});
//  characters
app.get('/characters', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/characters`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch characters' });
    }
});

//  spells
app.get('/spells', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/spells`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch spells' });
    }
});

// Hogwarts staff
app.get('/hogwarts-staff', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/staff`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Hogwarts staff' });
    }
});

// students
app.get('/hogwarts-students', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/students`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Hogwarts students' });
    }
});

//  character by ID
app.get('/character/:id', async (req, res) => {
    //const  id  = req.params.id;
    const id = parseInt(req.params.id);
    try {
        const response = await axios.get(`${BASE_URL}/characters`);
        //const idchar = response.data.find((yup)=> yup.id == id);
     /* there are two methods used over here method 1 which is commented in which user puts exact id ANDDDD method 2 in whic number is put for
            for method 1 to run comment line 77,83,84*/
        const mu = response.data;
        const idchar =mu[id];
        res.json(idchar);
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch character with ID: ${id}` });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
