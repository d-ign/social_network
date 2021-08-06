import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  stylesStatus: {
    minHeight: '30px',
    lineHeight: '25px',
    padding: theme.spacing(1),
    backgroundColor: '#4F4F4F',
    borderRadius: '5px 5px 0 0',
  },
}))

export default useStyles
