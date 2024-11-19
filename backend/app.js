express = require("express");
jwt = require("jsonwebtoken");

app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the page",
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secret", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created",
        authData,
      });
    }
  });

 
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "brad",
    email: "zemenu@gmail.com",
  };

  jwt.sign({ user }, "secret", (err, token) => {
    res.json({
      token: token,
    });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader == "undefined") {
    return res.sendStatus(403);
  }

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  req.token = bearerToken;
  next();
}

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
