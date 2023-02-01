import React from 'react'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import { deepPurple } from '@mui/material/colors'

function LetterAvatars(props) {
  const { title } = props
  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: deepPurple[900] }}>{title}</Avatar>
    </Stack>
  )
}
export default LetterAvatars
