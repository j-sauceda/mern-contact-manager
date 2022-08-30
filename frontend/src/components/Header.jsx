// load libraries
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// load redux slices
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (
    <nav className="navbar is-grey-lighter" >
      {/* navbar-menu */}
      <div className="navbar-menu is-active">
        <div className="navbar-start">
          <button className='button is-danger is-outlined navbar-item m-2' onClick={onLogout}>
            <i className='fa-solid fa-person-walking-dashed-line-arrow-right'>&nbsp;Exit</i>
          </button>&nbsp;
        </div>
      </div>
    </nav>
  )
}

export default Header;