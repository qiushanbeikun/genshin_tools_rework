import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '../../store';
import * as React from 'react';
import LangChange from './langChange';
import { BtnWrapper, StyledAppBarLink } from './styles';
import { GenshinStyles } from '../../theme';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material';
import authSlice from '../../store/slices/auth';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { axiosService, fetcher } from '../../utils/axios';
import axios from 'axios';

export default function AuthButtons() {
  const classes = GenshinStyles();
  const { t } = useTranslation('navbar');
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axiosService.post(`/api/auth/blacklist/`, { refresh: auth.refreshToken });
      localStorage.clear();
      dispatch(authSlice.actions.logout());
      console.log('clear local storage');
      navigate('/login');
    } catch (e) {
      console.log('entered catch');
      navigate('/login');
    }
  };

  return (
    <BtnWrapper>
      {auth.account && <Welcome account={auth.account} />}
      <LangChange />
      {auth.account ? (
        <Button color="inherit" onClick={handleLogOut} className={classes.root}>
          {t('log_out')}
        </Button>
      ) : (
        <StyledAppBarLink color="inherit" to="login" className={classes.root}>
          {t('login')}
        </StyledAppBarLink>
      )}
    </BtnWrapper>
  );
}

function Welcome({ account }) {
  const displayName = account?.username || account.email.split('@')[0];

  return (
    <Box sx={{ display: 'inline-flex' }}>
      <Typography>
        {'Welcome'}
        <StyledAppBarLink to="/profile">{displayName}</StyledAppBarLink>
      </Typography>
    </Box>
  );
}
