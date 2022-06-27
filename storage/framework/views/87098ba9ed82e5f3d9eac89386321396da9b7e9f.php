<html>
<head>
<title>Listen</title>
<link rel="stylesheet" href="<?php echo e(url ('css/login.css')); ?>" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;600&display=swap" rel="stylesheet">
<script src="<?php echo e(url ('js/login.js')); ?>" defer="true"></script>
<meta name="viewport"
content="width=device-width, initial-scale=1">
</head>
<body>
    <div>
        <h1>Listen</h1>
        <?php if($error=='Utente non registrato'): ?>
        <section class='errore'> Utente non registrato</section>
        <?php endif; ?>
    <form name='form-login' method='post'>
    <?php echo e(csrf_field()); ?>

    <h3>Inserisci username</h3>
       <label><input id="username" type="text" name='username' value='<?php echo e(old("username")); ?>'></label>
       <h3>Inserisci password</h3>
       <label><input id="password" type="password" name='password' value='<?php echo e(old("password")); ?>'></label>
      <label><input id="Bottone" type="submit" value="Entra"></label> 
    </form>
    <p>Non hai un account? <a href="<?php echo e(url ('registrazione')); ?>">Registrati</a>
    </div>
</body>
</html><?php /**PATH C:\Users\Mike\Listen\resources\views/login.blade.php ENDPATH**/ ?>