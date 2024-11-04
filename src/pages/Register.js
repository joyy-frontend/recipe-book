import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        if (firstName && lastName && email && username && password) {
            const newUser = { firstName, lastName, email, username, password };
            
            localStorage.setItem("user", JSON.stringify(newUser));

            alert("Signed up successfully!");
            navigate("/login");
        } else {
            alert("Please fill out the form");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}
