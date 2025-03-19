import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import Title from './Title.jsx';
import ProductItem from './ProductItem.jsx';

const LatestCollections = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, []);

  return (
    <section className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title titleStart={'LATEST'} titleEnd={'COLLECTION'} />
        <p className="m-3/4 m-auto text-xs sm:text-sm md:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam architecto commodi
          eveniet incidunt iusto laboriosam omnis quia sapiente, ullam.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6">
        {latestProduct.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestCollections;
