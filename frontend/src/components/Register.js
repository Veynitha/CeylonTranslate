import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {


    const navigate = useNavigate();


    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const role = 'user'


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3017/auth/register', {
                firstname,
                lastname,
                email,
                age,
                dob,
                password,
                role,
            });

            alert("User add success")
            navigate('/login')
        } catch (error) {
            alert(error)
            console.log(error);
        }
    };


    return (

        <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h1 class="text-center mb-4">Register</h1>
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="firstName" class="form-label">First Name</label>
                        <input type="text" class="form-control" id="firstName" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div class="mb-3">
                        <label for="lastName" class="form-label">Last Name</label>
                        <input type="text" class="form-control" id="lastName" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div class="mb-3">
                        <label for="age" class="form-label">Age</label>
                        <input type="number" class="form-control" id="age" placeholder="Age" onChange={(e) => setAge(e.target.value)} required />
                    </div>
                    <div class="mb-3">
                        <label for="dob" class="form-label">Date of Birth</label>
                        <input type="date" class="form-control" id="dob" onChange={(e) => setDob(e.target.value)} required />
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div class="mb-3 d-grid gap-2">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                    <div class="text-center">
                        <span>Already have an account? <a href="/login">Login</a></span>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    )



}