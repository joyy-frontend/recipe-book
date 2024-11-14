import React, { Component } from "react";
import Formcomponent from "../components/Formcomponent";
import { withRouter } from "../utils/withRouterReplacement"; // 커스텀 withRouter 사용

class Login extends Component {
    constructor(props) {
        super(props);
        
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    handleLoginSubmit(e) {
        e.preventDefault();

        const { user, handleLogin, navigate } = this.props; // props에서 user, handleLogin, navigate 추출
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const loginUser = users.find(u => u.email === user.email && u.password === user.password);

        if (loginUser) {
            handleLogin(loginUser);
            navigate("/mypage");
        } else {
            alert("Invalid email or password.");
        }
    }

    render() {
        const { user, userChange } = this.props;

        const LoginForm = {
            inputs: [
                { type: 'email', name: 'email', placeholder: 'Email address', value: user.email, changeFunc: userChange, icon: 'fa-envelope' },
                { type: 'password', name: 'password', placeholder: 'Password', value: user.password, changeFunc: userChange, icon: 'fa-lock'}
            ],
            buttons: [{ type: 'submit', name: 'btn', label: 'login' }]
        };

        return (
            <div className="login">
                <h1 className="title">Login</h1>
                <Formcomponent elements={LoginForm} onSubmit={this.handleLoginSubmit} />
            </div>
        );
    }
}

export default withRouter(Login);
