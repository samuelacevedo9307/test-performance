import { Router } from "./Router";

function App() {
  // Verificar si existe el elemento raiz
  const $root = document.getElementById("root");
  if (!$root) throw new Error("Elemento raiz no encontrado");
  Router();
}

document.addEventListener("DOMContentLoaded", App);
