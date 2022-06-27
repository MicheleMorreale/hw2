<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('login');
});

Route::get('/loadsongpost', 'App\Http\Controllers\ActionController@loadSongPost');
Route::get('/loadalbumpost', 'App\Http\Controllers\ActionController@loadAlbumPost');
Route::get('/loadartistpost', 'App\Http\Controllers\ActionController@loadArtistPost');

Route::get('/login', 'App\Http\Controllers\LoginController@log_form');
Route::post('/login', 'App\Http\Controllers\LoginController@do_log');
Route::get('/logout', 'App\Http\Controllers\LoginController@logout');


Route::get('/registrazione', 'App\Http\Controllers\LoginController@reg_form');
Route::post('/registrazione', 'App\Http\Controllers\LoginController@do_reg');

Route::get('/profile', 'App\Http\Controllers\ProfileController@showpage');
Route::get('/home', 'App\Http\Controllers\ProfileController@showHomepage');
Route::get('/about', 'App\Http\Controllers\ProfileController@showAboutpage');


Route::get('/getshows', 'App\Http\Controllers\ProfileController@loadShows');
Route::get('/getuscite', 'App\Http\Controllers\ProfileController@loadUscite');


Route::post('/search', 'App\Http\Controllers\SearchController@searchSong');
Route::post('/searchsong2', 'App\Http\Controllers\SearchController@searchSong2');
Route::post('/searchartist', 'App\Http\Controllers\SearchController@searchArtist');
Route::post('/search_album', 'App\Http\Controllers\SearchController@searchAlbum');

Route::post('/showsong', 'App\Http\Controllers\SearchController@showSong');
Route::post('/show_artist', 'App\Http\Controllers\SearchController@showArtist');
Route::post('/showalbum', 'App\Http\Controllers\SearchController@showAlbum');


Route::post('/checklikesong', 'App\Http\Controllers\CheckController@checkLikeSong');
Route::post('/checklikeartists', 'App\Http\Controllers\CheckController@checkLikeArtist');
Route::post('/checklikealbum', 'App\Http\Controllers\CheckController@checkLikeAlbum');




Route::post('/Top_tracks_artist', 'App\Http\Controllers\SearchController@topTracksArtist');


Route::post('/like_song', 'App\Http\Controllers\ActionController@likeSong');
Route::post('/removelikesong', 'App\Http\Controllers\ActionController@removeLikeSong');
Route::post('/getsongbyid', 'App\Http\Controllers\ActionController@getSongById');
Route::post('/sharesongpost', 'App\Http\Controllers\ActionController@shareSongPost');
Route::post('/like_artist', 'App\Http\Controllers\ActionController@likeArtist');
Route::post('/removelikeartist', 'App\Http\Controllers\ActionController@removeLikeArtist');
Route::post('/getartistbyid', 'App\Http\Controllers\ActionController@getArtistById');
Route::post('/shareartistpost', 'App\Http\Controllers\ActionController@shareArtistPost');
Route::post('/like_album', 'App\Http\Controllers\ActionController@likeAlbum');
Route::post('/removelikealbum', 'App\Http\Controllers\ActionController@removeLikeAlbum');
Route::post('/getalbumbyid', 'App\Http\Controllers\ActionController@getAlbumById');
Route::post('/sharealbumpost', 'App\Http\Controllers\ActionController@shareAlbumPost');



Route::get('/caricatrack', 'App\Http\Controllers\ActionController@caricaBraniPreferiti');
Route::get('/caricaalbum', 'App\Http\Controllers\ActionController@caricaAlbumPreferiti');
Route::get('/caricaartisti', 'App\Http\Controllers\ActionController@caricaArtistiPreferiti');



Route::get('/likedTracks', 'App\Http\Controllers\ActionController@likedTracks');
Route::get('/ShowalllikedTracks', 'App\Http\Controllers\ActionController@showAllLikedTracks');
Route::get('/likedAlbums', 'App\Http\Controllers\ActionController@likedAlbums');
Route::get('/ShowalllikedAlbums', 'App\Http\Controllers\ActionController@showAllLikedAlbums');
Route::get('/likedArtists', 'App\Http\Controllers\ActionController@likedArtists');
Route::get('/ShowalllikedArtists', 'App\Http\Controllers\ActionController@showAllLikedArtists');



Route::get('/ShowTop50', 'App\Http\Controllers\ActionController@showTop50');
Route::get('/ShowTop50song', 'App\Http\Controllers\ActionController@showTop50Song');