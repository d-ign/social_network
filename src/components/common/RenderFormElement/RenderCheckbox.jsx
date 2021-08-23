import { FormControlLabel, Checkbox } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { getTheme } from '../../../redux/selectors/app-selectors'

const RenderCheckbox = ({ input, label }) => {
  const theme = useSelector(getTheme)
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={!!input.value}
            onChange={input.onChange}
            color={theme === 'theme1' ? 'primary' : 'secondary'}
            style={{ marginLeft: 5, padding: 6 }}
          />
        }
        label={label}
        labelPlacement='start'
        style={{ marginLeft: 0 }}
      />
    </div>
  )
}

export default RenderCheckbox
