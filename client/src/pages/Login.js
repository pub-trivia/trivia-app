import React from 'react';
import {Link } from "react-router-dom";
import LoginForm from '../components/LoginForm';
import Button from '../components/Button';
// import "../style.css";

const Login = () => [
    <div>
        <LoginForm />
        <Link to="/">
        <Button type="button" text="Skip Log In" />
        </Link>
        <Link to="/signup">
        <Button type="button" text="SIGN UP" />
        </Link>
    </div>
]

export default Login;