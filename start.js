// http server

const express = require('express');
const path = require('path');
const app = express();
const {exec} = require('child_process')
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/close', (req,res) => {
    exec('pkill chromium', (err) => {
        if (err) throw err
    })
})
app.listen(9000);