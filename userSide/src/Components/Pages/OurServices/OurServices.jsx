import React from "react";
import Title from "../../ReusableCompnents/Title";
import ServiesCard from "./ServicesCard";
export default function OurServices() {
  return (
    <div>
      <Title
        title={"Our Services"}
        description={"Expert real estate services designed to meet your needs."}
      />
      <ServiesCard />
    </div>
  );
}
