import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";


const Footer = () => {
  return (
    <div>
      <div className="text-white text-center grid grid-col-1 lg:grid-cols-3 bg-gray-700">
        <div className="mt-5 lg:mt-auto mb-auto">
          <Link href={"/"}>
            <Image
              width={100}
              height={100}
              src="/LOGO.png"
              alt="Boiling Sports"
            />
          </Link>
        </div>
        <div>
          <h3 className="font-bold mt-5">Follow Us</h3>

          <div className=" m-5 items-center text-center">
            <div>
              <SocialIcon
                fgColor="white"
                style={{ height: 40, width: 40 }}
                url="https://twitter.com/BoilingSports"
                target="_blank"
              />
              
            </div>
          </div>
          <div className=" m-5 items-center text-center">
            <div>
              <SocialIcon
                fgColor="white"
                style={{ height: 40, width: 40 }}
                url="https://www.facebook.com/profile.php?id=100086540526249"
                target="_blank"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold mt-5">Contact Us</h3>
          <p className="mt-5">
            <a href="mailto:boilingsports@gmail.com" title=" boiling sports email">Email</a>
        
          </p>
     
        </div>
      </div>
      <div className="text-white grid-cols-1 block items-center lg:grid grid-cols-2 bg-black text-xs">
        <div className="grid justify-items-center lg:justify-items-start">
          <p className="pl-1 m-2">
            &copy; 2022 BoilingSports.com. All rights reserved.
          </p>
        </div>
        <div className="grid justify-items-center lg:justify-items-end">
          <div className="flex items-center ">
            <p className="m-2">
              designed by: <span className="text-green-500">TK</span>
            </p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
