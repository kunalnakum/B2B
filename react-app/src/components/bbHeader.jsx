import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';

function Header(props) {

    // const [loc, setLoc] = useState(null)
    // const [showOver, setshowOver] = useState(false)

    // const navigate = useNavigate()

    



    return (
        <div className='header-container d-flex justify-content-between'>

            <div className="header">
                <Link className='links' to="/">  HOME </Link>
               <div className='searchbar'>
                <input className='search'
                    type='text'
                    value={props && props.search}
                    onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)
                    }
                />
                <button className='search-btn' onClick={() => props.handleClick && props.handleClick()} > <FaSearch /> </button>
                </div>
            </div>


            <div>


            <div className='bb-div'>
                <Link className='bb-link' to="/bulk-Buying">All BB Requests</Link>
                <Link className='bb-link' to="/bulk-Buying/BbMyproducts">My Requests</Link>
                <Link className='v-space'></Link>
                <Link className='bb-link' to="/bulk-Buying/request">Request new BB</Link>
                
            </div>





         
             
              



  
            </div>

        </div>
    )
}


export default Header;