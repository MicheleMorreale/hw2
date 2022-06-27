<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LikedArtists extends Model
{
    protected $table="liked_artists";
    protected $primaryKey="id_artist";
    protected $autoIncrement=false;
    public $timestamps = false;

    
    public function user(){


        return $this->hasMany('User');
    
    }
}
