import { FormControlLabel, Checkbox } from '@material-ui/core'

const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={<Checkbox checked={!!input.value} onChange={input.onChange} />}
      label={label}
      labelPlacement='start'
      style={{ marginLeft: 0 }}
    />
  </div>
)

export default renderCheckbox
