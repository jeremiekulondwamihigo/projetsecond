import React from 'react'
import { isEmpty, DateActuelle } from 'Kunafazi/Static/Liens'
import { DataGrid } from '@mui/x-data-grid'
import { Edit } from '@mui/icons-material'

function TableVersement({ items }) {
  const column = [
    {
      field: 'Nom',
      headerName: 'Superviseur',
      width: 210,
      renderCell: (params) => {
        return <>{params.row.agent[0].nom}</>
      },
    },
    {
      field: 'quartier',
      headerName: 'Quartier',
      width: 175,
      renderCell: (params) => {
        return <>{params.row.quartier[0].quartier}</>
      },
    },
    {
      field: 'dateVersement',
      headerName: 'Date',
      width: 100,
      renderCell: (params) => {
        return (
          <>
            {DateActuelle(
              new Date(params.row.dateVersement).toLocaleDateString(),
            )}
          </>
        )
      },
    },
    {
      field: 'montant',
      headerName: 'Montant',
      width: 80,
    },
    {
      field: 'Action',
      headerName: 'Actions',
      width: 70,
      renderCell: (params) => {
        return (
          <>
            <Edit />
          </>
        )
      },
    },
  ]
  return (
    <div>
      {!isEmpty(items) && (
        <div
          style={{
            width: '75%',
            height: 300,
            zIndex: 0,
            marginTop: '20px',
          }}
        >
          <DataGrid
            rows={items}
            columns={column}
            pageSize={5}
            rowsPerPageOptions={[5]}
            style={{ zIndex: 0 }}
          />
        </div>
      )}
    </div>
  )
}

export default TableVersement
