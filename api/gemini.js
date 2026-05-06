// api/gemini.js — Vercel Serverless Function
// Gemini API Proxy with CORS support

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question, language } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  // Language-specific system prompts
  const systemPrompts = {
    bn: `তুমি JARVIS, Abdur-এর ব্যক্তিগত AI সহায়ক। তুমি বাংলায় উত্তর দাও। 
    সংক্ষিপ্ত, সঠিক এবং সহজভাবে উত্তর দাও। যদি কোনো তথ্য নিশ্চিত না হও, তাহলে সত্যি কথা বলো।
    বর্তমান সময়ের তথ্য (IPL, weather, Bitcoin, news) সঠিকভাবে দাও।`,

    hi: `आप JARVIS हैं, Abdur का व्यक्तिगत AI सहायक। आप हिंदी में जवाब दें।
    संक्षिप्त, सटीक और सरल तरीके से जवाब दें। यदि कोई जानकारी निश्चित नहीं है, तो सच बोलें।
    वर्तमान समय की जानकारी (IPL, weather, Bitcoin, news) सही दें।`,

    en: `You are JARVIS, Abdur's personal AI assistant. Answer in English.
    Be concise, accurate, and helpful. If unsure about any information, be honest.
    Provide accurate real-time information (IPL, weather, Bitcoin, news, current events).`
  };

  const prompt = systemPrompts[language] || systemPrompts.en;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${prompt}\n\nUser Question: ${question}\n\nPlease provide a helpful, accurate answer.`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
            topP: 0.8,
            topK: 40
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Gemini API error');
    }

    const data = await response.json();
    
    // Extract text from Gemini response
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                   'Sorry, I could not generate a response.';

    return res.status(200).json({ 
      answer: answer.trim(),
      source: 'gemini',
      language: language || 'en'
    });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to get response from Gemini',
      details: error.message 
    });
  }
}