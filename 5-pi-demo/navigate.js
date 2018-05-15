export default class Navigate {

  constructor() {

  }

  turnRight(dur = 0) {
    this.restMove('rgt', dur);
  }

  turnLeft(dur = 0) {
    this.restMove('lft', dur);
  }

  forward(dur = 0) {
    this.restMove('fwd', dur);
  }

  reverse(dur = 0) {
    this.restMove('rev', dur);
  }

  stop(direction, duration) {
    this.restMove('stop');
  }

  restMove(direction, duration) {
    let url = 'http://10.10.10.55:8080/' + direction;
    if (duration > 0) url = url + "/" + duration;
    fetch(url)
      .then((response) => {
        console.log(response.json());
      })
      .then((command) => {
        // do nothing
      });
  }
}