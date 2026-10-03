import { useContext } from "react"
import { CartContext } from "../contexts/CartContext"


const useCartContext = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  
  return context;
}

export default useCartContext;