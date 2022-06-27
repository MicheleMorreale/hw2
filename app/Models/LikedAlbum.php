<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LikedAlbum extends Model
{
    protected $table="liked_album";
    protected $primaryKey="id_album";
    protected $autoIncrement=false;
    public $timestamps = false;


    
    public function user(){


        return $this->hasMany('User');
    
    }
}
