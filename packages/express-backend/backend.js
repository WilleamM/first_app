import express from "express";

const app = express();
const port = 8000;
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

// api endpoint
// .get has 2 parameters:
    // 1. URL pattern that the end point will use
    // 2. Call back function that will be used when we get a call for this endpoint
app.get("/", (req, res) => {
    // req is what we were given
    // res is what we will send back
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    res.send(users);
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});