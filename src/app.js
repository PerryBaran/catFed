const express = require('express');
const { Cat } = require('./models');

const app = express();

app.use(express.json());

app.post('/cats', async (req, res) => {
  try {
    const cat = await Cat.create(req.body);
    res.status(201).json(cat);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get('/cats', async (req, res) => {
  try {
    const cats = await Cat.findAll({ where: req.query });
    res.status(200).json(cats);
  } catch (err) {
    res.status(400).json(err);
  } 
});

app.get('/cats/:catId', async (req, res) => {
  try {
    const cat = await Cat.findByPk(req.params.catId);
    res.status(200).json(cat);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.patch('/cats/:catId', async (req, res) => {
  try {
    await Cat.update(req.body, { where: { id: req.params.catId } });
    res.status(200).send();
  } catch (err) {
    res.status(400).json(err);
  }
});

app.delete('/cats/:catId', async (req, res) => {
  try {
    await Cat.destroy({ where: { id: req.params.catId } });
    res.status(200).send();
  } catch (err) {
    res.status(400).json(err);
  }
});

app.patch('/feed/:catId', async (req, res) => {
  try {
    const affected = await Cat.update({ lastFed: new Date()}, { where: { id: req.params.catId } });
    if (!affected[0]) {
      res.status(404).send()
    } else {
      res.status(200).json(affected);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = app;