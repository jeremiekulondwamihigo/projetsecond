import React, { useState } from "react"
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import { Grid } from "@material-ui/core"
import MDButton from "components/MDButton";
import { lien_create } from "Static/Liens"
import axios from "axios"
import jsPDF from "jspdf";
import logo from "assets/images/logo.jpg";

(function(API){
    API.myText = function(txt, options, x, y) {
        options = options ||{};
        if( options.align === "center" ){
            var fontSize = this.internal.getFontSize();
            var pageWidth = this.internal.pageSize.width;
            let txtWidth = this.getStringUnitWidth(txt)*fontSize/this.internal.scaleFactor;
  
            x = ( pageWidth - txtWidth ) / 2;
        }
  
        this.text(txt,x,y);
    }
  })(jsPDF.API);



export default function RapportDelai(){
    const [dateOne, setDateOne] = useState()
    const [secondDate, setDateSecond] = useState()
    const [data, setData] = useState() 

    const addFooters = doc => {
        const pageCount = doc.internal.getNumberOfPages()
       
        doc.setFont('helvetica', 'italic')
        doc.setFontSize(5)
        for (var i = 1; i <= pageCount; i++) {
          doc.setPage(i)
          
          doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width / 2, 290, {
            align: 'center'
          })
        }
      }

      function createHeaders(keys) {
        var result = [];
        for (var i = 0; i < keys.length; i += 1) {
          result.push({
            id: keys[i],
            name: keys[i],
            prompt: keys[i],
            width: 65,
            align: "left",
            padding: 0
          });
        }
        return result;
      }
      
      var headers = createHeaders([
        "Code",
        "Responsable",
        "Contact",
        "Somme",
        "Date"
      ]);
    
    const submitDate =(e)=>{
        
        axios.post(`${lien_create}/rapportJournalier`, { dateOne, secondDate}).then((response)=>{
            
            if(response.data.length > 0){
                var generateData = function(amount) {
                    let result = [];
                    var datas = {};
                    for (var i = 0; i < amount; i ++) {
                      datas.Code = (response.data[i].title).toString();
                      datas.Responsable = (response.data[i].client[0].responsable).toString();
                      
                      datas.Contact = `${response.data[i].client[0].telephone_one}`;
                      datas.Somme = `${response.data[i].montantPayer}$`;
                      datas.Date = `${new Date(response.data[i].id).toLocaleDateString()}`;
                      
                      result.push({...datas, datas});
                    }
                    return result; 
                  };
                  var doc = new jsPDF({ 
                    putOnlyUsedFonts: true, 
                    orientation: "p" ,
                  });
                doc.setFontSize(12)
                doc.myText("KUNAFAZI USAFI " ,{align: "center"},0, 7)
                doc.myText("Date d'édition : Goma, le " ,{align: "center"},0, 21)
                doc.addImage(logo, 'png', 10, 2, 35, 22);
                doc.addImage(logo, 'png', 160, 2, 35, 22);

                doc.myText("RAPPORT DU "+new Date(dateOne).toLocaleDateString()+ " AU "+
                new Date(secondDate).toLocaleDateString() ,{align: "center"},0, 40)

                doc.setFontSize(5)
                doc.table(15, 45, generateData(response.data.length), headers, { autoSize: true }, {align : "center"});
                addFooters(doc)
                e.preventDefault()
                const blob = doc.output("bloburl");
                window.open(blob);

            }else{
                alert("Aucune information correspondante")
            }
        })
    }

    return(
        <div >
            <Grid container>
                <Grid item lg={6} md={6} >
                    <label>Rapport du </label>
                    <MDBox mb={1}>
                        <MDInput onChange={(e)=>setDateOne(e.target.value)} type="date"  name="frequence"  required label="Montant Payer" fullWidth />
                    </MDBox>
                </Grid>
                <Grid item lg={6} md={6}>
                    
                    <MDBox mb={1} ml={2}>
                        <label>au</label>
                        <MDInput type="date" onChange={(e)=>setDateSecond(e.target.value)}  name="frequence"  required label="Montant Payer" fullWidth />
                    </MDBox>
                </Grid>
            </Grid>
            <Grid>
                <MDButton onClick={(e)=>submitDate(e)} variant="gradient" color="success" fullWidth >
                    Imprimer
                </MDButton>
            </Grid>

        </div>
    )
}