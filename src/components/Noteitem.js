import React from "react";

const Noteitem = (props) => {
    const { note } = props;
    return (
        <div className="col-md-3 mx-4  ">
            <div
                className="card my-3 mx-4"
                style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                        {note.tag}
                    </h6>
                    <p className="card-text">{note.description}</p>
                    <p className="card-link">{note.date}</p>
                </div>
            </div>
        </div>
    );
};

export default Noteitem;
