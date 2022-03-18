import TrendItem from "../../components/TrendWidget/TrendItem";
import { trendings } from "../../dummy_data/trendings";

const Settings = () => {
  return (
    <div className="home-box">
      <div className="home-box__title mobile_only">
        <h1>Trends</h1>
      </div>
      <div className="home-box__content">
        <div className="trend-list">
          {trendings.map((trend) => {
            return <TrendItem key={trend.id} trend={trend} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Settings;
