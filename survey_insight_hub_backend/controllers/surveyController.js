
const axios = require('axios');
const { db } = require('../config/firebase');

const submitSurveyResponse = async (req, res) => {
  const { surveyId, responseText } = req.body;

  if (!surveyId || !responseText) {
    return res.status(400).json({ error: 'surveyId and responseText are required' });
  }

  try {
    // Improved: Analyze sentiment via OpenAI API with a more instructive prompt
    const openaiRes = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a sentiment analysis AI.' },
          { 
            role: 'user', 
            content: `
You are an expert in sentiment analysis.
Carefully classify the sentiment of the following customer response as "positive", "neutral", or "negative".
If the text contains compliments, expressions of liking, love, or satisfaction, classify as "positive".
If the text is critical or expresses dissatisfaction, classify as "negative".
Otherwise, classify as "neutral".

Response: "${responseText}"
Sentiment:
`
          }
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const sentimentRaw = openaiRes.data.choices[0].message.content.trim().toLowerCase();
    const validSentiments = ['positive', 'neutral', 'negative'];
    const sentiment = validSentiments.includes(sentimentRaw) ? sentimentRaw : 'neutral';

    // Save to Firestore
    const newDoc = {
      surveyId,
      responseText,
      sentiment,
      createdAt: new Date().toISOString()
    };

    await db.collection('surveyResponses').add(newDoc);

    res.status(200).json({ message: 'Response submitted', data: newDoc });
  } catch (error) {
    console.error('Error processing response:', error.message);
    res.status(500).json({ error: 'Failed to process survey response' });
  }
};

module.exports = { submitSurveyResponse };
