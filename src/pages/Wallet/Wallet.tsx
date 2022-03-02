import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// style
import "./Wallet.scss";

import mock from "./mock";

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

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="home-box">
      <div className="home-box__title">
        <h1>Wallet</h1>
      </div>
      <div className="mt-5">
        {/* total price */}

        <h2 className="text-center">
          {mock.total_cosm.toLocaleString()} <small>COSM</small>
        </h2>
      </div>
      {/* tabs */}

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Tokens" value="1" />
              <Tab label="NFTs" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">{/* Lists */}</TabPanel>
          <TabPanel value="2">Item NFTs</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default Wallet;
