const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3010;

app.use(express.static(__dirname));

app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Production server listening at http://localhost:${port}`);
});
