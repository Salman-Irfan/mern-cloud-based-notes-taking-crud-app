import React, { useState } from "react";

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "", });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // api call to login
        const {name, email,password} = credentials; // destructuring credentials
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // redirect
            localStorage.setItem("token", json.authtoken);
            window.location.href = "/login";
            props.showAlert("Account Created Successfully", "success")
        } else {
            props.showAlert("Invalid credentials", "danger")
        }
    };
    
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    return (
        <div className="container mt-3">
            <h2>Create an account to use Notes App</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label
                        htmlFor="name"
                        className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="name"
                        aria-describedby="emailHelp"
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="email"
                        className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="email"
                        aria-describedby="emailHelp"
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="password"
                        className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="password"
                        onChange={onChange}
                        minLength={5}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="cpassword"
                        className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="cpassword"
                        name="cpassword"
                        placeholder="confirm password"
                        onChange={onChange}
                        minLength={5}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Signup;
