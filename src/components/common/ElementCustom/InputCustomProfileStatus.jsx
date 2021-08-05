import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  inputProfileStatus: {
    minHeight: '30px',
    maxHeight: '180px',
    lineHeight: '25px',
    padding: theme.spacing(1),
    backgroundColor: '#4F4F4F',
    borderRadius: '5px 5px 0 0',
  },
}))

export default useStyles
