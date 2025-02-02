import React from "react";
import Title from "../../ReusableCompnents/Title";
import TeamCard from "./TeamCard";

export default function OurTeam() {
  return (
    <div>
      <Title
        title={"Meet Our Team"}
        description={
          "Our team is passionate and delivers exceptional results for clients."
        }
      />
      <TeamCard />
    </div>
  );
}
