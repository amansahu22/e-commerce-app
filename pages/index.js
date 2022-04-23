import React from "react";

const HomePage = () => {
  return (
    <>
      {/* later we will have this name component here */}
      HeroBanner
      <div className="products-heading">
        <h2>Best Selling Produts</h2>
        <p>Wide range of speakers,earphones and headphones available</p>
      </div>
      <div className="products-container">
        {["product1", "product2"].map((product) => product)}
      </div>
    </>
  );
};

export default HomePage;
