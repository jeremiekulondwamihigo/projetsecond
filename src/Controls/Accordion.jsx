import React, { useContext } from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import LetterAvatars from './Avatar'
import { CreateContexte } from 'ContextAll.jsx'

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

function CustomizedAccordions(props) {
  const { data, setOptionSelect } = props
  const [expanded, setExpanded] = React.useState('panel0')

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <div>
      {data.map((item, keys) => {
        return (
          <Accordion
            key={keys}
            expanded={expanded === 'panel' + keys}
            onChange={handleChange('panel' + keys)}
          >
            <AccordionSummary
              aria-controls={`panel${keys}d-content`}
              id={`panel${keys}d-header`}
            >
              <Typography>{item.section}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {item.option.map((index, cle) => {
                return (
                  <div
                    key={cle}
                    className="item"
                    onClick={() => setOptionSelect(index)}
                  >
                    <LetterAvatars title={index.option.substr(0, 1)} />
                    <Typography
                      className="option"
                      style={{ marginLeft: '5px' }}
                    >
                      {index.option}
                    </Typography>
                  </div>
                )
              })}
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  )
}
export default CustomizedAccordions
