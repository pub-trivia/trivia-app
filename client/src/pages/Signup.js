import React from 'react';
import SignupForm from '../components/SignupForm';
import Button from '../components/Button';
// import "../style.css";

const Signup = () => [
    <div>
        <SignupForm />
        <Button type="button" text="Skip Sign Up" />
        <Button type="button" text="LOG IN" />
    </div>
]

export default Signup;