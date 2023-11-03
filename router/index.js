class Router {
  constructor () {
    this.routers = {}
    this.currentUrl = ''
    this.history = []
    window.addEventListener('hashchange', () => {
      this.refresh()
    }, false)
  }
  router (path, callback) {
    this.routers[path] = callback || function() {};
  }
  refresh () {
    this.currentUrl = location.hash.slice(1) || '/';
    this.routers[this.currentUrl]();
    this.history.push(this.currentUrl)
  }
  backoff () {
    if (this.history.length > 1) {
      this.history.pop()
      var url = this.history[this.history.length - 1]
      location.hash = '#'+url
    }
  }
}


class HistoryRouter {
  constructor () {
    this.routers = {}
    this._bindPopState()
  }
  router (path, callback) {
    this.routers[path] = callback || function() {};
  }
  _bindPopState () {
    window.addEventListener('popstate', (e) => {
      const path = e.state && e.state.path;
      this.routers[path] && this.routers[path]();
    })
  }
  init(path) {
    history.replaceState({path: path}, null, path);
    this.routers[path] && this.routers[path]();
  }
  go(path) {
    history.pushState({path: path}, null, path)
    this.routers[path]()
  }
}