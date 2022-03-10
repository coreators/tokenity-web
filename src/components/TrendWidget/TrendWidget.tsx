import TrendItem from './TrendItem';
import { trendings } from '../../dummy_data/trendings';
import { Link } from 'react-router-dom';

// style file
import styles from './TrendWidget.module.scss';

function TrendWidget() {
  return (
    <div className={styles.trend_widget}>
      <div className={styles.header}>
        <h3>Trends</h3>
        <Link to="/trends">See all</Link>
      </div>
      <div className="trend-list">
        {trendings.map((trend) => {
          return <TrendItem key={trend.id} trend={trend} />;
        })}
      </div>
    </div>
  );
}

export default TrendWidget;
