import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
    const [note, setNote] = useState({title: "", description: "", tag:"default"})
    const context = useContext(noteContext);
    const { addNote } = context; // destructuring

    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }
    return (
        <>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className="my-3">
                    <div className="mb-3">
                        <label
                            htmlFor="title"
                            className="form-label">
                            <strong>Title</strong>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            aria-describedby="emailHelp"
                            name="title"
                            placeholder="Enter title"
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="description"
                            className="form-label">
                            <strong>Description</strong>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            placeholder="Enter description"
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="tag"
                            className="form-label">
                            <strong>Tag</strong>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="tag"
                            name="tag"
                            placeholder="Enter tag name"
                            onChange={onChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleAddNote}>
                        Add Note
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddNote;
