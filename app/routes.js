//pu
import { LoginPageComponent } from "./pages/public/login/login.page";
import { RegisterPageComponent } from "./pages/public/register/register.page";
import { NotFoundPageComponent } from "./pages/public/not-found/not-found.page";
//private
import { DashboardPageComponent } from "./pages/private/dashboard/dashboard.page";
import { EditFlightPageComponent } from "./pages/private/edit-flight/edit-product.page";
import { myFlights } from "./pages/private/myFlights/myFlights.page";
import { AddFlightPageComponent } from "./pages/private/add-flights/add.fligths.page";

export const routes = {
  public: [
    { path: "/login", component: LoginPageComponent },
    { path: "/register", component: RegisterPageComponent },
    { path: "/not-found", component: NotFoundPageComponent },
  ],
  private: [
    { path: "/dashboard/flights", component: DashboardPageComponent },
    { path: "/dashboard/flights/edit", component: EditFlightPageComponent },
    {
      path: "/dashboard/flights/add-flights",
      component: AddFlightPageComponent,
    },
    { path: "/dashboard/flights/myFlights", component: myFlights },
  ],
};
//usuarios
// //delete
// const $deleteFly = document.getElementById("delete-btn");
// $deleteFly.addEventListener("submit", async (event) => {
//   event.preventDefault();

//   await fetch(`${API_URL}/flights/${flightId}`, {
//     method: "DELETE",
//   });
//   alert("¡vuelo editado con exito!");
//   navigateTo("/dashboard/flights");
// });
