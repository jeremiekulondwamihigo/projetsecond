import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

function SelectOption(props) {
  const { option, value, setValue, title } = props

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={title}
        onChange={handleChange}
      >
        {option.map((index) => {
          return (
            <MenuItem key={index.id} value={index.id}>
              {index.title}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
export default SelectOption
