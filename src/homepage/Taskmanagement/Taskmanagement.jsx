import React, { useState } from 'react'
import './Taskmanagement.css'
import leftArrow from '../assets/leftArrow.png'
import rightArrow from '../assets/rightArrow.png'
import { taskmanagementData } from 'homepage/data/taskmanagerData'
const Taskmanagement = () => {

    const [selected, setSelected] = useState(0);
    const tLength = taskmanagementData.length;
  return (
    <div className='taskmanager'>
        <div className="left-t">
            <span className='stroke-text'>Why do you </span>
            <span>need task management software?</span>
            <span>
                {taskmanagementData[selected].review}
            </span>
        </div>
        <div className="right-t">
            <div></div>
            <img src={taskmanagementData[selected].image} alt='' />

            <div className='arrows'>
                <img 
                    onClick={() => {
                        selected ===0
                            ? setSelected(tLength - 1)
                            : setSelected((prev) => prev-1);

                }}
                src={leftArrow} alt=''/>
                <img 
                    onClick={() => {
                        selected === tLength - 1
                            ? setSelected(0)
                            : setSelected((prev) => prev+1);

                }}
                src={rightArrow} alt=''/>
            </div>
        </div>
    </div>
  )
}

export default Taskmanagement