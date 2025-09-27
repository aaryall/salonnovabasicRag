import 'dotenv/config';
import OpenAI from "openai";

const client = new OpenAI(); 

// Query Translation Step
async function queryTranslation(userQuery) {
  const prompt = `
    Translate the following user query into a clearer, retrieval-friendly format:
    User Query: "${userQuery}"
    Output only the improved query.`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a query reformulation assistant." },
      { role: "user", content: prompt }
    ]
  });

  return response.choices[0].message.content.trim();
}


// Query Evaluater Step
// async function queryEvaluater(originalQuery, SystemPrompt,oldResponse) {
//   const prompt = `
//     Evaluate this response ${oldResponse} based on ${originalQuery} and score it from 1 to 100 %
//     how much would you score this response.
//     Format your response add For example- Score:80%
//     `;

//   const response = await client.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//       { role: "system", content: SystemPrompt },
//       { role: "user", content: originalQuery }
//     ]
//   });

//   return response.choices[0].message.content.trim();
// }

// Main retrieve Handler
async function retrieve(req, res) {
  const startTime = Date.now();

  try {
    const { faq, brandVoice, question } = req.body;

    // ✅ Await query translation
    const enhancedQuery = await queryTranslation(question);
    console.log('Enhanced Query ', enhancedQuery);
    const SYSTEM_PROMPT = `
      You are an AI assistant for Salon Nova. Answer user questions using ONLY the provided FAQ.
      
      Seed Data:
      FAQ (Knowledge Base)
      Q: What services do you offer?
      A: Haircuts, coloring, styling, and keratin treatments.
      Q: What are your hours?
      A: Mon–Fri 9am–6pm, Sat 10am–4pm, closed Sunday.
      Q: Do you accept walk-ins?
      A: We prefer appointments, but walk-ins are welcome if a stylist is free.
      Q: How can I book?
      A: Use our website or call 555-0148. We require a credit card to hold your slot.
      Q: Cancellation policy?
      A: Cancel or reschedule at least 12 hours in advance to avoid a $20 fee.

      FAQ Context:
      ${faq}

      Brand Voice Rules:
      ${JSON.stringify(brandVoice)}

      Instructions:
      1. Search through ALL FAQ entries/Seed Data for relevant information.
      2. If multiple FAQ entries are needed, combine them carefully and intelligently.  
      3. Track which FAQ topics you used (hours, walk-ins, booking, etc.).
      4. Apply brand voice formatting:
          i. Answer in the brand voice: ${brandVoice.tone}
          ii. Follow style rules: ${(brandVoice.style_rules || []).join(', ')}
          iii. End with: ${brandVoice.signoff}
          Notes:
          - Keep simple, short and accurate sentences.
          - Avoid jargon.
          - Add signoff.
      5. ONLY use information from the FAQ - no hallucination.

      Format your response as: [Answer] | SOURCES: [comma-separated keywords]

      Note:
      Do not answer anything other than Seed Data. Provide fallback: "Please contact us at 555-0148".
    `;

    // Final Answer Generation with Corrected Query
    const response = await client.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: enhancedQuery }
      ],
      max_tokens: 150,
      temperature: 0.1,
      stream: false
    });

    const fullResponse = response.choices[0].message.content;

    // Simple parsing to extract answer and sources
    const [answer, sourcesStr] = fullResponse.split(' | SOURCES: ');
    const sources = sourcesStr ? sourcesStr.split(', ') : [];

    //Added LLM as a Judge
    //const newResponse = await queryEvaluater(question,SYSTEM_PROMPT,answer);
    //console.log('New Response ', newResponse);
    res.status(200).json({
      enhancedQuery,
      answer: answer.trim(),
      sources,
      latencyMs: Date.now() - startTime
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}

export default retrieve;
