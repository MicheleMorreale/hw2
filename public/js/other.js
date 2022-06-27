const client_id = '47d0dbdd5a1c482bb3d24f61d9187df3';
const client_secret = '9f1a840064b74ff9afc974ee1e6f6496';
let access_token='';
const apikey_musixmatch='8bdd15b6f44dc0d9551e41df29b39636';
const api_wiki='https://it.wikipedia.org/w/api.php?';

function requestToken(){
fetch('request_token.php', {
    method: 'GET',
   
})
.then(onResponse).then(onTokenJson);
}



function onResponse(response){
    
    return response.json();

}
function getJson(json){



}

function printjson(json){

console.log(json);


}

function onTokenJson(json){

    access_token=json.access_token;

}

function showSearchbar(event){
let element=event.currentTarget;
searchbar.classList.remove('hide');
element.removeEventListener('click',showSearchbar);
element.addEventListener('click',hideSearchbar);

}

function prova(json){

console.log(json);

}

function attachDescription(json){

sezione_descrione=document.querySelector('#descrizione-artista');
descrione=document.createElement('p');
descrione.innerHTML=json.query.search[0].snippet;
a=document.createElement('a');
link=document.createElement("p");
link.innerHTML='continua ...';
a.href='https://it.wikipedia.org/wiki/' +encodeURIComponent(json.query.search[0].title);
a.appendChild(link);
descrione.appendChild(a);
sezione_descrione.appendChild(descrione);



}

function searchSnippet(json){

title=json.query.search[0].title;
request = 	'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&titles='+encodeURIComponent(title);
             fetch(request,{
                method: "GET",            
        
              }).then(onResponse).then(prova);

}


function searchArtistDescription(id){

    request = 	api_wiki +'action=query&origin=*&list=search&srsearch=' + encodeURIComponent(id)+"&utf8=&format=json";
             const  json=fetch(request,{
                method: "GET",            
        
              }).then(onResponse).then(attachDescription);
}


// function searchTrackMusixmatch(id){

//     request =   'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/v1.1/track.get?track_isrc=' + id +'&apikey='+ apikey_musixmatch;
//     console.log(request);
//                fetch(request,{
//                 method: "GET",
        
//               }).then(onResponse).then(prova);

// }


function descriptionSong(json){

   blocco_descrizione= document.querySelector('#descrizione_canzone');
   testo=document.createElement('p');
   if (json.response.song.description.plain==='?'){

    testo.innerHTML='Nessuna descrizione disponibile';
   }
   else {
    testo.innerHTML=json.response.song.description.plain;}
   blocco_descrizione.appendChild(testo);




}


function searchDescriptionGenius(json){

id=json.response.hits[0].result.id;
{lyric_request = 'https://cors-anywhere.herokuapp.com/https://api.genius.com/songs/'+ id +'?text_format=plain';
    fetch(lyric_request,{
    headers: {
   'Authorization':'Bearer ' + access_token_genius,
   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
         }    

        }).then(onResponse).then(descriptionSong);


    }

}

function searchSongGenius(canzone,artista){


    {song_request = 'https://cors-anywhere.herokuapp.com/https://api.genius.com/search?q=' +encodeURIComponent(canzone) +'%20'+ encodeURIComponent(artista);
    fetch(song_request,{
    headers: {
   'Authorization':'Bearer ' + access_token_genius,
   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
         }    

        }).then(onResponse).then(searchDescriptionGenius);
    }

   
}

function showResultSong(json){
    console.log(json);
    dati= new FormData();
    dati.append("id_song",json.id);
    dati.append("nome",json.name);
    dati.append("artista",json.artists[0].name);
    dati.append("album",json.album.name);
    dati.append('_token',csrf_token);
    
    if(document.getElementById("top_tracks")){
    toptracks=document.querySelector("#top_tracks");
    toptracks.classList.add("hidden");}
   
    sezione_risultati.style.display='none';
    sezione_canzone=document.querySelector('#show-content');
    sezione_canzone.style.display='flex';
    blocco_int=document.createElement('div');
    blocco_int.setAttribute("id",'canzone');
    blocco_int.classList.add('show-content');
    immagine=document.createElement('img');
    if (json.album.images.length !== 0){
        immagine.src=json.album.images[0].url;}
        else{
         immagine.src='https://static.thenounproject.com/png/3674270-200.png'
        }
    blocco_immagine=document.createElement('div');    
    blocco_immagine.setAttribute("id","immagine_canzone");
    blocco_testo=document.createElement('div');
    blocco_testo.classList.add('showcontent_text');
    blocco_titolo=document.createElement('div');
    blocco_artista=document.createElement('div');
    titolo=document.createElement('p');
    titolo.innerHTML=json.name;    
    artista=document.createElement('p');
    artista.innerHTML=json.artists[0].name;
    sezione_canzone.appendChild(blocco_int);
    blocco_int.appendChild(blocco_immagine);
    blocco_immagine.appendChild(immagine);
    blocco_int.appendChild(blocco_testo);
    blocco_testo.appendChild(titolo);
    blocco_testo.appendChild(artista);
    blocco_descrizione=document.createElement('div');
    blocco_descrizione.setAttribute("id","descrizione_canzone");
    sezione_canzone.appendChild(blocco_descrizione);
    blocco_action=document.createElement('div');    
    blocco_action.setAttribute("id","action-bar");
    blocco_like_button=document.createElement('div');
    like_button=document.createElement('img');
    like_button.style.width='50px';
    like_button.style.height='50px';
    blocco_share_button=document.createElement('div');
    share_button=document.createElement('img');
    share_button.src='https://www.iconpacks.net/icons/2/free-paper-plane-icon-2563-thumb.png';
    share_button.style.width='40px';
    share_button.style.height='40px';
    blocco_like_button.appendChild(like_button);
    blocco_share_button.appendChild(share_button);
    blocco_action.appendChild(blocco_like_button);
    blocco_action.appendChild(blocco_share_button);
    blocco_immagine.appendChild(blocco_action);
    searchSongGenius(json.name,json.artists[0].name);
    checkLikeSongs();    
    blocco_share_button.setAttribute('data-id',json.id);
    blocco_share_button.addEventListener('click',createPostSong);

}


function checkLikeSongs(){
    fetch("/checklikesong",{
        method: 'POST',
        body:dati

        }).then(onResponse).then(checkLikeJson);



}



function checkLikeJson(json){

if(json.exists){

    like_button.src='https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/245532/144-512.png';
            
    blocco_like_button.addEventListener('click',removeLike);

}else{
    
    like_button.src='https://icon-library.com/images/small-heart-icon/small-heart-icon-15.jpg';
        blocco_like_button.addEventListener('click',like);



};


}


function like(event){
    fetch("/like_song",{
        method: 'POST',
        body:dati

        }).then(onResponse).then(printjson);

        like_button.src='https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/245532/144-512.png';
            
        blocco_like_button.addEventListener('click',removeLike);


}

function removeLike(event){
    fetch("/removelikesong",{
        method: 'POST',
        body:dati

        }).then(onResponse).then(printjson);        
    like_button.src='https://icon-library.com/images/small-heart-icon/small-heart-icon-15.jpg';        
        blocco_like_button.addEventListener('click',like);


}

function caricaBraniPreferiti(){
    fetch("/caricatrack",{
        method: 'GET'

        }).then(onResponse).then(stampaBraniPreferiti);

        brani.removeEventListener('click',caricaBraniPreferiti);
        brani.addEventListener('click',Svuotabrani);
    


}

function Svuotabrani(){

brani.innerHTML='<p>I tuoi brani preferiti</p>';
brani.addEventListener('click',caricaBraniPreferiti);




}


function stampaBraniPreferiti(json){
    for(i=0;i<json.length;i++){           
    json2=JSON.parse(json[i]);
    console.log(json2);
        sezione_brani=document.querySelector('#brani-preferiti');
    blocco_int=document.createElement('div');
    blocco_int.style.display='flex';
    blocco_int.style.flexDirection = "row";    
    immagine=document.createElement('img');
    if (json2.album.images.length !== 0){
        immagine.src=json2.album.images[0].url;}
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
    titolo.innerHTML=json2.name;    
    artista=document.createElement('p');
    artista.innerHTML=json2.artists[0].name;
    sezione_brani.appendChild(blocco_int);
    blocco_int.appendChild(blocco_immagine);
    blocco_immagine.appendChild(immagine);
    blocco_int.appendChild(blocco_testo);
    blocco_testo.appendChild(titolo);
    blocco_testo.appendChild(artista);
    }    
    suggerimento=document.createElement('a');
    suggerimento.innerHTML='<p>Mostra tutti i brani</p>';
    suggerimento.href='likedTracks.php';
    sezione_brani.appendChild(suggerimento);





}


function showResultArtist(json){
    console.log(json);    
    if(document.getElementById("top_tracks")){
    toptracks=document.querySelector("#top_tracks");
    toptracks.classList.add("hidden");}
    dati= new FormData();
    dati.append("id_artist",json.id);
    dati.append("nome",json.name);
    dati.append('_token',csrf_token);
    sezione_risultati.style.display='none';
    contenuti.innerHTML='';
    sezione_canzone=document.querySelector('#show-content');
    sezione_canzone.style.display='flex';
    blocco_int=document.createElement('div');
    blocco_int.setAttribute("id","intestazione-artista");
    blocco_int.classList.add('show-content');
    immagine=document.createElement('img');
    immagine.src=json.images[0].url;
    blocco_immagine=document.createElement('div');
    blocco_immagine.setAttribute("id","sezione-immagine");
    blocco_testo=document.createElement('div');
    blocco_testo.setAttribute("id","descrizione-artista");
    blocco_artista=document.createElement('div');
    
    artista=document.createElement('p');
    artista.innerHTML=json.name;
    sezione_canzone.appendChild(blocco_int);
    blocco_int.appendChild(blocco_immagine);
    blocco_immagine.appendChild(immagine);
    blocco_immagine.appendChild(artista);
    blocco_int.appendChild(blocco_testo);       
    blocco_action=document.createElement('div');    
    blocco_action.setAttribute("id","action-bar");
    blocco_like_button=document.createElement('div');
    like_button=document.createElement('img');
    like_button.style.width='50px';
    like_button.style.height='50px';
    blocco_share_button=document.createElement('div');
    share_button=document.createElement('img');
    share_button.src='https://www.iconpacks.net/icons/2/free-paper-plane-icon-2563-thumb.png';
    share_button.style.width='40px';
    share_button.style.height='40px';
    blocco_like_button.appendChild(like_button);
    blocco_share_button.appendChild(share_button);
    blocco_action.appendChild(blocco_like_button);
    blocco_action.appendChild(blocco_share_button);
    blocco_immagine.appendChild(blocco_action);
    checkLikeArtists();   
    blocco_share_button.setAttribute('data-id',json.id);
    blocco_share_button.addEventListener('click',createPostArtist);
    searchArtistDescription(json.name + ' cantante');    

}
function createPostSong(){    
    dati= new FormData();    
    dati.append("id",blocco_share_button.getAttribute('data-id'));
    dati.append('_token',csrf_token);
    sezione_creazione_post.classList.remove('hidden');
    sezione_creazione=document.createElement('div');
    sezione_creazione.setAttribute("id","blocco-creazione");
    blocco_immagine=document.createElement('div');
    blocco_immagine.setAttribute("id","blocco-immagine-post");
    immagine=document.createElement('img');
    sezione_creazione_post.appendChild(sezione_creazione);
    sezione_creazione.appendChild(blocco_immagine);
    blocco_immagine.appendChild(immagine);
    blocco_desc=document.createElement('div');    
    blocco_desc.setAttribute("id", "blocco_descrizione");
    
    fetch("/getsongbyid",{
        method: 'POST',
        body:dati

        }).then(onResponse).then(createPostSong2);

           

    }


    function createPostAlbum(){    
        dati= new FormData();    
        dati.append("id",blocco_share_button.getAttribute('data-id'));
        dati.append('_token',csrf_token);
        sezione_creazione_post.classList.remove('hidden');
        sezione_creazione=document.createElement('div');
        sezione_creazione.setAttribute("id","blocco-creazione");
        blocco_immagine=document.createElement('div');
        blocco_immagine.setAttribute("id","blocco-immagine-post");
        immagine=document.createElement('img');
        sezione_creazione_post.appendChild(sezione_creazione);
        sezione_creazione.appendChild(blocco_immagine);
        blocco_immagine.appendChild(immagine);
        blocco_desc=document.createElement('div');    
        blocco_desc.setAttribute("id", "blocco_descrizione");
        
        fetch("/getalbumbyid",{
            method: 'POST',
            body:dati
    
            }).then(onResponse).then(createPostAlbum2);
    
        
    
    
    
        // }
    
        // if(json.type==="album"){        
        
        
        
            
        // }
        
        // if(json.type==="artist"){        
            
        // }
        
    
    
    }


function createPostArtist(){    
    dati= new FormData();    
    dati.append("id",blocco_share_button.getAttribute('data-id'));
    dati.append('_token',csrf_token);
    sezione_creazione_post.classList.remove('hidden');
    sezione_creazione=document.createElement('div');
    sezione_creazione.setAttribute("id","blocco-creazione");
    blocco_immagine=document.createElement('div');
    blocco_immagine.setAttribute("id","blocco-immagine-post");
    immagine=document.createElement('img');
    sezione_creazione_post.appendChild(sezione_creazione);
    sezione_creazione.appendChild(blocco_immagine);
    blocco_immagine.appendChild(immagine);
    blocco_desc=document.createElement('div');    
    blocco_desc.setAttribute("id", "blocco_descrizione");
    
    fetch("/getartistbyid",{
        method: 'POST',
        body:dati

        }).then(onResponse).then(createPostArtist2);

           
    

    }



    function createPostAlbum2(json){
    
        
        sezione_creazione_post.classList.remove('hidden');
        immagine.src=json.images[0].url;
        titolo=document.createElement('p');
        titolo.innerHTML=json.name;
        artista=document.createElement('p');
        artista.innerHTML=json.artists[0].name;        
        blocco_immagine.appendChild(titolo);
        blocco_immagine.appendChild(artista);
        sezione_desc=document.createElement('input');
        sezione_desc.setAttribute("id", "descrizione-post");
        sezione_desc.setAttribute("type", "text");
        sezione_desc.setAttribute("placeholder", "Inserisci descrizione");
        blocco_desc.appendChild(sezione_desc);
        button=document.createElement('input');
        button.setAttribute("id", "button-post");
        button.setAttribute("type", "submit");
        blocco_button=document.createElement('div');        
        blocco_button.setAttribute("id", "blocco-button");
        blocco_immagine.appendChild(titolo);        
        blocco_immagine.appendChild(artista);
        blocco_immagine.appendChild(blocco_desc);       
        blocco_desc.appendChild(sezione_desc);   
        blocco_button.appendChild(button);
        blocco_immagine.appendChild(blocco_button);      
        form2=document.createElement('form');        
        form2.setAttribute("id", "form-post");                      
        form2.setAttribute("method", "post");
        blocco_immagine.appendChild(form2);
        form2.appendChild(sezione_desc);
        form2.appendChild(blocco_button);
        dati= new FormData();
        dati.append("titolo",json.name);
        dati.append("artista",json.artists[0].name); 
        dati.append("immagine",json.images[0].url);   
        dati.append('_token',csrf_token);
        form2.addEventListener('submit',evitaInvioAlbum);      
        //form2.addEventListener('submit',shareAlbum);
    
    
    
    
    
    }
    
    function createPostSong2(json){
            console.log(json);
            
        sezione_creazione_post.classList.remove('hidden');
             immagine.src=json.album.images[0].url;
             titolo=document.createElement('p');
             titolo.innerHTML=json.name;
             artista=document.createElement('p');
            artista.innerHTML=json.artists[0].name;
            blocco_immagine.appendChild(titolo);
             blocco_immagine.appendChild(artista);
            sezione_desc=document.createElement('input');
             sezione_desc.setAttribute("id", "descrizione-post");
            sezione_desc.setAttribute("type", "text");
            sezione_desc.setAttribute("placeholder", "Inserisci descrizione");
            blocco_desc.appendChild(sezione_desc);
             button=document.createElement('input');
             button.setAttribute("id", "button-post");
            button.setAttribute("type", "submit");        
            button.setAttribute("placeholder", "Share");   
            blocco_button=document.createElement('div');        
            blocco_button.setAttribute("id", "blocco-button");    
            blocco_button.appendChild(button);
            blocco_immagine.appendChild(blocco_button);      
            form2=document.createElement('form');        
            form2.setAttribute("id", "form-post");                      
            form2.setAttribute("method", "post");
            blocco_immagine.appendChild(form2);
            form2.appendChild(sezione_desc);
            form2.appendChild(blocco_button);
            dati= new FormData();
            dati.append("titolo",json.name);
             dati.append("artista",json.artists[0].name);
             dati.append("descrizione",document.querySelector('#descrizione-post').value);         
             dati.append("immagine",json.album.images[0].url);         
             dati.append('_token',csrf_token);
        form2.addEventListener('submit',evitaInvioSong);    
    
    
    
    }
    function createPostArtist2(json){
        
        
        sezione_creazione_post.classList.remove('hidden');
            console.log(json);
             immagine.src=json.images[0].url;
             artista=document.createElement('p');
             artista.innerHTML=json.name;
             blocco_immagine.appendChild(artista);
             sezione_desc=document.createElement('input');
            sezione_desc.setAttribute("id", "descrizione-post");
             sezione_desc.setAttribute("type", "text");
             sezione_desc.setAttribute("placeholder", "Inserisci descrizione");
            blocco_desc.appendChild(sezione_desc);
             button=document.createElement('input');
             button.setAttribute("id", "button-post");
             button.setAttribute("type", "submit"); 
             blocco_button=document.createElement('div');        
             blocco_button.setAttribute("id", "blocco-button");
             blocco_button.appendChild(button);
             blocco_immagine.appendChild(artista);
            blocco_immagine.appendChild(blocco_desc);       
            blocco_desc.appendChild(sezione_desc);      
            form2=document.createElement('form');        
            form2.setAttribute("id", "form-post");
            form2.addEventListener('submit',evitaInvioArtist);    
            blocco_immagine.appendChild(form2);
            blocco_immagine.appendChild(blocco_button); 
            form2.appendChild(sezione_desc);
            form2.appendChild(blocco_button);
            dati= new FormData();
             dati.append("artista",json.name);
             dati.append("descrizione",document.querySelector('#descrizione-post').value);         
             dati.append("immagine",json.images[0].url);
             dati.append('_token',csrf_token);
    }



function evitaInvioAlbum(event){

    event.preventDefault();
    
    testo=(document.querySelector('#descrizione-post').value); 
    dati.append("descrizione",testo);           
    
    
    fetch("/sharealbumpost",{
        method: 'POST',
        body:dati

        }).then(onResponse).then(printjson);

        sezione_creazione_post.classList.add('hidden');



}
function evitaInvioSong(event){

    event.preventDefault();
    
    testo=(document.querySelector('#descrizione-post').value); 
    dati.append("descrizione",testo);           
    
    
    fetch("/sharesongpost",{
        method: 'POST',
        body:dati

        }).then(onResponse).then(printjson);
        
        sezione_creazione_post.classList.add('hidden');






}

function evitaInvioArtist(event){

    event.preventDefault();
    
    testo=(document.querySelector('#descrizione-post').value); 
    dati.append("descrizione",testo);           
    
    
    fetch("/shareartistpost",{
        method: 'POST',
        body:dati

        }).then(onResponse).then(printjson);

        sezione_creazione_post.classList.add('hidden');


}

function shareSong(dati){

        
    fetch("sharesongpost.php",{
        method: 'POST',
        body:dati

        }).then(onResponse).then(printjson);
    



   }


   function shareAlbum(event,json){
       
    event.preventDefault();
    dati= new FormData();
    dati.append("artista",json.artists[0].name);
    dati.append("descrizione",document.querySelector('#descrizione-post').value);    
    
    
    fetch("sharealbumpost.php",{
        method: 'POST',
        body:dati

        }).then(onResponse).then(printjson);




   }

   function shareArtist(event){
    
    event.preventDefault();
    

    fetch("shareartistpost.php",{
        method: 'POST',
        body:dati
    
        }).then(onResponse).then(printjson);   



   }





   function checkLikeArtists(){    
    fetch("/checklikeartists",{
        method: 'POST',
        body:dati

        }).then(onResponse).then(checkLikeJsonArtist);



}


function checkLikeJsonArtist(json){

if(json.exists){

    like_button.src='https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/245532/144-512.png';
            
    blocco_like_button.addEventListener('click',removeLikeArtist);

}else{
    
    like_button.src='https://icon-library.com/images/small-heart-icon/small-heart-icon-15.jpg';
        blocco_like_button.addEventListener('click',likeArtist);



};


}


function likeArtist(event){
    fetch("/like_artist",{
        method: 'POST',
        body:dati

        }).then(onResponse).then(printjson);

        like_button.src='https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/245532/144-512.png';
            
        blocco_like_button.addEventListener('click',removeLike);


}

function removeLikeArtist(event){
    fetch("/removelikeartist",{
        method: 'POST',
        body:dati

        }).then(onResponse).then(printjson);        
    like_button.src='https://icon-library.com/images/small-heart-icon/small-heart-icon-15.jpg';        
        blocco_like_button.addEventListener('click',likeArtist);


}


function caricaArtistiPreferiti(){
    fetch("/caricaartisti",{
        method: 'GET'

        }).then(onResponse).then(stampaArtistiPreferiti);

        artists.removeEventListener('click',caricaArtistiPreferiti);
        artists.addEventListener('click',SvuotaArtisti);
    


}

function SvuotaArtisti(){

artists.innerHTML='<p>I tuoi artisti preferiti</p>';
artists.addEventListener('click',caricaArtistiPreferiti);




}


function stampaArtistiPreferiti(json){    
    console.log(json);
    sezione_artista=document.querySelector('#artisti-preferiti');
    for(i=0;i<json.length;i++){           
    json2=JSON.parse(json[i]);
    console.log(json2);
    blocco_int=document.createElement('div');
    blocco_int.style.display='flex';
    blocco_int.style.flexDirection = "row";    
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
    sezione_artista.appendChild(blocco_int);
    blocco_int.appendChild(blocco_immagine);
    blocco_immagine.appendChild(immagine);
    blocco_int.appendChild(blocco_testo);
    blocco_testo.appendChild(artista);
    }    
    suggerimento=document.createElement('a');
    suggerimento.innerHTML='<p>Mostra tutti gli artisti</p>';
    suggerimento.href='likedArtists.php';
    sezione_artista.appendChild(suggerimento);

}





function showSong(event){

    element=event.currentTarget;
    
    dati= new FormData();
    
    song_request = 	'https://api.spotify.com/v1/tracks/' + element.dataset.id;
    dati.append("song_request",song_request);
    dati.append('_token',csrf_token);
                 fetch("/showsong",{
                    method: 'POST',
                    body:dati
                        
                                 }    
            
                  ).then(onResponse).then(showResultSong);
                    

// console.log(json);
// sezione_canzone=document.querySelector('#show-content');
// blocco_int=document.createElement('div');
// immagine=document.createElement('img');
// blocco_immagine=document.createElement('div');
// blocco_testo=document.createElement('div');
// blocco_titolo=document.createElement('div');
// blocco_artista=document.createElement('div');
// titolo=document.createElement('p');
// titolo.innerHTML=json.name;
// console.log(json.name)
// artista=document.createElement('p');
// artista.innerHTML=element.artists[0].name;
// sezione_canzone.appendChild(blocco_int);
// blocco_int.appendChild(blocco_immagine);
// blocco_int.appendChild(blocco_testo);
// blocco_testo.appendChild(titolo);
// blocco_testo.appendChild(artista);
// blocco_lyrics=document.createElement('div');
}


function showTopTracksForArtist(json){
    
    sezione_artista=document.querySelector('#show-content');  
    blocco_toptracks=document.createElement('div');
    blocco_toptracks.setAttribute("id","top-tracks");
    sezione_artista.appendChild(blocco_toptracks);    
    sezione_toptracks=document.querySelector('#top-tracks');  
    
    top_track=document.createElement('h1');
    top_track.innerHTML='Top Tracks';
    sezione_toptracks.appendChild(top_track);
    for (element of json.tracks){            
    contenitore=document.createElement("div");
    contenitore.setAttribute("id","contenitore");    
    blocco_int=document.createElement('div');
    immagine=document.createElement('img');
    immagine.src=element.album.images[0].url;
    blocco_immagine=document.createElement('div');
    blocco_testo=document.createElement('div');
    blocco_testo.setAttribute("id","testo-top-tracks")
    blocco_titolo=document.createElement('div');
    blocco_album=document.createElement('div');
    titolo=document.createElement('p');
    titolo.innerHTML=element.name;
    album=document.createElement('p');
    album.innerHTML=element.album.name;
    contenitore.appendChild(blocco_int);
    blocco_int.appendChild(blocco_immagine);
    blocco_immagine.appendChild(immagine);
    blocco_int.appendChild(blocco_testo);
    blocco_testo.appendChild(titolo);
    blocco_testo.appendChild(album);
    sezione_toptracks.appendChild(blocco_int);}
}

function showArtist(event){
    
    dati= new FormData();

    element=event.currentTarget;    
    artist_request = 	'https://api.spotify.com/v1/artists/' + element.dataset.id;    
    dati.append("artist_request",artist_request);
    dati.append('_token',csrf_token);
                 fetch("/show_artist",{
                    method: 'POST',
                    body:dati

            
                  }).then(onResponse).then(showResultArtist);
    
    
                
                artist_request = 	'https://api.spotify.com/v1/artists/' + element.dataset.id+'/top-tracks?country=it';
                dati.append("artist_request",artist_request);
                dati.append('_token',csrf_token);
                 fetch("/Top_tracks_artist",{
                    method: 'POST',
                    body:dati
            
                  }).then(onResponse).then(showTopTracksForArtist);
    
                
                }


                



function hideSearchbar(event){
    let element=event.currentTarget;
    searchbar.classList.add('hide');
    element.removeEventListener('click',hideSearchbar);
    element.addEventListener('click',showSearchbar);
    
     
    }

    function onJsonAlbum(json){
        sezione_risultati.innerHTML='';
        let risultati=json.albums.items;
        let pagine= parseInt(json.albums.total / json.albums.limit);    
        album=document.querySelector('#Testo').value
        for(let i=0;i<=pagine;i++){album_request = search_api + 'q='  + album + '&type=album&limit=50'+'&offset='+i*50;
        fetch(album_request,{
        headers: {
       'Authorization':'Bearer ' + access_token
             }    
    
            }).then(onResponse).then(searchAlbum)
        }
    }


    function onJsonSong(json){
        sezione_risultati.innerHTML='';
        console.log((json));
        let pagine= parseInt(json.tracks.total / json.tracks.limit);    
        song=encodeURIComponent(document.querySelector('#Testo').value);
        console.log(song);
        song_request = search_api + 'q='  + song 
        dati= new FormData();
        dati.append("rq",song_request);
        dati.append("pagine",pagine);
        dati.append('_token',csrf_token);
        
                fetch("/searchsong2",{
                    method: 'POST',
                    body:dati         
                 
                    }).then(onResponse).then(searchSong);
                    
                }
        
                function searchSong(json){    
                    console.log((json));
                    for(i=0;i<json.length;i++){
                        json2=JSON.parse(json[i]);
                    for(let element of json2.tracks.items){ 
                    blocco=document.createElement('div');
                    id=blocco.dataset.id=element.id;
                    ex_id=blocco.dataset.ex_id=element.external_ids.isrc;
                    immagine=document.createElement('img');   
                    if (element.album.images.length !== 0){
                        immagine.src=element.album.images[0].url;;}
                        else{
                         immagine.src='https://static.thenounproject.com/png/3674270-200.png'
                        }
                    titolo=document.createElement('p');
                    titolo.innerHTML=element.name;
                    artista=document.createElement('p');
                    artista.innerHTML=element.artists[0].name;
                    sezione_risultati.appendChild(blocco);
                    blocco.appendChild(immagine);
                    blocco.appendChild(titolo);
                    blocco.appendChild(artista);
                    blocco.addEventListener('click',showSong);
                    }    
                    sezione_risultati.style.display = "flex";
                }}


                function onJsonArtists(json){
                    sezione_risultati.innerHTML='';
                    let pagine =parseInt(json.artists.total / json.artists.limit);
                    artist=encodeURIComponent(document.querySelector('#Testo').value);
                    artist_request = search_api + 'q='  + artist ;
                    dati= new FormData();
                    dati.append("rq",artist_request);
                    dati.append("pagine",pagine);
                    dati.append('_token',csrf_token);
                            fetch("/searchartist",{
                                method: 'POST',
                                body:dati
                        
                                }).then(onResponse).then(searchArtist);
                                
                    }


//  for(let i=1;i<pagine;i++){
//      const content = document.querySelector('#Testo').value;
//     const text = encodeURIComponent(content);
//      artist_request = search_api + 'q='  + text + '&type=artist'+ '&offset='+pagine*20;
//                 fetch(artist_request,{
//                     headers: {
//                         'Authorization':'Bearer ' + access_token
//                               }    
        
//                }).then(onResponse).then(onJsonArtists)

//  }



function searchArtist(json){
    
    console.log(json);
    for(i=0;i<json.length;i++){
    json2=JSON.parse(json[i]);
    for(let element of json2.artists.items){ 
        console.log(element);
    blocco=document.createElement('div');
    id=blocco.dataset.id=element.id;
    immagine=document.createElement('img');
    if (element.images.length != 0){
        immagine.src=element.images[0].url;}
        else{
         immagine.src='https://static.thenounproject.com/png/3674270-200.png'
        }
    artista=document.createElement('p');
    artista.innerHTML=element.name;
    sezione_risultati.appendChild(blocco);
    blocco.appendChild(immagine);
    blocco.appendChild(artista);
    sezione_risultati.style.display = "flex";
    blocco.addEventListener('click',showArtist);



}

}}


function showResultAlbum(json){
    console.log(json);    
    dati= new FormData();
    dati.append("id_album",json.id);
    dati.append("nome",json.name);
    dati.append("artista",json.artists[0].name);
    dati.append('_token',csrf_token);
    if(document.getElementById("top_tracks")){
    toptracks=document.querySelector("#top_tracks");
    toptracks.classList.add("hidden");}
    
    sezione_risultati.style.display='none';
    sezione_album=document.querySelector('#show-content');
    sezione_album.style.display='flex';
    blocco_int=document.createElement('div');
    blocco_int.setAttribute('id','blocco_int');
    immagine=document.createElement('img');
    immagine.src=json.images[0].url;
    blocco_immagine=document.createElement('div');    
    blocco_immagine.setAttribute("id","immagine");
    blocco_testo=document.createElement('div');
    blocco_testo.classList.add('showcontent_text');
    blocco_titolo=document.createElement('div');
    blocco_artista=document.createElement('div');
    titolo=document.createElement('p');
    titolo.innerHTML=json.name;
    titolo.setAttribute("id",'album');
    
    artista=document.createElement('p');
    artista.setAttribute("id",'artista');
    artista.innerHTML=json.artists[0].name;
    sezione_album.appendChild(blocco_int);
    blocco_int.appendChild(blocco_immagine);
    blocco_immagine.appendChild(immagine);
    blocco_int.appendChild(blocco_testo);
    blocco_testo.appendChild(titolo);
    blocco_testo.appendChild(artista);
    sezione_album=document.querySelector('#show-content');  
    blocco_tracks=document.createElement('div');
    blocco_tracks.setAttribute("id","top-tracks");    
    track=document.createElement('h2');
    track.setAttribute("id","titolo-sezione");
    track.innerHTML='Tracks';
    sezione_album.appendChild(track);
    sezione_album.appendChild(blocco_tracks);    
    sezione_tracks=document.querySelector('#top-tracks');  

    blocco_action=document.createElement('div');    
    blocco_action.setAttribute("id","action-bar");
    blocco_like_button=document.createElement('div');
    like_button=document.createElement('img');
    like_button.style.width='50px';
    like_button.style.height='50px';
    blocco_share_button=document.createElement('div');
    share_button=document.createElement('img');
    share_button.src='https://www.iconpacks.net/icons/2/free-paper-plane-icon-2563-thumb.png';
    share_button.style.width='40px';
    share_button.style.height='40px';
    blocco_like_button.appendChild(like_button);
    blocco_share_button.appendChild(share_button);
    blocco_action.appendChild(blocco_like_button);
    blocco_action.appendChild(blocco_share_button);
    blocco_immagine.appendChild(blocco_action);
    blocco_immagine.appendChild(blocco_action);
    
    for (element of json.tracks.items){            
    contenitore=document.createElement("div");
    contenitore.setAttribute("id","contenitore");    
    blocco_int=document.createElement('div');
    immagine=document.createElement('img');
    immagine.src=json.images[0].url;
    blocco_immagine=document.createElement('div');
    blocco_testo=document.createElement('div');
    blocco_testo.setAttribute("id","testo-tracks")
    blocco_titolo=document.createElement('div');
    blocco_album=document.createElement('div');
    titolo=document.createElement('p');
    titolo.innerHTML=element.name;
    contenitore.appendChild(blocco_int);
    blocco_int.appendChild(blocco_immagine);
    blocco_immagine.appendChild(immagine);
    blocco_int.appendChild(blocco_testo);
    blocco_testo.appendChild(titolo);
    sezione_tracks.appendChild(blocco_int);}
    checkLikeAlbum();        
    blocco_share_button.setAttribute('data-id',json.id)
    blocco_share_button.addEventListener('click',createPostAlbum);    

}

function checkLikeAlbum(){
    fetch("/checklikealbum",{
        method: 'POST',
        body:dati

        }).then(onResponse).then(checkLikeJsonAlbum);



}


function checkLikeJsonAlbum(json){

if(json.exists){

    like_button.src='https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/245532/144-512.png';
            
    blocco_like_button.addEventListener('click',removeLikeAlbum);

}else{
    
    like_button.src='https://icon-library.com/images/small-heart-icon/small-heart-icon-15.jpg';
        blocco_like_button.addEventListener('click',likeAlbum);



}}


function likeAlbum(event){
    fetch("/like_album",{
        method: 'POST',
        body:dati

        }).then(onResponse).then(printjson);

        like_button.src='https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/245532/144-512.png';
            
        blocco_like_button.addEventListener('click',removeLikeAlbum);


}

function removeLikeAlbum(event){
    fetch("/removelikealbum",{
        method: 'POST',
        body:dati

        }).then(onResponse).then(printjson);        
    like_button.src='https://icon-library.com/images/small-heart-icon/small-heart-icon-15.jpg';        
        blocco_like_button.addEventListener('click',likeAlbum);


}

function caricaAlbumPreferiti(){
    fetch("/caricaalbum",{
        method: 'GET'

        }).then(onResponse).then(stampaAlbumPreferiti);

        albums.removeEventListener('click',caricaAlbumPreferiti);
        albums.addEventListener('click',Svuotaalbum);
    


}

function Svuotaalbum(){

albums.innerHTML='<p>I tuoi album preferiti</p>';
albums.addEventListener('click',caricaAlbumPreferiti);




}


function stampaAlbumPreferiti(json){
    sezione_album=document.querySelector('#album-preferiti');
    for(i=0;i<json.length;i++){           
    json2=JSON.parse(json[i]);
    console.log(json2);
    blocco_int=document.createElement('div');
    blocco_int.style.display='flex';
    blocco_int.style.flexDirection = "row";    
    immagine=document.createElement('img');
    if (json2.images.length !== 0){
        immagine.src=json2.images[0].url;}
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
    titolo.innerHTML=json2.name;    
    artista=document.createElement('p');
    artista.innerHTML=json2.artists[0].name;
    sezione_album.appendChild(blocco_int);
    blocco_int.appendChild(blocco_immagine);
    blocco_immagine.appendChild(immagine);
    blocco_int.appendChild(blocco_testo);
    blocco_testo.appendChild(titolo);
    blocco_testo.appendChild(artista);
    }    
    suggerimento=document.createElement('a');
    suggerimento.innerHTML='<p>Mostra tutti gli album</p>';
    suggerimento.href='likedalbums.php';
    sezione_album.appendChild(suggerimento);


}







function showAlbum(event){
    
    element=event.currentTarget;
    dati= new FormData();
    
    album_request = 	'https://api.spotify.com/v1/albums/' + element.dataset.id+'?country=it';
    
    dati.append("album_request",album_request);
    dati.append('_token',csrf_token);
                 fetch("/showalbum",{
                    method: 'POST',
                    body:dati
    
            
                  }).then(onResponse).then(showResultAlbum);
    
    }

function searchAlbum(json){
    console.log(json);
    for(i=0;i<json.length;i++){
        json2=JSON.parse(json[i]);
    let risultati=json2.albums.items;
    for(let element of risultati){ 
        if(element.album_type !== 'single'){
    blocco=document.createElement('div');
    id=blocco.dataset.id=element.id;
    immagine=document.createElement('img');    
    if (element.images.length !== 0){
        immagine.src=element.images[0].url;}
        else{
         immagine.src='https://static.thenounproject.com/png/3674270-200.png'
        }
    titolo=document.createElement('p');
    titolo.innerHTML=element.name;
    artista=document.createElement('p');
    artista.innerHTML=element.artists[0].name;
    sezione_risultati.appendChild(blocco);
    blocco.appendChild(immagine);
    blocco.appendChild(titolo);
    blocco.appendChild(artista);}
    sezione_risultati.style.display = "flex";
    blocco.addEventListener('click',showAlbum)
        }
    }
}



function onJsonAlbum(json){
    sezione_risultati.innerHTML='';
    console.log(json);
    let risultati=json.albums.items;
    let pagine= parseInt(json.albums.total / json.albums.limit);    
    album=encodeURIComponent(document.querySelector('#Testo').value);
    album_request = search_api + 'q='  + album;
    dati= new FormData();
    dati.append("rq",album_request);
    dati.append("pagine",pagine);
    dati.append('_token',csrf_token);
    fetch("/search_album",{        
        method: 'POST',
        body:dati
        }).then(onResponse).then(searchAlbum)
    
    //  for(let i=1;i<pagine;i++){
    //      const content = document.querySelector('#Testo').value;
    //     const text = encodeURIComponent(content);
    //      artist_request = search_api + 'q='  + text + '&type=artist'+ '&offset='+pagine*20;
    //                 fetch(artist_request,{
    //                     headers: {
    //                         'Authorization':'Bearer ' + access_token
    //                               }    
            
    //                }).then(onResponse).then(onJsonArtists)
    
    //  }
}


function loadPost(){

    fetch("fetchsongpost.php",{        
        method: 'GET'
        }).then(onResponse).then(showSongPost)

        
    fetch("fetchalbumpost.php",{        
        method: 'GET'
        }).then(onResponse).then(showAlbumPost)

        fetch("fetchartistpost.php",{        
            method: 'GET'
            }).then(onResponse).then(showArtistPost)






    
}

function showSongPost(json){
           
    console.log("ciao");
    for(i=0;i<json.length;i++){ 
        
        riquadro_post=document.createElement('div');
        riquadro_post.setAttribute('id','contorno-post');
        riquadro_img=document.createElement('div');        
        riquadro_img.setAttribute('id','immagine-post');
        titolo=document.createElement('p');
        artista=document.createElement('p');
        immagine=document.createElement('img');
        titolo.innerHTML=json[i].titolo;
        artista.innerHTML=json[i].artista;
        immagine.src=json[i].immagine;
        descrizione=document.createElement('p');
        descrizione.innerHTML=json[i].descrizione;
        riquadro_post.appendChild(riquadro_img);
        riquadro_testo=document.createElement('div');
        riquadro_testo.setAttribute('id',"riquadro-testo");
        riquadro_testo.appendChild(titolo);
        riquadro_testo.appendChild(artista);
        riquadro_testo.appendChild(descrizione);
        riquadro_img.appendChild(immagine);
        riquadro_img.appendChild(riquadro_testo);
        sezione_post=document.querySelector("#post");
        sezione_post.appendChild(riquadro_post);
        sezione_post.style.display='flex';

    }
}


function showAlbumPost(json){
           
    for(i=0;i<json.length;i++){ 
        
        riquadro_post=document.createElement('div');
        riquadro_post.setAttribute('id','contorno-post');
        riquadro_img=document.createElement('div');        
        riquadro_img.setAttribute('id','immagine-post');
        titolo=document.createElement('p');
        artista=document.createElement('p');
        immagine=document.createElement('img');
        titolo.innerHTML=json[i].titolo;
        artista.innerHTML=json[i].artista;
        immagine.src=json[i].immagine;
        descrizione=document.createElement('p');
        descrizione.innerHTML=json[i].descrizione;
        riquadro_post.appendChild(riquadro_img);
        riquadro_testo=document.createElement('div');
        riquadro_testo.setAttribute('id',"riquadro-testo");
        riquadro_testo.appendChild(titolo);
        riquadro_testo.appendChild(artista);
        riquadro_testo.appendChild(descrizione);
        riquadro_img.appendChild(immagine);
        riquadro_img.appendChild(riquadro_testo);
        sezione_post=document.querySelector("#post");
        sezione_post.appendChild(riquadro_post);
        sezione_post.style.display='flex';

    }
}


function showArtistPost(json){
           
    for(i=0;i<json.length;i++){ 
        
        riquadro_post=document.createElement('div');
        riquadro_post.setAttribute('id','contorno-post');
        riquadro_img=document.createElement('div');        
        riquadro_img.setAttribute('id','immagine-post');
        artista=document.createElement('p');
        immagine=document.createElement('img');
        artista.innerHTML=json[i].artista;
        immagine.src=json[i].immagine;
        descrizione=document.createElement('p');
        descrizione.innerHTML=json[i].descrizione;
        riquadro_post.appendChild(riquadro_img);
        riquadro_testo=document.createElement('div');
        riquadro_testo.setAttribute('id',"riquadro-testo");
        riquadro_testo.appendChild(artista);
        riquadro_testo.appendChild(descrizione);
        riquadro_img.appendChild(immagine);
        riquadro_img.appendChild(riquadro_testo);
        sezione_post=document.querySelector("#post");
        sezione_post.appendChild(riquadro_post);
        sezione_post.style.display='flex';

    }
}



function closeShowContent(event){

if(event.currentTarget === contenuti || event.key==="Escape"){

    contenuti.style.display='none';
    contenuti.innerHTML='';
    if(document.getElementById("top_tracks")){
    toptracks=document.querySelector("#top_tracks");
    toptracks.classList.remove("hidden");}
} 
}


function closeSearchView(event){

if(event.currentTarget!== sezione_risultati){

    sezione_risultati.style.display='none';


}



}


function closeResult(event){

    if(event.key==='Escape'){

    contenuti.style.display = "none";
sezione_risultati.style.display = "none";
sezione_risultati.innerHTML='';
    }
}





    
function search(event){
           
    event.preventDefault();


const content = document.querySelector('#Testo').value;


if(content) {
const text = encodeURIComponent(content);
console.log('Eseguo ricerca elementi riguardanti: ' + text);


const tipo = document.querySelector('#scelte').value;
console.log('Ricerco elementi di tipo: ' +tipo);



 if(tipo === "Song") {

    song_request = search_api + 'q='  + text + '&type=track&limit=50';
    dati= new FormData();
    dati.append("rq",song_request); 
    dati.append('_token',csrf_token);
    fetch("/search",{
        method: 'POST',
        body:dati
 }).then(onResponse).then(onJsonSong);}


  else if(tipo === "Artist") {
    artist_request = search_api + 'q='  + text + '&type=artist&limit=50';
    dati= new FormData();
    dati.append("rq",artist_request);
    dati.append('_token',csrf_token);
    fetch("/search",{
        method: 'POST',
        body:dati  

  }).then(onResponse).then(onJsonArtists)}
  else if(tipo === 'Album'){
     album_request = search_api + 'q='  + text + '&type=album&limit=50';
     dati= new FormData();
     dati.append("rq",album_request);
     dati.append('_token',csrf_token);
     fetch("/search",{
         method: 'POST',
         body:dati                 

        }).then(onResponse).then(onJsonAlbum)
    }

      else {
             alert("Inserisci il testo per cui effettuare la ricerca");
            }
}
}


function hideLogout(event){


            
    console.log("hidelogout")
    profile.classList.remove('hidden');
    logout.classList.add('hidden');    
    
    profilo_foto.removeEventListener('click',hideLogout);
    profilo_foto.addEventListener('click',showLogout);






}



        function showLogout(event){
            
            console.log("showlogout");
            logout.classList.remove('hidden');
            
            profile.classList.add('hidden');
            
    profilo_foto.removeEventListener('click',showLogout);
profilo_foto.addEventListener('click',hideLogout);



        }




function loadShows(){

    fetch("/getshows",{
        method: 'GET'      
  }).then(onResponse).then(onJsonShow);



}

function onJsonShow(json){

    console.log(json);

    for(i=0;i<json.shows.length;i++){
            sezione_brani=document.querySelector('#container-podcast');
        blocco_int=document.createElement('div');
        blocco_int.style.display='flex';
        blocco_int.style.flexDirection = "column";            
        blocco_int.setAttribute("class","show");
        immagine=document.createElement('img');
        if (json.shows[i].images.length !== 0){
            immagine.src=json.shows[i].images[0].url;}
            else{
             immagine.src='https://static.thenounproject.com/png/3674270-200.png'
            }        
        immagine.style.width='100px';
        immagine.style.height='100px';
        blocco_immagine=document.createElement('div');    
        blocco_immagine.setAttribute("id","immagine_show");
        blocco_testo=document.createElement('div');
        blocco_testo.setAttribute("id","testo_show");
        blocco_testo.style.display='flex';    
        blocco_testo.style.flexDirection = "column";    
        blocco_titolo=document.createElement('div');
        blocco_descrizione=document.createElement('div');
        titolo=document.createElement('p');
        titolo.innerHTML=json.shows[i].name;    
        descrizione=document.createElement('p');
        descrizione.innerHTML=json.shows[i].html_description;
        sezione_brani.appendChild(blocco_int);
        blocco_int.appendChild(blocco_immagine);
        blocco_immagine.appendChild(immagine);
        blocco_int.appendChild(blocco_testo);
        blocco_testo.appendChild(titolo);
        blocco_testo.appendChild(descrizione);
        }    
    }

        function loadUscite(){

            fetch("/getuscite",{
                method: 'GET'      
          }).then(onResponse).then(onJsonUscite);
        
        
        
        }
        
        function onJsonUscite(json){
        
            console.log(json);
        
            for(i=0;i<json.items.length;i++){
                    sezione_brani=document.querySelector('#container-uscite');
                blocco_int=document.createElement('div');
                blocco_int.style.display='flex';
                blocco_int.style.flexDirection = "column";            
                blocco_int.setAttribute("class","uscita");
                immagine=document.createElement('img');
                if (json.items[i].track.album.images.length !== 0){
                    immagine.src=json.items[i].track.album.images[0].url;}
                    else{
                     immagine.src='https://static.thenounproject.com/png/3674270-200.png'
                    }        
                immagine.style.width='100px';
                immagine.style.height='100px';
                blocco_immagine=document.createElement('div');    
                blocco_immagine.setAttribute("id","immagine_uscite");
                blocco_testo=document.createElement('div');
                blocco_testo.setAttribute("id","testo_uscite");
                blocco_testo.style.display='flex';    
                blocco_testo.style.flexDirection = "column";    
                blocco_titolo=document.createElement('div');
                blocco_artista=document.createElement('div');
                titolo=document.createElement('p');
                titolo.innerHTML=json.items[i].track.album.name;    
                artista=document.createElement('p');
                artista.innerHTML=json.items[i].track.artists[0].name;
                sezione_brani.appendChild(blocco_int);
                blocco_int.appendChild(blocco_immagine);
                blocco_immagine.appendChild(immagine);
                blocco_int.appendChild(blocco_testo);
                blocco_testo.appendChild(titolo);
                blocco_testo.appendChild(artista);
                }    



}

profile=document.querySelector('#profile');                
profilo_foto=document.querySelector('#profilo');
profilo_foto.addEventListener('click',showLogout);
const lente= document.querySelector("#lente");
show_content=document.querySelector("#show-content");
lente.addEventListener('click',showSearchbar);
const searchbar=document.querySelector("#barra");
const form = document.querySelector('#searchbar');
form.addEventListener('submit', search);
const search_api='https://api.spotify.com/v1/search?';
const sezione_risultati=document.querySelector('#search-view');
const contenuti=document.querySelector('#show-content');
const sezione_creazione_post=document.querySelector('#create-post');
const access_token_genius='Rj_9hVby3IMqjJOZE8_FLm-5F4zVhX3PNt8qFFS-RfWpGWiuYzh8D8oByIsaVMGy'
document.querySelector('body').addEventListener('keydown',closeResult);
document.querySelector('body').addEventListener('keydown',closeShowContent);
//contenuti.addEventListener('click',closeShowContent);