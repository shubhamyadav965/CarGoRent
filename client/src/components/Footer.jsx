import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-20 py-12 bg-gray-50 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-8 border-b border-gray-200">
          {/* Logo and Description - Takes more space */}
          <div className="lg:col-span-5">
            <img
              src={assets.logo}
              alt="CarGoRent Logo"
              className="h-20 md:h-24 w-auto object-contain mb-4"
              style={{ mixBlendMode: "multiply" }}
            />
            <p className="max-w-sm text-gray-600 leading-relaxed">
              Premium car rental service offering a wide range of vehicles for
              all your travel needs. Experience luxury and comfort on the road
              with us.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="hover:opacity-70 transition-opacity">
                <img
                  src={assets.facebook_logo}
                  alt="facebook"
                  className="w-5 h-5"
                />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <img
                  src={assets.instagram_logo}
                  alt="instagram"
                  className="w-5 h-5"
                />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <img
                  src={assets.twitter_logo}
                  alt="twitter"
                  className="w-5 h-5"
                />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <img src={assets.gmail_logo} alt="gmail" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h2 className="text-base font-semibold text-gray-800 mb-4">
              Quick Links
            </h2>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Browse Cars
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  List Your Car
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h2 className="text-base font-semibold text-gray-800 mb-4">
              Resources
            </h2>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms of Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Insurance
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="text-base font-semibold text-gray-800 mb-4">
              Contact Us
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">📍</span>
                <span>
                  IIT Bhagalpur
                  <br />
                  Bhagalpur, Bihar
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">📞</span>
                <a
                  href="tel:+919651565404"
                  className="hover:text-primary transition-colors"
                >
                  +91 9651565404
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✉️</span>
                <a
                  href="mailto:info@cargorent.com"
                  className="hover:text-primary transition-colors"
                >
                  info@cargorent.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between py-6 text-gray-500">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-primary font-semibold">CarGoRent</span>. All
            rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Privacy
              </a>
            </li>
            <li className="text-gray-300">|</li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Terms
              </a>
            </li>
            <li className="text-gray-300">|</li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Sitemap
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
