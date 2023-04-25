import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = (props) => {
    const context = useContext(noteContext);

    const { notes, getNotes, editNote } = context; // destructuring

    useEffect(() => {
        if(localStorage.getItem('token')){ // if user has login token, see notes
            getNotes();
        }else{ // redirect to login
            window.location.href = "/login";
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: "",
    });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag,
        });
    };

    const handleUpdateNote = (e) => {
        console.log("updating the note", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Updated Successfully", "success");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };
    return (
        <>
            <AddNote showAlert={props.showAlert} />
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
                                            minLength={5}
                                            required
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
                                            id="etag"
                                            name="etag"
                                            placeholder="Update tag name"
                                            value={note.etag}
                                            onChange={onChange}
                                            minLength={5}
                                            required
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    ref={refClose}
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button
                                    disabled={ note.etitle.length < 5 || note.edescription.length < 5 }
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleUpdateNote}>
                                    Update Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2">
                    {notes.length === 0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return (
                        <Noteitem
                            key={note._id}
                            updateNote={updateNote}
                            note={note}
                            showAlert={props.showAlert}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Notes;
