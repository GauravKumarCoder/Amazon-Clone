import React from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Rating } from 'primereact/rating'
import { useSelector, useDispatch } from "react-redux";
import { itemAdded, setCart } from '../redux/cartSlice.js';
import toast from 'react-hot-toast'
import {nanoid} from 'nanoid'




function ProductItem(props) {

  const navigate = useNavigate()

    const {authUser} = useSelector(state => state.user)
    const dispatch = useDispatch();

    const {title, rating, image, id, price} = props

    const handleCart = async () => {

        if (authUser) {
                const cartproductId = nanoid(15)
                const res = await axios.post('http://localhost:3000/api/v1/users/addtocart/', {
                    item: {
                        cartproductId,
                        id,
                        title,
                        image,
                        price,
                        rating
                    }
                }, {
                  withCredentials: true
                })

                console.log(res)


                if (res.data.success) {
                  dispatch(itemAdded({
                    cartproductId,
                    id,
                    title,
                    image,
                    price,
                    rating
                }))

                toast.success(res.data.msg)
          }
  

        } else {
          navigate('/signin')
          toast.error('Please sign in to add items to cart')
        }

    }

  return (
    <div className="bg-white p-4 my-4 mx-4">
      <img src={image} alt="" className="my-3 h-48 min-w-48" />
      <h6 className="inline-block">
        {title.length > 25
          ? title.substring(0, 20) + "..."
          : title}
      </h6>

      <Rating
        value={rating.rate}
        readOnly
        cancel={false}
        style={{ color: "#FFBF00" }}
      />
                              <h2 className="text-2xl  font-verdana font-bold text-right">
                          $ {price}
                        </h2>

      <center>
        <button 
            className=" cursor-pointer  bg-[#ffd814] text-black self-center  mt-2 text-sm py-2 px-4 mt-4 hover:bg-[#FFBF00]"
            onClick={handleCart}>
          Add to Cart
        </button>
      </center>
    </div>
  );
}

export default ProductItem;
