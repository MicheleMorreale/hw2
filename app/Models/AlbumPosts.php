<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AlbumPosts extends Model
{
    protected $table="album_posts";
    protected $primaryKey="id_post";
    protected $autoIncrement=false;
    public $timestamps = false;


    
    public function user(){


        return $this->belongsTo('User');
    
    }



}
