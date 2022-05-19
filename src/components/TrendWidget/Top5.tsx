import TrendItem from './TrendItem';
import { trendings } from '../../dummy_data/trendings';
import { Link } from 'react-router-dom';

// style file
import styles from './TrendWidget.module.scss';
import Top5Item from './Top5Item';

function Top5() {
  return (
    <div className={styles.trend_widget}>
      <div className={styles.header}>
        <h3>Top5</h3>
      
      </div>
      <div className={styles.trendLists}>
        {trendings.map((trend) => {
          return <Top5Item key={trend.id} trend={trend} />;
        })}
      </div>
    </div>
  );
}

export default Top5;
