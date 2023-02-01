import React from 'react'
import jsPDF from 'jspdf'
import logo from 'assets/img/logo.jpg'
import { NumberToLetter } from 'convertir-nombre-lettre'
import { Button } from '@mui/material'
import { Converter_Month, DateActuelle } from 'Kunafazi/Static/Liens'
;(function (API) {
  API.myText = function (txt, options, x, y) {
    options = options || {}
    if (options.align === 'center') {
      var fontSize = this.internal.getFontSize()
      var pageWidth = this.internal.pageSize.width
      let txtWidth =
        (this.getStringUnitWidth(txt) * fontSize) / this.internal.scaleFactor

      x = (pageWidth - txtWidth) / 2
    }

    this.text(txt, x, y)
  }
})(jsPDF.API)

function Facturation(props) {
  const { data } = props

  const addFooters = (doc) => {
    const pageCount = doc.internal.getNumberOfPages()

    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8)
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i)

      doc.text(
        'Page ' + String(i) + ' of ' + String(pageCount),
        doc.internal.pageSize.width / 2,
        290,
        {
          align: 'center',
        },
      )
    }
  }
  const functionPrint = (e) => {
    var doc = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [4, 2],
    })
    const entete_position = 0.6
    const entete_position_large = 1.22
    for (var id in data) {
      doc.addImage(logo, 'png', 0.1, 0.1, 0.8, 0.4)
      doc.setFontSize(5)
      doc.myText('KUNA FAZI USAFI', { align: 'center' }, 1, 0.2)
      doc.myText('Contact : +243 999 990 270', { align: 'center' }, 1, 0.3)
      doc.myText(
        'Banque (TMB) : KUNA FAZI SARL 00017-1272-233995',
        { align: 'center' },
        1,
        0.4,
      )

      doc.setFontSize(6)
      doc.text('Nom/Raison social ', 0.1, entete_position)
      doc.text(' : ' + data[id].responsable, 0.9, entete_position)
      doc.text('Adresse ', 0.1, entete_position + 0.1)
      doc.text(
        ' : Q/ ' +
          data[id].quartierbd[0].quartier +
          '. _ Av/ ' +
          data[id].avenuebd[0].avenue,
        0.9,
        entete_position + 0.1,
      )
      doc.text('Téléphone ', 0.1, entete_position + 0.2)
      doc.text(
        ` : ${data[id].telephone_one ? data[id].telephone_one : ''}`,
        0.9,
        entete_position + 0.2,
      )
      doc.setFontSize(7)

      doc.myText(
        'FACTURE N° : 000010',
        { align: 'center' },
        1,
        entete_position + 0.39,
      )
      doc.setFontSize(6)
      doc.myText(
        'Période : ' +
          Converter_Month(new Date().toISOString()) +
          ' ' +
          new Date().getFullYear(),
        { align: 'center' },
        1,
        entete_position + 0.6,
      )

      doc.setFontSize(5)
      doc.myText(
        'Désignation : Evacuation des immondices',
        { align: 'center' },
        0.1,
        entete_position_large + 0.1,
      )
      doc.myText(
        'Total mensuel : ' +
          data[id].tarif * data[id].frequence +
          ' (' +
          NumberToLetter(data[id].tarif * data[id].frequence) +
          ' Dollars)',
        { align: 'center' },
        0.1,
        entete_position_large + 0.22,
      )
      if (data.reste < 0) {
        doc.myText(
          'Total à payer : ' +
            (data[id].reste * -1 + data[id].tarif * data[id].frequence) +
            '$',
          { align: 'center' },
          0.1,
          entete_position_large + 0.33,
        )
      }
      //   else {
      //     doc.myText(
      //       'Total à payer : ' + data[id].reste + '$',
      //       { align: 'center' },
      //       0.1,
      //       entete_position_large + 0.33,
      //     )
      //   }

      doc.myText(
        'Pour KUNA FAZI USAFI',
        { align: 'center' },
        0.1,
        entete_position_large + 0.45,
      )
      doc.myText(
        'Fait à Goma, le ' + new Date().toLocaleDateString(),
        { align: 'center' },
        0.1,
        entete_position_large + 0.65,
      )

      // doc.myText("Evacuation des immondices", { align : "center"}, 0.2, entete_position_large+0.11)
      // doc.myText(""+data.frequence+" fois par mois", { align : "center"}, 0.1, entete_position_large+0.33)
      // doc.myText(""+(data.tarif * data.frequence)+" $", { align : "center"}, 0.1, entete_position_large+0.55)

      //doc.addImage(isc, 'png', 180, 2, 20, 22);
      doc.setLineWidth(0.01)
      doc.line(0.3, 0.5, 3.8, 0.5)

      //doc.table(1, 0.8, generateData(data.length), headers, { autoSize: true }, {align : "center"});

      addFooters(doc)
      doc.text(
        'Fait à Goma, le ' + DateActuelle(new Date()),
        doc.internal.pageSize.width / 2,
        200,
        {
          align: 'center',
        },
      )
      doc.insertPage()
    }
    const blob = doc.output('bloburl')
    window.open(blob)

    e.preventDefault()
  }

  const compiler = (e) => {
    if (data.length > 0) {
      functionPrint(e)
    } else {
      alert('No data found')
    }
  }

  return (
    <Button onClick={(e) => compiler(e)} variant="contained" color="secondary">
      Facture
    </Button>
  )
}
export default Facturation
