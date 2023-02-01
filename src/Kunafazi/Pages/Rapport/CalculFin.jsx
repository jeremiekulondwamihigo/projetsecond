import axios from 'axios'
import { isEmpty } from 'Kunafazi/Static/Liens'
import { lien_read } from 'Kunafazi/Static/Liens'
import React, { useContext, useState, useEffect } from 'react'
import { ContextRapport } from './Context'
import { Table } from 'reactstrap'

function CalculFin() {
  const { datacontext, moisValue, anneeValue } = useContext(ContextRapport)
  // eslint-disable-next-line no-undef
  const [calcul, setCalcul] = useState([])
  const readAllCalcul = async () => {
    const response = await axios.get(`${lien_read}/calculAll`)
    setCalcul(response.data)
  }
  useEffect(() => {
    readAllCalcul()
  }, [moisValue, anneeValue])
  const chercher = (quartier) => {
    let data = []
    data.push(calcul.filter((x) => x._id === quartier)[0])
    return data[0].calculfin[0]
  }
  let [totaux, setTotaux] = useState({
    total: 0,
  })
  const calculTotatl = () => {
    let total = 0

    if (!isEmpty(datacontext)) {
      for (let i = 0; i < datacontext.length; i++) {
        total = total + datacontext[i].totalVersement
      }
    }

    setTotaux({
      ...totaux,
      total: total,
    })
  }
  useEffect(() => {
    calculTotatl()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      {!isEmpty(datacontext) && (
        <Table responsive>
          <thead>
            <tr>
              <td style={style.td}>#</td>
              <td style={style.td}>Quartier</td>
              <td style={style.td}>Superviseur</td>
              <td style={style.td}>Montant versé</td>
              <td style={style.td}>Carburant</td>
              <td style={style.td}>Chauffeur</td>
              <td style={style.td}>Eboueur</td>
              <td style={style.td}>Superviseur</td>
              <td style={style.td}>Salaire Bur</td>
              <td style={style.td}>Logist & Charroi</td>
              <td style={style.td}>Charges ADM</td>
              <td style={style.td}>Dime</td>
              <td style={style.td}>DG</td>
              <td style={style.td}>Epargne</td>
              <td style={style.td}>Social</td>
              <td style={style.td}>Transp & com</td>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(datacontext) &&
              !isEmpty(calcul) &&
              datacontext.map((index, key) => {
                return (
                  <tr key={key}>
                    <td style={style.tdBody}>{key + 1}</td>
                    <td style={style.tdBody}>{index.quartier}</td>
                    <td style={style.tdBody}>{index.superviseur}</td>
                    <td style={style.tdBody}>{index.totalVersement}</td>
                    <td style={style.tdBody}>
                      {!isEmpty(chercher(index._id)) &&
                        (
                          index.totalVersement * chercher(index._id).carburant
                        ).toFixed(2)}
                    </td>
                    <td style={style.tdBody}>
                      {!isEmpty(chercher(index._id)) &&
                        (
                          index.totalVersement * chercher(index._id).chauffeur
                        ).toFixed(2)}
                    </td>
                    <td style={style.tdBody}>
                      {!isEmpty(chercher(index._id)) &&
                        (
                          index.totalVersement * chercher(index._id).eboueur
                        ).toFixed(2)}
                    </td>
                    <td style={style.tdBody}>
                      {!isEmpty(chercher(index._id)) &&
                        (
                          index.totalVersement * chercher(index._id).superviseur
                        ).toFixed(2)}
                    </td>
                    <td style={style.tdBody}>
                      {!isEmpty(chercher(index._id)) &&
                        (
                          index.totalVersement *
                          chercher(index._id).salairebureau
                        ).toFixed(2)}
                    </td>
                    <td style={style.tdBody}>
                      {!isEmpty(chercher(index._id)) &&
                        (
                          index.totalVersement * chercher(index._id).logcharroi
                        ).toFixed(2)}
                    </td>
                    <td style={style.tdBody}>
                      {!isEmpty(chercher(index._id)) &&
                        (
                          index.totalVersement * chercher(index._id).chargeadmin
                        ).toFixed(2)}
                    </td>
                    <td style={style.tdBody}>
                      {!isEmpty(chercher(index._id)) &&
                        (
                          index.totalVersement * chercher(index._id).dime
                        ).toFixed(2)}
                    </td>
                    <td style={style.tdBody}>
                      {!isEmpty(chercher(index._id)) &&
                        (index.totalVersement * chercher(index._id).dg).toFixed(
                          2,
                        )}
                    </td>
                    <td style={style.tdBody}>
                      {!isEmpty(chercher(index._id)) &&
                        (
                          index.totalVersement * chercher(index._id).epargne
                        ).toFixed(2)}
                    </td>
                    <td style={style.tdBody}>
                      {!isEmpty(chercher(index._id)) &&
                        (
                          index.totalVersement * chercher(index._id).social
                        ).toFixed(2)}
                    </td>
                    <td style={style.tdBody}>
                      {!isEmpty(chercher(index._id)) &&
                        (
                          index.totalVersement *
                          chercher(index._id).transportCom
                        ).toFixed(2)}
                    </td>
                  </tr>
                )
              })}
            <tr>
              <td style={style.tdBody} colSpan="3">
                Total
              </td>
              <td style={style.tdBody}>{totaux.total}</td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
            </tr>
            <tr>
              <td style={style.tdBody} colSpan="3">
                Reste après sortie
              </td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
            </tr>
            <tr>
              <td style={style.tdBody} colSpan="3">
                Total sortie
              </td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
              <td style={style.tdBody}></td>
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  )
}
const style = {
  td: {
    border: '1px solid black',
    fontSize: '10px',
  },
  tdBody: {
    border: '1px solid black',
    fontSize: '10px',
  },
}

export default CalculFin
