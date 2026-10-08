import type { Mission } from '../types/game';

export const MISSIONS: Mission[] = [
  {
    id: 1,
    slug: 'security-door',
    title: 'Security Door',
    subtitle: 'Access Control Systems',
    objective: 'The primary laboratory door is locked. Fix the conditional logic so that access_level = 7 triggers door.open().',
    difficulty: 'Easy',
    concept: 'Conditions',
    xpReward: 150,
    startingCode: `access_level = 7

if access_level > 10:
    door.open()
else:
    door.lock()`,
    hints: [
      {
        tier: 1,
        type: 'Observation',
        text: 'Notice that access_level is 7, but the check requires > 10. Consequently, the else block executes and locks the door.'
      },
      {
        tier: 2,
        type: 'Concept',
        text: 'Conditional statements compare values using comparison operators: > (greater), >= (greater or equal), == (equal).'
      },
      {
        tier: 3,
        type: 'Specific Direction',
        text: 'Change "access_level > 10" to "access_level >= 7" or "access_level > 5" so that the condition evaluates to true.'
      }
    ],
    testCases: [
      {
        id: 'tc1',
        description: 'Check door status with access level 7',
        expectedOutcome: 'door.open() is invoked successfully'
      },
      {
        id: 'tc2',
        description: 'Verify security gate unlock signal',
        expectedOutcome: 'System status transitions from OFFLINE to ONLINE'
      }
    ],
    solutionExplanation: {
      whatWasWrong: 'The access threshold (> 10) was higher than the user\'s credential level (7), locking out authorized personnel.',
      whatWasFixed: 'Updated the boolean condition to evaluate true for access level 7.',
      conceptLearned: 'If/Else Statements & Boolean Comparison Operators'
    }
  },
  {
    id: 2,
    slug: 'elevator',
    title: 'Elevator Shaft',
    subtitle: 'Vertical Transit Core',
    objective: 'The elevator is stuck on ground floor 0. Use a while loop to lift the elevator until it reaches target_floor (5).',
    difficulty: 'Easy',
    concept: 'Loops',
    xpReward: 200,
    startingCode: `current_floor = 0
target_floor = 5

# Fix the control block to move to target_floor
if current_floor < target_floor:
    elevator.move_up()
    current_floor += 1`,
    hints: [
      {
        tier: 1,
        type: 'Observation',
        text: 'The current code uses an "if" statement which only executes once, moving the elevator to floor 1 instead of floor 5.'
      },
      {
        tier: 2,
        type: 'Concept',
        text: 'Loops repeat code blocks multiple times while a specific condition remains true.'
      },
      {
        tier: 3,
        type: 'Specific Direction',
        text: 'Replace the keyword "if" with "while" so that current_floor repeatedly increments until it reaches 5.'
      }
    ],
    testCases: [
      {
        id: 'tc1',
        description: 'Elevator floor transit loop',
        expectedOutcome: 'elevator.move_up() called 5 times'
      },
      {
        id: 'tc2',
        description: 'Final elevation check',
        expectedOutcome: 'current_floor reaches target_floor (5)'
      }
    ],
    solutionExplanation: {
      whatWasWrong: 'An IF condition only ran once, stopping the elevator cab at floor 1.',
      whatWasFixed: 'Converted the single conditional evaluation into a continuous WHILE iteration.',
      conceptLearned: 'While Loops & Iterative State Mutation'
    }
  },
  {
    id: 3,
    slug: 'robot-arm',
    title: 'Robot Assembly',
    subtitle: 'Automation Joint Protocol',
    objective: 'The robotic arm calibration routine is unhandled. Complete the calibrate_arm function so it calls robot.repair_joint(power_level).',
    difficulty: 'Medium',
    concept: 'Functions',
    xpReward: 250,
    startingCode: `def calibrate_arm(power_level):
    # Function body is empty!
    # Call robot.repair_joint with power_level
    pass

# Execute system calibration routine
calibrate_arm(100)`,
    hints: [
      {
        tier: 1,
        type: 'Observation',
        text: 'The function definition currently contains "pass", which is a placeholder that does nothing when calibrate_arm(100) is called.'
      },
      {
        tier: 2,
        type: 'Concept',
        text: 'Functions receive arguments in parameters (power_level) and perform commands within their indented body.'
      },
      {
        tier: 3,
        type: 'Specific Direction',
        text: 'Replace "pass" with "robot.repair_joint(power_level)" inside calibrate_arm.'
      }
    ],
    testCases: [
      {
        id: 'tc1',
        description: 'Function call execution',
        expectedOutcome: 'calibrate_arm(100) executes without error'
      },
      {
        id: 'tc2',
        description: 'Joint repair power transmission',
        expectedOutcome: 'robot.repair_joint is triggered with power_level 100'
      }
    ],
    solutionExplanation: {
      whatWasWrong: 'The function definition was empty (`pass`), failing to forward calibration parameters to the arm.',
      whatWasFixed: 'Implemented `robot.repair_joint(power_level)` inside the function body.',
      conceptLearned: 'Functions, Parameter Passing & Subroutine Execution'
    }
  },
  {
    id: 4,
    slug: 'power-core',
    title: 'Power Core Reactor',
    subtitle: 'Quantum Energy Grid',
    objective: 'The reactor is reporting low energy (40/100). Combine base_power and auxiliary_power to equal target_power (100) and activate the core.',
    difficulty: 'Hard',
    concept: 'Variables + Conditions',
    xpReward: 300,
    startingCode: `base_power = 40
auxiliary_power = 60
target_power = 100

# Calculate total power
total_power = base_power

if total_power == target_power:
    power_core.activate()
else:
    power_core.overload_warning()`,
    hints: [
      {
        tier: 1,
        type: 'Observation',
        text: 'total_power is assigned only base_power (40), leaving auxiliary_power (60) unused and failing the check for 100.'
      },
      {
        tier: 2,
        type: 'Concept',
        text: 'Variables can store mathematical expressions combining other variables using arithmetic operators (+).'
      },
      {
        tier: 3,
        type: 'Specific Direction',
        text: 'Change "total_power = base_power" to "total_power = base_power + auxiliary_power".'
      }
    ],
    testCases: [
      {
        id: 'tc1',
        description: 'Energy level sum calculation',
        expectedOutcome: 'total_power evaluates to 100'
      },
      {
        id: 'tc2',
        description: 'Quantum reactor ignition signal',
        expectedOutcome: 'power_core.activate() turns power core status to ONLINE'
      }
    ],
    solutionExplanation: {
      whatWasWrong: 'Auxiliary energy channel was unlinked, leaving total grid output at 40 MW.',
      whatWasFixed: 'Summed base_power and auxiliary_power variables to achieve 100 MW output.',
      conceptLearned: 'Variable Expressions, Arithmetic Aggregation & Guard Logic'
    }
  }
];

export const LEARNING_PATH = [
  { name: 'Variables', description: 'Storing values & tracking state', unlocked: true },
  { name: 'Conditions', description: 'Decision making & logic branches', unlocked: true },
  { name: 'Loops', description: 'Iteration & repeating instructions', unlocked: true },
  { name: 'Functions', description: 'Modular subroutines & parameters', unlocked: true },
  { name: 'Lists & Arrays', description: 'Collection & sequence processing', unlocked: false },
  { name: 'Data Processing', description: 'Transformations & validation', unlocked: false },
  { name: 'Algorithms', description: 'Optimization & problem solving', unlocked: false },
];
