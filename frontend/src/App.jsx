import './App.scss';
import React from 'react';
import { useTheme, Box, Snackbar, Alert } from '@mui/material';
import Nav from './components/nav';
import { connect } from 'react-redux';
import Gallery from './components/gallery';
import Footer from './sub-components/footer';

function App({
  URL,
  isShowSnackbar,
  snackbarMessage,
  snackbarSeverity }) {
  const theme = useTheme();

  return (
    <Box sx={{ margin: '0 auto', background: theme.palette.grayDark, height: '100%' }}>
      <Nav />
      <Gallery URL={URL} />
      <Footer />

      {/* snackbar for error messages */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isShowSnackbar}
      ><Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
}

// Redux state and actions
const mapStateToProps = state => {
  return {
    isShowSnackbar: state.isShowSnackbar,
    snackbarMessage: state.snackbarMessage,
    snackbarSeverity: state.snackbarSeverity
  }
};

export default connect(mapStateToProps)(App);