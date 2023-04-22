import React, { useState } from "react";
import NoteContext from "./noteContext";
import { json } from "react-router-dom";

const NoteState = (props) => {
    const HOST = "http://localhost:5000";
    const noteId = "6442a562e3fdf0d1416ae711";
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
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MjllNjMzMjZkY2I1Zjg0MGE1MmM3In0sImlhdCI6MTY4MjA4NzYwN30.cG63iHNfclBTqI37fJzyvnz1_e0mHrtQZLZCzDNQHLs",
            },
            body: JSON.stringify({title, description, tag}),
        });
        const json = response.json();
        // logic
        const note = {
            _id: "6440c71eb052572057501431b",
            user: "6440c4abb05257205750140c",
            title: title,
            description: description,
            tag: tag,
            date: "2023-04-20T05:01:18.321Z",
            __v: 0,
        };

        setNotes([...notes, note]);
    };

    // get all notes
    const getNotes = async () => {
        console.log("adding a new note");
        // fetch all notes api call
        const response = await fetch(`${HOST}/api/notes/fetchallnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MjllNjMzMjZkY2I1Zjg0MGE1MmM3In0sImlhdCI6MTY4MjA4NzYwN30.cG63iHNfclBTqI37fJzyvnz1_e0mHrtQZLZCzDNQHLs",
            }
        });
        const json = await response.json();
        console.log(json)
        setNotes(json)
    };

    // delete a note
    const deleteNote = async(id) => {
        // todo api call
        const response = await fetch(`${HOST}/api/notes/deletenote/${noteId}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MjllNjMzMjZkY2I1Zjg0MGE1MmM3In0sImlhdCI6MTY4MjA4NzYwN30.cG63iHNfclBTqI37fJzyvnz1_e0mHrtQZLZCzDNQHLs",
            },
        });
        const json = response.json();
        console.log(json)
        // logic
        setNotes(notes.filter((note) => note._id !== id));
    };

    // edit a note
    const editNote = async (id, title, description, tag) => {
        // api call
        const response = await fetch(`${HOST}/api/notes/updatenote/${noteId}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MjllNjMzMjZkY2I1Zjg0MGE1MmM3In0sImlhdCI6MTY4MjA4NzYwN30.cG63iHNfclBTqI37fJzyvnz1_e0mHrtQZLZCzDNQHLs",
            },
            body: JSON.stringify({title, description, tag}),
        });
        const json = response.json();
        // logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }
        }
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
