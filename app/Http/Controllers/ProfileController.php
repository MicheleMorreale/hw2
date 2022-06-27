<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Session;
use App\Models\User;

class ProfileController extends BaseController
{
    public function loadShows(){


        $accessToken= Session::get('accessToken');
        
        $dati=array();
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://api.spotify.com/v1/shows?market=IT&ids=5WZB5uA2emVdU5ZpOzgmOy%2C6jBWY6Mup7iEFSYvMiVw7b%2C4py6Iz8eNS7XqT9PkWXYja%2C3CPV6sZxGV3fVuDLbR9uWh%2C3qtOk5RmHnywq3ZMosPoqu" );
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' ,'Authorization: Bearer ' .$accessToken)); 
        $result=curl_exec($ch);
        curl_close($ch);
        $dati=$result;
        return $dati;



    }
    public function loadUscite(){


        $accessToken= Session::get('accessToken');
        
        $dati=array();
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://api.spotify.com/v1/playlists/37i9dQZF1DWVKDF4ycOESi/tracks?market=IT&limit=12" );
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' ,'Authorization: Bearer ' .$accessToken)); 
        $result=curl_exec($ch);
        curl_close($ch);
        $dati=$result;
        return $dati;



    }

    



    public function showHomepage(){


        if(!Session::get('user_id')){
            

            return redirect('login');

        }
       else return view('home');



    }

    public function showpage(){

        if(!Session::get('user_id')){
            

            return redirect('login');

        }
       else return view('profile');


    }

    public function showAboutpage(){


        if(!Session::get('user_id')){
            

            return redirect('login');

        }
       else return view('about');


    }

    public function logout(){

        Session::flush();
        return redirect('login');

    }

    
}
