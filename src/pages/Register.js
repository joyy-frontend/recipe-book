import { useNavigate } from "react-router-dom";
import Formcomponent from "../components/Formcomponent";

export default function Register({ user, userChange, addUser }) {
    const navigate = useNavigate();
    
    const RegisterForm = 
        {inputs: [
            { type: 'text', name: 'fname', placeholder: 'Enter your first name', value: user.fname, changeFunc: userChange },
            { type: 'text', name: 'lname', placeholder: 'Enter your last name', value: user.lname, changeFunc: userChange },
            { type: 'text', name: 'username', placeholder: 'Enter your user name', value: user.username, changeFunc: userChange },
            { type: 'email', name: 'email', placeholder: 'Enter your email', value: user.email, changeFunc: userChange }, 
            { type: 'password', name: 'password', placeholder: 'Enter your password', value: user.password, changeFunc: userChange }
        ],
        buttons: [{ type: 'submit', name: 'btn', label: 'Sign up' }]
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (user.fname && user.lname && user.email && user.username && user.password) {
            addUser(user); // Add user to the users array in App.js
            navigate("/login");
        } else {
            alert("Please fill out the form");
        }
    };

    return (
        <>
            <h1>Register</h1>
            <Formcomponent elements={RegisterForm} onSubmit={handleRegister} />
        </>
    );
}
