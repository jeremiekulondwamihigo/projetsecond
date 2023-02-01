import * as React from 'react'
import Box from '@mui/material/Box'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'

function SpeedDialDemo(props) {
  const { actions, position } = props
  return (
    <Box>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        direction={position}
        sx={{ position: 'absolute', bottom: 16, left: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  )
}

export default SpeedDialDemo
