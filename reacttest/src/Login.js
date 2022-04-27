import {useState, createRef} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Home from "./Home.js";
function Login() {
    const idInput = createRef();
    const pwInput = createRef();
    const [account, setAccount] = useState({
        id: "",
        password: "",
    })
    const [isAuth, setIsAuth] = useState(true);
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();

    const onChange = (e) => {
        setAccount({
            ...account,
            [e.target.name] : e.target.value,
        })
    }

    const onSubmit = () => {
        if(account.id === "" && account.password === "") {
            idInput.current.focus();
        } else if(account.id !== "" && account.password === "") {
            pwInput.current.focus();
        } else {
            axios.post("login", {
                id: account.id,
                password: account.password,
            }, { withCreadentials: true }).then((res) => {
                console.log("login success: ", res);
                setUserName(res.data.userName);
                setIsAuth(true);
            }).catch((error) => {
                alert("Invalid ID or PW");
                console.error(error);
            })
            setAccount({
                id: "",
                password: "",
            })
        }
    }

    const toRegister = () => {
        navigate('/join');
    }

    if(!isAuth) {
        return (
            <div className='login_page'>
                <div className='login_container'>
                    <div className="login_wrapper">
                    <Form>
                        <Form.Group className="id_wrapper" controlId="id">
                            <Form.Label>ID</Form.Label>
                            <Form.Control 
                                type="text"
                                name="id" 
                                placeholder="아이디를 입력해주세요" 
                                onChange={onChange}
                                value={account.id}
                                ref={idInput}
                            />
                        </Form.Group>
                        <Form.Group className="pw_wrapper" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="password"
                                placeholder="비밀번호를 입력해주세요" 
                                onChange={onChange}
                                value={account.password}
                                ref={pwInput}
                            />
                        </Form.Group>
                    </Form>
                    <div className='btn'>
                        <Button onClick={toRegister}>register</Button>
                        <Button className="login_btn"onClick={onSubmit}>login</Button>
                    </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <Home name={userName} auth={isAuth} setIsAuth={setIsAuth}/>
        )
    }
    
}

export default Login;