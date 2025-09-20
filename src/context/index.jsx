import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const shoppingcontext = createContext(null);

function ShoppingProvider({ children }) {
  const [loading, setloading] = useState(true);
  const [listproducts, setlistproducts] = useState([]);
  const [productdetails, setproductdetails] = useState(null);
  const [cartitems, setcartitems] = useState([]);
  const navigate = useNavigate();

  async function Fetchproducts() {
    let data = await fetch("https://dummyjson.com/products");
    let response = await data.json();
    console.log(response);

    if (response && response?.products) {
      setlistproducts(response?.products);
      setloading(false);
    }
  }

  function handleaddcart(getproductdetails) {
    let cpycartitems = [...cartitems];
    const findindex = cpycartitems.findIndex(
      (cartitem) => cartitem.id === getproductdetails.id
    );

    if (findindex === -1) {
      
      cpycartitems.push({
        ...getproductdetails,
        quantity: 1,
        totalPrice: getproductdetails?.price,
      });
    } else {
      const newQuantity = cpycartitems[findindex].quantity + 1;
      cpycartitems[findindex] = {
        ...cpycartitems[findindex],
        quantity: newQuantity,
        totalPrice: newQuantity * cpycartitems[findindex].price,
      };
    }

    setcartitems(cpycartitems);
    localStorage.setItem("cartitems", JSON.stringify(cpycartitems));
    navigate("/cart");
  }

  function handleremove(getproductdetails, isFullyRemove) {
    let cpyexistcartitem = [...cartitems];
    const findindexofcart = cpyexistcartitem.findIndex(
      (item) => item.id === getproductdetails.id
    );

    if (findindexofcart === -1) return;

    if (isFullyRemove) {
      cpyexistcartitem.splice(findindexofcart, 1);
    } else {
      const newQuantity = cpyexistcartitem[findindexofcart].quantity - 1;
      if (newQuantity <= 0) {
        cpyexistcartitem.splice(findindexofcart, 1);
      } else {
        cpyexistcartitem[findindexofcart] = {
          ...cpyexistcartitem[findindexofcart],
          quantity: newQuantity,
          totalPrice:
            newQuantity * cpyexistcartitem[findindexofcart].price,
        };
      }
    }

    localStorage.setItem("cartitems", JSON.stringify(cpyexistcartitem));
    setcartitems(cpyexistcartitem);
  }

  useEffect(() => {
    Fetchproducts();
    const storedCart = localStorage.getItem("cartitems");
    if (storedCart) setcartitems(JSON.parse(storedCart));
  }, []);

  return (
    <shoppingcontext.Provider
      value={{
        listproducts,
        loading,
        setloading,
        productdetails,
        setproductdetails,
        handleaddcart,
        cartitems,
        handleremove,
      }}
    >
      {children}
    </shoppingcontext.Provider>
  );
}

export default ShoppingProvider;
