<html>
<head>
<title>Listen</title>
<link rel="stylesheet" href="{{url ('css/login.css')}}" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;600&display=swap" rel="stylesheet">
<script src="{{url ('js/signup.js')}}" defer="true"></script>
<meta name="viewport"
content="width=device-width, initial-scale=1">
</head>
<body>
    <div>
        <h1>Listen</h1>

        @if ($error=='Nome utente già utilizzato')
        <section class='errore'> Nome utente già utilizzato</section>
        @endif
        
        @if ($error=='Email già utilizzata')
        <section class='errore'> Email già utilizzata</section>
        @endif

        
        @if ($error=='Username già utilizzato')
        <section class='errore'> Username già utilizzato</section>
        @endif


    <form id="form" name='form-signup' method='post'>
        @csrf
        <div id="div-username">
    <h3>Username</h3>
       <label><input id="username" type="text" name='username' placeholder="Insert username" value='{{old("username")}}'></label>
       </div>
       <div id="div-nome">
       <h3>Nome</h3>
       <label><input id="nome" type="text" name='nome' placeholder="Insert name" value='{{old("nome")}}'></label>
       </div>
       <div id="div-cognome">
       <h3>Cognome</h3>
       <label><input id="cognome" type="text" name='cognome' placeholder="Insert your last name" value='{{old("cognome")}}'></label>
       </div>
       <div id="div-email">
       <h3>Email</h3>
       <label><input id="email" type="text" name='email' placeholder="Insert your email" value='{{old("email")}}'></label>
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
    <h3>Hai già un account? <a href="{{url ('login')}}">Entra</a> </h3>
    </div>
</body>
</html>