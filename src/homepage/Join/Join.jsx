import React, { useRef, useState } from 'react'
import './Join.css'
import { FaMailBulk } from 'react-icons/fa'

const Join = () => {
    const [selectedName, setSelectedName] = useState('');
    const options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
      ];

  return (
    <div className='Join' id='join-us'>
        <div className="left-j">
            <hr/>
            <div>
                <span>READY TO </span>
                <span className='stroke-text'>LEVEL UP</span>
            </div>
            <div>
                <span>YOUR BUSINESS </span>
                <span className='stroke-text'>WITH US?</span>
            </div>
        </div>
        <div className="wrapper2">
      <form>
        <h1>Ready to join?</h1>
        <div className="input-box2">
          <input type="text" placeholder="Compony name" required />
          <FaMailBulk  className="icon" />
        </div>

        <div className="input-box2">
          <input type="text" placeholder="Name" required />
          <FaMailBulk  className="icon" />
        </div>

        <div className="input-box2">
          <input type="text" placeholder="Business Email" required />
          <FaMailBulk  className="icon" />
        </div>

        <div className="input-box2">
          <input type="text" placeholder="Phone number" required />
          <FaMailBulk  className="icon" />
        </div>

        <div className="input-box2">
          <input type="text" placeholder="Compony website" required />
          <FaMailBulk  className="icon" />
        </div>

        

        <div className="remember-forgot2"><span>How did you hear about us?</span>
            <label><input type="checkbox" />Social media</label>
            <label><input type="checkbox" />Referral</label>
            <label><input type="checkbox" />Search engine</label>
        </div>

        <div className="input-box2">
          <input type="email" placeholder="Email" required />
          <FaMailBulk  className="icon" />
        </div>
        <div className="input-box2">
          <select value={selectedName} onChange={(e) => setSelectedName(e.target.value)} required>
            <option value="">Services interest</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
          <FaMailBulk className="icon" />
        </div>
        <div className="remember-forgot2">
            <label><input type="checkbox" />Remember me</label>
        </div>
        <button type="submit">Join Us</button>
        <div className="register-link2">
          <p>Already have an account? <a href="#">Book a demo</a></p>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Join