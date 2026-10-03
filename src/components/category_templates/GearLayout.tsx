import { motion } from "motion/react"

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

const GearLayout = () => {
  return (
    <article className="mt-30 w-[95%] px-5 mx-auto mb-25 lg:w-[85%]">
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
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>

        <motion.img
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          src="/src/assets/images/home/large/image-best-gear.jpg"
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
        src="/src/assets/images/home/small/image-best-gear.jpg"
        alt=""
        className="rounded-lg mb-7 w-full md:hidden"
      />
      <motion.img
        variants={fadeRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        src="/src/assets/images/home/tablet/image-best-gear.jpg"
        alt=""
        className="rounded-lg mb-7 w-full hidden md:block lg:hidden"
      />

      <motion.h4
        variants={fadeLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mt-20 mb-10 text-center font-manrope font-bold text-[28px] tracking-[1px] md:text-[40px] md:leading-10 md:tracking-[1.43px] lg:hidden"
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
        Located at the heart of New York City, Audiophile is the premier store
        for high end headphones, earphones, speakers, and audio accessories. We
        have a large showroom and luxury demonstration rooms available for you
        to browse and experience a wide range of our products. Stop by our store
        to meet some of the fantastic people who make Audiophile the best place
        to buy your portable audio equipment.
      </motion.p>
    </article>
  );
}

export default GearLayout
