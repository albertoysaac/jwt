import React, { act } from "react";
import { useContext , useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const LoginForm = props => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [last_name, setLast_name] = useState("");
    const [age, setAge] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [type, setType] = useState("login");
    const navigate = useNavigate();
    
    const submitHandler = async (e) => {
        e.preventDefault();
        if(type === "login"){
            if((email === "" || email.includes("@")) && password === ""){
                alert("Please fill all the fields");
                return;
            }
            else{
                const body = {
                    "email": email,
                    "password": password
                };
                const response = await actions.login(body);
                if(response){
                    const response = await actions.getUsers();
                    if(response){
                        
                        navigate("/home");
                    }
                    
                }
                else{
                    alert("Invalid credentials, please try again");
                }
            }
        }
    }
    const signupHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert("Passwords do not match");
        }
        if(name === "" || last_name === "" || age === undefined || email === "" || password === "" || confirmPassword === ""){
            alert("Please fill all the fields");
        }
        else{
            const body = {
                "names": name,
                "last_name": last_name,
                "age": parseInt(age),
                "email": email,
                "password": password
            };
            const response = await actions.signup(body);
            if(response){
                if(response.msg){
                    alert(response.msg);
                }
                else{
                    const response = await actions.getUsers();
                    if(response){
                        navigate("/home");
                    }
                }
            }
            
            else{
                alert("Ups, something went wrong, please try again");
            }
        }
    }
    
    function contentForm(){
        if(type === "login"){
            return(
                <form 
                onSubmit={submitHandler}
                >
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
                    <button type="submit" 
                    className="btn btn-primary btn-block"
                    >
                        Login
                    </button>
                </form> 
                
            );
        }
        else if(type === "signup"){
            return(
            <form
            onSubmit={signupHandler}
            >
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
                    <label htmlFor="inputAge">Age: </label>
                    <input type="number" 
                    className="form-control" 
                    id="inputAge"
                    value={age} 
                    onChange={(e) => setAge(e.target.value)}
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