import React, { useEffect, useState } from "react";
import logo from "/logo.svg";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Cart from "./modals/Cart";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import CartCount from "./reusables/CartCount";
import useCartContext from "../hooks/useCartContext";

type navProps = {
  id: number;
  to: string;
  name: string;
};

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen || isModalOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isModalOpen]);

  const { sessionId } = useCartContext();
  const cart = useQuery(api.carts.getCart, { sessionId });

  const itemCount = cart?.length ?? 0;

  const activeClass: string = `text-[#d87d4a]`;
  const noActiveClass: string = `text-white`;

  const navProps: navProps[] = [
    { id: 1, to: "/", name: "HOME" },
    { id: 2, to: "/headphones-preview", name: "HEADPHONES" },
    { id: 3, to: "/speakers-preview", name: "SPEAKERS" },
    { id: 4, to: "/earphones-preview", name: "EARPHONES" },
  ];

  type returnVoid = () => void;

  const handleMenuBtn: returnVoid = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="font-manrope">
      <header
        className={`bg-[#0E0E0E] flex justify-between items-center py-8 px-6 border-b border-gray-600 md:hidden`}
      >
        <button
          onClick={handleMenuBtn}
          className="focus:outline-none focus:ring-2 focus:ring-[#d87d4a] focus:ring-offset-2 rounded transition-colors"
        >
          {""}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#fff"
            className="cursor-pointer focus:border focus:border-gray-400 focus:rounded focus:outline-2 focus:outline-[#d87d4a] focus:outline-offset-2 transition-colors"
            onClick={handleMenuBtn}
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </button>

        <img
          src={logo}
          className="cursor-pointer"
          onClick={() => navigate("/")}
          alt="audiophile-logo"
        />

        {/* No of Cart Item */}
        {
          <CartCount
            itemCount={itemCount}
            onOpen={() => setIsModalOpen(true)}
          />
        }
      </header>

      {/* Tablet Navigation */}
      <header className="md:bg-[#0E0E0E] md:flex md:justify-between md:items-center md:p-10 hidden lg:hidden">
        <div className="hidden md:flex md:flex-row lg:hidden">
          <button
            onClick={handleMenuBtn}
            className="focus:outline-none focus:ring-2 focus:ring-[#d87d4a] focus:ring-offset-2 rounded transition-colors"
          >
            {""}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#fff"
              className="cursor-pointer focus:border focus:border-gray-400 focus:rounded focus:outline-2 focus:outline-[#d87d4a] focus:outline-offset-2 transition-colors"
              onClick={handleMenuBtn}
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </button>

          <img
            src={logo}
            className="md:ml-12 md:block hidden lg:hidden m-0 cursor-pointer"
            onClick={() => navigate("/")}
            alt="audiophile-logo"
          />
        </div>

        {/* No of Cart Item */}
        <CartCount itemCount={itemCount} onOpen={() => setIsModalOpen(true)} />
      </header>

      {/* Click Menu Btn - Mobile Navigation */}
      <nav
        className={`absolute top-22 left-[-50%] w-[50%] h-screen bg-[#191919] flex flex-col justify-start space-y-8 px-8 py-15 md:mt-4 
         text-white font-semibold text-lg tracking-wide transition-all duration-500 ease-in-out 
         peer-checked:left-0 lg:hidden z-50 ${
           isMenuOpen ? "translate-x-full back" : "translate-x-0"
         }`}
      >
        <IoMdClose
          size={24}
          className="absolute right-8 top-7.5 cursor-pointer hover:text-[#d87d4a] transition-colors"
          onClick={handleMenuBtn}
        />
        {navProps.map((item) => (
          <NavLink
            to={item.to}
            key={item.id}
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `hover:text-[#d87d4a] transition-colors cursor-pointer ${
                isActive ? activeClass : noActiveClass
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      {/* Dark Overlay */}
      {isMenuOpen && (
        <div
          className="inset-0 z-40 fixed bg-black/40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Desktop Navigation */}
      <header className="hidden lg:bg-[#0E0E0E] lg:flex lg:justify-between lg:items-center lg:py-10 lg:px-35">
        <img
          src={logo}
          className="cursor-pointer"
          alt="audiophile-logo"
          onClick={() => navigate("/")}
        />
        <nav className="text-white space-x-10">
          {navProps.map((item) => (
            <NavLink
              to={item.to}
              key={item.id}
              className={({ isActive }) =>
                `hover:text-[#d87d4a] transition-colors cursor-pointer ${
                  isActive ? activeClass : noActiveClass
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* No of Cart Item */}
        <CartCount itemCount={itemCount} onOpen={() => setIsModalOpen(true)} />
      </header>

      {/* Cart Modal */}
      {isModalOpen && <Cart onClose={() => setIsModalOpen(false)} />}
      {/* Dark Overlay */}
      {isModalOpen && (
        <div
          className="inset-0 z-40 fixed bg-black/40"
          onClick={() => setIsModalOpen(false)}
        ></div>
      )}
      <div className="bg-[#0E0E0E]">
        <div className="border border-t-gray-400 lg:mx-35 md:mx-27"></div>
      </div>

      <Outlet />

      <footer className="bg-[#101010] text-white text-center">
        <div className="w-25 h-1 bg-[#d87d4a] mx-auto md:m-0 md:ml-7 lg:m-0 lg:ml-30"></div>
        <div className="px-7 py-12 md:text-left lg:px-30 lg:py-15">
          <div className="lg:flex lg:justify-between">
            <img
              src={logo}
              className="mb-8 lg:mb-5 mx-auto md:mx-0"
              alt="audiophile-logo"
            />
            <nav className="flex flex-col md:flex-row md:space-x-10 md:items-start items-center mt-5 lg:mt-0 space-y-5 font-manrope font-bold text-[13px] tracking-[2px] leading-6">
              <Link
                to="/"
                className="hover:text-[#d87d4a] transition-colors cursor-pointer"
              >
                HOME
              </Link>
              <Link
                to="/headphones-preview"
                className="hover:text-[#d87d4a] transition-colors cursor-pointer"
              >
                HEADPHONES
              </Link>
              <Link
                to="/speakers-preview"
                className="hover:text-[#d87d4a] transition-colors cursor-pointer"
              >
                SPEAKERS
              </Link>
              <Link
                to="/earphones-preview"
                className="hover:text-[#d87d4a] transition-colors cursor-pointer"
              >
                EARPHONES
              </Link>
            </nav>
          </div>

          <div className="lg:flex lg:justify-between lg:items-center lg:space-x-90">
            <p className="my-10 text-gray-500 leading-6">
              Audiophile is an all in one stop to fulfill your audio needs.
              We're a small team of music lovers and sound specialists who are
              devoted to helping you get the most out of personal audio. Come
              and visit our demo facility - we’re open 7 days a week.
            </p>
            <ul className="lg:flex lg:space-x-5 md:mt-0 hidden lg:self-end lg:mb-10">
              <li>
                <a href="https://www.facebook.com">
                  {""}
                  <AiFillFacebook
                    size={24}
                    className="hover:text-[#d87d4a] cursor-pointer transition-colors"
                  />
                </a>
              </li>
              <li>
                <a href="https://www.x.com">
                  {""}
                  <FaTwitter
                    size={24}
                    className="hover:text-[#d87d4a] cursor-pointer transition-colors"
                  />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com">
                  {""}
                  <FaInstagram
                    size={24}
                    className="hover:text-[#d87d4a] cursor-pointer transition-colors"
                  />
                </a>
              </li>
            </ul>
          </div>

          <div className="md:grid md: grid-cols-7">
            <span className="text-gray-500 block col-span-6">
              Copyright 2021. All Rights Reserved
            </span>
            <ul className="flex space-x-5 mt-7 justify-center md:mt-0 lg:hidden">
              <li>
                <AiFillFacebook
                  size={24}
                  className="hover:text-[#d87d4a] cursor-pointer transition-colors"
                />
              </li>
              <li>
                <FaTwitter
                  size={24}
                  className="hover:text-[#d87d4a] cursor-pointer transition-colors"
                />
              </li>
              <li>
                <FaInstagram
                  size={24}
                  className="hover:text-[#d87d4a] cursor-pointer transition-colors"
                />
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
