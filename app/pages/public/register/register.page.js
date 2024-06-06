import { API_URL } from "../../../constants";
import { emailValidator } from "../../../helpers/email-validator";
import { navigateTo } from "../../../Router";
import { getUsers } from "../../../services/get-user";

async function register(name, email, password) {

  const userToRegister = {
    name,
    email,
    password,
    // NOTA: Por defecto solo se registran visitantes
    userRoleId: "2", // -> Visitor
  };

  // console.log({
  //   userToRegisterAsString: JSON.stringify(userToRegister),
  //   userToRegister,
  // });

  try {

    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToRegister),
    });

    if (!response.ok)
      throw new Error(`${response.status}: ${response.statusText}`);
  } catch (err) {
    console.error("Error registrando el usuario", err);
    throw err;

  }
}

export function RegisterPageComponent() {
  const $root = document.getElementById("root");
  $root.innerHTML = /*html*/ `
    <main>
      <div class="form-container">
        <h1>Registro</h1>
        <form id="form-register">
          <div class="form-group">
            <label for="name">Nombre:</label>
            <input type="text" name="name" id="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" required>
          </div>
          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input type="password" name="password" id="password" required>
          </div>
          <button type="submit">Registrarse</button>
        </form>
        <div>
          <p>¿Tienes cuenta?</p>
          <button id="login-btn">Inicia sesión</button>
        </div>
      </div>
    </main>
  `;

  // Logica del Registro
  const $formRegister = document.getElementById("form-register");

  const $nameInput = document.getElementById("name");
  const $emailInput = document.getElementById("email");
  const $passwordInput = document.getElementById("password");
  const $submitButtonRegister = document.querySelector('[type="submit"]');

  $formRegister.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Desactivamos el botón para hacer submit
    $submitButtonRegister.setAttribute("disabled", "true");

    // Validar el correo
    const isValidEmail = emailValidator($emailInput.value);
    if (!isValidEmail) {
      alert("Email no válido. Corrígelo.");
      $submitButtonRegister.removeAttribute("disabled");
      return;
    }
    //
    // usuarios
    const users = await getUsers();
    //  email
    const foundUser = users.find((user) => user.email === $emailInput.value);

    if (foundUser) {
      alert("Usuario ya registrado.");
      $submitButtonRegister.removeAttribute("disabled");
      return;
    }

    // Si no está registrado, lo registramos ✅
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: $nameInput.value,
        email: $emailInput.value,
        password: $passwordInput.value,
        userRoleId: "2",
      }),
    });

    const registeredUser = await response.json();

    // 1. Generar el token  LocalStorage
    const token = Math.random().toString(36).slice(2);
    // const token

    localStorage.setItem("token", token);
    console.log({ token });
//
    const { password: _, ...userRestOfProperties } = registeredUser; // objeto LocalStorage
    localStorage.setItem("user", JSON.stringify(userRestOfProperties));

    alert("Registro exito. Redirigiendo al Dashboard");

    navigateTo("/dashboard/flights");
  });
//
  const $loginButton = document.getElementById("login-btn");
  $loginButton.addEventListener("click", () => {
    navigateTo("/login");
  });
}
