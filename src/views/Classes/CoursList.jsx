import React, { useState } from 'react'
import CoursEB from './CoursEB'
import DialogDemo from 'Controls/Popup'
import { DataGrid } from '@mui/x-data-grid'
import { Avatar } from '@mui/material'
import { Refresh } from '@mui/icons-material'
import { deepPurple } from '@mui/material/colors'

function CoursList({ cours, edit }) {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState()

  const update = (e) => {
    setData(e)
    setOpen(true)
  }
  const column = [
    {
      field: 'maxima',
      headerName: 'Maxima',
      width: 80,
      renderCell: (params) => {
        return (
          <Avatar sx={{ bgcolor: deepPurple[500] }}>{params.row.maxima}</Avatar>
        )
      },
    },
    {
      field: 'branche',
      headerName: 'Branche',
      width: 180,
    },

    {
      field: 'option',
      headerName: "D'option",
      width: 80,
    },
    {
      field: 'validExamen',
      headerName: 'Examen',
      width: 180,
      renderCell: (params) => {
        return (
          <>{params.row.validExamen ? 'Examen valide' : 'Examen non valide'}</>
        )
      },
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 110,
      renderCell: (params) => {
        return (
          <>
            {edit && (
              <Refresh
                style={{ cursor: 'pointer' }}
                onClick={() => update(params.row)}
              />
            )}{' '}
          </>
        )
      },
    },
  ]
  return (
    <>
      <div style={{ width: '100%', height: 480, zIndex: 0 }}>
        <DataGrid
          rows={cours}
          columns={column}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </div>
      <DialogDemo visible={open} setVisible={setOpen} title="Modification">
        <CoursEB data={data} />
      </DialogDemo>
    </>
  )
}

export default CoursList
