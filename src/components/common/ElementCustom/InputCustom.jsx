import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  inputProfileStatus: {
    height: '60px',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    backgroundColor: '#4F4F4F', 
    borderRadius: '3px 3px 3px 0',
  },
}));

export default useStyles;