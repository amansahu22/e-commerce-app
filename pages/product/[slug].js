//our-domain/product/some-slug
import { useState } from "react";
import { urlFor, client } from "../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";
import { useCartContext } from "../../context/cart-context";

const ProductDetails = ({ productData, similarProducts }) => {
  const { qty, increaseQuantity, decreaseQuantity, addToCart, handleShowCart } =
    useCartContext();
  const [index, setIndex] = useState(0);
  const { image, name, details, price } = productData;

  const handleBuyNow = () => {
    addToCart(productData, qty);
    handleShowCart();
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              alt="Product"
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                src={urlFor(item)}
                key={i}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">&#8377; {price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decreaseQuantity}>
                <AiOutlineMinus />
              </span>

              <span className="num">{qty}</span>

              <span className="plus" onClick={increaseQuantity}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => addToCart(productData, qty)}
            >
              Add to cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {similarProducts.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

//in dynamic route pages we can not use getStaticprops alone we also have to export getStaticPaths so that next can generate all possible static pages for different products

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
        slug{
            current
        }
    }`;
  //it says get all products but do not return all the data for a product only returns current slug

  const possibleProducts = await client.fetch(query);

  const paths = possibleProducts.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const slugValue = context.params.slug;
  const query = `*[ _type == "product" && slug.current == '${slugValue}'][0]`;
  //[0] means fetch the first product which matches with this query

  const similarProductQuery = '*[_type == "product"]';
  //for now we are using all products to show the similar products
  const similarProducts = await client.fetch(similarProductQuery);

  const product = await client.fetch(query);
  return {
    props: {
      productData: product,
      similarProducts,
    },
  };
};

export default ProductDetails;
