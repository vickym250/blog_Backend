const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./src/Router/AuthRouter');
const postRoutes = require('./src/Router/PostRouter');
const comment = require('./src/Router/CommentRout');
 const dashboard = require('./src/Router/DashboardRout')
 const visitor = require('./src/Router/VisitorRout')
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use("/api/comment",comment);
app.use("/api/visitor",visitor);
app.use("/api/dashboard",dashboard);

app.get('/',(req,res)=>{
  res.send("server start")

})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen( 5000, () => console.log('Server running'));
  })
  .catch((err) => console.error(err));
