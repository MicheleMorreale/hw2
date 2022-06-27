<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Session;
use App\Models\User;
use DB;

class CheckController extends BaseController
{

    
    
    public function checkLikeSong(){
    $accessToken= Session::get('accessToken');
    $id_song=$_REQUEST['id_song'];
    $nome=$_REQUEST['nome'];
    $album=$_REQUEST['album'];
    $artista=$_REQUEST['artista'];
    $user_id=Session::get('user_id');

    $song=DB::table('liked_song')
    ->where('id_song',$id_song)
    ->where('user_id',$user_id)
    ->count();

if($song){
    $response=array('exists' => true);
    }else{
    $response=array('exists' => false);
    }
    return ($response);
    }


    
    
    public function checkLikeArtist(){
        $accessToken= Session::get('accessToken');
        $id_artist=$_REQUEST['id_artist'];
        $user_id=Session::get('user_id');
    
            $song=DB::table('liked_artists')
                        ->where('id_artist',$id_artist)
                        ->where('user_id',$user_id)
                        ->count();
    
    if($song){
        $response=array('exists' => true);
        }else{
        $response=array('exists' => false);
        }
        return ($response);
        }

        
    public function checkLikeAlbum(){
        $accessToken= Session::get('accessToken');
        $id_album=$_REQUEST['id_album'];
        $user_id=Session::get('user_id');
    
            $song=DB::table('liked_album')
                        ->where('id_album',$id_album)
                        ->where('user_id',$user_id)
                        ->count();
    
    if($song){
        $response=array('exists' => true);
        }else{
        $response=array('exists' => false);
        }
        return ($response);
        }


  
}
