import React, { useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useCartContext } from "../context/cart-context";
import { runCelebration } from "../lib/utils";

const Success = () => {
  const { setToDefault } = useCartContext();

  useEffect(() => {
    //these lines of code will be executed as soon as our page is loaded
    localStorage.clear();
    setToDefault();
    runCelebration();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for shopping with us!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          if you have any query, please reach us{" "}
          <a className="email" href="mailto:aman.sahu.as96@gmail.com">
            aman.sahu.as96@gmail.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
