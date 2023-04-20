import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            _id: "6440c6eeb052572057501417",
            user: "6440c4abb05257205750140c",
            title: "this is title 1",
            description: "this is description 1",
            tag: "General",
            date: "2023-04-20T05:00:30.984Z",
            __v: 0,
        },
        {
            _id: "6440c706b052572057501419",
            user: "6440c4abb05257205750140c",
            title: "this is title 2",
            description: "this is description 2",
            tag: "tag 2",
            date: "2023-04-20T05:00:54.199Z",
            __v: 0,
        },
        {
            _id: "6440c71eb05257205750141b",
            user: "6440c4abb05257205750140c",
            title: "this is title 3",
            description: "this is description 3",
            tag: "tag 3",
            date: "2023-04-20T05:01:18.321Z",
            __v: 0,
        },
        {
            _id: "6440c6eeb052572057501417",
            user: "6440c4abb05257205750140c",
            title: "this is title 1",
            description: "this is description 1",
            tag: "General",
            date: "2023-04-20T05:00:30.984Z",
            __v: 0,
        },
        {
            _id: "6440c706b052572057501419",
            user: "6440c4abb05257205750140c",
            title: "this is title 2",
            description: "this is description 2",
            tag: "tag 2",
            date: "2023-04-20T05:00:54.199Z",
            __v: 0,
        },
        {
            _id: "6440c71eb05257205750141b",
            user: "6440c4abb05257205750140c",
            title: "this is title 3",
            description: "this is description 3",
            tag: "tag 3",
            date: "2023-04-20T05:01:18.321Z",
            __v: 0,
        },
        {
            _id: "6440c6eeb052572057501417",
            user: "6440c4abb05257205750140c",
            title: "this is title 1",
            description: "this is description 1",
            tag: "General",
            date: "2023-04-20T05:00:30.984Z",
            __v: 0,
        },
        {
            _id: "6440c706b052572057501419",
            user: "6440c4abb05257205750140c",
            title: "this is title 2",
            description: "this is description 2",
            tag: "tag 2",
            date: "2023-04-20T05:00:54.199Z",
            __v: 0,
        },
        {
            _id: "6440c71eb05257205750141b",
            user: "6440c4abb05257205750140c",
            title: "this is title 3",
            description: "this is description 3",
            tag: "tag 3",
            date: "2023-04-20T05:01:18.321Z",
            __v: 0,
        },
    ];
    const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
