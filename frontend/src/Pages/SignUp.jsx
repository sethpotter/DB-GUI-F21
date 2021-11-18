import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
    },
}));

const SignUpPage = ({ handleClose }) => {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');

    const handleSubmit = temp => {
        temp.preventDefault();
        console.log(username, email, password, conPassword);
        handleClose();
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
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
        
            <div className="d-flex flex-row justify-content-between mx-5">
                <Link type="button" className="btn btn-primary" to="/">Signup</Link>
            </div>
        </form>
    );
};

export default SignUpPage;