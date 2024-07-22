import React from 'react'
import './banner.css'
export default function banner() {
  return (
    <div className="banner d-flex justify-content-center text-center p-2 mb-5">
        <div className='col'>
            <h2>TrustWorthy</h2>
        </div>
        <div className='col'>
            <h2>Security</h2>
        </div>
        <div className='col'>
            <h2>HappyPeople</h2>
        </div>
        <div className='col'>
            <h2>WorthIt</h2>
        </div>
    </div>
  )
}
