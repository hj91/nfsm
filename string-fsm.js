const Machine = require('nfsm');

async function runMachine() {
  const machine = new Machine();

  // Define the state transitions for our machine
  const transitions = {
    'INITIAL': { 'a': 'A', 'b': 'INITIAL', 'c': 'INITIAL' },
    'A': { 'a': 'A', 'b': 'B', 'c': 'INITIAL' },
    'B': { 'a': 'A', 'b': 'INITIAL', 'c': 'C' },
    'C': { 'a': 'A', 'b': 'INITIAL', 'c': 'INITIAL' }
  };

  // This is the string we'll check for the "abc" pattern
  const inputString = 'abacabc';
  
  // The machine always starts in the 'INITIAL' state
  let currentState = 'INITIAL';

  // Initialize the transition table
  const transitionTable = [];

  // Iterate over each character in the input string
  for (const character of inputString) {
    // Get the next state based on the current state and the input character
    const nextState = transitions[currentState][character];
    
    // If the next state is undefined, it means the input character is invalid
    if (nextState === undefined) {
      console.log('Invalid character: ' + character);
      return;
    }

    // Add the transition to the transition table
    transitionTable.push({ from: currentState, to: nextState, input: character });

    // Only add a new state transition if the state actually changes
    if (currentState !== nextState) {
      machine.Sequence(currentState, nextState);
      machine.State(currentState, nextState, 1000);
    }

    // Move the machine to the next state
    await machine.Next();
    
    // Update the current state
    currentState = nextState;

    // If we're in state 'C', we've found the "abc" pattern
    if (currentState === 'C') {
      console.log('Substring "abc" found.');
      break;
    }
  }

  // Print the transition table
  console.log('Transition Table:');
  console.table(transitionTable);
}

runMachine();

