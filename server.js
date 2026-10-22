const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// الرابط اللي الموقع ديالك غادي يصيفط ليه السؤال
app.post('/api/ask', async (req, res) => {
    const { question } = req.body;
    const apiKey = "مفتاح_الـ_api_ديالك_هنا"; // كيتخبى هنا فالسيرفر للسلامة

    try {
        // الاتصال بـ Google Gemini API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: question }] }]
            })
        });

        const data = await response.json();
        const aiAnswer = data.candidates[0].content.parts[0].text;

        // إرجاع الجواب للموقع
        res.json({ answer: aiAnswer });
    } catch (error) {
        res.status(500).json({ error: 'وقع خطأ في الاتصال بالذكاء الاصطناعي' });
    }
});

app.listen(3000, () => console.log('السيرفر خدام في البورت 3000'));
