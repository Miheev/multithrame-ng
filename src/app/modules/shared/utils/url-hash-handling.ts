export function isUrlHashUsed(): boolean {
  return Boolean(window.history.pushState) === false;
}
