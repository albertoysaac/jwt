import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const signupForm = () => {
    const [name, setName] = useState("");
    const [last_name, setLast_name] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
	return (
        <>
        <h1 className="text-center">Sign up</h1>
        
        </>
	);
};