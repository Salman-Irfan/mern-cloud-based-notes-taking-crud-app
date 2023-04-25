import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const [note, setNote] = useState({title: "", description: "", tag:""})
    const context = useContext(noteContext);
    const { addNote } = context; // destructuring

    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Addeded Successfully", "success");
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
                            value={note.title}
                            placeholder="Enter title"
                            onChange={onChange}
                            minLength={5}
                            required
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
                            value={note.description}
                            placeholder="Enter description"
                            onChange={onChange}
                            minLength={5}
                            required
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
                            value={note.tag}
                            placeholder="Enter tag name"
                            onChange={onChange}
                            minLength={5}
                            required
                        />
                    </div>

                    <button
                        disabled={
                            note.title.length < 5 || note.description.length < 5
                        }
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
