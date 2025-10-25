const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Servir HTML y JS

const DATA_FILE = path.join(__dirname, 'data.json');
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');

const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const writeData = data => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

app.get('/api/items', (req, res) => res.json(readData()));

app.post('/api/items', (req, res) => {
  const data = readData();
  const newItem = { id: Date.now(), ...req.body };
  data.push(newItem);
  writeData(data);
  res.json(newItem);
});

app.delete('/api/items/:id', (req, res) => {
  let data = readData();
  data = data.filter(item => item.id != req.params.id);
  writeData(data);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
