import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
    const context = useContext(noteContext);

    const { notes, getNotes } = context; // destructuring

    useEffect(() => {
        getNotes();
    }, []);
    
    const ref = useRef(null);
    
    const [note, setNote] = useState({etitle: "", edescription: "", etag:""})
    
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    };

    const handleUpdateNote = (e) => {
        console.log('updating the note', note)
        e.preventDefault();
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };
    return (
        <>
            <AddNote />
            {/* Button trigger modal */}
            <button
                ref={ref}
                type="button"
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                Update Note
            </button>

            <div>
                {/* Modal */}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1
                                    className="modal-title fs-5"
                                    id="exampleModalLabel">
                                    Edit Note
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                {/* form */}
                                <form className="my-3">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="etitle"
                                            className="form-label">
                                            <strong>Title</strong>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="etitle"
                                            aria-describedby="emailHelp"
                                            name="etitle"
                                            placeholder="Update title"
                                            value={note.etitle}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="edescription"
                                            className="form-label">
                                            <strong>Description</strong>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="edescription"
                                            name="edescription"
                                            placeholder="Update description"
                                            value={note.edescription}
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
                                            id="etag"
                                            name="etag"
                                            placeholder="Update tag name"
                                            value={note.etag}
                                            onChange={onChange}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleUpdateNote}
                                >
                                    Update Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return (
                        <Noteitem
                            key={note._id}
                            updateNote={updateNote}
                            note={note}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Notes;
