# Survey Insight Hub

A full-stack web application for survey creation, response collection, and automated sentiment analytics.

## Features
- User authentication (signup/login)
- Submit survey responses with sentiment analysis (OpenAI)
- Clean modular backend (Node.js, Express, Firestore)
- Simple React frontend

## Structure
- `/survey_insight_hub_backend` — backend API and database
- `/survey_insight_hub_frontend` — React frontend

## Quick Start

1. **Backend**
    - `cd survey_insight_hub_backend`
    - `npm install`
    - Add your `.env` with `OPENAI_API_KEY` and `JWT_SECRET`
    - `node index.js`
2. **Frontend**
    - `cd survey_insight_hub_frontend`
    - `npm install`
    - `npm start`

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Author

Akzhol Abdinazarov, 2025
