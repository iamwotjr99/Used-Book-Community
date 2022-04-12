import { Link, useNavigate } from 'react-router-dom';

function Nav() {
    const navigate = useNavigate();
    return (
        <div className="menu_Bar">
            <button className='btn_back'
            onClick={() => navigate(-1)}>뒤로가기</button>
            <Link to='/' className='btn_home'>홈</Link>
            <Link to='/join' className='btn_join'>회원가입</Link>
            <Link to='/login' className='btn_login'>로그인</Link>
        </div>
    );
}

export default Nav;