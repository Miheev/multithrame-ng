/**
 * Output render timestamp and attempts count
 */
export function setRenderCounter<T extends {} = {}>(instance: T) {
  instance['renderCounter'] = 0;

  // renderCounter = 0;
  // get renderCount(): string { return ` : ${String(this.renderCounter++)} -- ${Date.now()}`; }
  Object.defineProperty(instance, 'renderCount', {
    get: function() {
      return ` : ${String(this.renderCounter++)} -- ${Date.now()}`;
    },
    writable: true,
    enumerable: true,
    configurable: true,
  });
}
