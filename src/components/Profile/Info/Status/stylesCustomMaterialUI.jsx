import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  status: {
    borderRadius: '5px 5px 0 0',
    padding: theme.spacing(1),
    minHeight: '30px',
    lineHeight: '25px',
    backgroundColor: '#4f4f4f',
  },
}))

export default useStyles
