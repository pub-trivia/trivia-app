import React from 'react';
import JoinForm from "../components/JoinForm";
import Button from '../components/Button';
import {Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
          <Link to="/login">
          <Button type="button" text="LOG IN" path="/login" />
          </Link>
          <Link to="/signup"> 
          <Button type="button" text="SIGN UP" path="/signup" />
          </Link>
          <h2>OR Play Now...</h2>
          <JoinForm />
        </div>
      );
}

export default Home;