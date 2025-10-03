import express from "express";
// npx nodemon backend.js
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

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

// sends users list, if name is req, then looks for user with that name
app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
        let result = findUserByName(name);
        result = {user_list: result}; // setting result to json grabbing user data with that name
        res.send(result);
    }else {
        res.send(users);
    }
})


// find user with specific id
const findUserById = (id) => 
    // .find instead of filter because there is only one unique id we're looking for
    users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    let result = findUserById(id);
    if (result == undefined){
        res.status(404).send("Resource not found");
    } else {
        res.send(result);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});