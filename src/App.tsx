import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import NoPage from "./components/NoPage";
import HeadphonesPage from "./components/product_preview/HeadphonesPage";
import SpeakersPage from "./components/product_preview/SpeakersPage";
import EarphonesPage from "./components/product_preview/EarphonesPage";
import ScrollRestoration from "./components/ScrollRestoration";
import HeadphoneOne from "./components/headphone_products/HeadphoneOne";
import HeadphoneTwo from "./components/headphone_products/HeadphoneTwo";
import HeadphoneThree from "./components/headphone_products/HeadphoneThree";
import SpeakerOne from "./components/speaker_products/SpeakerOne";
import SpeakerTwo from "./components/speaker_products/SpeakerTwo";
import EarphoneProduct from "./components/earphone_product/EarphoneProduct";
import Checkout from "./pages/Checkout";
import CartProvider from "./contexts/CartContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <CartProvider>
        <Toaster
          position="top-right"
          toastOptions={{ className: "mt-5", duration: 1500 }}
        />
        <ScrollRestoration />
        <Routes>
          <Route element={<Layout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/headphones-preview" element={<HeadphonesPage />} />
            <Route path="/speakers-preview" element={<SpeakersPage />} />
            <Route path="/earphones-preview" element={<EarphonesPage />} />
            <Route
              path="/headphones-preview/product-details-headphone-xx99-mark-ii/:id"
              element={<HeadphoneOne />}
            />
            <Route
              path="/headphones-preview/product-details-headphone-xx99-mark-i/:id"
              element={<HeadphoneTwo />}
            />
            <Route
              path="/headphones-preview/product-details-headphone-xx59/:id"
              element={<HeadphoneThree />}
            />
            <Route
              path="/speakers-preview/product-details-speaker-zx9/:id"
              element={<SpeakerOne />}
            />
            <Route
              path="/speakers-preview/product-details-speaker-zx7/:id"
              element={<SpeakerTwo />}
            />
            <Route
              path="/earphones-preview/product-details-earphone-yx1/:id"
              element={<EarphoneProduct />}
            />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
