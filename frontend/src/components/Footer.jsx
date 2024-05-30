import React from 'react'

function Footer() {
  return (
    <footer>
    <div className="bg-[#37475A] h-12 flex justify-center items-center text-white text-sm">
        <p>Back to top</p>
    </div>

    <div className="bg-[#232F3E] h-[340px] text-[#DDDDDD] text-sm flex justify-evenly py-10">
        <ul className="space-y-2.5">
            <li className="font-bold text-base text-white">Get to Know Us</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>About Amazon</li>
            <li>Investor Relations</li>
            <li>Amazon Devices</li>
            <li>Amazon Science</li>
        </ul>
        <ul className="space-y-2.5">
            <li className="text-base font-bold text-white">Make Money with Us</li>
            <li>Sell products on Amazon</li>
            <li>Sell on Amazon Business</li>
            <li>Sell apps on Amazon</li>
            <li>Become an Affiliate</li>
            <li>Advertise Your Products</li>
            <li>Self-Publish with Us</li>
            <li>Host an Amazon Hub</li>
            <li>See More Make Money with Us</li>
        </ul>

        <ul className="space-y-2.5">
            <li className="text-base font-bold text-white">Amazon Payment Products</li>
            <li>Amazon Business Card</li>
            <li>Shop with Points</li>
            <li>Reload Your Balance</li>
            <li>Amazon Currency Converter</li>
        </ul>

        <ul className="space-y-2.5">
            <li className="text-base font-bold text-white">Let Us Help You</li>
            <li>Amazon and COVID-19</li>
            <li>Your Account</li>
            <li>Your Orders</li>
            <li>Shipping Rates & Policies</li>
            <li>Returns & Replacements</li>
            <li>Manage Your Content and Devices</li>
            <li>Amazon Assistant</li>
            <li>Help</li>
        </ul>
    </div>

</footer>
  )
}

export default Footer
