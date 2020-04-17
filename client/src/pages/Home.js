import React from 'react';
import JoinForm from "../components/JoinForm";
import Button from '../components/Button';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
          <Link to="/login">
            <Button type="button" text="LOG IN" />
          </Link>
          <Link to="/signup"> 
            <Button type="button" text="SIGN UP" />
          </Link>
          <h2>OR Play Now...</h2>
          <JoinForm />
        </div>
      );
}

export default Home;
