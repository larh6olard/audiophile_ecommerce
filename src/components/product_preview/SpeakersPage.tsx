import React from "react";
import DevicesLayout from "../category_templates/DevicesLayout";
import GearLayout from "../category_templates/GearLayout";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useNavigate } from "react-router-dom";
import type { Id } from "../../../convex/_generated/dataModel";
import ProductDetailSkeleton from "../alert/ProductDetailSkeleton";
import Loadable from "../alert/Loadable";
import { motion } from "motion/react";

const SpeakersPage: React.FC = () => {
  const navigate = useNavigate();

  const navigateTo = (product: string, id: Id<"products">) => {
    if (product === "ZX9 SPEAKER") {
      navigate(`/speakers-preview/product-details-speaker-zx9/${id}`);
    }

    if (product === "ZX7 SPEAKER") {
      navigate(`/speakers-preview/product-details-speaker-zx7/${id}`);
    }
  };

  const speakers = useQuery(api.products.getProducts);

  return (
    <div>
      <header className="bg-black py-15 lg:py-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-white text-[28px] font-bold tracking-[2px] lg:text-[40px] lg:tracking-[1.43px]"
        >
          SPEAKERS
        </motion.h1>
      </header>

      <main className="mx-auto w-[95%] md:w-[90%] lg:w-[85%]">
        <section className="mt-15 md:text-center lg:text-left space-y-20">
          <div className="">
            <Loadable
              loading={!speakers?.success}
              skeleton={<ProductDetailSkeleton />}
            >
              {speakers?.success &&
                speakers.data?.map(
                  (product) =>
                    product.category === "speaker" && (
                      <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                          once: true,
                          amount: 0.2,
                        }}
                        className="mb-10 md:mb-0 lg:flex lg:space-x-20 lg:mb-20"
                        key={product._id}
                      >
                        {/* Product Image */}
                        <motion.img
                          initial={{
                            opacity: 0,
                            x: -50,
                          }}
                          whileInView={{
                            opacity: 1,
                            x: 0,
                          }}
                          viewport={{
                            once: true,
                            amount: 0.2,
                          }}
                          transition={{
                            duration: 0.7,
                            ease: "easeOut",
                          }}
                          src={product.image}
                          alt={product.name}
                          className="lg:w-[50%] md:w-full rounded-lg md:h-[500px] sm:h-full"
                        />

                        {/* Product Information */}
                        <motion.div
                          initial={{
                            opacity: 0,
                            x: 50,
                          }}
                          whileInView={{
                            opacity: 1,
                            x: 0,
                          }}
                          viewport={{
                            once: true,
                            amount: 0.2,
                          }}
                          transition={{
                            duration: 0.7,
                            ease: "easeOut",
                            delay: 0.1,
                          }}
                          className="flex flex-col space-y-5 justify-center md:mt-20 text-center lg:text-left lg:my-auto mt-15"
                        >
                          <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.5,
                              delay: 0.2,
                            }}
                            className="text-sm tracking-[10px] text-brown-v"
                          >
                            NEW PRODUCT
                          </motion.h2>

                          <motion.h3
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.5,
                              delay: 0.3,
                            }}
                            className="font-bold text-[28px] lg:text-[40px] tracking-[1.43px] lg:leading-11"
                          >
                            {product.name}
                          </motion.h3>

                          <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.5,
                              delay: 0.4,
                            }}
                            className="text-[15px] leading-6 text-gray-500 px-5 lg:px-0"
                          >
                            {product.description}
                          </motion.p>

                          <motion.button
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.5,
                              delay: 0.5,
                            }}
                            whileTap={{ scale: 0.97 }}
                            className="text-white w-44 bg-[#D87D4A] text-[13px] font-bold tracking-[1px] py-4 px-8 cursor-pointer hover:bg-[#fbaf85] transition-colors mx-auto lg:mx-0"
                            onClick={() =>
                              navigateTo(product.name, product._id)
                            }
                          >
                            SEE PRODUCT
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    ),
                )}
            </Loadable>
          </div>
        </section>

        <DevicesLayout />

        <GearLayout />
      </main>
    </div>
  );
};

export default SpeakersPage;
