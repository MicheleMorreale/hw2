function checkInput(event){


if(username.value.length===0 || password.value.length===0){    
    event.preventDefault();
    alert("Compilare tutti i campi");
}


}




form=document.forms["form-login"];
form.addEventListener("submit",checkInput);
username=document.querySelector("#username");
password=document.querySelector("#password");