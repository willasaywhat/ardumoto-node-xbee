var keypress = require("keypress");
var five = require("johnny-five"),
  board = new five.Board();

board.on("ready", function() {
  var motor;
  /*
    ArduMoto
      Motor A
        pwm: 3
        dir: 12

      Motor B
        pwm: 11
        dir: 13


    AdaFruit Motor Shield
      Motor A
        pwm: ?
        dir: ?

      Motor B
        pwm: ?
        dir: ?


    Bi-Directional Motors can be initialized by:

      new five.Motor([ 3, 12 ]);

    ...is the same as...

      new five.Motor({
        pins: [ 3, 12 ]
      });

    ...is the same as...

      new five.Motor({
        pins: {
          pwm: 3,
          dir: 12
        }
      });

   */


  motor_a = new five.Motor({
    pins: {
      pwm: 3,
      dir: 12
    }
  });

  motor_b = new five.Motor({
    pins: {
      pwm: 11,
      dir: 13
    }
  });

  board.repl.inject({
    motor_a: motor_a,
    motor_b: motor_b
  });

  var speed = 255;
  function controller(ch, key) {
      if (key) {
        if (key.name === "space") {
          motor_a.stop();
          motor_b.stop();
        }
        if (key.name === "up") {
          motor_a.forward(speed);
          motor_b.forward(speed);
        }
        if (key.name === "down") {
          motor_a.reverse(speed);
          motor_b.reverse(speed);
        }
        if (key.name === "right") {
          motor_b.forward(speed);
          motor_a.reverse(speed);
        }
        if (key.name === "left") {
          motor_a.forward(speed);
          motor_b.reverse(speed);
        }

        commands = [].slice.call(arguments);
      } else {
        if (ch >= 1 && ch <= 9) {
          speed = five.Fn.scale(ch, 1, 9, 0, 255);
          controller.apply(null, commands);
        }
      }
    }


    keypress(process.stdin);

    process.stdin.on("keypress", controller);
    process.stdin.setRawMode(true);
    process.stdin.resume();


  // set the motor going forward full speed
  motor_a.forward(255);
  motor_b.forward(255);
});
