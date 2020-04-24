import React from 'react';
import Header from "../components/Header";
import SignupForm from '../components/SignupForm';
import Button from '../components/Button';
import { Link } from "react-router-dom";
// import "../style.css";

const Signup = () => {
    return (
        <div id="home">
            <div className="row">
                <div className="col header">
                    <Header />
                </div>
                <div className="col">
                    <SignupForm />
                    <Link to="/">
                        <Button type="button" text="Skip Sign Up" />
                    </Link>
                    <Link to="/login">
                        <Button type="button" text="LOG IN" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Signup;
