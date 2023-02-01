import React from 'react'
import { Table } from 'reactstrap'

function ListAvenue({ avenue }) {
  return (
    <div>
      <Table responsive>
        <thead>
          <tr style={{ backgroundColor: '#dedede', fontWeight: 'bolder' }}>
            <td>Avenue</td>
          </tr>
        </thead>
        <tbody>
          {avenue &&
            avenue.map((index, key) => {
              return (
                <tr>
                  <td>{index.avenue}</td>
                </tr>
              )
            })}
        </tbody>
      </Table>
    </div>
  )
}

export default ListAvenue
