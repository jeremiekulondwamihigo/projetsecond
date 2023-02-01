

module.exports ={
     generateString : (length)=>{
        const caractere = "1234567890MLPKB";
        let resultat = "";
        let caractereLength = caractere.length;
        for(let i=0; i<length;i++){
            resultat+= caractere.charAt(Math.floor(Math.random()* caractereLength));
        }
        return resultat
    },
    commune : [
        {id: 1, title:"Goma"},
        {id:2, tite : "Karisimbi"}
    ],
}

        