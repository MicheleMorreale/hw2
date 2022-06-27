<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Session;
use App\Models\User;

class LoginController extends BaseController
{

    public function logout(){

        Session::flush();
        return redirect('login');

    }

    
    public function reg_form(){

        $error=Session::get('error');
        Session::forget('error');
        return view('signup')->with('error',$error);

    }

    public function log_form(){

        if(Session::get('user_id')){
            

            return redirect('profile');

        }
        $error=Session::get('error');
        Session::forget('error');
        return view('login')->with('error',$error);

    }

    
    public function do_reg(){

        if (User::where('username',request('username'))->first() ){

            Session::put('error','Nome utente già utilizzato');
            return redirect('registrazione')->withInput();
        }
        if (User::where('email',request('email'))->first() ){

            Session::put('error','Email già utilizzata');
            return redirect('registrazione')->withInput();
        }
        
        if (User::where('username',request('username'))->first() ){

            Session::put('error','Username già utilizzato');
            return redirect('registrazione')->withInput();
        }

        $user= new USER;
        $user->username=request('username');
        $user->nome=request('nome');
        $user->cognome=request('cognome');
        $user->email=request('email');
        $user->password=request('password');
        $user->save();

        Session::get('user_id',$user->id);

        return redirect('login');

    }


    
    public function do_log(){


        $user= User::where('username',request('username'))->first();

        if (!$user || request('password')!=$user->password){

            Session::put('error','Utente non registrato');
            return redirect('login')->withInput();
        }

        
        $client_id = '66cf9af4194a4cc0bbbe3fb7be0c9f77';
        $client_secret = '865e5f218cc8407a960b532499a0e256';

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,            'https://accounts.spotify.com/api/token' );
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt($ch, CURLOPT_POST,           1 );
        curl_setopt($ch, CURLOPT_POSTFIELDS,     'grant_type=client_credentials' ); 
        curl_setopt($ch, CURLOPT_HTTPHEADER,     array('Authorization: Basic '.base64_encode($client_id.':'.$client_secret))); 
        $result=curl_exec($ch); 
        $result = json_decode($result, true);
        $accessToken=($result['access_token']);
        curl_close($ch);        
        Session::put('user_id',$user->id);        
        Session::put('username',$user->username);
        Session::put('nome',$user->nome);
        Session::put('cognome',$user->cognome);        
        Session::put('accessToken',$accessToken);
        return redirect('profile');

    }
}
