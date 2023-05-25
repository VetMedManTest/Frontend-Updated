import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const SelectComponent = ({ handleChangeCategory, animal }) => {
  const { animalType } = useSelector(state => state.animalTypeAll)

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Animals</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={animal || ''}
          label="Animals"
          onChange={handleChangeCategory}
        style={{display:'grid'}}
        >
          <MenuItem value=''>All Animals</MenuItem>
          {animalType &&
            animalType.map(at => (
              <MenuItem key={at._id} value={at._id}>
                {at.animalName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default SelectComponent
