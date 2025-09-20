import React, { useContext } from 'react'
import { shoppingcontext } from "../../context"; 
import SingleProduct from "../../components/singleproductitem";

const ProductList = () => {
  let { listproducts, loading } = useContext(shoppingcontext);

  if (loading) return <h3>Loading Data! Please wait...</h3>;

  return (
    <section className='py-12 bg-white sm:py-16 lg:py-20'>
      <div className='px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl'>
        <div className='max-w-md mx-auto text-center'>
          <h2 className='text-3xl font-extralight text-gray-950 sm:text-4xl'>
            Our Featured Products
          </h2>
        </div>
        <div className='grid grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4'>
          {listproducts && listproducts.length > 0 ? (
            listproducts.map(producttile => (
              <SingleProduct key={producttile.id} producttile={producttile} />
            ))
          ) : (
            <h3>No Products Found</h3>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
