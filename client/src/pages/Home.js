import React from 'react';
import JoinForm from "../components/JoinForm";
import Button from '../components/Button';

const Home = () => {
    return (
        <div>
          <Button type="button" text="LOG IN" path="/login" />
          <Button type="button" text="SIGN UP" path="/signup" />
          <h2>OR Play Now...</h2>
          <JoinForm />
        </div>
      );
}

export default Home;