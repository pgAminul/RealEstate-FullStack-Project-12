import React from "react";
import {
  FaUsers,
  FaChartLine,
  FaBalanceScale,
  FaBusinessTime,
  FaBuilding,
  FaHandshake,
  FaSearch,
  FaHome,
} from "react-icons/fa";
import { MdReport } from "react-icons/md";

const services = [
  {
    icon: <FaUsers />,
    title: "Property Management",
    description:
      "Efficiently manage residential and commercial properties, ensuring maximum returns for owners.",
  },
  {
    icon: <FaChartLine />,
    title: "Capital Improvements",
    description:
      "Strategic planning for upgrades that increase property value and enhance tenant satisfaction.",
  },
  {
    icon: <MdReport />,
    title: "Financial Reporting",
    description:
      "Detailed insights into property performance with transparent and accurate financial reporting.",
  },
  {
    icon: <FaBusinessTime />,
    title: "Business Development",
    description:
      "Comprehensive strategies for expanding your real estate portfolio and market reach.",
  },
  {
    icon: <FaHome />,
    title: "Relocation Assistance",
    description:
      "Seamless guidance for relocating to new homes or offices, ensuring a stress-free experience.",
  },
  {
    icon: <FaBalanceScale />,
    title: "Recover Asset Value",
    description:
      "Expert guidance on recovering the full value of distressed or underperforming assets.",
  },
  {
    icon: <FaBuilding />,
    title: "Real Estate Consulting",
    description:
      "Professional advice to guide you in making informed property investment decisions.",
  },
  {
    icon: <FaHandshake />,
    title: "Leasing Services",
    description:
      "Match with the best tenants and secure reliable long-term rental income with ease.",
  },
  {
    icon: <FaSearch />,
    title: "Market Analysis",
    description:
      "Access detailed market insights to help you stay ahead in the ever-changing real estate landscape.",
  },
];

const ServiesCard = () => {
  return (
    <section className=" ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative group p-6 text-white bg-red-950 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50  shadow-lg rounded-lg text-center transform transition duration-300 hover:scale-105 hover:z-10"
          >
            <div className="text-yellow-500 text-4xl mb-4 group-hover:text-yellow-300 transition duration-300">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-yellow-300 transition duration-300">
              {service.title}
            </h3>
            <p className="">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiesCard;
