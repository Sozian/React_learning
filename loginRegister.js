import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function App() {

  const navigate = useNavigate();

  const goToDashBoard = () => {
    navigate('/dashboard');
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [formDataLogin, setFormDataLogin] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleChangeLogin = (e) => {
    setFormDataLogin({ ...formDataLogin, [e.target.id]: e.target.value });
  };

  // *************Form Validation ***********************************
  const formValidation = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isSignUp) {
      const { name, email, password, confirm_password } = formData;

      if (!name || name.trim() === '') {
        newErrors.name = 'Name is required';
      }
      if (!email || email.trim() === '') {
        newErrors.email = 'Email is required';
      } else if (!emailRegex.test(email)) {
        newErrors.email = 'Invalid email address';
      }
      if (!password || password.trim() === '') {
        newErrors.password = 'Password is required';
      }
      if (password !== confirm_password) {
        newErrors.confirm_password = 'Passwords do not match';
      }
    }

    if (isLogin) {
      const { email, password } = formDataLogin;

      if (!email || email.trim() === '') {
        newErrors.email = 'Email is required';
      } else if (!emailRegex.test(email)) {
        newErrors.email = 'Invalid email address';
      }
      if (!password || password.trim() === '') {
        newErrors.password = 'Password is required';
      }
    }

    return newErrors;
  };

  // ************Handle Submit *********************************
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = formValidation();
  
    if (Object.keys(errors).length === 0) {

      const formDataToSubmit = isSignUp ? formData : formDataLogin;
      const url=isSignUp ? 'http://localhost:3019/post' : 'http://localhost:3019/login'

      axios.post(url, formDataToSubmit)
        .then((response) => {
          console.log(response.data.message);
          if(response.data.message==='Login successful'){
            // redirect to the new page
            navigate('/dashboard');
          }
          else{
            // takes to the registration page
            if(isSignUp){
              setFormData({
                name: '',
                email: '',
                password: '',
                confirm_password: '',
              });
            }else{
              setFormData({
                name: '',
                email: '',
                password: '',
                confirm_password: '',
              });
            }
          }
         
          setErrors({});
        })
        .catch((err) => console.log(err));
    } else {
      setErrors(errors);
    }
  };

  // ***********Toggle  ************************************
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setIsLogin(!isLogin);
    setErrors({}); // Clear errors when toggling modes
  };

  // *********** Return Statement ***************************
  return (
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
     
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm w-full">
        <div className="w-full p-8">
          <p className="text-xl text-gray-600 text-center">
            {isSignUp ? 'Create your account' : 'Welcome back!'}
          </p>

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
              </div>
            )}

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="email"
                id="email"
                value={isSignUp ? formData.email : formDataLogin.email}
                onChange={isSignUp ? handleChange : handleChangeLogin}
              />
              {errors.email && (
                <div style={{ color: isSignUp ? 'red' : 'blue' }}>{errors.email}</div>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="password"
                id="password"
                value={isSignUp ? formData.password : formDataLogin.password}
                onChange={isSignUp ? handleChange : handleChangeLogin}
              />
              {errors.password && (
                <div style={{ color: isSignUp ? 'red' : 'blue' }}>{errors.password}</div>
              )}
            </div>

            {isSignUp && (
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm Password
                </label>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="password"
                  id="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                />
                {errors.confirm_password && (
                  <div style={{ color: 'red' }}>{errors.confirm_password}</div>
                )}
              </div>
            )}

            <a
              href="#"
              className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
            >
              Forget Password?
            </a>

            <div className="mt-8">
              <button
                className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
                type="submit"
              >
                {isSignUp ? 'Register' : 'Login'}
              </button>
            </div>
          </form>

          <div className="mt-4 flex items-center w-full text-center">
            <a
              href="#"
              className="text-xs text-gray-500 capitalize text-center w-full"
              onClick={(e) => {
                e.preventDefault();
                toggleMode();
              }}
            >
              {isSignUp ? (
                <>
                  Already have an account?{' '}
                  <span className="text-blue-700">Login</span>
                </>
              ) : (
                <>
                  Don't have an account yet?{' '}
                  <span className="text-blue-700">Sign Up</span>
                </>
              )}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
