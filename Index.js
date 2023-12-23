const express = require('express');
const cors =require('cors')
require('dotenv').config();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 6001;

// middleware

  
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Set up your email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'zihaduslam613@gmail.com',
                pass: 'xowzcczfdxwujdnl',
            },
        });

        // Email content
        const info = await transporter.sendMail({
            from: '{name},<{email}>',
            to: 'zihaduslam613@gmail.com',
            subject: 'New Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        });

        console.log('message Sent:', info.messageId);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

  
  
  

app.get('/',(req,res)=>{
    res.send('portfolio is running')
})
app.listen(port,()=>{
    console.log(`app is running ${port}`)
})
