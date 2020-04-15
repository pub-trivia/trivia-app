import React from 'react';
import LoginForm from '../components/LoginForm';
import Button from '../components/Button';
// import "../style.css";

const Login = () => [
    <div>
        <LoginForm />
        <Button type="button" text="Skip Log In" />
        <Button type="button" text="SIGN UP" />
    </div>
]

export default Login;