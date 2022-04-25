import "../styles/globals.css";
import { Layout } from "../components";
import { CartContextProvider } from "../context/cart-context";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <Layout>
        <Toaster />
        {/* component refers to the component which is currently loaded on page */}
        <Component {...pageProps} />
      </Layout>
    </CartContextProvider>
  );
}

export default MyApp;
