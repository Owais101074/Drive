const express = require('express')
const multer = require('multer')
const bcrypt = require("bcrypt")
const dotenv = require('dotenv').config()
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const app = express() 
const port = process.env.PORT || 3000


// User Model
const userModel = require("./Models/user")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        const uniqueFileName = Date.now() + "_" + file.originalname;
        cb(null, uniqueFileName);
    }
})


const upload = multer({storage})

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// View engine
app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render('register')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/index', (req, res) => {
    res.render('index')
})

app.get('/logout', (req,res) => {
    res.render('register')
})

app.post("/register", (req, res) => {
    const {username, email, password} = req.body; 
    
    const hash = bcrypt.hashSync(password,10)

    const user = userModel.create({
        username,
        email,
        password : hash
    })
    let token = jwt.sign({email}, process.env.SECRET)
    res.cookie("token", token)
    res.redirect('/login')
})

app.post("/login", async(req, res) => {
    let {email,password} = req.body;

    let DB_USER = await userModel.findOne({email})

    if(DB_USER)
    {
        res.redirect("/index")
    }
    else
    {
        res.redirect("/login")
    }
})



app.post("/create", upload.single("file"), (req, res) => {
    res.redirect("/")
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
