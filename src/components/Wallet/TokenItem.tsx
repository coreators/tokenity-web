import styles from "./TokenItem.module.scss";

import cosmIcon from "../../assets/coin-icons/cosm.png";

function TokenItem({ token }) {


  let iconSrc = "";
  switch (token.symbol) {
    case "COSM":
      iconSrc = cosmIcon;
      break;
  }    

  return (
    <div className={styles.item}>
      <div className={styles.symbol}><img src={iconSrc} alt="" /></div>
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
