import React from 'react';
import { Link } from "react-router-dom";
import Header from "../components/Header";
import LoginForm from '../components/LoginForm';
import Button from '../components/Button';
// import "../style.css";

const Login = () => {
    return (
        <div id="home">
            <div className="row">
                <div className="col header">
                    <Header />
                </div>
                <div className="col">
                    <LoginForm />
                    <Link to="/">
                        <Button type="button" text="Skip Log In" />
                    </Link>
                    <Link to="/signup">
                        <Button type="button" text="SIGN UP" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
