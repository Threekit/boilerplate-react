import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer';
import dotenv from 'dotenv';
import connection from '../threekit/connection';
import api from '../threekit/api';
import paths from '../config/paths';
import axios from 'axios';
import twilio from 'twilio';

//  ENV VARIABLES SETUP
dotenv.config();
const argv = process.argv.slice(2);
const portIdx =
  argv.indexOf('--port') !== -1 ? argv.indexOf('--port') : argv.indexOf('-p');

const PORT = process.env.PORT || (portIdx > 0 ? argv[portIdx + 1] : 5000);
const EMAIL_TEMPLATE_ID = process.env.EMAIL_TEMPLATE_ID;
const EMAIL_API_KEY = process.env.EMAIL_API_KEY;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM_PHONE_NUMBER = process.env.TWILIO_FROM_PHONE_NUMBER;

const threekitConfig = {
  authToken: process.env.THREEKIT_PRIVATE_TOKEN,
  orgId: process.env.THREEKIT_PRIVATE_TOKEN,
  assetId: process.env.THREEKIT_ASSET_ID,
  threekitEnv: process.env.THREEKIT_ENV,
};

connection.connect(threekitConfig);
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

app.get('/api/health', (req, res) => {
  res.status(200).send({ message: 'server healthy!' });
});

app.post('/api/snapshot', upload.single('files'), async (req, res) => {
  const file = req.file;
  const [response, error] = await api.files.save(file);
  if (error) {
    console.log(error.config);
    res.status(500).send(error);
    return;
  }

  const output = {
    ...response.files[0],
    url: `https://${threekitConfig.threekitEnv}/api/files/${response.files[0].id}/content`,
  };

  res.status(200).send(output);
});

app.post('/api/email', async (req, res) => {
  const data = req.body;

  const message = {
    template_id: data.templateId || EMAIL_TEMPLATE_ID,
    from: { email: data.from || 'asaeed@threekit.com' },
    personalizations: [
      {
        to: [
          {
            email: data.email,
          },
        ],
        dynamic_template_data: data,
      },
    ],
  };

  try {
    const emailResponse = await axios.post(
      'https://api.sendgrid.com/v3/mail/send',
      message,
      {
        headers: {
          Authorization: `Bearer ${EMAIL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.status(200).send(emailResponse.data);
  } catch (e) {
    console.log(e);
    res.status(200).send(e);
  }
});

app.post('/api/sms', async (req, res) => {
  const { to, message } = req.body;

  if (!to.length || !message.length)
    return res.status(422).json({ message: 'incomplete request data' });

  const data = {
    from: TWILIO_FROM_PHONE_NUMBER,
    to,
    body: message,
  };

  try {
    const smsResponse = await client.messages.create(data);
    res.status(200).send(smsResponse);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

app.use(express.static(paths.appBuild));
app.get('*', (req, res) => {
  res.sendFile(paths.appBuild);
});

app.listen(PORT, () => console.log('listening on port: ', PORT));
