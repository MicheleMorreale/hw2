fetch("/ShowalllikedArtists",{
    method:"GET"

        }).then(onResponse).then(showArtists);


        function onResponse(response){
    
            return response.json();
        
        }

function showArtists(json){
    console.log(json);
    for(i=0;i<json.length;i++){           
        json2=JSON.parse(json[i]);
        console.log(json2);
        sezione_brani=document.querySelector('#artist-container');
        blocco_int=document.createElement('div');
        blocco_int.style.display='flex';
        blocco_int.style.flexDirection = "row";            
        blocco_int.setAttribute("id","blocco_artista");
        immagine=document.createElement('img');
        if (json2.images.length !== 0){
            immagine.src=json2.images[0].url;}
            else{
             immagine.src='https://static.thenounproject.com/png/3674270-200.png'
            }        
        immagine.style.width='100px';
        immagine.style.height='100px';
        blocco_immagine=document.createElement('div');    
        blocco_immagine.setAttribute("id","immagine_artista");
        blocco_testo=document.createElement('div');
        blocco_testo.setAttribute("id","testo_artista");
        blocco_testo.style.display='flex';    
        blocco_testo.style.flexDirection = "column";    
        blocco_titolo=document.createElement('div');
        blocco_artista=document.createElement('div');
        artista=document.createElement('p');
        artista.innerHTML=json2.name;
        sezione_brani.appendChild(blocco_int);
        blocco_int.appendChild(blocco_immagine);
        blocco_immagine.appendChild(immagine);
        blocco_int.appendChild(blocco_testo);
        blocco_testo.appendChild(artista);
        }    
    





}