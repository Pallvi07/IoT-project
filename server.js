const express = require('express');
const mongoose = require('mongoose');
const Light = require('./models/Light');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/lights', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/api/lights', async (req, res) => {
  const lights = await Light.find();
  res.json(lights);
});

app.patch('/api/lights/:id', async (req, res) => {
  const { id } = req.params;
  const { state} = req.body;
  const light = await Light.findByIdAndUpdate(
    id,
    {
      state
    },
    { new: true }
  );
  res.json(light);
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
