interface ProductTypes {
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  stock_quantity: number;
}

const productData: ProductTypes[] = [
  {
    name: "XX99 MARK II HEADPHONES",
    category: "headphone",
    description:
      "The new XX99 Mark II is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
    price: 2999,
    image: "/images/headphone-mark-two/desktop/image-product.jpg",
    stock_quantity: 25,
  },
  {
    name: "XX99 MARK I HEADPHONES",
    category: "headphone",
    description:
      "As the gold standard for the headphones, the classic XX99 Mark I offers detailed and accurate audio representation for audiophiles, mixing engineers and music aficionados alike in studios and on the go.",
    price: 1750,
    image: "/images/headphone-xx59/desktop/image-product-3.jpg",
    stock_quantity: 25,
  },
  {
    name: "XX59 HEADPHONES",
    category: "headphone",
    description:
      "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
    price: 899,
    image: "/images/headphone-mark-one/desktop/image-product-1.jpg",
    stock_quantity: 20,
  },
  {
    name: "ZX9 SPEAKER",
    category: "speaker",
    description:
      "Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
    price: 4500,
    image: "/images/speaker-zx9/desktop/image-product-2.jpg",
    stock_quantity: 18,
  },
  {
    name: "ZX7 SPEAKER",
    category: "speaker",
    description:
      "Stream high quality sound wirelessly with minimal to no loss. The ZX7 speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.",
    price: 3500,
    image: "/images/speaker-zx7/desktop/image-product.jpg",
    stock_quantity: 25,
  },
  {
    name: "YX1 WIRELESS EARPHONES",
    category: "earphone",
    description:
      "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
    price: 599,
    image: "/images/earphone-yx1/desktop/image-product.jpg",
    stock_quantity: 20,
  },
];

export default productData;