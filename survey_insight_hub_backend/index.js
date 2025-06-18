
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const surveyRoutes = require('./routes/surveyRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 1065;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/surveys', surveyRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Survey Insight Hub Backend is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
