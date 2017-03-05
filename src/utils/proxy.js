export function throttleProxy (time = 300) {
  let handler = {
    timer: null,
    apply () {
      window.clearTimeout(this.timer)
      this.timer = window.setTimeout(() => Reflect.apply(...arguments), time)
    }
  }

  return (fn) => new Proxy(fn, handler)
}
