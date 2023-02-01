import React, { useState, useEffect } from "react"
import Grouped from "Static/Grouped"
import { isEmpty, lien_read, Converter_Month } from "Static/Liens"
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import { makeStyles, Typography, Paper } from "@material-ui/core"
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { addPayement } from "Action/Payements"
import { useDispatch } from "react-redux"
import axios from "axios"
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from "@material-ui/lab/Alert"

const useStyle = makeStyles((theme)=>({
    root : {
        width:"30vw"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 4, color: '#fff',
    }
}))

export default function Payement(){
    const classes = useStyle()
    const [clientActif, setClientActif] = useState()
    const [clientSelect, setClientSelect] = useState()
    const [sommePayer, setSommePayer] = useState()
    const id = new Date()
    const [Facture_client, setFactureClient] = useState()
    const [codeFacture_select, setCodeFactureSelect] = useState()
    
    useEffect(()=>{
       if(!isEmpty(clientSelect)){
            axios.get(`${lien_read}/facture_personnel/${clientSelect.title}`).then(response =>{
                if(response.data){
                    setFactureClient(response.data)
                }
            })
       }
    }, [clientSelect])

    useEffect(()=>{
        axios.get(`${lien_read}/readMembreActif`).then((response)=>{
            setClientActif(response.data)
        })
    }, [])

    const dispatch = useDispatch()
    const [backdrop, setBackdrop] = useState(false)
    const [message, setMessageBackend] = useState()

    const sendData =(e)=>{
        e.preventDefault()
        setBackdrop(true)
        const data = {
            codeClient : clientSelect.title,
            montantPayer : sommePayer,
            id : id,
            codeFacture : codeFacture_select
        }
        dispatch(addPayement(data)).then(async function(res){
            if(res.data){
                setMessageBackend(res)
            }else{}
        })
        setTimeout(() => {
            setBackdrop(false)
        }, 2000);
    }

    return(
        <div className={classes.root}>
            {
                backdrop && (<Backdrop  open={backdrop} className={classes.backdrop}>
                    <CircularProgress color="inherit" />
                    Payement en cours...
                </Backdrop>)}
            <Grid container>
                    
                <Grid item xs={12} md={6} lg={6}>
                    
                    <MDBox pt={0} pb={1} px={1}>
                    {
                    message &&  <Alert variant="filled" style={{marginBottom:"10px"}} severity={message.error}>
                    {message.message}
                    </Alert>
                    }
                        {
                            !isEmpty(clientActif) && <>
                            <Grouped optionss={clientActif} 
                            value={clientSelect} 
                            setValue={setClientSelect} 
                            labelProps="Client"/>
                            </>
                        }
                        
                    </MDBox>
                    <MDBox mb={1}>
                        <MDInput type="number"  name="frequence" value={sommePayer}  required onChange={(e)=>setSommePayer(e.target.value)} label="Montant Payer" fullWidth />
                    </MDBox>
                    <MDButton disabled={codeFacture_select ? false : true} variant="gradient" color="success" fullWidth onClick={(e)=>sendData(e)} >
                        Enregistrer
                    </MDButton>
                
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    {
                        !isEmpty(Facture_client) ? <>
                        <MDBox pt={0} pb={1} px={1}>
                            {
                                Facture_client.map((index, key)=>{
                                    return(
                                        
                                        <Paper elevation={2} style={{marginBottom:"10px"}} key={key}>
                                            {
                                                (index.montant_Payer < (index.tarif * index.frequence)) &&
                                                <>
                                                    <div style={{backgroundColor:"#dedede", padding:"3px"}}>
                                                        <Typography>Mois de {Converter_Month(index.id)} : {index.tarif * index.frequence}$</Typography>
                                                    </div>
                                                    <div style={{padding:"3px", display:"flex"}}>
                                                        <Typography>Déjà Payer : {index.montant_Payer}</Typography>
                                                        <button style={{marginLeft: "50px"}} onClick={()=>setCodeFactureSelect(index.codeFacture)} className="btn btn-success">
                                                            Payer
                                                        </button>
                                                    </div>
                                                </>
                                            }
                                            
                                        </Paper>
                                    )
                                })
                            }
                            <hr/>
                            
                            
                        </MDBox>
                        
                        </> : (<Typography>Veuillez renseigner le champs</Typography>)
                    }
                </Grid>
            </Grid>
        </div>
    )
}