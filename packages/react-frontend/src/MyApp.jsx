import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form"

// <Table characterData={characters}/> where characters is being passed to table as a prop
function MyApp() {
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index){
        const updated = characters.filter((character, i) => {
            return i !== index ;
        });
        setCharacters(updated);
    }

    return (
    <div className="container">
        <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
        />
        <Form />
    </div>
    );
}
export default MyApp;