import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Card, Logo, Form, Input, Button } from './AuthForm';
import { useAuth } from "./context/auth";
import { Redirect } from "react-router-dom";
import AuthApi from "./AuthApi";
import Recaptcha from 'react-recaptcha';

function Login() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens, setUserId } = useAuth();
    const [validCaptcha, setValidCaptcha] = useState(false);

    function postLogin() {
        console.log(validCaptcha)
        if(validCaptcha) {
            AuthApi.login(email, password).then(result => {
                console.log(result)
                setAuthTokens(result.token);
                setUserId(result.user_id)
                setLoggedIn(true);
            }).catch(e => {
                setIsError(true);
            });
        } else {
            alert('You must verify you are not a robot');
        }
    }

    var callback = function () {
        console.log('Done!!!!');
        console.log(validCaptcha)
      };

    var verifyCaptcha = function(response) {
        if(response) {
            console.log("hay response")
            setValidCaptcha(true);
        }   
    }

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <Card>
            <h5 style={{fontWeigth: 'bold', fontFamily: 'Belgrano', fontSize: 37, color:'#1DB9D7'}}>Log in</h5>
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
            <div>
            <Recaptcha
                sitekey="6LeqYtAUAAAAAIlI9egSVGrazGRpn27K_5ntHY0f"
                render="explicit"
                onloadCallback={callback}
                verifyCallback={verifyCaptcha}
            />
            </div>
        </Card>
    );
}

export default Login;