import axios from "axios";
import { useState } from 'react';

function Join() {
  const baseURL = "http://localhost:8000";

  const [account, setAccount] = useState({
    name: "",
    id: "",
    password: "",
  });

  const onChangeAccount = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  }

  const postAccount = async () => {
    axios.post(`${baseURL}/auth/register`, {
      name: account.name,
      id: account.id,
      password: account.password
    }).then((res) =>  {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    });
    setAccount({
      name: "",
      id: "",
      password: "",
    })
  }

  const checkID = async () => {
    axios.get(`${baseURL}/checkID`, {
      params : {
        id: account.id,
      }
    }).then((res) => {
      console.log("from URL checkID: ", res);
      if(res.data === "") {
        alert("사용하실 수 있는 아이디입니다.");
      } else {
        alert("사용하실 수 없는 아이디입니다.");
      }
    }).catch((error) => {
      console.log(error);
    })
  }


    return (
    <div>
        <div className='join_container'>
          <h2>회원가입</h2>
          <div className="join_wrapper">
            <input 
              id='name'
              name='name'
              placeholder='이름을 입력해주세요'
              onChange={onChangeAccount}
              value={account.name}
            />
            <div className='id_wrapper'>
              <input 
                id='id'
                name="id"
                placeholder="아이디를 입력해주세요"
                onChange={onChangeAccount}
                value={account.id}
              />
              <button onClick={checkID}>중복확인</button>
            </div>
            <input 
              id='password'
              name="password"
              type="password"
              placeholder='비밀번호를 입력해주세요'
              onChange={onChangeAccount}
              value={account.password}
            />
            <button onClick={postAccount}>가입하기</button>
          </div>
        </div>
    </div>
    );
}

export default Join;