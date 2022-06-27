<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LikedSong extends Model
{
    protected $table="liked_song";
    protected $primaryKey="id_song";
    protected $autoIncrement=false;
    public $timestamps = false;



    
    public function user(){


        return $this->hasMany('User');
    
    }
}
