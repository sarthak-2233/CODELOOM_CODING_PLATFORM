const express= require('express')
// const { useDispatch } = require('react-redux');
const app= express()
const connectDB=require('./Config/db')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const cookieParser = require('cookie-parser');
const redisclient=require('./Config/redis')
// ROUTES
const authRouter=require('./Routes/userAuth')
const problemRouter=require('./Routes/problemRoute')
const submitRouter=require('./Routes/submitRoute')
const aiChattingRouter=require('./Routes/aiChatting')
const videoRouter = require("./routes/videoCreator");
// Google OAuth configuration
const passport = require('passport');

require('./Config/googleAuth'); 
require('./Config/githubAuth');
// CORS
const cors=require('cors')
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}))
// SESSION MIDDLEWARE
const session = require('express-session');

// Add this AFTER app initialization, BEFORE passport
app.use(session({
  secret: 'your_secret_key_here',  // Change this to something random
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,  // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
// MIDDLEWARE
app.use(cookieParser()); // to parse cookies from incoming requests
app.use(express.json()); // convert incoming JSON requests to JS objects
app.use(passport.initialize());
app.use(passport.session());
// ROUTES
app.use('/user',authRouter)
app.use('/problem',problemRouter)
app.use('/submission', submitRouter);
app.use('/ai',aiChattingRouter)
app.use("/video",videoRouter);

const PORT =process.env.PORT || 5000;

// REDIS initialisation 
// redis dns change karna hai
const InitializeConnection = async ()=>{
    try {
            await Promise.all([connectDB(),
                redisclient.connect()
            ]);
            console.log('Connected to Redis successfully');

            app.listen(PORT,()=>{ 
                console.log(PORT)
            })
    } catch (error) {
        console.log(error);

    }
}

InitializeConnection();





// // DB CONNECTION
// 
// connectDB().then(async ()=>{  
// app.listen(PORT,()=>{
//     console.log('Server is running on port '+PORT);
// })
// }).catch((err)=>{
//     console.log('Database connection failed:', err);
// })









// // quick diagnostic to confirm env loaded
// if (!process.env.PORT) {
//         console.warn('Warning: process.env.PORT is not set. Did dotenv load the .env file?');
//     } else {
//         console.log('Loaded env PORT=', process.env.PORT);
//     }
