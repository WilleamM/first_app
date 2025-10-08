import express from "express";
import cors from "cors";
// npx nodemon backend.js
const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());


const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac",     job: "Bouncer" },
    { id: "ppp222", name: "Mac",     job: "Professor" },
    { id: "yat999", name: "Dee",     job: "Aspring actress" },
    { id: "zap555", name: "Dennis",  job: "Bartender" }
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
const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => user["name"] === name && user["job"] === job
    );
};

// sends users list, if name/job is req, then looks for user with that name
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined) {
        let result = findUserByNameAndJob(name, job);
        result = {users_list: result}; // setting result to json grabbing user data with that name
        res.send(result);
    }
    if (name != undefined){
      let result = findUserByName(name);
      result = {users_list: result};
      res.send(result);
    }
    res.send(users);
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

const addUser = (user) => {
  users["users_list"].push(user); // add the new user to the end of the array
  return user;
}

app.post("/users", (req, res) => {
  const userToAdd = req.body; // the incoming data
  addUser(userToAdd);
  res.send();
});


const deleteUserById = (id) => {
  const current_id = users["users_list"].findIndex((u) => u["id"] === id)
  if (current_id === -1) return false;
  users["users_list"].splice(current_id, 1);
  return true;
};

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const deleted = deleteUserById(id);
  if (!deleted){
    res.status(404).send("Resource not found");
  }else{
    return res.send("User deleted!");
  }
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});