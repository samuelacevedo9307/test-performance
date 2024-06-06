import { logOut } from "../helpers/log-out";
export function PrivateLayout(contentHtml, contentLogic) {
  const $root = document.getElementById("root");
  $root.innerHTML = /*html*/ `
    <header>
      <nav>
        <ul>
          <li><button>vuelos</button></li>
          <li><button id="my-fly-btn">Pedidos</button></li>
        </ul>
      </nav>
      <button id="log-out-btn">Cerrar sesión</button>
    </header>
    <div>${contentHtml}</div>
  `;
  contentLogic();
  // //PEDIDOS
  // const $myFlight = document.getElementById("my-fly-btn");
  // $myFlight.addEventListener("click", () => {
  //   console.log("Navegando a la ruta: /dashboard/flights/myFlights");
  //   navigateTo("/dashboard/flights/myFlights");
  // });//FINPEDIDOS
  // log out
  const $buttonLogOut = document.getElementById("log-out-btn");
  $buttonLogOut.addEventListener("click", () => {
    logOut();
  });
}
