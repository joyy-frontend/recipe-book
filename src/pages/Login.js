import Formcomponent from "../components/Formcomponent";
import { useNavigate } from "react-router-dom";

export default function Login({ user, userChange, handleLogin }) {
    const navigate = useNavigate();

    const LoginForm = {
        inputs: [
            { type: 'email', name: 'email', placeholder: 'Email address', value: user.email, changeFunc: userChange, icon: 'fa-envelope' },
            { type: 'password', name: 'password', placeholder: 'Password', value: user.password, changeFunc: userChange, icon: 'fa-lock'}
        ],
        buttons: [{ type: 'submit', name: 'btn', label: 'login' }]
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const loginUser = users.find(u => u.email === user.email && u.password === user.password);

        if (loginUser) {
            handleLogin(loginUser);
            navigate("/mypage");
        } else {
            alert("Invalid email or password.");
        }
    };

    return (
        <>
            <div className="login">
                <h1 className="title">Login</h1>
                <Formcomponent elements={LoginForm} onSubmit={handleLoginSubmit} />
            </div>
        </>
    );
}
