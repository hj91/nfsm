// Finite State Machine example 

const Machine = require('nfsm'); // after npm install machine in your directory
const readline = require('readline');

const myMachine = new Machine();
myMachine.Sequence("OFF", "ON", "IDLE", "WAITING", "PROCESSING", "STOP");
myMachine.State("OFF", "ON", 1000);
myMachine.State("ON", "IDLE", 2000);
myMachine.State("IDLE", "WAITING", 2000);
myMachine.State("WAITING", "PROCESSING", 2000);
myMachine.State("PROCESSING", "STOP", 1000);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Commands:");
console.log("- 'n': Proceed to next state");
console.log("- 'r': Repeat the current state");
console.log("- 'p': Go back to the previous state");
console.log("- 's': Run through the sequence");
console.log("- 't': Stop the machine");
console.log("- 'q': Quit");

rl.on('line', async (input) => {
  switch (input) {
    case 'n':
      myMachine.Next();
      break;
    case 'r':
      await myMachine.Repeat();
      break;
    case 'p':
      await myMachine.Previous();
      break;
    case 's':
      await myMachine.Run();
      break;
    case 't':
      myMachine.Stop();
      break;
    case 'q':
      rl.close();
      break;
    default:
      console.log("Invalid command.");
  }
});

