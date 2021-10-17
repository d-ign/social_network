import { FormControlLabel, Checkbox } from '@mui/material'
import { useAppSelector } from '../../services/hooks/useApp'
import { getTheme } from '../../store/selectors/app-selectors'

type PropsType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: any
  label: string
}

const RenderCheckbox = ({ input, label }: PropsType) => {
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
