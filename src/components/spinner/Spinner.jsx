import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spinner = ({ height, width }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px',
      height,
      width,
      maxWidth: '100%',
      maxHeight: '100%',
    }}
  >
    <CircularProgress size="32px" />
  </Box>
);

Spinner.defaultProps = {
  height: null,
  width: null,
};

Spinner.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
};

export default Spinner;
