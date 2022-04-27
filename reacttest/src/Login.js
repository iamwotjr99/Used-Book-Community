import {useState, createRef} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
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
                <h2>로그인</h2>
                    <div className="login_wrapper">
                        <div className='id_wrapper'>
                            <input 
                                id='id'
                                name="id"
                                placeholder="아이디를 입력해주세요"
                                onChange={onChange}
                                value={account.id}
                                ref={idInput}
                            />
                        </div>
                        <div className="password_wrapper">
                            <input 
                                id='password'
                                name="password"
                                type="password"
                                placeholder='비밀번호를 입력해주세요'
                                onChange={onChange}
                                value={account.password}
                                ref={pwInput}
                            />
                        </div>
                        <button onClick={toRegister}>register</button>
                        <button onClick={onSubmit}>login</button>
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