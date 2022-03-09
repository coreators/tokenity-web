import styles from './TokenItem.module.scss';

function TokenItem({ token }) {
  return (
    <div className={styles.item}>
      <div className={styles.symbol}></div>
      <div className={styles.balance}>
        <span>
          {token.balance.toLocaleString()} {token.symbol}
        </span>
        <div>$ {token.usd.toLocaleString()}</div>
      </div>
    </div>
  );
}

export default TokenItem;
