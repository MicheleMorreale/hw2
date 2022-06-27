<html>
<head>
<title>Listen</title>
<link rel="stylesheet" href="<?php echo e(url ('css/login.css')); ?>" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;600&display=swap" rel="stylesheet">
<script src="<?php echo e(url ('js/signup.js')); ?>" defer="true"></script>
<meta name="viewport"
content="width=device-width, initial-scale=1">
</head>
<body>
    <div>
        <h1>Listen</h1>

        <?php if($error=='Nome utente già utilizzato'): ?>
        <section class='errore'> Nome utente già utilizzato</section>
        <?php endif; ?>
        
        <?php if($error=='Email già utilizzata'): ?>
        <section class='errore'> Email già utilizzata</section>
        <?php endif; ?>

        
        <?php if($error=='Username già utilizzato'): ?>
        <section class='errore'> Username già utilizzato</section>
        <?php endif; ?>


    <form id="form" name='form-signup' method='post'>
        <?php echo csrf_field(); ?>
        <div id="div-username">
    <h3>Username</h3>
       <label><input id="username" type="text" name='username' placeholder="Insert username" value='<?php echo e(old("username")); ?>'></label>
       </div>
       <div id="div-nome">
       <h3>Nome</h3>
       <label><input id="nome" type="text" name='nome' placeholder="Insert name" value='<?php echo e(old("nome")); ?>'></label>
       </div>
       <div id="div-cognome">
       <h3>Cognome</h3>
       <label><input id="cognome" type="text" name='cognome' placeholder="Insert your last name" value='<?php echo e(old("cognome")); ?>'></label>
       </div>
       <div id="div-email">
       <h3>Email</h3>
       <label><input id="email" type="text" name='email' placeholder="Insert your email" value='<?php echo e(old("email")); ?>'></label>
       </div>
       <div id="div-password">
       <h3>Password</h3>
       <label><input id="password" type="password" name='password' placeholder="Insert password"></label>
       </div>
       <div id="div-password2">
       <h3>Conferma password</h3>
       <label><input id="password2" type="password" name='password2'placeholder="Insert again password"></label>
       </div>
      <label><input id="Bottone" type="submit" value="Registrati"></label> 
    </form>
    <h3>Hai già un account? <a href="<?php echo e(url ('login')); ?>">Entra</a> </h3>
    </div>
</body>
</html><?php /**PATH C:\Users\Mike\Listen\resources\views/signup.blade.php ENDPATH**/ ?>