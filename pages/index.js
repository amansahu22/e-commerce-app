import React from "react";
import { HeroBanner, Product, FooterBanner } from "../components";
import { client } from "../lib/client";

const HomePage = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length > 0 && bannerData[0]} />

      <div className="products-heading">
        <h2>Best Selling Produts</h2>
        <p>Wide range of speakers,earphones and headphones available</p>
      </div>

      <div className="products-container">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      products: products,
      bannerData: bannerData,
    },
  };
};

export default HomePage;
