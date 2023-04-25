import React, { useState } from "react";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""});

    const handleSubmit = async (e) => {
        e.preventDefault();
        // api call to login
        
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json()
        console.log(json)
        if(json.success){
            // redirect
            localStorage.setItem("token", json.authtoken)
            window.location.href = "/"
            props.showAlert("Logged in Successfully", "success");
        }else{
            props.showAlert("Invalid Credentials", "danger");
        }
    };
    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className="mt-3">
            <h2>Login to continue to Notes App</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label
                        htmlFor="email"
                        className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        onChange={onChange}
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
                        name="password"
                        value={credentials.password}
                        className="form-control"
                        id="password"
                        onChange={onChange}
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

export default Login;
