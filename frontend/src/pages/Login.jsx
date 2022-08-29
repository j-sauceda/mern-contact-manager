// load libraries
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// load components
import Spinner from '../components/Spinner';

// load redux slices
import { login, reset } from '../features/auth/authSlice';

// import custom CSS
import './css/login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    // submit login form
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />
  }

  return (
    <section className="container">
      <div className="columns is-multiline">
        <div className="column is-8 is-offset-2 register">
          <div className="columns">

            <div className="column left">
              <h1 className="title is-1">Contact Manager</h1>
              <h2 className="subtitle colored is-4">Never loose a contact</h2>
              <p>If remembering a contact is hard for you, those days are over. Just register and store the phone/email of your friends, relatives, coworkers and more. But, do not forget your password</p>
            </div>

            <div className="column right has-text-centered">
              <h1 className="title is-4">Log in</h1>
              <p className="description">Enter your email address and password</p>
              <form onSubmit={onSubmit}>
                {/* Email input field */}
                <div className="field">
                  <div className="control">
                    <input 
                      className="input is-medium" 
                      type="email"
                      id='email'
                      name='email'
                      value={email}
                      placeholder="Email" onChange={onChange} 
                    />
                  </div>
                </div>
                {/* Password input field */}
                <div className="field">
                  <div className="control">
                    <input 
                      className="input is-medium" 
                      type="password" 
                      id='password'
                      name='password'
                      value={password}
                      placeholder="Password"
                      onChange={onChange}
                    />
                  </div>
                </div>
                {/* Submit button */}
                <button type='submit' className="button is-block is-primary is-fullwidth is-medium">Submit</button>
                <br />
                Not registered yet? <Link to='/register' >Click here</Link>
              </form>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="column is-8 is-offset-2">
          <br />
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                Visit me on:&emsp;
                <span className="icon">
                  <a href="https://www.linkedin.com/in/jorge-arturo-sauceda-flores/">
                    <i className="fab fa-github"></i>
                  </a>
                </span> &nbsp;
                <span className="icon">
                  <a href="https://www.jsauceda.info">
                    <i className="fa-solid fa-suitcase"></i>
                  </a>
                </span>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item" style={{color: "var(--textLight)"}}>
                Made by J. Sauceda
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>
  )
}

export default Login;