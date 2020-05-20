import React from 'react';
import { Link } from "react-router-dom";
import Header from "../components/Header";
import LoginForm from '../components/LoginForm';

const Login = () => {
    return (
        <div id="home">
            <div className="row">
                <div className="col header">
                    <Header />
                </div>
                <div className="col">
                    <LoginForm />
                    <div className="bottom-links">
                        <Link to="/signup">
                            <div>SIGN UP</div>
                        </Link>
                        <Link to="/">
                            <div>Skip Log In</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
