import styles from "./CoinItem.module.scss";

function CoinItem({ nft }) {
  return (
    <div className={styles.item}>
      <div>
        <img src={nft.imageUrl} alt="" />
      </div>
      <div>
        <div>{nft.name}</div>
        <div>{nft.date}</div>
      </div>
      <div className={styles.values}>
        <div>
          {nft.balance.toLocaleString()} {nft.symbol}
        </div>
        <div>$ {nft.usd.toLocaleString()}</div>
      </div>
    </div>
  );
}

export default CoinItem;
