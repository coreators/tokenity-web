import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import walletData from '../../dummy_data/wallet.js';
import TokenItem from '../../components/Wallet/TokenItem';

import styles from './Wallet.module.scss';
import NFTItem from '../../components/Wallet/NFTItem';

const Wallet = () => {
  // mock data
  // total cosm
  // total dollar
  // wallet address
  // list token
  // list nfts

  // token name
  // cosm
  // Buy or sell
  // date
  //

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="home-box">
      <div className={styles.header}>
        {/* total price */}

        <h2>
          {walletData.total_cosm.toLocaleString()} <small>COSM</small>
        </h2>
        <p>$ {walletData.total_usd.toLocaleString()}</p>

        {/* wallet address copy */}
        <button>
          <div>{walletData.address}</div>
        </button>
      </div>
      {/* tabs */}

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Tokens" value="1" />
              <Tab label="NFTs" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {/* Lists */}

            {walletData.tokens.map((token) => {
              return <TokenItem key={token.symbol} token={token} />;
            })}
          </TabPanel>
          <TabPanel value="2">
            {/* nfts */}

            {walletData.nfts.map((nft) => {
              return <NFTItem key={nft.id} nft={nft} />;
            })}
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default Wallet;
