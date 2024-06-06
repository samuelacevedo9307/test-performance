import { API_URL } from "../../../constants";
import { navigateTo } from "../../../Router";

// export function AddFlightPageComponent() {}

async function register(
  id,
  number,
  origin,
  destination,
  departure,
  arrival,
  capacity
) {
  const userToAdd = {
    id,
    number,
    origin,
    destination,
    departure,
    arrival,
    capacity, // -> Visitor
  };

  try {
    const response = await fetch(`${API_URL}/fligths`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToAdd),
    });

    if (!response.ok)
      throw new Error(`${response.status}: ${response.statusText}`);
  } catch (err) {
    console.error("Error registrando el vuelo", err);
    throw err;
  }
}

export function AddFlightPageComponent() {
  const $root = document.getElementById("root");
  $root.innerHTML = /*html*/ `
    <main>
      <div class="form-container">
        <h1>Adicionar vuelos</h1>
      <form id="form-register">
        <div>
            <label> ID: </label>
            <input name="id" id="id" disable ></input>
        </div>
        <div>
            <label>Number: </label>
            <input name="number" id="number" ></input>
        </div>
        <div>
            <label>pais origen: </label>
            <input name="origin" id="origin" ></input>
        </div>
        <div>
          <label>Destino</label>
          <input  name="destination" id="destination" >
        </div>
        <div>
          <label>Desde: </label>
          <input type="datetime"  name="departure" id="departure">
        </div>
        <div>
          <label>Hasta:</label>
          <input type="datetime" " name="arrival" id="arrival">
        </div>
        <div>
          <label>capacidad: </label>
          <input type="text"  name="capacity" id="capacity">
        </div>
        <button type="submit">Guardar</button>
        </form>
        <div>
          <p>¿Tienes cuenta?</p>
          <button id="add-btn">Inicia sesión</button>
        </div>
      </div>
    </main>
  `;

  // Logica del Registro
  const $formRegister = document.getElementById("form-register");

  const $idInput = document.getElementById("id");
  const $numberInput = document.getElementById("number");
  const $originInput = document.getElementById("origin");
  const $destinationInput = document.getElementById("destination");
  const $departureInput = document.getElementById("departure");
  const $arrivalInput = document.getElementById("arrival");
  const $capacityInput = document.querySelector("capacity");
  const $submitButtonRegister = document.querySelector('[type="submit"]');
  //  id,
  //   number,
  //   origin,
  //   destination,
  //   departure,
  //   arrival,
  //   capacity,
  $formRegister.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Desactivamos el botón para hacer submit
    $submitButtonRegister.setAttribute("disabled", "true");
    //
    // usuarios
    const flights = await getUsers();
    //  email
    const foundFlight = flights.find(
      (flight) => flight.number === $numberInput.value
    );

    if (foundFlight) {
      alert("este numero ya se encuentra registrado ");
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
        id: $idInput.value,
        number: $numberInput.value,
        origin: $originInput.value,
        destination: $destinationInput.value,
        departure: $departureInput.value,
        arrival: $arrivalInput.value,
        capacity: $capacityInput.value,
      }),
    });
    //
    const registeredFlight = await response.json();
    //
    const { ...userRestOfProperties } = registeredFlight; // objeto LocalStorage
    localStorage.setItem("flight", JSON.stringify(userRestOfProperties));

    console.log("Registro exito. Redirigiendo al Dashboard");

    navigateTo("/dashboard/flights/add-flights");
  });
  //
  const $loginButton = document.getElementById("add-btn");
  $loginButton.addEventListener("click", () => {
    navigateTo("/login");
  });
}
