import React from 'react'
import Cars from '../cars/Cars'
import Header from '../components/Header'
import Whatsapp from '../components/Whatsapp'
import { Link } from 'react-router-dom'

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
            <div>
              <Link to="/search" className="searchme">
                <div>Search For Properties</div>
              </Link>
            </div>
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