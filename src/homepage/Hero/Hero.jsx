import React, { useState } from 'react';
import './Hero.css';
import Header from '../Header/Header';
import feature from '../assets/feature.png';
import slogan from '../assets/slogan.png';
import { FaLock, FaUser, FaPhone, FaMailBulk } from 'react-icons/fa';
import { loginUser } from '../../api/authApi';
import { Link } from 'react-scroll';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser(username, password);
      console.log('User data:', userData);
      // Handle successful login (e.g., store user data in state/local storage, redirect, etc.)
      window.location.href = '/dashboard'; // Redirect to dashboard after successful login
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (e.g., display error message)
    }
  };
  

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <FaLock className="icon" />
        </div>
        <div className="remember-forgot">
                  <label><input type="checkbox" />Remember me</label>
                  <a href="#">Forgot password?</a>
                </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <p>Don't have an account? <Link to='Join' smooth={true} span={true}> Join us</Link></p>
        </div>
      </form>
    </div>
  ); 
};






const Hero = () => {
  return (
    <div className="hero">
      <div className='blur hero-blur'></div>
      <div className='left-h'>
        <Header />
        {/* The Best Ad */}
        <div className="the-best-ad" >
          <div></div>
          <span>The best way for management software</span>
        </div>

        {/* Hero Heading */}
        <div className="hero-text">
          <div>
            <span className='stroke-text'>Streamlining </span>
            <span>Environmental</span>
          </div>
        </div>
        <div className="hero-text">
          <span>Data</span><span>Collection</span>
        </div>
        <div className="hero-text">
          <span>Reporting</span>
          <span>and Analytics</span>
        </div>
        <div className="explain">
          <span>We believe that designing products and services in close
            partnership with our clients is the only way to have a real
            impact on their business.</span>
        </div>

        {/* Figures */}
        <div className="figures">
          <div>
            <span>+140</span>
            <span>members joined</span>
          </div>
          <div>
            <span>+20</span>
            <span>creation features</span>
          </div>
          <div>
            <span>+2</span>
            <span>updates</span>
          </div>
        </div>

        {/* Hero Buttons */}
        <div className='hero-buttons'>
          <button className="btn">Get Started</button>
          <button className="btn">Learn More</button>
        </div>
      </div>
      <div className='right-h'>
        {/* Sign In Form */}
        <LoginForm />


        {/*Forgotten Password Form*/}

        <div className="wrapper">
      <form>
        <h1>Reset Password</h1>
        <span>Enter your Email</span>
        <div className="input-box">
          <input type="email" placeholder="Email" required />
          <FaMailBulk  className="icon" />
        </div>
        <div className="remember-forgot">
                  <label><input type="checkbox" />Remember me</label>
                </div>
        <button type="submit">Submit</button>
      </form>
    </div>


        {/* Hero Images */}
        {/* <img src={hero_image} alt='' className='hero-image'/>
        <img src={hero_image_back} alt='' className='hero-image-back'/> */}
        <div className='new-feature'>
          <img src={feature} alt="" />
          <span>Our new feature</span>
          <span>is available now</span>
        </div>
        <div className='slogan'>
          <img src={slogan} alt='' />
          <div>
            <span>Harness the power of</span>
            <span>data collection today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
