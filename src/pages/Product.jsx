import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';
import { assets } from '../assets/assets.js';
import RelatedProducts from '../components/RelatedProducts.jsx';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const getProductData = () => {
    const foundProduct = products.find((item) => item._id === productId);

    if (foundProduct) {
      setProductData(foundProduct);
      setMainImage(foundProduct.image[0]);
    } else {
      setProductData(null);
    }
  };

  useEffect(() => {
    getProductData();
  }, [productId]);

  useEffect(() => {
    if (productData) {
      window.scrollTo(0, 0);
    }
  }, [productData]);

  return productData ? (
    <div className="border-t-1 border-gray-100 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <section className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                src={item}
                key={index}
                alt="image"
                onClick={() => setMainImage(item)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={mainImage} alt="main image" />
          </div>
        </div>

        <div>
          <div className="flex-1">
            <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
            <div className="flex items-center gap-1 mt-2">
              <img className="w-3.5" src={assets.star_icon} alt="" />
              <img className="w-3.5" src={assets.star_icon} alt="" />
              <img className="w-3.5" src={assets.star_icon} alt="" />
              <img className="w-3.5" src={assets.star_icon} alt="" />
              <img className="w-3.5" src={assets.star_dull_icon} alt="" />
              <p className="pl-2">(122)</p>
            </div>
            <p className="mt-5 text-3xl font-medium">
              {currency}
              {productData.price}
            </p>
            <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
            <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                {productData.sizes.map((item, index) => (
                  <button
                    className={`py-2 px-4 bg-gray-100 transition ${item === selectedSize ? 'bg-orange-100' : ''}`}
                    key={index}
                    onClick={() => setSelectedSize(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <button
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer"
              onClick={() => addToCart(productData._id, selectedSize)}
            >
              ADD TO CART
            </button>
            <hr className="mt-8 sm:w-4/5 border-t-1 border-gray-200" />
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% original product</p>
              <p>Cash on delivery is available on this product</p>
              <p>Easy return and exchange policy within 7 days</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="flex">
          <b className="border border-gray-200 px-5 py-3 text-sm">Description</b>
          <p className="border border-gray-200 px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border border-gray-200 px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium delectus deserunt
            dolorem doloremque dolorum facere illo incidunt voluptatibus. Aperiam culpa distinctio
            earum ipsam nam nihil nobis pariatur provident sequi voluptas?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis est repellendus
            reprehenderit similique. Cupiditate dolores exercitationem expedita in magni molestiae
            obcaecati officia perspiciatis quos, ratione similique velit, voluptate, voluptatem? In?
          </p>
        </div>
      </section>

      <RelatedProducts category={productData.category} subcategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0">Product was not found</div>
  );
};

export default Product;
