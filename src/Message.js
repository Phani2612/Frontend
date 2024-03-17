import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function Message() {
  return (
    <div>
    <div className="message-container">
      <h1 className="message-heading">Please First Order the Items</h1>
      <p className="message-subheading">Please go back to Home page , by clicking below</p>

     
    </div>

    <Link to='/home'  >  <button type="button" class="btn btn-light">Go back to Home</button></Link>

    </div>
  );
}

export default Message;
