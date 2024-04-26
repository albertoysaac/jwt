import React from "react";
import { Link } from "react-router-dom";

export const signupForm = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="text-center">Sign up</h1>
                    <form>
                    <div className="form-group">
                            <label htmlFor="name">Name: </label>
                            <input type="text" className="form-control" id="name" aria-describedby="nameHelp" />
                            <small id="nameHelp" className="form-text text-muted">Enter your names please</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Last Name: </label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <small id="emailHelp" className="form-text text-muted">Enter your last name please</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">age: </label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <small id="emailHelp" className="form-text text-muted">Enter your age please</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="inputPassword1" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Confirm Password</label>
                            <input type="password" className="form-control" id="inputPassword1" />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            Sign up
                        </button>
                        <div className="mt-4 text-center">
                            Already have an account? <Link to="/login">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};