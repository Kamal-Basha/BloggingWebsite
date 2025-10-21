import express from "express";
const app=express();

import cors from "cors";
import { useParams } from "react-router-dom";
import mysql from 'mysql2';
import bcrypt from 'bcrypt';

app.use(cors({origin: '*'}))
app.use(express.json({limit:'10MB'}))
app.use(express.urlencoded({extended: true, limit:'10mb'}));

const db =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mysql@kamal786',
    database: 'bloggingwebsite'
});
db.connect((err)=>{
    if(err){
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.get('/', (req, res)=>{
    console.log('in base route');
    res.status(200).json("you are in base route");
    
})

app.get('/greetServer', (req, res)=>{
    res.status(200).json('Hi user')
})

app.post('/user/login' ,(req, res)=>{
  
    let {emailAddress, password} = req.body;
        console.log("after assigning:", emailAddress, password)
        let result=db.query(`select * from Users where emailAddress='${emailAddress}'`, async (error, result)=>{
            if(error){
                console.log(error)
                return res.status(500).json("something want wrong")
            }
            let passwordFromDB=result[0].password;
            let UserID=result[0].ID;
            let isMatched= await bcrypt.compare(password, passwordFromDB)
            return res.status(200).json({isMatched, UserID})
        })
    // res.status(200).json(req.body);
})

app.post('/user/registration', async (req, res)=> {
    // console.log(req.body);
    let {name, phoneNumber, emailAddress, password} = req.body;
   
    let hashedPassword= await bcrypt.hash(password,10);
    console.log("after assigning: ", name, phoneNumber, emailAddress, password, hashedPassword)
   let result=db.query(`insert into Users(Name, phoneNumber, emailAddress, password) values('${name}','${phoneNumber}','${emailAddress}','${hashedPassword}');`, (error, result)=>{
     if(error){
        console.log(error)
        //  res.status(200).json(req.body);
        return res.status(500).json("somethong went wrong")
     }
      return res.status(200).json("User registration success")
   })
});

app.post('/blog/newBlog',(req, res)=>{
    console.log(req.body);

    let {userID, category, title, content}=req.body;

    let result= db.query(`insert into Blogs(UserID,BlogCategory, BlogTitle,BlogContent, BlogPreviewContent)values('${userID}','${category}','${title}','${content}','${content.slice(0,25)}');`,(error, result)=>{
        if(error){
            console.log(error)
            return res.status(500).json("something went wrong")
        }
        return res.status(200).json('user registration successful')
    })

    // res.status(200).json("data recevied")

})

app.get('/blog/getAllBlogs',(req, res)=>{
    console.log("fetching all blogs");
    res.status(200).json("All blogs []");
})

app.get('/blog/GetBlog/:ID',(req,res)=>{
    console.log(req.params);
    res.status(200).json(req.params)
})
app.get('/blog/Category/:category',(req, res)=>{
    console.log(req.params);
    res.status(200).json(req.params);

})

app.listen(3000, ()=>{
    console.log("server open on the port 3000 ");
})
