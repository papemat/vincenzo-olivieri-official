export function navigateWithTransition(cb: () => void) {
  if (typeof document !== 'undefined' && 'startViewTransition' in document) {
    (document as Document & { startViewTransition: (cb: () => void) => void }).startViewTransition(cb);
  } else {
    cb();
  }
}
