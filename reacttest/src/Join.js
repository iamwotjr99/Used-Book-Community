import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
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
          <div className="join_wrapper">
            <Form>
              <Form.Group className="name_wrapper" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text"
                  name="name" 
                  placeholder="이름을 입력해주세요" 
                  onChange={onChangeAccount}
                  value={account.name}
                />
             </Form.Group>
             <Form.Group className="id_wrapper" controlId="id">
                <Form.Label>ID</Form.Label>
                <Form.Control 
                  type="text"
                  name="id" 
                  placeholder="아이디를 입력해주세요" 
                  onChange={onChangeAccount}
                  value={account.id}
                />
             </Form.Group>
             <Button size="sm" onClick={checkID}>중복확인</Button>
             <Form.Group className="password_wrapper" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password"
                  name="password" 
                  placeholder="비밀번호를 입력해주세요" 
                  onChange={onChangeAccount}
                  value={account.password}
                />
             </Form.Group>
            </Form>
            <Button onClick={postAccount}>가입하기</Button>
          </div>
        </div>
    </div>
    );
}

export default Join;