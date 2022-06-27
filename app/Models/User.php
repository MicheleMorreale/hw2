<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table="users";
    public $timestamps = false;

public function likesong(){


    return $this->hasmany('LikedSong');

}

public function likealbum(){


    return $this->hasmany('LikedAlbum');

}


public function likeartist(){


    return $this->hasmany('LikedArtists');

}


public function songpost(){


    return $this->hasmany('SongPosts');

}


public function artistpost(){


    return $this->hasmany('ArtistPosts');

}



public function albumpost(){


    return $this->hasmany('AlbumPosts');

}






}
