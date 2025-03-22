import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import Title from './Title.jsx';
import ProductItem from './ProductItem.jsx';

const RelatedProducts = ({ category, subcategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const foundedProducts = products.filter(
        (item) => item.category === category && item.subCategory === subcategory,
      );

      setRelatedProducts(foundedProducts.slice(0, 5));
    }
  }, [products, category, subcategory]);

  return (
    <section className="my-24">
      <div className="text-center text-3xl py-2">
        <Title titleStart="RELATED" titleEnd="PRODUCTS"></Title>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {relatedProducts.map((item, index) => (
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

export default RelatedProducts;
