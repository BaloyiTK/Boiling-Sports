import Link from "next/link";
import Image from 'next/image'
import React, { useState, useEffect } from "react";
import { getCategories } from "../services";
import Head from "next/head";


const Header = () => {

<Head>
  <title>Boining</title>
</Head>
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="flex items-center md:float-left block">
          <Link href={"/"}>
            <Image
              width={55}
              height={60}
              src="/LOGO.png"
              alt="Boiling Sports"
            />
          </Link>
          <Link href={"/"}>
            <span className="grid cursor-pointer font-bold text-white ml-1  text-2xl">
              <span className="text-red-700">Boiling </span>
              <span className="py-0"> Sports</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:float-left md:contents">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className="md:float-right align-middle text-white ml-4 font-semibold cursor-pointer">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
