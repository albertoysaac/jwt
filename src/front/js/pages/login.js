import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/login.css";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [content, setContent] = useState("login");

    function login() {
        if(email === "" || password === "") {
            setMessage("Please fill all the fields")
        }
        else if(!email.includes("@") || !email.includes(".")|| email.length < 10) {
            setMessage("Incorrect email format, please verify")
        }
        else {
            actions.login(email, password)
        }
    }

    function content() {
        if(content === "login") {
            return (
                <>
                    <p>Please login to your account</p>
                    <div data-mdb-input-init className="form-outline mb-4">
                        <input type="email" 
                        className="form-control"
                        id="usernameInput"
                        value={email}
                        placeholder="Email address" 
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="form-label" htmlFor="usernameInput">Username</label>
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                        <input type="password" 
                        className="form-control" 
                        id="passwordInput"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="form-label" htmlFor="passwordInput">Password</label>
                    </div>

                    <div className="text-center pt-1 mb-5 pb-1">
                        <button className="btn btn-primary btn-login gradient-custom-2 mb-2 me-2" 
                        type="button"
                        onClick={() => login()}
                        >Login</button>
                    </div>v
                </>
            );
        }
        else if (content === "signup") {
            return (
                <>
                    <p>Please create an account</p>
                    <div data-mdb-input-init className="form-outline mb-4">
                        <input type="email" 
                        className="form-control"
                        id="usernameInput"
                        value={email}
                        placeholder="Email address" 
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="form-label" htmlFor="usernameInput">Username</label>
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                        <input type="password" 
                        className="form-control" 
                        id="passwordInput"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="form-label" htmlFor="passwordInput">Password</label>
                    </div>

                    <div className="text-center pt-1 mb-5 pb-1">
                        <button className="btn btn-primary btn-login gradient-custom-2 mb-2 me-2" 
                        type="button"
                        onClick={() => actions.signup(email, password)}
                        >Sign up</button>
                    </div>
                </>
            );
        }
    }

    return(
        <section className="h-100 gradient-form" style={{backgroundColor: "#eee"}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-xl-10">
                    <div className="card rounded-3 text-black">
                    <div className="row g-0">
                        <div className="col-lg-6">
                        <div className="card-body p-md-5 mx-md-4">

                            <div className="text-center">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" style={{width: "185px"}} alt="logo"/>
                            <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                            </div>

                            <form>
                            {content()}

                            <div className="d-flex align-items-center justify-content-center pb-4">
                                <p className="mb-0 me-2">Don't have an account?</p>
                                <button type="button" className="btn btn-outline-danger"
                                onClick={() => setContent("signup")}
                                >Create new</button>
                            </div>

                            </form>

                        </div>
                        </div>
                        <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                            <h4 className="mb-4">We are more than just a company</h4>
                            <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}