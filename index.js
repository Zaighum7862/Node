const express = require('express');
const Joi = require('joi');
const app = express();
require('dotenv').config();
app.use(express.json());

const courses = [
    {id: 1 , name:"Course1"},
    {id: 2 , name:"Course2"},
    {id: 3 , name:"Course3"},
]

app.get('/', (req,res)=>{
    res.send('Hello  world');
});

app.get('/api/courses',(req,res)=>{
    console.log("working",courses)
    res.send(courses)
})

app.post('/api/courses',(req,res)=>{

    const {error} = validateCourse(req.body);
    if(error){
        return res.status(400).send(error);
    }
     
    const course = {
        id: courses.length +1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})

app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("The course with this id not found");
    }
    else{
        res.send(course);
    }
})

app.put('/api/courses/:id',(req,res)=>{

    const course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("The course with this id not found");
    }

    const {error} = validateCourse(req.body);
    if(error){
        return res.status(400).send(error);
    }

    course.name = req.body.name;
    res.send(course);
});

function validateCourse(course){
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    })

    return schema.validate(course);   
}

const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`Listening on port ${port}`));