import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" bg-purple-950 border-t-2 border-purple-400 to-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Website Name */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold">HomeHaven </h2>
            <p className="text-white mt-2">
              HomeHaven helps you find your dream home effortlessly. Buy, sell,
              or rent – your haven is just a click away!
            </p>
          </div>
          {/* Links */}
          <div className="">
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white hover:text-yellow-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-yellow-600">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-yellow-600">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-yellow-600">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          {/* Social Media Icons */}
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=100032484008187"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-600 transition duration-300"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://x.com/aminul_islam_S"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-600 transition duration-300"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/md-aminul-islam-showrov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-600 transition duration-300"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href="https://www.instagram.com/aminul_islam_showrov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-600 transition duration-300"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center text-white text-sm">
          © {new Date().getFullYear()} CareerPro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
