import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import { login } from "../Api/UserRoutes";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(35),

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
    },
}));

export const LoginPage = ({ handleClose }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMsg("");
        login(username, password).then((result) => {
            if(result.constructor.name === "User") {
                sessionStorage.setItem("userId", result.id);
                console.log("Logged in:");
                console.log(result);
                handleClose();
            } else {
                setErrorMsg(result);
            }
        });
    };

    return (
        <form className={classes.root}>
            <TextField
                label="Username"
                variant="filled"
                required
                value={username}
                onChange={temp => setUsername(temp.target.value)}
            />
            <TextField
                label="Password"
                variant="filled"
                type="password"
                required
                value={password}
                onChange={temp => setPassword(temp.target.value)}
            />
            {(errorMsg.length > 0) ? <p className="text-danger">* {errorMsg}</p> : null}
            <div className="d-flex flex-row justify-content-between mx-5">
                <button type="button button-secondary" className="btn btn-primary" onClick={(event) => handleSubmit(event)}>Login</button>
            </div>
            <div className="d-flex flex-row justify-content-between mx-5">
                <Link type="button button-secondary" className="button landing-button" to="/Signup" /*style={{ color: '#0AAD5C' }}*/>Signup</Link></div>
        </form>
    );
};