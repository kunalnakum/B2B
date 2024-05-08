import { useEffect, useState } from "react";
// import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
// import Categories from "./Categories";
// import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import './bbHome.css';
import API_URL from "../constants";
import BbHeader from "./bbHeader";

function Home() {

    const [product, setproduct] = useState()
    const [user, setuser] = useState()
    console.log(user, "userrrrr")
    const p = useParams()
    console.log(p)

    // useEffect(() => {
    //     const url = API_URL + '/bulk-Buyin/product/' + p.productId;
    //     axios.get(url)
    //         .then((res) => {
    //             if (res.data.product) {
    //                 setproduct(res.data.product)
    //             }
    //         })
    //         .catch((err) => {
    //             alert('Server Err.')
    //         })
    // }, [])


//     const handleContact = (addedBy) => {
//         console.log('id', addedBy)
//         const url = API_URL + '/get-user/' + addedBy;
//         axios.get(url)
//             .then((res) => {
//                 if (res.data.user) {
//                     setuser(res.data.user)
//                 }
//             })
//             .catch((err) => {
//                 alert('Server Err.')
//             })
//     }



//   return (
//     <div className="home-container">
//       <BbHeader />
//       <div className="product-cards-container">
//         {products.map((product) => (
//           <div key={product._id} className="product-card">
//             <div className="card-header">
//               <h3>{product.requestedProductName}</h3>
//               <p>Requested on: {product.lastRequestDate}</p>
//             </div>
//             <div className="card-body">
//               <div className="price-info">
//                 <span>Expected Price:</span>
//                 <span>
//                   {product.expectedPricePerUnit} {product.currency}
//                 </span>
//               </div>
//               {/* Add more fields as needed */}
//             </div>
//             <div className="card-footer">
//               <Link to={`/bulk-Buying/${product._id}`}>Details</Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
}

export default Home;
