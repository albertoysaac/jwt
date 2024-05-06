import React from "react";
import { useContext , useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { User } from "../model/user.js";
import { validate } from "webpack";

export const LoginForm = props => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [last_name, setLast_name] = useState("");
    const [birthday, setBirthday] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [type, setType] = useState(props.type);

    useEffect(() => {
        
        
    }, []);

    function validateInputs(email, password){
        const user = new User(email, password);
        try{
            user.validateLogin();
            actions.login(email, password);
        }catch(error){
            alert(error.message);
        }
    }
    
    function contentForm(){
        if(type === "login"){
            return(
                <form >
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
                        required = "required"
                        className="form-control" 
                        id="inputEmail"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
                        required = "required"
                        className="form-control" 
                        id="inputPassword"/>
                    </div>
                    <button type="button" 
                    className="btn btn-primary btn-block"
                    onClick={() => validateInputs(email, password)}
                    >
                        Login
                    </button>
                </form> 
                
            );
        }
        else if(type === "signup"){
            return(
            <form>
                <div className="form-group">
                    <label htmlFor="inputName">Name: </label>
                    <input type="text" 
                    className="form-control"
                    id="inputName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your names please"/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputLast_name">Last Name: </label>
                    <input type="text" 
                    className="form-control" 
                    id="inputLast_name" 
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                    placeholder="Enter your last name please" />
                </div>
                <div className="form-group">
                    <label htmlFor="inputBirthday">Birthday: </label>
                    <input type="date" 
                    className="form-control" 
                    id="inputBirthday"
                    value={birthday} 
                    onChange={(e) => setBirthday(e.target.value)}
                    placeholder="Enter your age please" />
                </div>
                <div className="form-group">
                    <label htmlFor="inputEmail">Email address</label>
                    <input type="email" 
                    className="form-control" 
                    id="inputEmail" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="emailexample@domain.com"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" 
                    className="form-control" 
                    id="inputPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword2">Confirm Password</label>
                    <input type="password" 
                    className="form-control" 
                    id="inputPassword2" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" 
                className="btn btn-primary btn-block" 
                onClick={(e) => {
                    e.preventDefault();
                    actions.signup(name, last_name, birthday, email, password, confirmPassword);
                }}
                >
                    Sign up
                </button>
            </form>
            );
        }
    }

    return (
        <>
            {contentForm()}
            {type === "login" ? 
            (<div className="d-flex justify-content-between mt-4">
                <h5 className="fs-6"> Don't have an acount? <a onClick={() => setType("signup")}>Signup</a></h5>
            </div>) : 
            (<div className="d-flex justify-content-between mt-4">
                <h5 className="fs-6"> Already have an acount? <a onClick={() => setType("login")}>Login</a></h5>
            </div>)}
        </>
    );
}