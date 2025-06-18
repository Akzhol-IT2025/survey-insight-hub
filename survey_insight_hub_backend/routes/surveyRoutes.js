
const express = require('express');
const router = express.Router();
const { submitSurveyResponse } = require('../controllers/surveyController');

// POST /api/surveys/respond
router.post('/respond', submitSurveyResponse);

module.exports = router;
