import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'

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

const LoginPage = ({ handleClose }) => {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = temp => {
        temp.preventDefault();
        console.log(username, password);
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
                label="Password"
                variant="filled"
                type="password"
                required
                value={password}
                onChange={temp => setPassword(temp.target.value)}
            />
            <div>
                <Link type="button button-secondary" className="button landing-button" to="/Signup">Signup</Link>
                <Link type="button button-secondary" className="button landing-button" to="/Dashboard">Login</Link>
                {/*<Button type="submit" variant="contained" color="primary">
                    Login
                </Button>
                <Button variant="contained" onClick={} color="primary">
                    Signup
    </Button>*/}
            </div>
        </form>
    );
};

export default LoginPage;