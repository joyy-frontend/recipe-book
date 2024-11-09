import { useNavigate } from "react-router-dom";
import Formcomponent from "../components/Formcomponent";
import "../Custom.css";

export default function Register({ user, userChange, addUser }) {
    const navigate = useNavigate();
    
    const RegisterForm = 
        {inputs: [
            { type: 'text', name: 'fname', placeholder: 'First name', value: user.fname, changeFunc: userChange, icon: 'fa-feather' },
            { type: 'text', name: 'lname', placeholder: 'Last name', value: user.lname, changeFunc: userChange, icon: 'fa-feather'},
            { type: 'text', name: 'username', placeholder: 'User name', value: user.username, changeFunc: userChange, icon: 'fa-user' },
            { type: 'email', name: 'email', placeholder: 'Email', value: user.email, changeFunc: userChange, icon: 'fa-envelope' }, 
            { type: 'password', name: 'password', placeholder: 'Password', value: user.password, changeFunc: userChange, icon: 'fa-lock' }
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
            <div className="login">
                <h1 className="title">Register</h1>
                <Formcomponent elements={RegisterForm} onSubmit={handleRegister} />
            </div>
        </>
    );
}
