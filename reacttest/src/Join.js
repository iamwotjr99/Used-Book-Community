import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Join() {

  const [account, setAccount] = useState({
    name: "",
    id: "",
    password: "",
  });
  const navigate = useNavigate();
  let checkState = 0;

  const onChangeAccount = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  }

  const checkID = async () => {
    axios.get("checkID", {
      params : {
        id: account.id,
      }
    }).then((res) => {
      console.log("from URL checkID: ", res);
      if(res.data === "") {
        alert("사용하실 수 있는 아이디입니다.");
        checkState = 1;
      } else {
        alert("사용하실 수 없는 아이디입니다.");
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  const postAccount = async () => {
    if(checkState === 1) {
      axios.post("register", {
        name: account.name,
        id: account.id,
        password: account.password
      }).then((res) =>  {
        console.log(res);
        navigate('/');
      }).catch((error) => {
        console.log(error);
      });
      setAccount({
        name: "",
        id: "",
        password: "",
      })
    } else {
      alert("please check your ID");
    }
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