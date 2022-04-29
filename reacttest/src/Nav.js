import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Nav({auth, setIsAuth, btn_back, btn_logout, btn_add}) {
    const navigate = useNavigate();

    const logoutHandler = () => {
        axios.get("/logout")
        .then((res) => {
            console.log(res);
            setIsAuth("");
        }).catch((err) => {
            console.log(err);
        })
    }

    const addHandler = () => {
        navigate('/add');
    }
    
    const backHandler = () => {
        navigate(-1);
    }

    return (
        <div className="nav_container">
            <div className='nav'>
                {btn_back === true ? <button 
                    className='btn_back'
                    onClick={backHandler}>
                    <img src="https://cdn-icons-png.flaticon.com/32/507/507257.png" alt=""/>
                </button> : <></>}
                {btn_logout === true ? <button 
                    className='btn_logout' 
                    onClick={logoutHandler}>Logout
                </button> : <></>}
                {btn_add === true ? <button 
                    className='btn_add'
                    onClick={addHandler}>add
                </button> : <></>}
            </div>
        </div>
    )
}

export default Nav;