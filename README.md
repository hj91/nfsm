# Machine State Simulator

This is a simple Node.js module that simulates a state machine. It allows you to define a sequence of states and state transitions with durations. You can interact with the machine by manually progressing to the next state, repeating the current state, moving back to the previous state, or running through the entire sequence.

## Features

- Define a custom sequence of states.
- Set state transitions with durations.
- Manually progress to the next state.
- Repeat the current state with its associated duration.
- Move back to the previous state in the sequence.
- Run through the entire sequence with specified durations.
- Stop the machine and reset its state.

## Installation

Copy the `Machine.js` file into your project directory or install it using npm i nfsm.

## Usage

1. Import the `Machine` class:

```javascript
const Machine = require('nfsm');
```

2. Create a new `Machine` instance and define the sequence of states:

```javascript
const myMachine = new Machine();
myMachine.Sequence("OFF", "ON", "IDLE", "WAITING", "PROCESSING", "STOP");
```

3. Define state transitions with durations:

```javascript
myMachine.State("OFF", "ON", 1000);
myMachine.State("ON", "IDLE", 2000);
myMachine.State("IDLE", "WAITING", 2000);
myMachine.State("WAITING", "PROCESSING", 2000);
myMachine.State("PROCESSING", "STOP", 1000);
```

4. Interact with the machine using the following methods:

- `myMachine.Next()`: Proceed to the next state.
- `await myMachine.Repeat()`: Repeat the current state with its associated duration.
- `await myMachine.Previous()`: Move back to the previous state in the sequence.
- `await myMachine.Run()`: Run through the sequence with specified durations.
- `myMachine.Stop()`: Stop the machine and reset its state.

## Example

A simple example of how to use the `Machine` class can be found in the `example.js` file. This example demonstrates how to use the available methods to interact with the machine.

To run the example, execute the following command:

```
node example.js
```

## License

This project is released under the GPL-3.0 License.
