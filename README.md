
# Salon Nova – Smart FAQ Assistant
Links: [Visit Page](https://salonnova.vercel.app/)

## 🚀 Features
```http
-**Query Enhancement**: GPT-mini for query Enhancement.
-**Grounded Answers**: GPT-4o Turbo responds using only FAQ + seed data.
-**Brand Voice Application**: Tone, style rules, and signoff applied automatically.
-**Simple UI**: React SPA with FAQ toggle, brand voice, and question input.
```


## 📖API Reference

#### POST generate response

```http
  POST /api/generate
```

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
```http
Are you open on Saturdays, and can I come without an appointment?
```
#### ✅ Expected Output:

```http
Yes, we’re open Saturdays 10–4. Walk-ins are welcome if a stylist is free. Booking is recommended. — Salon Nova
Sources: ["hours", "walk-ins"]
````

## Trade Offs/Gaps

```http

1. Using two LLMs → better accuracy but higher latency
2. No vector embeddings → limited retrieval capability

```
