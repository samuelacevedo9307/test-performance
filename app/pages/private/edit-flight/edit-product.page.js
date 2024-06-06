import { API_URL } from "../../../constants";
import { navigateTo } from "../../../Router";

export function EditFlightPageComponent(searchParams) {
  
  const flightId = searchParams.get("id");
  const html = /* html */ `

    <h3>Editando vuelo</h3>
    <div id="flight"></div>

    `;
  const logic = async () => {
    
    const $flight = document.getElementById("flight");
    const response = await fetch(`http://localhost:4000/flights/${flightId}`);
    const flight = await response.json();
    
    $flight.innerHTML = /*html*/ `

      <form id="form-edit-flight">
        <div>
          <label>Destino</label>
          <input value="${flight.destination}" name="destination" id="destination" disabled>
        </div>
        <div>
          <label>pais origen: </label>
          <input name="origin" id="origin" ${flight.origin}></input>
        </div>
        <div>
          <label>Desde: </label>
          <input type="datetime" value="${flight.departure}" name="departure" id="departure">
        </div>
        <div>
          <label>Hasta:</label>
          <input type="datetime" value="${flight.arrival}" name="arrival" id="arrival">
        </div>
        <div>
          <label>capacidad: </label>
          <input type="text" value="${flight.capacity}" name="capacity" id="capacity">
        </div>
        <button type="submit">Guardar</button>
      </form>

    `;
//
    // editar el flight.
    const $editedForm = document.getElementById("form-edit-flight");
    const $destinationInput = document.getElementById("destination");
    const $originInput = document.getElementById("origin");
    const $departureInput = document.getElementById("departure");
    const $arrivalInput = document.getElementById("arrival");
    const $capacityInput = document.getElementById("capacity");
    
    $editedForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      // 
      Almacenar
      await fetch(`${API_URL}/flights/${flightId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination: $destinationInput.value,
          origin: $originInput.value,
          departure: $departureInput.value,
          arrival: $arrivalInput.value,
          capacity: $capacityInput.value,
        }),
      });
      alert("¡vuelo editado con exito!");
      navigateTo("/dashboard/flights");
    });
  }; //Fin Logic
  return { html, logic };
}
