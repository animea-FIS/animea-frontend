import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Card, Logo, Form, Input, Button } from './AuthForm';
import { useAuth } from "./context/auth";
import { Redirect } from "react-router-dom";
import AuthApi from "./AuthApi";

function Login() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens, setUserId } = useAuth();

    function postLogin() {
        AuthApi.login(email, password).then(result => {
            console.log(result)
            setAuthTokens(result.token);
            setUserId(result.user_id)
            setLoggedIn(true);
        }).catch(e => {
            setIsError(true);
        });
    }

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <Card>
            <Logo src={window.location.origin + "/logo.png"} />
            <Form>
                <Input
                    type="email"
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                    placeholder="email"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                    placeholder="password"
                />
                <Button onClick={postLogin}>Sign In</Button>
            </Form>
            <Link to="/">Don't have an account? Fuck you because we don't have registry :)</Link>
        </Card>
    );
}

export default Login;