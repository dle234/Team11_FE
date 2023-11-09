import routes from "@/routes";
import HomeLayout from "../home/HomeLayout";
routes;
const HotTemplate = ({ datas, isFetching, modal }) => {
  return (
    <div>
      {datas &&
        !isFetching &&
        // eslint-disable-next-line react/prop-types
        datas.map((data, id) => (
          <HomeLayout
            modal={modal}
            id={id}
            data={data}
            what="hot"
            key={id}
            route={routes.hot}
          />
        ))}
    </div>
  );
};

export default HotTemplate;
