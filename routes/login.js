document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password');
    const mostrarContrasenaBtn = document.getElementById('mostrarContrasena');
  
    mostrarContrasenaBtn.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        mostrarContrasenaBtn.innerHTML = '<i class="material-symbols-rounded">visibility</i>';
      } else {
        passwordInput.type = 'password';
        mostrarContrasenaBtn.innerHTML = '<i class="material-symbols-rounded">visibility_off</i>';
      }
    });
  });
  

module.exports = router;