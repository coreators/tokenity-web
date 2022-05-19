import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

// import Tabs from "@mui/material/Tabs";
import TabPanel from "@mui/lab/TabPanel";

import walletData from "../../dummy_data/wallet.js";
import TokenItem from "../../components/Wallet/TokenItem";

import styles from "./Wallet.module.scss";
import NFTItem from "../../components/Wallet/NFTItem";

import CopyText from "../../util/CopyText";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
  

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const copyText = () => {
    CopyText(walletData.address);

    setTimeout(() => window.alert("Wallet Address Copied"), 0);
  };

  const [type, setType] = React.useState("COSM");

  const TTab = styled(Tab)({
    textTransform: "none",
  });

  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const TSelect = styled(Select)({
    padding: 0,
    border: 0,
    background: "#2C2C2D",
    borderRadius: "10px",
    height: "20px",
    width: "80px",
    color: "#8E8F8E",
    fontSize: "12px",
    "& .MuiOutlinedInput-input": {
      padding: 0,
    },
    "& .MuiSelect-icon": {
      color: "#8E8F8E",
      fontSize: "16px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: 0,
    },
    "&:hover": {},
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "0",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "0",
    },
  });

  return (
    <div className="home-box">
      <div className={styles.header}>
        {/* total price */}
        <FormControl size="small">
          <TSelect
            value={type}
            onChange={handleChangeType}
            IconComponent={KeyboardArrowDownIcon}
          >
            <MenuItem value={"COSM"}>COSM</MenuItem>
          </TSelect>
        </FormControl>

        <h2>
          {walletData.total_cosm.toLocaleString()} <small>COSM</small>
        </h2>
        <p>$ {walletData.total_usd.toLocaleString()}</p>

        {/* wallet address copy */}
        <div>
          <button onClick={() => copyText()}>{walletData.address}</button>
        </div>
      </div>
      {/* tabs */}

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label="tabs"
            TabIndicatorProps={{
              style: {
                background: "#38baff",
                top: "0",
                color: "#fff",
                border: "none",
              },
            }}
            variant="fullWidth"
            textColor="inherit"
          >
            <TTab label="Tokens" value="1" />
            <TTab label="NFTs" value="2" />
          </TabList>

          <TabPanel value="1">
            {/* Lists */}

            {walletData.tokens.map((token) => (
              <TokenItem key={token.symbol} token={token} />
            ))}
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
