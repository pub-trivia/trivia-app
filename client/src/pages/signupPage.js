import React from 'react';
import SignupForm from '../components/SignupForm';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
// import "../style.css";

const SignupPage = () => [
    <div>
        <Navbar />
        <SignupForm />
        <Button type="button" text="Skip Sign Up" />
        <Button type="button" text="LOG IN" />
    </div>
]

export default SignupPage;