import React, { useState } from "react";

//Importing Components
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import ProductItem from "../components/ProductItem";
import Footer from "../components/Footer";
import axios from "axios";
import Carousel from "../components/Carousel";


// Importing Images
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";
import image5 from "../assets/5.jpg";
import image6 from "../assets/6.jpg";
import image7 from "../assets/7.jpg";
import image8 from "../assets/8.jpg";

function HomePage() {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  useState(async () => {
    const data = await axios.get("https://fakestoreapi.com/products");
    setProductData(data.data);
    setLoading(false);
  }, []);

  return (
    <>
      <Header />

      <Carousel />

      <main className="bg-[#E6E6E6] pb-5">
        <div className="grid grid-cols-4 grid-rows-2 gap-4 px-4 relative bottom-56">
          <ProductCard name="Shop school essentials" img={image1} />
          <ProductCard name="Health & Personal Care" img={image2} />
          <ProductCard name="Home & Kitchen Under $30" img={image3} />
          <ProductCard name="Beauty picks" img={image4} />
          <ProductCard name="Electronics" img={image5} />
          <ProductCard name="Toys Under $30" img={image6} />
          <ProductCard name="For your Fitness Needs" img={image7} />
          <ProductCard name="Pet Items" img={image8} />
        </div>

        <div className=" p-4 ">
          <div className="bg-white w-full -mt-36 p-5">
            <h2 className="text-xl font-bold">Today's Deals</h2>

            <div className="flex gap-4 overflow-x-scroll">
              {loading ? (
                <div className="w-full h-[40vh] flex items-center justify-center">
                  <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
                </div>
              ) : null}

              {ProductItem
                ? productData.map((item, index) => (
                    <ProductItem
                      id={item.id}
                      title={item.title}
                      image={item.image}
                      rating={item.rating}
                      price={item.price}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default HomePage;
