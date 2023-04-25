import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const HOST = "http://localhost:5000";
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    // add a note
    const addNote = async (title, description, tag) => {
        console.log("adding a new note");
        // api call
        const response = await fetch(`${HOST}/api/notes/addnote`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}),
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    };

    // get all notes
    const getNotes = async () => {
        console.log("adding a new note");
        // fetch all notes api call
        const response = await fetch(`${HOST}/api/notes/fetchallnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
        });
        const json = await response.json();
        console.log(json)
        setNotes(json)
    };

    // delete a note
    const deleteNote = async(id) => {
        // todo api call
        const response = await fetch(`${HOST}/api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
        });
        const json = await response.json();
        console.log(json)
        // logic
        setNotes(notes.filter((note) => note._id !== id));
    };

    // edit a note
    const editNote = async (id, title, description, tag) => {
        // api call
        const response = await fetch(`${HOST}/api/notes/updatenote/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));
        // logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        console.log(newNotes);
        setNotes(newNotes);
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
