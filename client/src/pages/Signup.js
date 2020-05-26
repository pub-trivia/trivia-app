import React from 'react';
import Header from "../components/Header";
import SignupForm from '../components/SignupForm';
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
                    <div className="bottom-links">
                        <Link to="/login">
                            <div>LOG IN</div>
                        </Link>
                        <Link to="/">
                            <div>Skip Sign Up</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;
