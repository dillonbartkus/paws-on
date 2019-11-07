const express = require('express');
const app = express();
const port = process.env.HTTP_PORT || 8080;
const cors = require('cors')
const parser = require('body-parser');

app.use(cors())
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send(`server`)
})

const routes = require('./routes')
app.use('/', routes)

app.listen(port, () => {  
  console.log(`Listening on ${port}`)
})