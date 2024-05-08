import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";
import './Login.css'

function Login() {
    const navigate = useNavigate()

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const handleApi = () => {
        const url = API_URL + '/login';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        navigate('/');
                    }
                }
            })
            .catch((err) => {
                alert('SERVER ERR')
            })
    }

    return (
        <div>
            <Header />
            <hr />
            <div className="p-3 m-3">
                <h3> Welocme to Login Page </h3>
                <br></br>
                USERNAME
                <input className="form-control" type="text" value={username}
                    onChange={(e) => {
                        setusername(e.target.value)
                    }} />
                <br></br>
                PASSWORD
                <input className="form-control" type="text" value={password}
                    onChange={(e) => {
                        setpassword(e.target.value)
                    }} />
                <br></br>
                <div className="btn123">
                <button className="login-btn" onClick={handleApi}> LOGIN </button>
                <Link className="signup-btn" to="/signup">  SIGNUP </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;