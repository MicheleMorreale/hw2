fetch("/ShowTop50song",{
    method:"GET"

        }).then(onResponse).then(showSongs);


        function onResponse(response){
    
            return response.json();
        
        }

function showSongs(json){
       
    json2=JSON.parse(json);   
    for(i=0;i<json2.items.length;i++){
            sezione_brani=document.querySelector('#top_tracks');
        blocco_int=document.createElement('div');
        blocco_int.style.display='flex';
        blocco_int.style.flexDirection = "row";            
        blocco_int.setAttribute("id","blocco_canzone");
        immagine=document.createElement('img');
        if (json2.items[i].track.album.images.length !== 0){
            immagine.src=json2.items[i].track.album.images[0].url;}
            else{
             immagine.src='https://static.thenounproject.com/png/3674270-200.png'
            }        
        immagine.style.width='100px';
        immagine.style.height='100px';
        blocco_immagine=document.createElement('div');    
        blocco_immagine.setAttribute("id","immagine_canzone");
        blocco_testo=document.createElement('div');
        blocco_testo.setAttribute("id","testo_canzone");
        blocco_testo.style.display='flex';    
        blocco_testo.style.flexDirection = "column";    
        blocco_titolo=document.createElement('div');
        blocco_artista=document.createElement('div');
        titolo=document.createElement('p');
        titolo.innerHTML=json2.items[i].track.name;    
        artista=document.createElement('p');
        artista.innerHTML=json2.items[i].track.artists[0].name;
        sezione_brani.appendChild(blocco_int);
        blocco_int.appendChild(blocco_immagine);
        blocco_immagine.appendChild(immagine);
        blocco_int.appendChild(blocco_testo);
        blocco_testo.appendChild(titolo);
        blocco_testo.appendChild(artista);
        }    
    

    
    }


