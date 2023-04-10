// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

// Set up app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Set up database connection
mongoose.connect('mongodb://localhost:3000/gasleakage', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define gas leakage schema
const gasLeakageSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isLeakage: {
    type: Boolean,
    default: false,
  },
});

// Create gas leakage model
const GasLeakage = mongoose.model('GasLeakage', gasLeakageSchema);

// Set up gas sensor listener
const sensor = require('node-dht-sensor');
const pin = 4;

setInterval(() => {
  sensor.read(22, pin, (err, temperature, humidity) => {
    if (!err && temperature > 30) {
      // Gas leakage detected
      const gasLeakage = new GasLeakage({
        isLeakage: true,
      });
      gasLeakage.save();

      // Send email notification
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'pallvi4824.be21@gmail.com',
          pass: 'password',
        },
      });
      const mailOptions = {
        from: 'pallvi4824.be21@gmail.com',
        to: 'recipientemail@gmail.com',
        subject: 'Gas Leakage Detected',
        text: 'Gas leakage has been detected. Please take immediate action.',
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } else {
      // No gas leakage detected
      const gasLeakage = new GasLeakage({
        isLeakage: false,
      });
      gasLeakage.save();
    }
  });
}, 1000);

// Start app
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
