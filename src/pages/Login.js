import Formcomponent from "../components/Formcomponent";
import { useNavigate } from "react-router-dom";

export default function Login({ user, userChange, handleLogin }) {
    const navigate = useNavigate();

    const LoginForm = {
        inputs: [
            { type: 'email', name: 'email', placeholder: 'Enter your email', value: user.email, changeFunc: userChange },
            { type: 'password', name: 'password', placeholder: 'Enter your password', value: user.password, changeFunc: userChange }
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
            <h1>Login</h1>
            <Formcomponent elements={LoginForm} onSubmit={handleLoginSubmit} />
        </>
    );
}
