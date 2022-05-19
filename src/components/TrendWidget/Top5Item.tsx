import React from 'react';
import styles from './TrendItem.module.scss';

function TrendItem({ trend }) {
  return (
    <div className={styles.item}>
      <div className={styles.rank}>{trend.rank}</div>
      <div className={styles.profileImage}>
        <img src={trend.profileImageUrl} alt="profile" />
      </div>
      <div className={styles.id}>{trend.id}</div>
      <div className={styles.values}>
        <div className={trend.isPlus ? styles.green : styles.red}>
          {trend.isPlus ? '+' : '-'} {trend.percent.toLocaleString()}%
        </div>
        <span>{trend.value.toLocaleString()} COSM</span>
      </div>
    </div>
  );
}

export default TrendItem;
