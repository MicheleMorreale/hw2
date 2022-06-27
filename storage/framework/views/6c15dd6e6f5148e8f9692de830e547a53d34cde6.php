<html>
<head>
<title>Listen</title>
<link rel="stylesheet" href="<?php echo e(url ('css/profile.css')); ?>" />
<link rel="stylesheet" href="<?php echo e(url ('css/home.css')); ?>" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;600&display=swap" rel="stylesheet">
<script src="<?php echo e(url ('js/home_2.js')); ?>" defer="true"></script> 
<script> const BASE_URL="<?php echo e(url('/')); ?>/";
        const csrf_token='<?php echo e(csrf_token()); ?>';
</script>
<meta name="viewport"
content="width=device-width, initial-scale=1">
</html>
</head>
<body>
    <header>
        <nav>
            <div id="logo">              
            </div>
            <div id="menu_icon">
              <img src="menu.png" height="50" width="50">
            </div>
                <div id="searchbar">
                  <div id="lente" ><img src="https://www.seekpng.com/png/full/920-9209972_magnifying-glass-png-white-search-icon-white-png.png" alt="" width="20px" height="20px"></div>
                  <div id="barra" class="hide">
                  <div><form >
                        <?php echo csrf_field(); ?>
                    <select id="scelte" name="">
                    <option value="Song">Song</option>
                    <option value="Artist">Artist</option>
                    <option value="Album">Album</option>
                     </select>
                     <div ><input id="Testo" type="text" value=""></div>
                  <div ><input id="Bottone" type="submit" value="Cerca" ></div>
                  </form></div>           
                </div>
              </div>
                 <div id="menubar">
                    <a href="<?php echo e(url ('/home')); ?>">Home</a>
                    <a href="<?php echo e(url ('/ShowTop50')); ?>">Charts</a>
                    <a href="<?php echo e(url ('/about')); ?>">About</a>

                        <div id="profilo"> 
                            <a id="logout" class="hidden" href="<?php echo e(url ('/logout')); ?>">Logout</a>
                             <img id="profilo_foto" src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="" width="30px" height="30px">
                             <a id="profile" href="<?php echo e(url ('/profile')); ?>"> <?php echo e(Session::get('username')); ?></a>
                        </div>

                </div>

        </nav> 
       
        
        <h1>Listen</h1>
       
        </header>

        <section id="general">
        
</section><div id="sezione_podcast">
        <h3>Scopri i nuovi podcast</h3>
        <div id="container-podcast"></div>
</section>
         
      </div>

      <section id="ultime-uscite">
          <h3>Ultime uscite</h3>          
        <div id="container-uscite"></div>
</section>     

      </div> 
      </section>

      
      <section id="search-view" class="hide">
        
      </section>
      <section id="show-content">
        
      </section>
      
      
      <section id="create-post" class="hidden">
        
      </section>
          
      </body>
</html><?php /**PATH C:\Users\Mike\Listen\resources\views/home.blade.php ENDPATH**/ ?>