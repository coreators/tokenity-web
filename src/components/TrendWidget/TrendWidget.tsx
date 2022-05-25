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
      <div className={styles.trendLists}>
        {trendings.map((trend, i) => {
          if (i <= 9) {
            return <TrendItem key={trend.rank} trend={trend} />;
          }
        })}
      </div>
    </div>
  );
}

export default TrendWidget;
