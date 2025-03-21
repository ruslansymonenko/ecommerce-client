import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { assets } from '../assets/assets.js';
import Title from '../components/Title.jsx';
import ProductItem from '../components/ProductItem.jsx';

const categories = [
  {
    name: 'Men',
  },
  {
    name: 'Women',
  },
  {
    name: 'Kids',
  },
];

const subcategories = [
  {
    name: 'Topwear',
  },
  {
    name: 'Bottomwear',
  },
  {
    name: 'Winterwear',
  },
];

const Collections = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [subcategoryFilters, setSubcategoryFilters] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategoryFilter = (event) => {
    if (categoryFilters.includes(event.target.value)) {
      setCategoryFilters((prev) => prev.filter((item) => item !== event.target.value));
    } else {
      setCategoryFilters((prev) => [...prev, event.target.value]);
    }
  };

  const toggleSubcategoryFilter = (event) => {
    if (subcategoryFilters.includes(event.target.value)) {
      setSubcategoryFilters((prev) => prev.filter((item) => item !== event.target.value));
    } else {
      setSubcategoryFilters((prev) => [...prev, event.target.value]);
    }
  };

  const applyFilter = () => {
    let filteredProducts = products;

    if (categoryFilters.length > 0 || subcategoryFilters.length > 0) {
      filteredProducts = products.filter((item) => {
        const categoryMatch =
          categoryFilters.length > 0 ? categoryFilters.includes(item.category) : true;
        const subcategoryMatch =
          subcategoryFilters.length > 0 ? subcategoryFilters.includes(item.subCategory) : true;

        return categoryMatch && subcategoryMatch;
      });
    }

    setFilteredProducts(filteredProducts);
  };

  const sortProducts = () => {
    let productsToSort = filteredProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilteredProducts(productsToSort.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilteredProducts(productsToSort.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
    setSortType('relevant');
  }, [categoryFilters, subcategoryFilters]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <section className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {categories.map((item, index) => (
              <p className="flex gap-2" key={index}>
                <input
                  className="w-3"
                  type="checkbox"
                  value={item.name}
                  onChange={toggleCategoryFilter}
                />{' '}
                {item.name}
              </p>
            ))}
          </div>
        </div>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Subcategory</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {subcategories.map((item, index) => (
              <p className="flex gap-2" key={index}>
                <input
                  className="w-3"
                  type="checkbox"
                  value={item.name}
                  onChange={toggleSubcategoryFilter}
                />{' '}
                {item.name}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title titleStart="ALL" titleEnd="COLLECTIONS"></Title>
          <select
            className="border-2 bg-gray-100 text-sm px-2"
            value={sortType}
            onChange={(event) => setSortType(event.target.value)}
          >
            <option value="relevant">Sort by: relevant</option>
            <option value="low-high">Sort by: low to high</option>
            <option value="high-low">Sort by: high to low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.map((item, index) => (
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
    </div>
  );
};

export default Collections;
