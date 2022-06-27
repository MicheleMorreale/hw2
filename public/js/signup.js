function onResponse(response){

    return response.json();


}

function onJson(json){

console.log(json);

}

function onUsernameCheck(json){
    

    if(json.exists){        
        blocco_username.appendChild(avviso_username);
        avviso_username.innerHTML="Username già usato";
        avviso_username.style.display='inline';
        avviso_username.classList.add('errore');


    }else  avviso_username.style.display='none';




}


function onEmailCheck(json){
    

    if(json.exists){        
        blocco_email.appendChild(avviso_email);
        avviso_email.innerHTML="Esiste già un account registrato con questa email";
        avviso_email.style.display='inline';
        avviso_email.classList.add('errore');


    }else  avviso_email.style.display='none';




}



function checkUsername(event){

    if(!/^[a-zA-Z0-9_]{1,15}$/.test(username.value)){        
        
        blocco_username.appendChild(avviso_username);
        avviso_username.innerHTML="Username non ammesso";
        avviso_username.style.display='inline';
        avviso_username.classList.add('errore');
        
    }else{
        avviso_username.style.display='none';
        dati= new FormData();
        dati.append("username",username.value);     
        fetch('check_username.php',{
            method:'POST',
            body: dati
        }).then(onResponse).then(onUsernameCheck)}

    }


    function checkName(event){

        if(nome.value.length < 0 || !/^[a-zA-Z]+$/.test(nome.value)){    
            
           
            blocco_nome.appendChild(avviso_nome);
            avviso_nome.innerHTML="Nome non ammesso";
            avviso_nome.style.display='inline';    
            avviso_nome.classList.add('errore');
            
        }else{
            avviso_nome.style.display='none';
    
        }
    }



        function checkCognome(event){

            if(cognome.value.length < 0 || !/^[a-zA-Z]+$/.test(cognome.value)){    
                
               
                blocco_cognome.appendChild(avviso_cognome);
                avviso_cognome.innerHTML="Cognome non ammesso";
                avviso_cognome.style.display='inline';    
                avviso_cognome.classList.add('errore');
                
            }else{
                avviso_cognome.style.display='none';
            }
        
            }




            function checkEmail(event){

                if(email.value.length < 0 || !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value)){    
                    
                   
                    blocco_email.appendChild(avviso_email);
                    avviso_email.innerHTML="Email non ammessa";
                    avviso_email.style.display='inline';    
                    avviso_email.classList.add('errore');
                    
                }else{
                    avviso_email.style.display='none';
                    dati= new FormData();
                    dati.append("email",email.value);
                    fetch('check_email.php',{
                        method:'POST',
                        body: dati
                    }).then(onResponse).then(onEmailCheck)}
            
                }


                function checkPassword(event){

                    if(password.value.length < 0 || !/(((?=.*[a-z]))(?=.*[!@#$%^&*_])(?=.*[0-9]))(?=.{8,})/.test(password.value)){    
                        
                       
                        blocco_password.appendChild(avviso_password);
                        avviso_password.innerHTML="Password non ammessa";
                        avviso_password.style.display='inline';    
                        avviso_password.classList.add('errore');
                        
                    }else avviso_password.style.display='none';
                
                    }


                    function checkPassword2(event){

                        if(password.value !== password2.value){    
                            
                           
                            blocco_password2.appendChild(avviso_password2);
                            avviso_password2.innerHTML="Le due password non corrispondono";
                            avviso_password2.style.display='inline';    
                            avviso_password2.classList.add('errore');
                            
                        }else avviso_password2.style.display='none';
                    
                        }







function registazione(event){

    

    fetch("signup.php",{
        method: 'POST',
        body:dati

        })
        

           

    }










form2=document.querySelector('#form');
const username=document.querySelector("#username");
const nome=document.querySelector("#nome");
const cognome=document.querySelector("#cognome");
const email=document.querySelector("#email");
const password=document.querySelector("#password");
const password2=document.querySelector("#password2");
username.addEventListener('blur',checkUsername);
nome.addEventListener('blur',checkName);
cognome.addEventListener('blur',checkCognome);
email.addEventListener('blur',checkEmail);
password.addEventListener('blur',checkPassword);
password2.addEventListener('blur',checkPassword2);
blocco_username=document.querySelector("#div-username");
blocco_nome=document.querySelector("#div-nome");
blocco_cognome=document.querySelector("#div-cognome");
blocco_email=document.querySelector("#div-email");
blocco_password=document.querySelector("#div-password");
blocco_password2=document.querySelector("#div-password2");
avviso_username=document.createElement("p");
avviso_nome=document.createElement("p");
avviso_cognome=document.createElement("p");
avviso_email=document.createElement("p");
avviso_password=document.createElement("p");
avviso_password2=document.createElement("p");
form2.addEventListener('submit',registazione);