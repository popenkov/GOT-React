import React from 'react';
import './errorMessage.css';
import img from './error.jpg';

const ErrorMessage = () => {
    return (
        <>
        <img className="error-message__img" src={img}></img>
        <span className="error-message__text">Something went wrong :/ </span>
        </>)
}

export default ErrorMessage;