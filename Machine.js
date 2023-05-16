/**

 Copyright 2023 Bufferstack.IO Analytics Technology LLP, Pune

 Licensed under the GNU General Public License, Version 3.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://www.gnu.org/licenses/gpl-3.0.html

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 **/

class Machine {
  constructor() {
    this.sequence = [];
    this.stateTransitions = new Map();
    this.currentStateIndex = 0;
    this.cycleCount = 0;
    this.previousStateIndices = [];
  }

  Sequence(...states) {
    this.sequence = states;
  }

  State(from, to, duration) {
    if (!this.sequence.includes(from) || !this.sequence.includes(to)) {
      throw new Error("Invalid 'from' or 'to' state.");
    }
    this.stateTransitions.set(from, { to, duration });
  }

  CurrentState() {
    return this.sequence[this.currentStateIndex];
  }

  Next() {
    if (this.currentStateIndex === this.sequence.length - 1) {
      console.log("Sequence completed.");
      return;
    }
    this.previousStateIndices.push(this.currentStateIndex);
    this.currentStateIndex++;
    console.log("Current state:", this.CurrentState());
  }

  async Repeat() {
    const currentState = this.CurrentState();
    const transition = this.stateTransitions.get(currentState);

    if (!transition) {
      console.log("No transition defined for current state:", currentState);
      return;
    }

    const { duration } = transition;

    console.log("Repeating current state:", currentState);

    await new Promise((resolve) => setTimeout(resolve, duration));

    console.log("Current state:", this.CurrentState());
  }

  async Previous() {
    if (this.previousStateIndices.length === 0) {
      console.log("This is the first state.");
      return;
    }
    this.currentStateIndex = this.previousStateIndices.pop();

    const currentState = this.CurrentState();
    const transition = this.stateTransitions.get(currentState);

    if (!transition) {
      console.log("No transition defined for current state:", currentState);
      return;
    }

    const { duration } = transition;

    console.log("Returning to previous state:", currentState);

    await new Promise((resolve) => setTimeout(resolve, duration));

    console.log("Current state:", this.CurrentState());
  }

  async Run() {
    while (this.currentStateIndex < this.sequence.length - 1) {
      const currentState = this.sequence[this.currentStateIndex];
      const transition = this.stateTransitions.get(currentState);
      const { to, duration } = transition;

      await new Promise((resolve) => setTimeout(resolve, duration));

      this.previousStateIndices.push(this.currentStateIndex);
      const nextStateIndex = this.sequence.indexOf(to);
      if (nextStateIndex === -1) {
        throw new Error(`Invalid 'to' state: ${to}`);
      }

      this.currentStateIndex = nextStateIndex;
      console.log("Current state:", this.CurrentState());
    }

    this.cycleCount++;
    console.log(`Cycle number ${this.cycleCount} completed.`);
  }

  Stop() {
    this.currentStateIndex = 0;
    console.log("Machine stopped.");
  }
}

module.exports = Machine;

