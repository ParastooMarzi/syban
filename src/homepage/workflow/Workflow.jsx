import React, { useState } from 'react'
import './Workflow.css'
import leftArrow from '../assets/leftArrow.png'
import rightArrow from '../assets/rightArrow.png'
import { workflowData } from 'homepage/data/workflowData'
const Workflow = () => {

    const [selected, setSelected] = useState(0);
    const tLength = workflowData.length;
  return (
    <div className='workflow'>
        <div className="left-w">
            <span className='stroke-text'>Seamless Team Workflow </span>
            <span>& Efficient Task Managemen</span>
            <span>
                {workflowData[selected].review}
            </span>
        </div>
        <div className="right-w">
            <div></div>
            <img src={workflowData[selected].image} alt='' />

            <div className='arrows2'>
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

export default Workflow;