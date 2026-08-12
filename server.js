const express = require('express');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Serving at http://localhost:${PORT}`);
});