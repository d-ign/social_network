import { FormControlLabel, Checkbox } from '@material-ui/core'
import { useAppSelector } from '../../../hooks/useApp'
import { getTheme } from '../../../redux/selectors/app-selectors'

const RenderCheckbox = ({ input, label }) => {
  const theme = useAppSelector(getTheme)
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
