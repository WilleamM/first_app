import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form"

// <Table characterData={characters}/> where characters is being passed to table as a prop
function MyApp() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetchUsers() 
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => { console.log(error); });
    }, [] );

    function fetchUsers() { // fetches all the data using the GET 
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    // Like with the GET request, we don't wait for our POST to come back, but return a promise which will be fulfilled when it does
    function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
        method: "POST", // default is GET
        headers: {
            "Content-Type": "application/json", // tells server that body contains JSON
        },
        body: JSON.stringify(person), // puts the persons data into the request & stringify to be able to send it
        });

    return promise;
    }    

    function removeOneCharacter(index){
        const updated = characters.filter((character, i) => {
            return i !== index ;
        });
        setCharacters(updated);
    }

    function updateList(person) { 
        postUser(person) // only updates the table if the post call is successful
        .then(() => setCharacters([...characters, person])) // do it with promise that its right
        .catch((error) => {
            console.log(error);
        })
    }

    return (
    <div className="container">
        <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList} />
    </div>
    );
}
export default MyApp;