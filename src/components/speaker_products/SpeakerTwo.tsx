import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import speakerImage from "/images/speaker-zx7/desktop/image-gallery-1.jpg";
import gadgets from "/images/speaker-zx7/desktop/image-gallery-2.jpg";
import speakerTwo from "/images/speaker-zx7/desktop/image-gallery-3.jpg";
import productOne from "/images/headphone-mark-two/desktop/image-product-1.jpg";
import productTwo from "/images/headphone-mark-two/desktop/image-product-2.jpg";
import productThree from "/images/headphone-mark-two/desktop/image-product-3.jpg";
import DevicesLayout from "../category_templates/DevicesLayout";
import GearLayout from "../category_templates/GearLayout";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import QuantitySelector from "../reusables/QuantitySelector";
import Loadable from "../alert/Loadable";
import ProductDetailSkeleton from "../alert/ProductDetailSkeleton";
import { motion } from "motion/react";

const SpeakerTwo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id as Id<"products">;

  const speaker = useQuery(
    api.products.getProductById,
    productId ? { id: productId } : "skip",
  );

  const navigate = useNavigate();

  return (
    <div>
      <main className="mx-auto w-[90%] md:w-[87%] lg:w-[85%] lg:pt-15 py-5 pt-10">
        {/* Go Back */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileTap={{ scale: 0.97 }}
          className="text-gray-500 text-[15px] hover:text-[#d87d4a] cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Go Back
        </motion.button>

        <Loadable loading={!speaker} skeleton={<ProductDetailSkeleton />}>
          {speaker && (
            <div className="mt-10 md:flex md:space-x-10 lg:space-x-24">
              {/* Product Image */}
              <motion.img
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                }}
                src={speaker.image}
                alt={speaker.name}
                className="md:w-[50%] rounded-lg"
              />

              {/* Product Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: "easeOut",
                }}
                className="md:flex md:flex-col lg:space-y-7 md:space-y-5 md:justify-center md:text-left md:my-auto mt-10 text-left space-y-5"
              >
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
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
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3,
                  }}
                  className="font-bold text-[28px] lg:text-[40px] tracking-[1.43px] leading-8 lg:leading-11"
                >
                  ZX7 <br /> SPEAKER
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4,
                  }}
                  className="text-[15px] leading-6 text-gray-500 lg:pr-5 md:px-0"
                >
                  {speaker.description}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5,
                  }}
                  className="font-bold text-[18px] tracking-[1.29px]"
                >
                  ${speaker.price}
                </motion.p>

                {/* Quantity selector and Add to cart */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6,
                  }}
                >
                  <QuantitySelector productId={productId} />
                </motion.div>
              </motion.div>
            </div>
          )}
        </Loadable>

        {!productId && <p>Select a product</p>}
        {speaker === null && <p>Not found</p>}

        {/* Features / In The Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="mt-15 lg:flex lg:justify-between md:mt-18 lg:mt-24"
        >
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="lg:w-[60%]"
          >
            <h4 className="font-bold text-[32px] tracking-[1.14px]">
              FEATURES
            </h4>

            <p className="text-gray-500 md:mt-8 mt-4 lg:mt-5">
              Reap the advantages of a flat diaphragm tweeter cone. This
              provides a fast response rate and excellent high frequencies that
              lower tiered bookshelf speakers cannot provide. The woofers are
              made from aluminum that produces a unique and clear sound. XLR
              inputs allow you to connect to a mixer for more advanced usage.{" "}
              <br /> <br />
              The ZX7 speaker is the perfect blend of stylish design and high
              performance. It houses an encased MDF wooden enclosure which
              minimises acoustic resonance. Dual connectivity allows pairing
              through bluetooth or traditional optical and RCA input. Switch
              input sources and control volume at your finger tips with the
              included wireless remote. This versatile speaker is equipped to
              deliver an authentic listening experience.
            </p>
          </motion.div>

          {/* Mobile / Tablet In The Box Heading */}
          <motion.h5
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
            }}
            className="mt-15 font-bold text-[32px] tracking-[1.14px] lg:hidden md:mt-20"
          >
            IN THE BOX
          </motion.h5>

          {/* In The Box */}
          <motion.ul
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="mt-5 lg:mr-24 lg:flex lg:flex-col lg:space-y-3 md:float-end md:mr-30 md:mb-30 md:space-y-6"
          >
            <li className="font-bold text-[32px] tracking-[1.14px] hidden lg:block">
              IN THE BOX
            </li>

            <li className="lg:mt-2 text-gray-500">
              <span className="text-brown-v mr-5 font-bold">2x</span> Speaker
              Unit
            </li>

            <li className="text-gray-500">
              <span className="text-brown-v mr-5 font-bold">2x</span> Speaker
              Cloth Panel
            </li>

            <li className="text-gray-500">
              <span className="text-brown-v mr-5 font-bold">1x</span> User
              Manual
            </li>

            <li className="text-gray-500">
              <span className="text-brown-v mr-5 font-bold">1x</span> 3.5mm 7.5m
              Audion Cable
            </li>

            <li className="text-gray-500">
              <span className="text-brown-v mr-5 font-bold">1x</span> 7.5m
              Optical Cable
            </li>
          </motion.ul>
        </motion.div>

        {/* Image Container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="mt-20 space-y-5 md:grid md:grid-cols-3 md:grid-rows-2 md:gap-4 lg:gap-5 md:mt-25 md:h-[70vh] clear-both"
        >
          <motion.img
            variants={{
              hidden: {
                opacity: 0,
                scale: 0.95,
              },
              visible: {
                opacity: 1,
                scale: 1,
              },
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            src={speakerImage}
            alt="man using an headphone"
            className="rounded-lg md:my-auto md:h-full w-full"
          />

          <motion.img
            variants={{
              hidden: {
                opacity: 0,
                scale: 0.95,
              },
              visible: {
                opacity: 1,
                scale: 1,
              },
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            src={speakerTwo}
            alt="headphone mark two"
            className="md:col-span-2 md:row-span-2 md:my-auto rounded-lg md:w-full md:h-full hidden md:block"
          />

          <motion.img
            variants={{
              hidden: {
                opacity: 0,
                scale: 0.95,
              },
              visible: {
                opacity: 1,
                scale: 1,
              },
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            src={gadgets}
            alt=""
            className="rounded-lg md:my-auto md:h-full w-full"
          />

          <motion.img
            variants={{
              hidden: {
                opacity: 0,
                scale: 0.95,
              },
              visible: {
                opacity: 1,
                scale: 1,
              },
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            src={speakerTwo}
            alt=""
            className="rounded-lg md:hidden w-full"
          />
        </motion.div>

        {/* Products Container */}
        <div className="text-center md:mt-25 mt-20">
          <motion.h4
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="font-bold text-[32px] tracking-[1.14px] leading-9"
          >
            YOU MAY ALSO LIKE
          </motion.h4>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="mt-15 space-y-10 md:flex md:space-x-5 lg:space-x-7"
          >
            {/* Recommendation One */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 40,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              className="space-y-5 lg:space-y-7"
            >
              <img src={productOne} alt="" className="rounded-lg" />

              <h5 className="font-bold text-2xl tracking-[1.71px]">
                XX99 MARK I
              </h5>

              <motion.button
                whileTap={{ scale: 0.97 }}
                className="text-white w-44 bg-[#D87D4A] text-[13px] font-bold tracking-[1px] py-4 px-8 cursor-pointer hover:bg-[#fbaf85] transition-colors mx-auto"
              >
                SEE PRODUCT{" "}
              </motion.button>
            </motion.div>

            {/* Recommendation Two */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 40,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              className="space-y-5 lg:space-y-7"
            >
              <img src={productThree} alt="" className="rounded-lg" />

              <h5 className="font-bold text-2xl tracking-[1.71px]">XX59</h5>

              <motion.button
                whileTap={{ scale: 0.97 }}
                className="text-white w-44 bg-[#D87D4A] text-[13px] font-bold tracking-[1px] py-4 px-8 cursor-pointer hover:bg-[#fbaf85] transition-colors mx-auto"
              >
                SEE PRODUCT{" "}
              </motion.button>
            </motion.div>

            {/* Recommendation Three */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 40,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              className="space-y-5 lg:space-y-7"
            >
              <img src={productTwo} alt="" className="rounded-lg" />

              <h5 className="font-bold text-2xl tracking-[1.71px]">
                ZX9 SPEAKER
              </h5>

              <motion.button
                whileTap={{ scale: 0.97 }}
                className="text-white w-44 bg-[#D87D4A] text-[13px] font-bold tracking-[1px] py-4 px-8 cursor-pointer hover:bg-[#fbaf85] transition-colors mx-auto"
              >
                SEE PRODUCT{" "}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <DevicesLayout />

        <GearLayout />
      </main>
    </div>
  );
};

export default SpeakerTwo;
