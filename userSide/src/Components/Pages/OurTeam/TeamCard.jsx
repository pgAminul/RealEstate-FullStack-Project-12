import React from "react";

const teamMembers = [
  {
    name: "Aminul islam",
    role: "Chair Manager",
    description:
      "Aminul leads the team with over 15 years of experience in real estate management. His dedication and strategic thinking ensure that the company stays on top of the latest market trends.",
    img: "https://i.ibb.co/wW93yy6/myimg.jpg",
  },
  {
    name: "Jorina Akther",
    role: "Real Estate Agent",
    description:
      "Jorina is a dedicated real estate agent who prides herself on matching clients with their perfect homes. With her deep market knowledge and client-focused approach, she ensures a seamless and satisfying experience.",
    img: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Jerry Edwards",
    role: "Sales Manager",
    description:
      "Jerry is a highly driven and results-oriented sales manager with a knack for closing deals and maximizing revenue. He thrives on building strong relationships with clients and team members alike.",
    img: "https://images.pexels.com/photos/2955376/pexels-photo-2955376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },

  {
    name: "Donald Douglas",
    role: "Marketing Strategist",
    description:
      "Donald brings a wealth of experience in digital marketing strategies that enhance brand visibility and customer engagement. His innovative approach to marketing has driven numerous successful campaigns.",
    img: "https://img.freepik.com/free-photo/confident-cheerful-young-businesswoman_1262-20881.jpg",
  },
];

const TeamCard = () => {
  return (
    <section className=" pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mx-auto">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="relative group bg-white rounded-lg overflow-hidden shadow-md "
          >
            <img
              src={member.img}
              alt={member.name}
              className="mx-auto w-full h-72 object-cover p-2 rounded-2xl"
            />
            <div className="p-4 group-hover:hidden">
              <h3 className="text-lg font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="">{member.role}</p>
            </div>
            <div className="absolute inset-0 bg-black text-white bg-opacity-90 p-6 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-red-500">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className=" mb-4">{member.role}</p>
              <p className=" text-center">{member.description}</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-600">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-blue-700 hover:text-blue-900">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="text-red-600 hover:text-red-800">
                  <i className="fab fa-google-plus-g"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamCard;
