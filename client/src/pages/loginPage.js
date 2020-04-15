import React from 'react';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
// import "../style.css";

const LoginPage = () => [
    <div>
        <Navbar />
        <LoginForm />
        <Button type="button" text="Skip Log In" />
        <Button type="button" text="SIGN UP" />
    </div>
]

export default LoginPage;