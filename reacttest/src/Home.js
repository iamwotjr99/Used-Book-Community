import Nav from './Nav.js';
import PostList from './PostList.js';
import axios from 'axios';
import { useEffect, useState } from 'react';
function Home(props) {
    const [userName, setUserName] = useState();
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios.get('/userinfo').then((res) => {
            console.log(res);
            setUserName(res.data.userName);
        }).catch((err) => {
            console.log(err);
        });
        axios.get('/get/posts').then((res) => {
            console.log(res.data.PostList);
            setPostList(res.data.PostList);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    return (
        <div className='home'>
            <div className='home_container'>
                <Nav auth={props.auth} setIsAuth={props.setIsAuth} btn_back={false} btn_logout={true} btn_add={true}/>
                <br></br>
                <div className="userName_wrapper">
                    <h5>{userName}, hi</h5>
                </div>
                <PostList postList={postList}/>
            </div>
        </div>
    )
}

export default Home;