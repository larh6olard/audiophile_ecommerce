import React from "react";
import homeSpeakerPreviewImg from "/images/home/speaker-zx9-image.png";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";

interface imagePreview {
  id: number;
  name: string;
  imageLink: string;
  to: string;
}

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

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
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

const Home: React.FC = () => {
  const navigate = useNavigate();

  const imagePreview: imagePreview[] = [
    {
      id: 1,
      name: "HEADPHONES",
      imageLink: "/images/home/image-xx99-mark-one-headphones.png",
      to: "/headphones-preview",
    },
    {
      id: 2,
      name: "SPEAKERS",
      imageLink: "/images/home/image-zx9-speaker.png",
      to: "/headphones-preview",
    },
    {
      id: 3,
      name: "EARPHONES",
      imageLink: "/images/home/image-yx1-earphones.png",
      to: "/headphones-preview",
    },
  ];

  return (
    <div className="font-manrope">
      <main>
        <section className="home-bg text-white flex flex-col items-center justify-center px-8 space-y-7 font-manrope lg:items-start lg:pl-35 lg:space-y-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gray-500 tracking-[10px]"
          >
            NEW PRODUCT
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-bold text-4xl text-center md:text-[56px] tracking-[1.2px] md:tracking-[2px]"
          >
            XX99 MARK II <br /> HEADPHONES
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.75, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="opacity-75 text-[15px]  text-center lg:text-left md:mb-10 "
          >
            Experience natural, lifelike audio and exceptional build{" "}
            <br className="md:block hidden" /> quality made for the passionate
            music <br className="md:block hidden" /> enthusiast
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#D87D4A] text-[13px] font-bold tracking-[1px] py-4 px-8 cursor-pointer hover:bg-[#fbaf85] transition-colors"
            href="#products-preview"
          >
            SEE PRODUCTS
          </motion.a>
        </section>

        {/* Producs Preview */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="flex flex-col items-center justify-center space-y-20 md:flex-row md:space-x-5 md:space-y-0 md:px-10 md:mt-30 mt-25 px-3 font-manrope lg:mx-17"
          id="products-preview"
        >
          {imagePreview.map((item) => (
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="relative bg-[#F1F1F1] rounded-lg w-[95%] text-center pt-20 pb-10"
              key={item.id}
            >
              <motion.img
                src={item.imageLink}
                alt={item.name}
                className="absolute left-1/2 -top-[45%] transform -translate-x-1/2 w-45"
              />
              <h4 className="mt-6 text-lg font-bold text-[15px] tracking-[1.07px]">
                {item.name}
              </h4>
              <Link
                to={item.to}
                className="mt-3 text-gray-500 font-bold tracking-[1px] text-[13px] cursor-pointer hover:text-[#D87D4A] transition-colors flex justify-center items-center m-auto hover:mr-1"
              >
                SHOP{" "}
                <span className="ml-2 text-[#D87D4A] inline-block text-xl">
                  &gt;
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.section>

        <section className="mt-20 px-2 mb-10">
          {/* Mobile and Tablet View */}
          <div className="relative brown-color-v w-[95%] mx-auto rounded-lg text-white flex flex-col justify-center items-center text-center space-y-7 font-manrope px-10 py-25 pb-20 md:pb-20 mb-10 lg:w-[85%] overflow-hidden lg:hidden">
            {/* Decorative SVG background */}
            <svg
              width="944"
              height="944"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-[-70px] left-1/2 transform -translate-x-1/2 z-0 opacity-20"
            >
              <g stroke="#FFF" fill="none" fillRule="evenodd">
                <circle cx="472" cy="472" r="235.5" />
                <circle cx="472" cy="472" r="270.5" />
                <circle cx="472" cy="472" r="471.5" />
              </g>
            </svg>

            {/* Foreground content */}
            <motion.img
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              src={homeSpeakerPreviewImg}
              alt="speaker-image-preview"
              className="w-[45%] mx-auto z-20"
            />
            <h3 className="text-4xl font-bold tracking-[1.29px]">
              ZX9 <br /> SPEAKER
            </h3>
            <p className="text-[15px] z-10 px-5">
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound
            </p>
            <button
              className="bg-black px-5 py-3 cursor-pointer tracking-[1px] text-[13px] font-bold z-10 hover:bg-[#4c4c4c] transition-colors"
              onClick={() => navigate("/speakers-preview")}
            >
              SEE PRODUCT
            </button>
          </div>

          {/* Desktop View */}
          <div className="hidden relative brown-color-v w-[95%] mx-auto rounded-lg text-white lg:flex lg:flex-col lg:justify-center lg:items-center text-center lg:space-y-7 font-manrope px-10 py-20 mb-10 lg:w-[85%] overflow-hidden">
            {/* Decorative SVG background */}
            <svg
              width="944"
              height="944"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-[-70px] left-1/2 transform -translate-x-1/2 z-0 opacity-20"
            >
              <g stroke="#FFF" fill="none" fillRule="evenodd">
                <circle cx="472" cy="472" r="235.5" />
                <circle cx="472" cy="472" r="270.5" />
                <circle cx="472" cy="472" r="471.5" />
              </g>
            </svg>

            {/* Foreground content */}
            <div className="lg:flex lg:items-center lg:justify-center">
              <motion.img
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                src={homeSpeakerPreviewImg}
                alt="speaker-image-preview"
                className="mx-auto z-20 ml-5"
              />
              <motion.div
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="flex flex-col justify-start items-start space-y-10 ml-25"
              >
                <h3 className="text-[56px] leading-14 font-bold tracking-[2px] text-left">
                  ZX9 <br /> SPEAKER
                </h3>
                <p className="text-[15px] z-10 text-left">
                  Upgrade to premium speakers that are phenomenally built to
                  deliver truly remarkable sound
                </p>
                <button
                  className="bg-black px-5 py-3 cursor-pointer tracking-[1px] text-[13px] font-bold z-10 hover:bg-[#4c4c4c] transition-colors"
                  onClick={() => navigate("/speakers-preview")}
                >
                  SEE PRODUCT
                </button>
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className={`speaker-zx w-[95%] mx-auto rounded-lg font-manrope px-8 flex flex-col justify-center md:px-20 lg:px-30`}
          >
            <h3 className="font-bold text-[28px] tracking-[2px]">
              ZX7 SPEAKER
            </h3>
            <button
              className="border-2 border-gray-600 tracking-[1px] font-bold text-[13px] px-7 py-3 w-40 cursor-pointer mt-10 hover:bg-black hover:text-white transition-colors"
              onClick={() => navigate("/speakers-preview")}
            >
              SEE PRODUCT
            </button>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-10 w-[95%] mx-auto md:flex md:justify-between space-x-3 lg:w-[85%]"
          >
            <motion.img
              variants={fadeLeft}
              transition={{ duration: 0.7 }}
              src="/images/home/image-earphones-yx1.jpg"
              alt=""
              className="rounded-lg w-full md:hidden"
            />
            <motion.img
              variants={fadeLeft}
              transition={{ duration: 0.7 }}
              src="/images/home/tablet/image-earphones-yx1.jpg"
              alt=""
              className="rounded-lg w-full md:w-[50%] hidden md:block lg:hidden"
            />
            <motion.img
              variants={fadeLeft}
              transition={{ duration: 0.7 }}
              src="/images/home/large/image-earphones-yx1.jpg"
              alt=""
              className="rounded-lg w-full md:w-[50%] hidden lg:block"
            />

            <motion.div
              variants={fadeRight}
              transition={{ duration: 0.7 }}
              className="bg-[#f1f1f1] rounded-lg px-7 py-20 font-manrope mt-10 md:m-0 md:w-[50%] md:px-12"
            >
              <h3 className="font-bold text-[28px] tracking-[2px]">
                YX1 EARPHONES
              </h3>
              <button
                className="border-2 border-gray-600 tracking-[1px] font-bold text-[13px] px-7 py-3 w-40 cursor-pointer mt-10 hover:bg-black hover:text-white transition-colors"
                onClick={() => navigate("/earphones-preview")}
              >
                SEE PRODUCT
              </button>
            </motion.div>
          </motion.div>
        </section>

        <article className="mt-5 w-[95%] px-5 mx-auto mb-20 lg:w-[85%]">
          {/* Desktop View */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:flex lg:space-x-12 lg:items-center lg:justify-between"
          >
            <div className="">
              <h4 className="lg:my-10 text-left font-manrope font-bold lg:text-[40px] lg:leading-10 lg:tracking-[1.43px]">
                BRINGING YOU THE
                <span className="text-[#d87d4a]"> BEST </span> AUDIO GEAR
              </h4>
              <p className="text-left font-manrope text-[15px] lg:text-gray-500 lg:leading-6">
                Located at the heart of New York City, Audiophile is the premier
                store for high end headphones, earphones, speakers, and audio
                accessories. We have a large showroom and luxury demonstration
                rooms available for you to browse and experience a wide range of
                our products. Stop by our store to meet some of the fantastic
                people who make Audiophile the best place to buy your portable
                audio equipment.
              </p>
            </div>

            <motion.img
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              src="/images/home/large/image-best-gear.jpg"
              alt=""
              className="rounded-lg lg:w-[50%]"
            />
          </motion.div>

          {/* Mobile and Tablet Views */}
          <motion.img
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            src="/images/home/small/image-best-gear.jpg"
            alt=""
            className="rounded-lg mb-7 w-full md:hidden"
          />
          <motion.img
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            src="/images/home/tablet/image-best-gear.jpg"
            alt="image-best-gear.jpg"
            className="rounded-lg mb-7 w-full hidden md:block lg:hidden"
          />

          <motion.h4
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mt-10 mb-10 text-center font-manrope font-bold text-[28px] tracking-[1px] md:text-[40px] md:leading-10 md:tracking-[1.43px] lg:hidden"
          >
            BRINGING YOU THE <br className="md:hidden" />{" "}
            <span className="text-[#d87d4a]">BEST</span>{" "}
            <br className="hidden md:block" />
            AUDIO GEAR
          </motion.h4>
          <motion.p
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-center font-manrope text-[15px] text-gray-500 leading-6 md:px-15 lg:hidden"
          >
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </motion.p>
        </article>
      </main>
    </div>
  );
};

export default Home;
