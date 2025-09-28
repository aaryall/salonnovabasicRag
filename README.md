
# Salon Nova – Smart FAQ Assistant
Links: [Visit Page](https://salonnova.vercel.app/)

## 🚀 Features
- GPT-mini for query Enhancement
- GPT-4o Turbo responds using only FAQ + seed data
- Tone, style rules, and signoff applied automatically.
- React SPA with FAQ toggle, brand voice, and question input.


## 📖API Reference

#### POST generate response

POST /api/generate

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `faq` | `string` | faq user selected |
| `brandVoice` | `string` | tone and signoff |
| `question` | `string` | User query |


#### retrieve(req,res)
Enahance user query and generate proper response.




## 🚀 Deployment & Run

Hosted this on Vercel


### How to run 
```bash
  npm start
```


## 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your .env file


| API Key | Value     | 
| :-------- | :------- | 
| `OPENAI_API_KEY` | `your_api_key` | 


## 🧪 Unit Test
Go to live link - [Visit Page](https://salonnova.vercel.app/)
### How to test 

#### Example Question:
- Are you open on Saturdays, and can I come without an appointment?
#### ✅ Expected Output:

- Yes, we’re open Saturdays 10–4. Walk-ins are welcome if a stylist is free. Booking is recommended. — Salon Nova
Sources: ["hours", "walk-ins"]

