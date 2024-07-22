const express = require("express");

const path = require("path");

const PORT = 3000;

const app = express();

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(express.urlencoded({ extended: true }));

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
  {
    text: "Good morning!",
    user: "Alice",
    added: new Date(),
  },
  {
    text: "How's everyone?",
    user: "Bob",
    added: new Date(),
  },
  {
    text: "What's new?",
    user: "Diana",
    added: new Date(),
  },
  {
    text: "Nice to meet you all!",
    user: "Eve",
    added: new Date(),
  },
  {
    text: "Welcome!",
    user: "Frank",
    added: new Date(),
  },
  {
    text: "Have a great day!",
    user: "Grace",
    added: new Date(),
  },
  {
    text: "Greetings!",
    user: "Hank",
    added: new Date(),
  },
  {
    text: "Hey there!",
    user: "Ivy",
    added: new Date(),
  },
];

// router to get the list of messages
app.get("/", (req, res, next) => {
  res.render("index", { title: "Mini Message", messages: messages });
});

//route to get the message adding form
app.get("/new", (req, res, next) => {
  res.render("new");
});

// details route

app.get("/detail/:name", (req, res, next) => {
  const message = messages.filter((message) => {
    return (message.user = req.params.name);
  })[0];

  res.render("detail", { message: message });
});

// route to add a new message
app.post("/new", (req, res, next) => {
  const user = req.body.user;
  const text = req.body.text;
  messages.push({ text: text, user: user, added: new Date() });

  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
