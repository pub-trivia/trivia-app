import React from 'react';
import JoinForm from "../components/JoinForm";
import Header from "../components/Header";
import Button from '../components/Button';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id="home">
      <div className="row">
        <div className="col header">
          <Header />
        </div>
        <div className="col">
          <Link to="/login">
            <Button type="button" text="LOG IN" />
          </Link>
          <Link to="/signup">
            <Button type="button" text="SIGN UP" />
          </Link>
          <h2>OR Play Now...</h2>
          <JoinForm />
        </div>
      </div>
    </div>
  );
}

export default Home;
