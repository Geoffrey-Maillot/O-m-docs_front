const express = require('express');

const router = express.Router();
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);
app.listen(5000, () => console.log('Server Running'));

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'omedocs11@gmail.com',
    pass: '',
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  }
  else {
    console.log('Ready to Send');
  }
});

router.post('/contact', (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { message } = req.body;
  const mail = {
    from: name,
    to: 'omedocs11@gmail.com',
    subject: 'Contact Form Submission',
    html: `<p>Votre nom: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: 'ERROR' });
    }
    else {
      res.json({ status: 'Message envoyé' });
    }
  });
});
