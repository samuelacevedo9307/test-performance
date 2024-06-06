import { emailValidator } from "../../../helpers/email-validator";
import { getUsers } from "../../../services/get-user";
import { navigateTo } from "../../../Router";

export function LoginPageComponent() {
  const $root = document.getElementById("root");
  $root.innerHTML = /*html*/ `
    <h1>Acceso</h1>
    <form id="form-login">
        <div class="form-group">
            <label for="">Correo electronico: </label>
            <input type="email" name="email" id="email" required>
        </div>
        <div class="form-group">
            <label for="">Contraseña: </label>
            <input type="password" id="password" name="password" required>
        </div>
        <button type="submit">Ingresar</button>
    </form>
    <p>¿No tienes cuenta?</p>
    <button id="btn-register">Registrate</button>
  `;
  const logic = () => {
    const $formLogin = document.getElementById("form-login");

    const $emailInput = document.getElementById("email");
    const $passwordInput = document.getElementById("password");
    const $submitButtonLogin = document.querySelector('[type="submit"]');

    $formLogin.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Desactivamos el botón para hacer submit
      $submitButtonLogin.setAttribute("disabled", "true");

      // Validar el correo
      const isValidEmail = emailValidator($emailInput.value);
      if (!isValidEmail) {
        alert("Email no válido. Corrígelo.");
        $submitButtonLogin.removeAttribute("disabled");
        return;
      }
      // Valida usuario
      //  usuarios
      const users = await getUsers();

      // email 
      const foundUser = users.find((user) => {
        return user.email === $emailInput.value;
      });

      if (!foundUser) {
        alert("No tienes cuenta. Registrate");
        $submitButtonLogin.removeAttribute("disabled");
        return;
      }
      

      if ($passwordInput.value !== foundUser.password) {
        // En el caso de tener cuenta. Validar la contraseña
        $submitButtonLogin.removeAttribute("disabled");
        return alert("Email o contraseña invalida, intenta de nuevo.");
      }

      const token = Math.random().toString(36).slice(2); // Guardar el token y el usuario en el localStorage
      localStorage.setItem("token", token);

      const { password: _, ...userRestOfProperties } = foundUser; // usuario excepto la contraseña
      localStorage.setItem("user", JSON.stringify(userRestOfProperties));
      navigateTo("/dashboard/flights");
    }); // Fin 

    //evento clic boton registrarse
    const $buttonRegister = document.getElementById("btn-register");

    $buttonRegister.addEventListener("click", () => {
      navigateTo("/register");
    });
  }; // Fin logic
  logic();
} //Fin LoginPageComponent
