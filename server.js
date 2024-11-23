const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

require('dotenv').config();

app.use(express.json());

app.get('/data', (req, res) => {
    return res.send('<h1>Some test data</h1>')
})

app.post('/send-email', async (req, res) => {
    const { subject, message } = req.body;


    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_NAME,
            to: 'yuriev200@gmail.com',
            subject: subject,
            text: message
        });
        res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
        res.status(500).send({ "error": error });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
