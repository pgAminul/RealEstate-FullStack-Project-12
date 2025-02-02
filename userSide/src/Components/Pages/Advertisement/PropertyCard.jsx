import React from "react";
import Card from "../../ReusableCompnents/Card";

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-purple-950 px-2 py-4 ">
      <Card
        image={property.image}
        location={property.location}
        priceMin={property.priceMin}
        priceMax={property.priceMax}
        verificationStatus={property.verificationStatus}
        _id={property._id}
      />
    </div>
  );
};

export default PropertyCard;
