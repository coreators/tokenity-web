import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import './AccountWallet.scss';

import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { of } from 'await-of';

import { checkKeplr, getCosmosClient } from '../../util/wallet';
// import { setProfile } from '../../modules/account/actions';
import { getHash } from '../../util/crypto';

const AccountWallet = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  // const dispatch = useDispatch();

  const handleOpen = async () => {
    const chainId = 'cosmoshub-4';
    const [, err] = await of(checkKeplr(chainId));
    if (err) {
      if (err.name === 'NotFoundError') {
        window.open('https://www.keplr.app/', '_blank');
      } else {
        setOpen(true);
      }
    } else {
      // const [client, err] = await of(getCosmosClient(chainId));
      // if (err){
      //   console.error(err);
      //   return;
      // }

      // const address = client.signerAddress;
      // // const name = getHash(address);
      // const name = address;
      // console.log(name);
      // const account = {
      //   name: name,
      //   password: '',
      //   address: address,
      //   avatar: undefined,
      //   description: '',
      // };

      // dispatch(setProfile(account));
    }
  };

  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <div className='walletContainer' onClick={handleOpen}>
          <span className='walletText'>Connect Keplr Wallet</span>
        </div>

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity="error">Please signin your keplr wallet.</Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default AccountWallet;
