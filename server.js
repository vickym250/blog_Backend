const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./src/Router/AuthRouter');
const postRoutes = require('./src/Router/PostRouter');
const commentRoutes = require('./src/Router/CommentRout');
const dashboardRoutes = require('./src/Router/DashboardRout');
const visitorRoutes = require('./src/Router/VisitorRout');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/visitor', visitorRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
  res.send("Server started successfully!");
});

// Mongo + Server Start
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Mongo error: ", err));
