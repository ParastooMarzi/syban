import React from 'react'
import './Programs.css'
import { programsData } from 'homepage/data/programsData'
import RightArrow from '../assets/rightArrow.png'

const Programs = () => {
  return (
    <div className='Programs' id='programs'>
        {/*Header*/}
        {/*<div className='explain'>
            <span>We believe that designing products and services in close
                partnership with our clients is the only way to have a real
                impact on their business</span>
  </div> */}
        <div className='programs-header'>
            <span className='stroke-text'>Explore our</span>
            <span>Products</span>
            <span className='stroke-text'>for best results</span>
        </div>

        <div className='programs-categories'>
            {programsData.map((program) => (
                <div className='category'>
                    <span>{program.heading}</span>
                    <span>{program.details}</span>
                    <div className='join-now'>
                        <span>Join Now</span>
                        <img src={RightArrow} alt=''/>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Programs