const express = require('express');

const app = express();

app.get("/ping", function(req, res) {
    res.json({
        message: "ping works"});
  });

const port = 3001;

app.listen(port);