import { navigateTo } from "../../../Router";
import { API_URL } from "../../../constants";

export function DashboardPageComponent() {
  const user = JSON.parse(localStorage.getItem("user"));

  const html = /*html*/ `
    <h1>Todos los flights</h1>
    <div id="my-fly-container"></div>
    <section class="flights-container"></section>
  `;
  const logic = async () => {
    //  Obtener y mostrar

    const response = await fetch(`${API_URL}/flights`);
    const flights = await response.json();
    const $infoflights = document.querySelector(".flights-container");

    const $fragment = document.createDocumentFragment();
    flights.forEach((flight) => {
      const $flightCard = document.createElement("div");
      $flightCard.classList.add("flight-card");
      const flightHtml = /*HTML*/ `
          <h3>${flight.destination}</h3>
          <p>${flight.origin}</p>
          <p>desde:${flight.departure}</p>
          <p>hasta:${flight.arrival}</p>
          <p>Capacidad${flight.capacity}</p>
          <div id="btns-container-${flight.id}" ></div>
      `;

      $flightCard.innerHTML = flightHtml;

      $fragment.appendChild($flightCard);
      // Mostrar botón de comprar
      const $buttonsContainer = $fragment.getElementById(
        `btns-container-${flight.id}`
      );

      if (user.userRoleId === "1" /* Admin */) {
        //administrador

        $buttonsContainer.innerHTML = /*html*/ `
            <button class="edit-btn" data-flight-id="${flight.id}">Editar</button>
            <button class="delete-btn" data-flight-id="${flight.id}" >Eliminar</button>
          `;
        // Añadir eventos
        // Botón Editar
        const $buttonEdit = $fragment.querySelector(
          `.edit-btn[data-flight-id="${flight.id}"]`
        );

        $buttonEdit.addEventListener("click", () => {
          const flightToEditId = $buttonEdit.dataset.flightId;

          navigateTo(`/dashboard/flights/edit?id=${flightToEditId}`); //
        });
        // Boton Eliminar
        const $buttonDelete = $buttonsContainer.querySelector(".delete-btn");
        $buttonDelete.addEventListener("click", async (event) => {
          console.log(`Eliminando el flight ${flight.id}`);
          event.preventDefault();

          await fetch(`${API_URL}/flights/${flight.id}`, {
            method: "DELETE",
          });
          alert("eliminado con exito");
          navigateTo("/dashboard/flights");
        });
        //usuarios
        // //delete
      } else if (user.userRoleId === "2" /* Visitor */) {
        $buttonsContainer.innerHTML = /*html*/ `
            <button class="buy-btn">Comprar</button>
        `;
        // const $buyBtns = document.querySelector(".buy-btn");
        // $buyBtns.addEventListener("click", () => {
        //   console.log(`añadido a  mis pedidos`);
        // });
        //fincompra
      }
    }); //Fin
    $infoflights.appendChild($fragment);
  };
  return { html, logic };
}
