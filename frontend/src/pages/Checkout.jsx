import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { itemDelete, itemOrdered } from "./../redux/cartSlice";
import toast from "react-hot-toast";
import { Rating } from 'primereact/rating'
import axios from "axios";

function Checkout() {
  const [orderPrice, setOrderPrice] = useState(0);
  const { cart } = useSelector((state) => state.cart);
  const { authUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
  }, [orderPrice])

  useEffect(() => {
    calculateTotalPrice()
  }, [])

  const handleRemoveCart = async (cartproductId, price) => {
    if (authUser) {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/removefromCart",
        {
          cartproductId,
        }, {
          withCredentials: true
        }
      );
      if (res.data.success) {
        dispatch(itemDelete(cartproductId));
        toast.success(res.data.msg);
        setOrderPrice(orderPrice - price);
      }
    } else {
      navigate("/signin");
      toast.error("Please sign in to add items to cart");
    }
  };

  const emptyCart = () => {
    return (
      <>
        <div className="items-center flex-col flex mt-56">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>

          <h1>Your Amazon Cart is Empty</h1>
        </div>
      </>
    );
  };

  const calculateTotalPrice = () => {
    let total = 0;
    cart.map((item) => {
      total += item.price ;
    });
    setOrderPrice(total);
  }

  const orderButtonHandler = async () => {
    const userId = authUser._id;
    const products = cart 
    if(authUser) {

      products.map(async (item, index) => {
        const res = await axios.post(
          "http://localhost:3000/api/v1/orders/createOrder",
          {
            productId: item.id,
            productName: item.title,
            productImage: item.image,
            productPrice: item.price,
            productRating: item.rating,
          },
          {
            withCredentials: true
          }
        )

      })

      makeCartEmpty()
      dispatch(itemOrdered([]))
      toast.success("Order Placed Successfully")
      navigate("/orders")

    } else {
      navigate('/signin') 
    }
  }

  const makeCartEmpty = () => {
   return axios.get(`http://localhost:3000/api/v1/users/emptyCart/`, {
    withCredentials: true
   })
    }


  return (
    <div className="h-auto w-full bg-[#E6E6E6]">
      <Header />

      <div className=" min-h-screen w-full flex p-1 mt-2 justify-between  ">
        <div className=" bg-white shadow-lg min-h-full w-[80%] m-5">
          <h1 className="text-3xl m-7 font-verdana">Shopping Cart</h1>

          {cart.length > 0
            ? cart.map((item) => {
                return (
                  <>
                    <div className="w-auto  h-52 m-7 border-t-2 border-b-2 border-gray-200 flex flex-row justify-between ">
                      <div className="h-full flex-1  flex justify-center items-center  ml-5">
                        <img
                          className="h-40 min-w-40"
                          src={item.image}
                          alt=""
                        />
                      </div>

                      <div className="h-full flex-2 px-8 w-[90vh] ">
                        <h4 className="text-lg font-medium font-consolas mt-6 w-full ">
                          {item.title}
                        </h4>
                        <Rating
        value={item.rating.rate}
        readOnly
        cancel={false}
        style={{ color: "#FFBF00" }}
      />
                        <p className="text-green-600 text-sm font-semibold font-verdana ">
                          In Stock
                        </p>
                        <button
                          className=" cursor-pointer  bg-[#ffd814] text-black self-center font-verdana mt-2 font-consolas text-sm py-2 px-6 mt-4 hover:bg-[#FFBF00]"
                          onClick={() => {
                            handleRemoveCart(item.cartproductId, item.price)
                          }}
                        >
                          Remove From Cart!
                        </button>
                      </div>

                      <div className="h-full flex-2 min-w-48">
                        <p className="text-xs relative text-red-600 font-bold font-verdana -left-1  mt-6">
                          <span className="bg-red-600 text-white px-2 py-1 text-right">
                            37% Off
                          </span>{" "}
                          Limited Time Deal
                        </p>
                        <h2 className="text-2xl font-verdana font-bold mt-2 ml-24">
                          $ {item.price}
                        </h2>
                      </div>
                    </div>
                  </>
                );
              })
            : emptyCart()}
        </div>

        {cart.length > 0? 

          (<>
            <div className="bg-white shadow-lg h-[25vh] w-[20%] m-5">
              <div className="flex p-5 ">
                <p className="text-xl font-sans font-semibold text-nowrap">Subtotal ({cart.length} item) : </p>
                <p className="text-xl font-sans font-semibold ml-2">${orderPrice}</p>
              </div>

              <div className="text-center">
                <button
                onClick={orderButtonHandler}
                    className=" cursor-pointer  bg-[#ffd814] text-black self-center font-verdana mt-2 font-consolas text-sm h-10 font-sans rounded-full  mt-5 w-[90%] hover:bg-[#FFBF00]">
                      Proceed to Checkout!
                </button>
              </div>
            </div>
          </>
          )
        
       : null }
      </div>
    </div>
  );
}

export default Checkout;
