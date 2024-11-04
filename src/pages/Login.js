import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const getUserInfo = JSON.parse(localStorage.getItem("user"));

        if (!getUserInfo) {
            alert("Not valid user. Please register first");
            navigate("/register");
            return;
        }

        if (username === getUserInfo.username && password === getUserInfo.password) {
            const userInfo = { username: getUserInfo.username };
            onLogin(userInfo); // Set login state in App
            navigate("/mypage");
        } else {
            alert("Invalid username or password");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}
