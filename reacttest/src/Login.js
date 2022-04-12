import {useState, createRef} from 'react';
import axios from "axios";
function Login() {
    const baseURL = "http://localhost:8000";

    const idInput = createRef();
    const pwInput = createRef();
    const [account, setAccount] = useState({
        id: "",
        password: "",
    })

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
            axios.post(`${baseURL}/auth/login`, {
                id: account.id,
                password: account.password,
            }).then((res) => {
                console.log(res);
            }).catch((error) => {
                console.log(error);
            })
            setAccount({
                id: "",
                password: "",
            })
        }
    }

    return (
        <div>
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
                    <button onClick={onSubmit}>가입하기</button>
                </div>
            </div>
        </div>
    )
}

export default Login;