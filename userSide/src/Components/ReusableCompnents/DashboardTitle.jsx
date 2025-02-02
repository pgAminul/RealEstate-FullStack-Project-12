export default function DashboardTitle({ title, description }) {
  return (
    <div className="text-center  py-4">
      <h2 className="text-3xl text-yellow-200 mb-2 md:mb-3 md:text-5xl">
        {title}
      </h2>
      <p className="md:text-2xl text-yellow-300">--- {description} ---</p>
    </div>
  );
}
