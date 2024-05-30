import React from "react";
import axios from 'axios'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";

import image from "./../assets/1.jpg";

function Orders() {
    const { authUser } = useSelector((state) => state.user)

    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        console.log("State Changed: ", orders)
    }, [orders])

    useEffect(() => {
        fetchUserOrders()
    }, [])

    const fetchUserOrders = async () => {
        if (authUser) {
            const userId = authUser._id

            const res = await axios.get(`http://localhost:3000/api/v1/orders/getOrder/${userId}`)
            
            var test = res.data.orders
            let check = []
            test.forEach((data, index) => {
                if(data.products.length > 0) {
                    console.log(data)
                    data.products.forEach((secondData, secondIndex) => {
                        check.push(secondData)
                    })
                } else {
                    check.push(data)
                }
              })
            
              setOrders(check)
              setIsLoading(false)

            
        }
    }

  return (
    <div className="h-auto w-full bg-[#E6E6E6]">
      <Header />

      <div className=" min-h-screen w-full flex p-2 mt-2 justify-between  ">
        <div className=" bg-white shadow-lg min-h-full w-[100%] m-5">
          <h1 className="text-3xl m-7 font-verdana">Orders</h1>

          {isLoading? (
             <div className="w-full h-[40vh] flex items-center justify-center">
             <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
           </div>
          ) : null}

          {orders.map((order, index) => {
            console.log(order)
              return (
                <>
                <div className="w-auto  h-38 m-7 py-4 border-t-2 border-b-2 border-gray-200 flex flex-row ">
            <div className="h-full   flex justify-center items-center  ml-5">
              <img className="h-32 min-w-32" src={order.image} alt="" />
            </div>

            <div className="h-full px-8 w-[90vh] ">
              <h4 className="text-lg font-medium font-consolas  w-full ">
                {order.title}
              </h4>
              <p className="text-green-600 text-sm font-semibold font-verdana ">
                Arriving in 2-3 days
              </p>
            </div>

            <div className="h-ful min-w-48 flex justify-center items-center items-flexend">
              <button className="px-8 py-3 bg-red-500 text-white hover:scale-110 transition-all duration-300 ease-in-out rounded-md font-semibold font-verdana hover:bg-red-600">
                Cancel Order
              </button>
            </div>
          </div>
          </>
              )
          })}

          
        </div>
      </div>
    </div>
  );
}

export default Orders;
