import './style.css'

document.addEventListener('DOMContentLoaded', () => {

  // --- VARIABLES ---  
  const btnIrRegistro = document.querySelector('#btnIrARegistro');
  const btnIniciarSesion = document.querySelector('#btnIniciarSesion');

  const btnCancelar = document.querySelector('#btnCancelar');
  const btnCancelarLogin = document.querySelector('#btnCancelarLogin');

  const pantallaBienvenida = document.querySelector('#pantallaBienvenida');
  const pantallaRegistro = document.querySelector('#pantallaRegistro');
  const pantallaLogin = document.querySelector('#pantallaLogin');

  const formulario = document.querySelector('#miFormulario');
  const formLogin = document.querySelector('#formLogin');


  // --- FUNCIÓN: OCULTAR TODO MENOS LA PANTALLA QUE ELEGIMOS ---
  function mostrarPantalla(pantalla) {
    pantallaBienvenida.style.display = 'none';
    pantallaRegistro.style.display = 'none';
    pantallaLogin.style.display = 'none';

    pantalla.style.display = 'flex';
  }


  // --- BOTÓN: REGISTRARSE ---
  if (btnIrRegistro) {
    btnIrRegistro.addEventListener('click', () => {
      mostrarPantalla(pantallaRegistro);
    });
  }

  // --- BOTÓN: INICIAR SESIÓN ---
  if (btnIniciarSesion) {
    btnIniciarSesion.addEventListener('click', () => {
      mostrarPantalla(pantallaLogin);
    });
  }

  // --- CANCELAR REGISTRO ---
  if (btnCancelar) {
    btnCancelar.addEventListener('click', () => {
      pantallaBienvenida.style.display = 'block';
      pantallaRegistro.style.display = 'none';
      pantallaLogin.style.display = 'none';
    });
  }

  // --- CANCELAR LOGIN ---
  if (btnCancelarLogin) {
    btnCancelarLogin.addEventListener('click', () => {
      pantallaBienvenida.style.display = 'block';
      pantallaRegistro.style.display = 'none';
      pantallaLogin.style.display = 'none';
    });
  }


  // --- REGISTRO: GUARDAR DATOS ---
  if (formulario) {
    formulario.addEventListener('submit', (e) => {
      e.preventDefault();

      const miForm = e.target;

      const nombre = miForm.querySelector('input[type="text"]').value;
      const email = miForm.querySelector('input[type="email"]').value;
      const pass = miForm.querySelector('input[type="password"]').value;

      const nuevoUsuario = { nombre, email, pass, fecha: new Date() };

      let listaUsuarios = JSON.parse(localStorage.getItem('usuarios_db')) || [];
      listaUsuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios_db', JSON.stringify(listaUsuarios));

      alert('¡Cuenta creada!');

      miForm.reset();
      pantallaBienvenida.style.display = 'block';
    });
  }


  // --- LOGIN: COMPROBAR DATOS ---
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = formLogin.querySelector('input[type="email"]').value;
      const pass = formLogin.querySelector('input[type="password"]').value;

      const listaUsuarios = JSON.parse(localStorage.getItem('usuarios_db')) || [];

      const user = listaUsuarios.find(u => u.email === email && u.pass === pass);

      if (!user) {
        alert("Credenciales incorrectas");
        return;
      }

      alert(`¡Bienvenido de nuevo, ${user.nombre}!`);

      pantallaBienvenida.style.display = 'block';
      pantallaLogin.style.display = 'none';
    });
  }

});
