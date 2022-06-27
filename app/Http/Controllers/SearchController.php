<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Session;
use App\Models\User;

class SearchController extends BaseController
{

    
    
    public function searchSong(){
    $accessToken= Session::get('accessToken');
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,            $_REQUEST['rq']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt($ch, CURLOPT_HTTPHEADER,     array('Content-Type: application/json' ,'Authorization: Bearer ' .$accessToken)); 
    $result=curl_exec($ch);
    curl_close($ch);
    echo $result;

    }


    
    public function searchSong2(){
        $accessToken= Session::get('accessToken');
        
    $dati=array();
    for($i=0;$i<=$_REQUEST['pagine'];$i++){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "$_REQUEST[rq]"."&type=track&limit=50&offset=" .$i*50. );
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' ,'Authorization: Bearer ' .$accessToken)); 
    $result=curl_exec($ch);
    curl_close($ch);
    $dati[$i]=$result;
}
    $dati=json_encode($dati);
    echo $dati;
        }

    public function showSong(){

        
        $accessToken= Session::get('accessToken');
    $dati=array();
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "$_REQUEST[song_request]");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' ,'Authorization: Bearer ' .$accessToken)); 
    $result=curl_exec($ch);
    curl_close($ch);   

echo $result;

    }


    public function searchArtist(){

        $accessToken= Session::get('accessToken');
    $dati=array();
    for($i=0;$i<=$_REQUEST['pagine'];$i++){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "$_REQUEST[rq]".'&type=artist&limit=50&offset=' .$i*50.);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' ,'Authorization: Bearer ' .$accessToken)); 
    $result=curl_exec($ch);
    curl_close($ch);
    $dati[$i]=$result;
    
} $dati=json_encode($dati);
echo $dati;

    }


    public function showArtist(){

        $accessToken= Session::get('accessToken');
        
    $dati=array();
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "$_REQUEST[artist_request]");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' ,'Authorization: Bearer ' .$accessToken)); 
    $result=curl_exec($ch);
    curl_close($ch);

echo $result;
    
   

    }


    public function topTracksArtist(){

        $accessToken= Session::get('accessToken');

        
    $dati=array();
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "$_REQUEST[artist_request]");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' ,'Authorization: Bearer ' .$accessToken)); 
    $result=curl_exec($ch);
    curl_close($ch);

echo $result;
        
    
   

    }




    public function searchAlbum(){

        $accessToken= Session::get('accessToken');
        for($i=0;$i<=$_REQUEST['pagine'];$i++){
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, "$_REQUEST[rq]".'&type=album&limit=50&offset=' .$i*50. );
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' ,'Authorization: Bearer ' .$accessToken)); 
            $result=curl_exec($ch);
            curl_close($ch);    
            $dati[$i]=$result;
            
        }
        $dati=json_encode($dati);
        echo $dati;
            
        

    }


    
    public function showAlbum(){

        $accessToken= Session::get('accessToken');
        
    $dati=array();
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "$_REQUEST[album_request]");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' ,'Authorization: Bearer ' .$accessToken)); 
    $result=curl_exec($ch);
    curl_close($ch);   

echo $result;
    
    
   

    }

}
