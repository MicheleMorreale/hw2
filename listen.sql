CREATE TABLE users (
	id INT PRIMARY KEY not null AUTO_INCREMENT,
	username varchar(255),
    nome varchar(255),
    cognome varchar(255),
    email varchar(255),
    password varchar(255));
    
    CREATE TABLE liked_song (
    id_song varchar(255)primary key not null,
    nome varchar(255)not null,    
    album varchar(255)not null,
    artista varchar(255)not null,
	user_id INT not null,
    foreign key(user_id) references users(id) on delete cascade on update cascade);
    

CREATE TABLE liked_album (
    id_album varchar(255) primary key not null,
    nome varchar(255) not null,    
    artista varchar(255) not null,
	user_id INT not null,
    foreign key(user_id) references users(id) on delete cascade on update cascade);
    
    
    
CREATE TABLE liked_artists (
    id_artist varchar(255) primary key not null,
    nome varchar(255) not null,   
	user_id INT not null,
    foreign key(user_id) references users(id) on delete cascade on update cascade);
    
    CREATE TABLE song_posts (
    id_post INT PRIMARY KEY not null AUTO_INCREMENT,
    titolo varchar(255) not null,
    artista varchar(255) not null,
    descrizione varchar(255),
    immagine varchar(255), 
	user_id INT not null,
    foreign key(user_id) references users(id) on delete cascade on update cascade);
    
    CREATE TABLE album_posts (
    id_post INT PRIMARY KEY not null AUTO_INCREMENT,
    titolo varchar(255) not null,
    artista varchar(255) not null,
    descrizione varchar(255), 
    immagine varchar(255), 
	user_id INT not null,
    foreign key(user_id) references users(id) on delete cascade on update cascade);
    
    CREATE TABLE artist_posts (
    id_post INT PRIMARY KEY not null AUTO_INCREMENT,
    artista varchar(255) not null,
    descrizione varchar(255), 
    immagine varchar(255), 
	user_id INT not null,
    foreign key(user_id) references users(id) on delete cascade on update cascade);
    