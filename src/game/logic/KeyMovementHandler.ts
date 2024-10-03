type MovementState = {
  left: boolean;
  up: boolean;
  right: boolean;
  down: boolean;
};

class KeyMovementHandler {
  private movementState: MovementState;
  private handleKeyDownBound: (event: KeyboardEvent) => void;
  private handleKeyUpBound: (event: KeyboardEvent) => void;

  constructor() {
    // Initialize movement state
    this.movementState = {
      left: false,
      up: false,
      right: false,
      down: false,
    };

    // Bind the event handlers so we can add and remove them
    this.handleKeyDownBound = this.handleKeyDown.bind(this);
    this.handleKeyUpBound = this.handleKeyUp.bind(this);

    // Attach event listeners
    window.addEventListener("keydown", this.handleKeyDownBound);
    window.addEventListener("keyup", this.handleKeyUpBound);
  }

  private handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowLeft":
      case "a":
        this.movementState.left = true;
        break;
      case "ArrowUp":
      case "w":
        this.movementState.up = true;
        break;
      case "ArrowRight":
      case "d":
        this.movementState.right = true;
        break;
      case "ArrowDown":
      case "s":
        this.movementState.down = true;
        break;
    }
  }

  private handleKeyUp(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowLeft":
      case "a":
        this.movementState.left = false;
        break;
      case "ArrowUp":
      case "w":
        this.movementState.up = false;
        break;
      case "ArrowRight":
      case "d":
        this.movementState.right = false;
        break;
      case "ArrowDown":
      case "s":
        this.movementState.down = false;
        break;
    }
  }

  // Method to expose the current movement state
  public getMovementState(): MovementState {
    return { ...this.movementState }; // Return a copy of the movement state
  }

  // Method to unsubscribe / release event listeners
  public unsubscribe(): void {
    window.removeEventListener("keydown", this.handleKeyDownBound);
    window.removeEventListener("keyup", this.handleKeyUpBound);
  }
}

export default KeyMovementHandler;
