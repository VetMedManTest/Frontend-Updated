import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'


const SelectEssentialComponent = ({handleChangeEssentialCategory,essential}) => {
    const { dailyEssentialType } = useSelector(state => state.dailyEssentialTypeAll)

  return (
    <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Daily Essentials</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={essential || ''}
        label="Essentials"
        onChange={handleChangeEssentialCategory}
      style={{display:'grid'}}
      >
        <MenuItem value=''>All Essentials</MenuItem>
        {dailyEssentialType &&
          dailyEssentialType.map(et => (
            <MenuItem key={et._id} value={et._id}>
              {et.essentialName}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  </Box>
  )
}

export default SelectEssentialComponent