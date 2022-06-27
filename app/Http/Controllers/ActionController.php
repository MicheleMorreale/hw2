<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Session;
use App\Models\User;
use DB;

class ActionController extends BaseController
{








    public function likeSong(){

        if (DB::table('liked_song')->insert([
            'id_song' => $_REQUEST['id_song'],
            'nome' => $_REQUEST['nome'], 
            'album' => $_REQUEST['album'],
            'artista' => $_REQUEST['artista'],
            'user_id' => Session::get('user_id')
        ])) echo "done";
        else echo "error";

    }


    public function removeLikeSong(){

        if (DB::table('liked_song')->where([
            'id_song' => $_REQUEST['id_song'],
            'user_id' => Session::get('user_id')
        ])->delete()) echo "done";
        else echo "error";
        }
    

        public function likeArtist(){

            if (DB::table('liked_artists')->insert([
                'id_artist' => $_REQUEST['id_artist'],
                'nome' => $_REQUEST['nome'],
                'user_id' => Session::get('user_id')
            ])) echo "done";
            else echo "error";
    
        }

        
    public function removeLikeArtist(){

        if (DB::table('liked_artists')->where([
            'id_artist' => $_REQUEST['id_artist'],
            'user_id' => Session::get('user_id')
        ])->delete()) echo "done";
        else echo "error";
        }

  
        public function likeAlbum(){

            if (DB::table('liked_album')->insert([
                'id_album' => $_REQUEST['id_album'],
                'nome' => $_REQUEST['nome'],
                'artista' => $_REQUEST['artista'],
                'user_id' => Session::get('user_id')
            ])) echo "done";
            else echo "error";
    
        }


        
    public function removeLikeAlbum(){

        if (DB::table('liked_album')->where([
            'id_album' => $_REQUEST['id_album'],
            'user_id' => Session::get('user_id')
        ])->delete()) echo "done";
        else echo "error";
        }




    public function caricaBraniPreferiti(){
        $i=0;
        $accessToken= Session::get('accessToken');
        
        if ($row=(DB::table('liked_song')->where([
            'user_id' => Session::get('user_id')
        ])->get())){ 
            
            $num=(DB::table('liked_song')->where([
                'user_id' => Session::get('user_id')
            ])->count());
            
            
$final=array();

 while ($i<$num and $i<3){
        $id_song=$row[$i]->id_song;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,            "https://api.spotify.com/v1/tracks/".$id_song);
         curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt($ch, CURLOPT_HTTPHEADER,     array('Content-Type: application/json' ,'Authorization: Bearer ' .$accessToken)); 
        $result=curl_exec($ch);
        $final[$i]=$result;
        $i++;        
curl_close($ch);

 }
 return $final;


    }    
    else echo "error";
}

public function caricaAlbumPreferiti(){
        
    $accessToken= Session::get('accessToken');
    $i=0;
    if ($row=DB::table('liked_album')->where([
        'user_id' => Session::get('user_id')
    ])->get()){ 
    

    
        $num=(DB::table('liked_album')->where([
            'user_id' => Session::get('user_id')
        ])->count());
        


$final=array();
while($i<$num and $i<3){

    
    $id_album=$row[$i]->id_album;
 

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,            "https://api.spotify.com/v1/albums/".$id_album);
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt($ch, CURLOPT_HTTPHEADER,     array('Content-Type: application/json' ,'Authorization: Bearer ' .$accessToken)); 
    $result=curl_exec($ch);
    $final[$i]=$result;
    $i++;        
curl_close($ch);


}
return $final;


}    
else echo "error";
}



public function caricaArtistiPreferiti(){
        
    $accessToken= Session::get('accessToken');
    $i=0;
    if ($row=DB::table('liked_artists')->where([
        'user_id' => Session::get('user_id')
    ])->get()){ 
    

    
        $num=(DB::table('liked_artists')->where([
            'user_id' => Session::get('user_id')
        ])->count());
        



        $final=array();

while($i<$num and $i<3){
 
    
    $id_artist=$row[$i]->id_artist;
 
   
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,            "https://api.spotify.com/v1/artists/".$id_artist);
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt($ch, CURLOPT_HTTPHEADER,     array('Content-Type: application/json' ,'Authorization: Bearer ' .$accessToken)); 
    $result=curl_exec($ch);
    $final[$i]=$result;
    $i++;        
curl_close($ch);


}
return $final;


}    
else echo "error";
}


public function loadSongPost(){


    $accessToken= Session::get('accessToken');
    $i=0;
    if ($row=(DB::table('song_posts')->where([
        'user_id' => Session::get('user_id')
    ])->get())){ 
    

        $num=(DB::table('song_posts')->where([
            'user_id' => Session::get('user_id')
        ])->count());
        
 $final=array();
 $i=0;


 while($i<$num ){
      
        $final[$i]=$row[$i];
        $i++;


 }
return $final;




} else echo "error";
}


public function loadAlbumPost(){


    $accessToken= Session::get('accessToken');
    $i=0;
    if ($row=DB::table('album_posts')->where([
        'user_id' => Session::get('user_id')
    ])->get()){ 
    

        $num=(DB::table('album_posts')->where([
            'user_id' => Session::get('user_id')
        ])->count());
        
 $final=array();
 $i=0;


 while($i<$num ){
      
        $final[$i]=$row[$i];
        
        $i++;

 }
return $final;




} else echo "error";
}



public function loadArtistPost(){


    $accessToken= Session::get('accessToken');
    $i=0;
    if ($row=DB::table('artist_posts')->where([
        'user_id' => Session::get('user_id')
    ])->get()){ 
    

        $num=(DB::table('artist_posts')->where([
            'user_id' => Session::get('user_id')
        ])->count());
        
 $final=array();
 $i=0;


 while($i<$num ){
      
        $final[$i]=$row[$i];
        
        $i++;

 }
return $final;




} else echo "error";
}


public function likedTracks(){

    
    if(!Session::get('user_id')){
            

        return redirect('login');

    }
    
    return view('likedTracks');
}



public function showAllLikedTracks(){

    
    $i=0;
    $accessToken= Session::get('accessToken');
    
    if ($row=(DB::table('liked_song')->where([
        'user_id' => Session::get('user_id')
    ])->get())){ 
        
        $num=(DB::table('liked_song')->where([
            'user_id' => Session::get('user_id')
        ])->count());
        
        
$final=array();


 while($i<$num){
     
        
    $id_song=$row[$i]->id_song;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,            "https://api.spotify.com/v1/tracks/".$id_song);
         curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt($ch, CURLOPT_HTTPHEADER,     array('Content-Type: application/json' ,'Authorization: Bearer ' .$accessToken)); 
        $result=curl_exec($ch);
        $final[$i]=$result;
        $i++;        
curl_close($ch);


 }
 return $final;
}else echo("Nessuna canzone presente in lista");

}


public function likedAlbums(){

    
    if(!Session::get('user_id')){
            

        return redirect('login');

    }
    return view('likedAlbums');
}

public function showAllLikedAlbums(){


    $i=0;
    $accessToken= Session::get('accessToken');
    
    if ($row=(DB::table('liked_album')->where([
        'user_id' => Session::get('user_id')
    ])->get())){ 
        
        $num=(DB::table('liked_album')->where([
            'user_id' => Session::get('user_id')
        ])->count());
        
        
$final=array();


 while($i<$num){
     
        
    $id_album=$row[$i]->id_album;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,            "https://api.spotify.com/v1/albums/".$id_album);
         curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt($ch, CURLOPT_HTTPHEADER,     array('Content-Type: application/json' ,'Authorization: Bearer ' .$accessToken)); 
        $result=curl_exec($ch);
        $final[$i]=$result;
        $i++;        
curl_close($ch);


 }
 return $final;
}else echo("Nessun album presente in lista");


}


public function likedArtists(){

    
    if(!Session::get('user_id')){
            

        return redirect('login');

    }
    
    return view('likedArtists');
}

public function showAllLikedArtists(){


    $i=0;
    $accessToken= Session::get('accessToken');
    
    if ($row=(DB::table('liked_artists')->where([
        'user_id' => Session::get('user_id')
    ])->get())){ 
        
        $num=(DB::table('liked_artists')->where([
            'user_id' => Session::get('user_id')
        ])->count());
        
        
$final=array();


 while($i<$num){
     
        
    $id_artist=$row[$i]->id_artist;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,            "https://api.spotify.com/v1/artists/".$id_artist);
         curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt($ch, CURLOPT_HTTPHEADER,     array('Content-Type: application/json' ,'Authorization: Bearer ' .$accessToken)); 
        $result=curl_exec($ch);
        $final[$i]=$result;
        $i++;        
curl_close($ch);


 }
 return $final;
}else echo("Nessun artista presente in lista");


}


public function showTop50(){



    if(!Session::get('user_id')){
            

        return redirect('login');

    }
    
    return view('top50Italia');
}


public function showTop50Song(){




    $accessToken= Session::get('accessToken');
    $i=0;
    $final=array();
    
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,            "https://api.spotify.com/v1/playlists/37i9dQZEVXbIQnj7RRhdSX/tracks?limit=50&offset=0");
         curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt($ch, CURLOPT_HTTPHEADER,     array('Content-Type: application/json' ,'Authorization: Bearer ' .$accessToken)); 
        $result=curl_exec($ch);
        $final[$i]=$result;
        $i++;        
curl_close($ch);
 return ($final);
}

public function getSongById(){

    $accessToken= Session::get('accessToken');

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://api.spotify.com/v1/tracks/' ."$_REQUEST[id]");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' ,'Authorization: Bearer ' .$accessToken)); 
    $result=curl_exec($ch);
    curl_close($ch);
    
return $result;



}


public function getArtistById(){


    $accessToken= Session::get('accessToken');
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://api.spotify.com/v1/artists/' ."$_REQUEST[id]");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' ,'Authorization: Bearer ' .$accessToken)); 
    $result=curl_exec($ch);
    curl_close($ch);
    
return $result;
    
}


public function getAlbumById(){

    $accessToken= Session::get('accessToken');
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.spotify.com/v1/albums/' ."$_REQUEST[id]");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' ,'Authorization: Bearer ' .$accessToken)); 
$result=curl_exec($ch);
curl_close($ch);

return $result;
    
}

public function shareSongPost(){

    if (DB::table('song_posts')->insert([
        'titolo' => $_REQUEST['titolo'],
        'artista' => $_REQUEST['artista'],
        'descrizione' => $_REQUEST['descrizione'],
        'immagine' => $_REQUEST['immagine'],
        'user_id' => Session::get('user_id')
    ])) echo "done";
    else echo "error";



}


public function shareArtistPost(){

    
    if (DB::table('artist_posts')->insert([
        'artista' => $_REQUEST['artista'],
        'descrizione' => $_REQUEST['descrizione'],
        'immagine' => $_REQUEST['immagine'],
        'user_id' => Session::get('user_id')
    ])) echo "done";
    else echo "error";





}


public function shareAlbumPost(){

    
    if (DB::table('album_posts')->insert([        
        'titolo' => $_REQUEST['titolo'],
        'artista' => $_REQUEST['artista'],
        'descrizione' => $_REQUEST['descrizione'],
        'immagine' => $_REQUEST['immagine'],
        'user_id' => Session::get('user_id')
    ])) echo "done";
    else echo "error";





}





}