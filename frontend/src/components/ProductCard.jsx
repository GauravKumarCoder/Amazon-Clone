import React from 'react'

function ProductCard(props) {
  return (
    <div className="bg-white p-4">
    <h2 className="text-xl font-bold">{props.name}</h2>
    <img src={props.img} alt="" className="my-3 h-56 w-full"/>
    <a href="#" className="text-xs text-[#007185]">Shop now</a>
</div>
  )
}

export default ProductCard
