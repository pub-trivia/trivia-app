import React from 'react';
import SignupForm from '../components/SignupForm';
import Button from '../components/Button';
import {Link } from "react-router-dom";
// import "../style.css";

const Signup = () => [
    <div>
        <SignupForm />
        <Link to="/">
        <Button type="button" text="Skip Sign Up" />
        </Link>
        <Link to="/login">
        <Button type="button" text="LOG IN" />
        </Link>
    </div>
]

export default Signup;