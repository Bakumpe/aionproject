import React from 'react'
import Cars from '../cars/Cars'
import Header from '../components/Header'
import Whatsapp from '../components/Whatsapp'

function CarProperty(){
  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>

        <div className="body">
          <div className="bodyTitle">
            <p>Car Properties</p>
          </div>
          <div className="myUnorderedList">
            <Cars />
          </div>
        </div>
      </div>

      <Whatsapp />
    </>
  )
}
export default CarProperty