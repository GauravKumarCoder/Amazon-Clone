import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import amazonLogo from "../assets/amazon_logo.png";
import SearchIcon from "@mui/icons-material/Search";
import USFlag from "../assets/USFlag.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const { authUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logoutHandler = async () => {
    const res = axios.get("http://localhost:3000/api/v1/users/logout", {
      withCredentials: true,
    });

    dispatch(setAuthUser(null));
    navigate('/')
  };

  return (
    <header>
      <nav className="bg-[#0F1111] h-16 flex justify-evenly items-center text-white text-sm">
        <a
          href="#"
          className="border border-transparent p-1 hover:border-white"
        >
          <Link to="/">
            <img src={amazonLogo} alt="" className="w-24 h-10 mt-2" />
          </Link>
        </a>

        <div className="border border-transparent p-1 hover:border-white">
          <p className="text-xs pl-3">Deliver to</p>
          <div className="flex items-center gap-1">
            <i className="fa-solid fa-location-dot"></i>
            <p className="font-bold">India</p>
          </div>
        </div>

        <div className="text-black flex h-12 p-1">
          <select className="bg-[#E6E6E6] px-2 rounded-lg rounded-r-none">
            <option>All</option>
          </select>
          <input
            type="text"
            placeholder="Search Amazon"
            className="w-[780px] pl-2 text-base"
          />
          <div className="bg-orange-300 rounded-lg rounded-l-none p-2">
            <SearchIcon className="text-white" />
          </div>
        </div>

        <div className="flex border border-transparent p-1 hover:border-white">
          <img src={USFlag} className="h-4 w-5" />
          <select className="bg-transparent font-bold">
            <option>EN</option>
          </select>
        </div>

        <div className="border border-transparent p-1 hover:border-white">
          <p className="text-xs pl-1">
            Hello,{" "}
            {authUser ? (
              authUser.username
            ) : (
              <Link to="/signin">
                <span className="text-yellow-500 font-bold">Sign In</span>
              </Link>
            )}
          </p>
          <select className="bg-transparent font-bold">
            <option>Accounts & Lists</option>
          </select>
        </div>

        <Link to="/orders">
          <div className="border border-transparent p-1 hover:border-white">
            <p className="text-xs">Returns</p>
            <p className="font-bold">& Orders</p>
          </div>
        </Link>

        <Link to="/checkout">
          <div className="flex items-center border border-transparent p-1 hover:border-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>

            <h2 className="relative left-4 -top-3.5 text-sm font-bold text-[#FF9900]">
              {cart.length}
            </h2>
            <p className="font-bold pt-2">Cart</p>
          </div>
        </Link>

        {authUser ? (
          <div className="mr-2 cursor-pointer" onClick={logoutHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#FF0000"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
        ) : null}
      </nav>

      <div className="bg-[#222F3D] h-10 flex items-center text-white text-sm pl-4">
        <div className="flex items-center gap-1 border border-transparent p-2 hover:border-white">
          <i className="fa-solid fa-bars fa-lg"></i>
          <p className="font-bold">All</p>
        </div>

        <ul className="flex items-center">
          <li className="border border-transparent p-2 hover:border-white">
            Today's Deals
          </li>
          <li className="border border-transparent p-2 hover:border-white">
            Customer Service
          </li>
          <li className="border border-transparent p-2 hover:border-white">
            Registry
          </li>
          <li className="border border-transparent p-2 hover:border-white">
            Gift Cards
          </li>
          <li className="border border-transparent p-2 hover:border-white">
            Sell
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
