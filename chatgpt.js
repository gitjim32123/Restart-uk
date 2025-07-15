const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { prompt } = req.body;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a compassionate assistant helping a person in crisis in the UK find shelter, food, and emotional support. Be warm, non-judgmental, and practical.' },
        { role: 'user', content: prompt }
      ]
    })
  });

  const data = await response.json();
  res.status(200).json({ message: data.choices?.[0]?.message?.content || 'Sorry, I could not process that.' });
};
