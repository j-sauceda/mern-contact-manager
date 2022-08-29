import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

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
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <section className="hero is-light is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-4 is-offset-4">
            <h3 className="title has-text-black">Register</h3>
            <hr className="login-hr" />
            <p className="subtitle has-text-black">Please fill in all fields</p>
            <div className="box">
              <figure className="avatar">
                <h1><i className="fa-regular fa-address-card fa-10x"></i></h1>
              </figure>
              <form onSubmit={onSubmit}>
                {/* Name field */}
                <div className="field">
                  <div className="control">
                    <input 
                      className="input is-large" 
                      type="text"
                      id='name'
                      name='name'
                      value={name}
                      onChange={onChange}
                      placeholder="Enter your Name" 
                      autofocus="" 
                    />
                  </div>
                </div>
                {/* Email field */}
                <div className="field">
                  <div className="control">
                    <input 
                      className="input is-large" 
                      type="email"
                      id='email'
                      name='email'
                      value={email}
                      onChange={onChange}
                      placeholder="Email address" 
                      autofocus="" 
                    />
                  </div>
                </div>
                {/* Password field */}
                <div className="field">
                  <div className="control">
                    <input 
                      className="input is-large" 
                      type="password" 
                      id='password'
                      name='password'
                      value={password}
                      onChange={onChange}
                      placeholder="Set Password" 
                    />
                  </div>
                </div>
                {/* Confirm password */}
                <div className="field">
                  <div className="control">
                    <input 
                      className="input is-large" 
                      type="password" 
                      id='password2'
                      name='password2'
                      value={password2}
                      onChange={onChange}
                      placeholder="Confirm Password" 
                    />
                  </div>
                </div>
                {/* Submit button */}
                <button type='submit' className="button is-block is-info is-large is-fullwidth">
                  Submit&nbsp;
                  <i className="fa fa-sign-in" aria-hidden="true"></i>
                </button>
              </form>
            </div>
            <p className="has-text-grey">
              Already registered?&nbsp;
              <Link to='/login' >Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
};

export default Register;