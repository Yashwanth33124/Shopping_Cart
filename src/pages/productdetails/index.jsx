import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { shoppingcontext } from '../../context';

const ProductDetails = () => {
  const { id } = useParams();
  let navigate = useNavigate()
  const { productdetails, setproductdetails , loading,setloading,handleaddcart} = useContext(shoppingcontext);

  async function fetchproductdetails() {
    let response = await fetch(`https://dummyjson.com/products/${id}`);
    let data = await response.json();
    if (data) {
      setproductdetails(data)
      setloading(false)
    }
  }

  useEffect(() => {
    fetchproductdetails();
  }, [id]);


  if(loading) return <h3>
    Wait Images are coming
  </h3>

  if (!productdetails) return <h3>Loading product details...</h3>;

  return (
    <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
      <div className="grid items-center grid-cols-1 lg:grid-cols-5 gap-12 shadow-sm p-6">
        <div className="lg:col-span-3 w-full sticky top-0 text-center">
          <div className="px-4 py-10 rounded-xl shadow-lg relative">
            <img
              className="w-4/5 rounded object-cover mx-auto"
              src={productdetails?.thumbnail}
              alt={productdetails?.title}
            />
          </div>

          {/* Secondary images */}
          <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
            {productdetails?.images?.length
              ? productdetails.images.map((imageitem) => (
                  <div
                    className="rounded-xl p-4 shadow-md"
                    key={imageitem}
                  >
                    <img
                      src={imageitem}
                      alt="product secondary"
                      className="w-24 h-24 object-cover cursor-pointer"
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className='lg:col-span-2'>
          <h2 className='text-2xl font-extrabold text-[skyblue]'>
            {
              productdetails?.title
            }
          </h2>
         <div className='flex flex-wrap gap-4 mt-4'>
         <p className='text-xl font-bold'>
          ${
            productdetails?.price
          }
         </p>
         </div>
         <div>
<button  onClick={() => handleaddcart(productdetails)}  className="mt-4 min-w-[160px] px-5 py-2.5 rounded-lg 
  bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
  text-white font-semibold text-sm 
  shadow-md hover:shadow-xl 
  hover:scale-105 transition-all duration-300 ease-in-out">
  🛒 Add To Cart
</button>


         </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
