import { PrivateLayout } from "./layouts/private_layout";
import { routes } from "./routes";

export function navigateTo(targetPath)
{
  window.history.pushState({}, "", targetPath); // para el login
  Router();
}

export function Router() {
  const currentPath = window.location.pathname; // ruta actual de la barra del navegador.

  const currentSearchParams = new URLSearchParams(window.location.search); // search params actuales
  console.log({ currentPath, currentSearchParams });

  const token = localStorage.getItem("token"); //Obtener el token de la sesión
  // Validamos si quiere ir al /login teniendo la sesión activa
  if ((currentPath === "/login" || currentPath === "/register") && token) {
    return navigateTo("/dashboard/flights");
  }
  // console.log({ path });
  // 5. Obtener la ruta descrita en `routes` que se empareje con la ruta actual
  const publicRoute = routes.public.find((r) => r.path === currentPath);
  const privateRoute = routes.private.find((r) => r.path === currentPath);
  // 6. Validar si la ruta actual existe en las rutas descritas
  if (publicRoute) {
    // 7. Ejecutar el componente asociado a la ruta pasandole los search params.
    publicRoute.component(currentSearchParams);
  } else if (privateRoute && token) {
    const { html, logic } = privateRoute.component(currentSearchParams);
    PrivateLayout(html, logic);
  } else if (privateRoute && !token) {
    navigateTo("/login");
  } else {
    console.error("No se encontró la ruta");
    // Redirigir al /not-found
    navigateTo("/not-found");
  }
}

// Se vuelve a ejecutar el router cuando
// naveguemos hacia atrás o hacia adelante con
// los botones <- o -> del navegador (ubicados
// en la parte superior izquierda de la ventana).
window.onpopstate = Router;
