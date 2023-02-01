import React, { useContext, useEffect, useState } from 'react'
import { ContextRapport } from './Context'
import SelectOption from 'Kunafazi/Static/Select'
import axios from 'axios'
import { lien_read } from 'Kunafazi/Static/Liens'
import { isEmpty } from 'Kunafazi/Static/Liens'
import { Table } from 'reactstrap'
import './style.css'
import ReactHTMLTable from 'react-html-table-to-excel'
import { ConverterMois } from './showMois'

function EvolutionFin() {
  const {
    moisValue,
    anneeValue,
    setMoisValues,
    setAnneeValue,
    setDataContext,
  } = useContext(ContextRapport)
  const mois = [
    { id: '01', title: 'Janvier' },
    { id: '02', title: 'Février' },
    { id: '03', title: 'Mars' },
    { id: '04', title: 'Avril' },
    { id: '05', title: 'Mai' },
    { id: '06', title: 'Juin' },
    { id: '07', title: 'Juillet' },
    { id: '08', title: 'Aout' },
    { id: '09', title: 'Septembre' },
    { id: '10', title: 'Octobre' },
    { id: '11', title: 'Novembre' },
    { id: '12', title: 'Décembre' },
  ]
  let annee = [
    { id: '2022', title: '2022' },
    { id: '2023', title: '2023' },
    { id: '2024', title: '2024' },
    { id: '2025', title: '2025' },
    { id: '2026', title: '2026' },
    { id: '2027', title: '2027' },
  ]
  let [data, setData] = useState()
  const loadingData = async () => {
    if (!isEmpty(moisValue) && !isEmpty(anneeValue)) {
      const response = await axios.get(
        `${lien_read}/evolutionFin/${moisValue}/${anneeValue}`,
      )
      setData(response.data)
      setDataContext(response.data)
    }
  }
  const [lesDates, setLesDates] = useState()
  const loadingLesDates = async () => {
    if (!isEmpty(moisValue) && !isEmpty(anneeValue)) {
      const response = await axios.get(
        `${lien_read}/lesDates/${moisValue}/${anneeValue}`,
      )
      setLesDates(response.data)
    }
  }
  useEffect(() => {
    loadingData()
    loadingLesDates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moisValue, anneeValue])

  const chercherMontant = (versement, dateEntete) => {
    let montant = 0
    if (versement.length > 0) {
      for (let i = 0; i < versement.length; i++) {
        if (versement[i].dateVersement === dateEntete) {
          montant = montant + versement[i].montant
        }
      }
    }
    return montant
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-lg-6 col-sm-12">
          <SelectOption
            option={mois}
            value={moisValue}
            setValue={setMoisValues}
            title="Séléctionnez le mois"
          />
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12">
          <SelectOption
            option={annee}
            value={anneeValue}
            setValue={setAnneeValue}
            title="Séléctionnez l'année"
          />
        </div>
      </div>
      {!isEmpty(moisValue) && !isEmpty(anneeValue) && (
        <>
          <div className="row">
            <ReactHTMLTable
              className="btn btn-info"
              table="tableau"
              filename={`${ConverterMois(moisValue)}-${anneeValue}`}
              sheet="EVOLUTION FIN"
              buttonText="Imprimer le rapport mensuel"
            />
          </div>
          <div className="row">
            <Table id="tableau">
              <thead>
                <tr>
                  <td
                    colSpan={`${lesDates && lesDates.length + 7}`}
                    style={{
                      border: '1px solid black',
                      padding: 0,
                      margin: 0,
                      textAlign: 'center',
                    }}
                  >
                    MOIS DE {`${ConverterMois(moisValue)} - ${anneeValue}`}
                  </td>
                </tr>
                <tr>
                  <td style={style.td}>#</td>
                  <td style={style.td}>Quartier</td>
                  <td style={style.td}>Superviseur</td>
                  {!isEmpty(lesDates) &&
                    lesDates.map((index, key) => {
                      return (
                        <td key={key} style={style.td}>
                          {new Date(index._id).getDate()}
                          <sup>eme</sup>
                        </td>
                      )
                    })}
                  <td style={style.td}>Total</td>
                  <td style={style.td}>Rete</td>
                  <td style={style.td}>Effectif</td>
                  <td style={style.td}>Poids fin</td>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, key) => {
                    return (
                      <tr key={item._id}>
                        <td style={style.td}>{key + 1}</td>
                        <td style={style.td}>{item.quartier}</td>
                        <td style={style.td}>{item.superviseur}</td>
                        {!isEmpty(lesDates) &&
                          lesDates.map((date) => {
                            return (
                              <td style={style.td} key={date._id}>
                                {chercherMontant(item.versement, date._id)}
                              </td>
                            )
                          })}
                        <td style={style.td}>{item.totalVersement}</td>
                        <td style={style.td}>
                          {item.poidFind - item.totalVersement}
                        </td>
                        <td style={style.td}>{item.effectif}</td>
                        <td style={style.td}>{item.poidFind}</td>
                      </tr>
                    )
                  })}
                <tr>
                  <td style={style.td} colSpan="3">
                    Totaux
                  </td>
                  {lesDates &&
                    lesDates.map((index, key) => {
                      return <td style={style.td} key={key}></td>
                    })}
                  <td style={style.td}></td>
                  <td style={style.td}></td>
                  <td style={style.td}></td>
                  <td style={style.td}></td>
                </tr>
              </tbody>
              <tfoot style={{ backgroundColor: 'yellow' }}>
                <>
                  <tr>
                    <td style={style.td} colSpan="3">
                      Sortie Eboueur
                    </td>

                    {!isEmpty(lesDates) &&
                      lesDates.map((item, key) => {
                        return <td key={key}>{item.stEboueur}</td>
                      })}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td style={style.td} colSpan="3">
                      Sortie Trans chauffeur
                    </td>
                    {!isEmpty(lesDates) &&
                      lesDates.map((item, key) => {
                        return <td key={key}>{item.stChauffeur}</td>
                      })}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td style={style.td} colSpan="3">
                      Sortie carburant
                    </td>
                    {!isEmpty(lesDates) &&
                      lesDates.map((item, key) => {
                        return <td key={key}>{item.sCarburant}</td>
                      })}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td style={style.td} colSpan="3">
                      Sortie Log et Charroi
                    </td>
                    {!isEmpty(lesDates) &&
                      lesDates.map((item, key) => {
                        return <td key={key}>{item.sLogCharroi}</td>
                      })}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td style={style.td} colSpan="3">
                      Sortie Charg. Admin
                    </td>
                    {!isEmpty(lesDates) &&
                      lesDates.map((item, key) => {
                        return <td key={key}>{item.sChargeAdmin}</td>
                      })}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td style={style.td} colSpan="3">
                      Sortie Dime
                    </td>
                    {!isEmpty(lesDates) &&
                      lesDates.map((item, key) => {
                        return <td key={key}>{item.sDime}</td>
                      })}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td style={style.td} colSpan="3">
                      Sortie DG
                    </td>
                    {!isEmpty(lesDates) &&
                      lesDates.map((item, key) => {
                        return <td key={key}>{item.sDG}</td>
                      })}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td style={style.td} colSpan="3">
                      Sortie Charge Bur
                    </td>
                    {!isEmpty(lesDates) &&
                      lesDates.map((item, key) => {
                        return <td key={key}>{item.sChargeBur}</td>
                      })}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td style={style.td} colSpan="3">
                      Sortie Transp/COM SUP
                    </td>
                    {!isEmpty(lesDates) &&
                      lesDates.map((item, key) => {
                        return <td key={key}>{item.stComSup}</td>
                      })}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td style={style.td} colSpan="3">
                      Avance sur salaire/Sup
                    </td>
                    {!isEmpty(lesDates) &&
                      lesDates.map((item, key) => {
                        return <td key={key}>{item.avanceSalSup}</td>
                      })}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td style={style.td} colSpan="3">
                      Sortie AVEC
                    </td>
                    {!isEmpty(lesDates) &&
                      lesDates.map((item, key) => {
                        return <td key={key}>{item.sAvec}</td>
                      })}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td style={style.td} colSpan="3">
                      Avance salaire/Bureau
                    </td>
                    {!isEmpty(lesDates) &&
                      lesDates.map((item, key) => {
                        return <td key={key}>{item.avanceSalBureau}</td>
                      })}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td style={style.td} colSpan="3">
                      Sortie Social
                    </td>
                    {!isEmpty(lesDates) &&
                      lesDates.map((item, key) => {
                        return <td key={key}>{item.sSocial}</td>
                      })}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td style={style.td} colSpan="3">
                      Sortie Epargne
                    </td>
                    {!isEmpty(lesDates) &&
                      lesDates.map((item, key) => {
                        return <td key={key}>{item.sEpargne}</td>
                      })}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td style={style.td} colSpan="3">
                      Total
                    </td>
                    {!isEmpty(lesDates) &&
                      lesDates.map((item, key) => {
                        return <td key={key}>{item.total}</td>
                      })}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </>
              </tfoot>
            </Table>
          </div>
        </>
      )}
    </div>
  )
}

const style = {
  td: {
    border: '1px solid black',
    padding: 0,
    margin: 0,
  },
}

export default EvolutionFin
