const express = require('express');
const app = express();
const port = 3000;

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  // res.send('Hello App Runner App Runner!');
  res.sendFile(__dirname + '/public/index.html');
  // res.sendFile('/index.html');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
