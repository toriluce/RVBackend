const express = require('express');

const app = express();

app.get("/ping", function(req, res) {
    res.json({
        message: "ping works"});
  });

  app.listen(3001)