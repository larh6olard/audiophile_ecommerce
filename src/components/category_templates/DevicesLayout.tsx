import React from 'react'
import { useNavigate } from "react-router-dom"
import headphoneImg from "/images/home/image-xx99-mark-one-headphones.png";
import speakerImg from "/images/home/image-zx9-speaker.png";
import earphoneImg from "/images/home/image-yx1-earphones.png";
import { motion } from "motion/react"

interface productDetails {
  id: number;
  image: string;
  name: string;
  link: string;
}

const products: productDetails[] = [
  {
    id: 1,
    image: headphoneImg,
    name: "HEADPHONES",
    link: "/headphones-preview"
  },
  {
    id: 2,
    image: speakerImg,
    name: "SPEAKERS",
    link: "/speakers-preview"
  },
  {
    id: 3,
    image: earphoneImg,
    name: "EARPHONES",
    link: "/earphones-preview"
  },
]

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const DevicesLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-30 mt-40">
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="flex flex-col items-center justify-center space-y-20 md:flex-row md:space-x-3 md:space-y-0 mt-20 font-manrope"
      >
          {/* Headphones Card */}
          {products.map((product) => (
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              key={product.id}
              className="relative bg-[#F1F1F1] rounded-lg w-[95%] text-center pt-20 pb-10"
            >
              <img
                src={product.image}
                alt={product.name}
                className="absolute left-1/2 -top-[45%] transform -translate-x-1/2 w-45"
              />
              <h4 className="mt-6 text-lg font-bold text-[15px] tracking-[1.07px]">
                {product.name}
              </h4>
              <button
                className="mt-3 text-gray-500 font-bold tracking-[1px] text-[13px] cursor-pointer hover:text-[#D87D4A] transition-colors flex justify-center items-center m-auto"
                onClick={() => navigate(product.link)}
              >
                SHOP{" "}
                <span className="ml-2 text-[#D87D4A] inline-block text-xl">
                  &gt;
                </span>
              </button>
            </motion.div>
          ))}
      </motion.section>
    </div>
  );
}

export default DevicesLayout
