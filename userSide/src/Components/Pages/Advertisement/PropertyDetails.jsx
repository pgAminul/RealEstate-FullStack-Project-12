import DashboardTitle from "../../ReusableCompnents/DashboardTitle";
import IdWiseQuery from "../../TanstakQuery/IdWiseQuery";
import DetailsCard from "./DetailsCard";

export default function PropertyDetails() {
  const [, data] = IdWiseQuery();
  console.log(data);
  console.log(data.agentImg);
  return (
    <div className="bg-purple-950 py-5 ">
      <DashboardTitle
        title={`${data.title}`}
        description={"Your Satisfaction Our Achievement"}
      />
      <DetailsCard
        propertyImage={data.image}
        title={data.title}
        location={data.location}
        agentName={data.agentName}
        agentImg={data.agentImg}
        agentEmail={data.agentEmail}
        verified={data.verificationStatus}
        Minprice={data.priceMin}
        MaxPrice={data.priceMax}
      />
    </div>
  );
}
