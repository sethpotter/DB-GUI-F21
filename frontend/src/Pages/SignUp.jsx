import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import {UserTypes} from '../Models/User';
import { url } from '../Util/url';
import { register } from "../Api/UserRoutes";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(20),

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
    },
}));

export const SignUpPage = ({ handleClose }) => {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        if(password !== conPassword) {
            setErrorMsg("Passwords do not match");
            return;
        }
        // TODO ! Important we need something for userType. There are 3 types.
        register(username, password, 1).then((result) => {
            if(result === "Registered account successfully")
                setSuccessMsg(result);
            else
                setErrorMsg(result);
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
                label="Email"
                variant="filled"
                type="email"
                required
                value={email}
                onChange={temp => setEmail(temp.target.value)}
            />
            <TextField
                label="Password"
                variant="filled"
                type="password"
                required
                value={password}
                onChange={temp => setPassword(temp.target.value)}
            />
            <TextField
                label="Confirm Password"
                variant="filled"
                type="conPassword"
                required
                value={conPassword}
                onChange={temp => setConPassword(temp.target.value)}
            />
            {(errorMsg.length > 0) ? <p className="text-danger">* {errorMsg}</p> : null}
            {(successMsg.length > 0) ? <p className="text-success">{successMsg}</p> : null}
            <div className="d-flex flex-row justify-content-between mx-5">
                <button type="button" className="btn btn-primary" onClick={(event) => handleSubmit(event)}>Signup</button>
            </div>
            <div className="d-flex flex-row justify-content-between mx-5">
                <Link type="button button-secondary" className="button landing-button" to="/Login">Cancel</Link></div>
        </form>
    );
};