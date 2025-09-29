const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  res.json({ content: `AI 回應：你說的是「${message}」` });
});

app.listen(port, () => {
  console.log(`伺服器已啟動，http://localhost:${port}`);
});
