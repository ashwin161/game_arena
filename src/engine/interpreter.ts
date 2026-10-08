import type { ExecutionResult } from '../types/game';

/**
 * Deterministic, safe code execution engine for CODEBREAK.
 * Evaluates Python/JS style code snippets against predefined mission specs
 * without running unsafe arbitrary code on servers or un-sandboxed DOM.
 */
export function executeCode(missionId: number, code: string): ExecutionResult {
  const logs: string[] = [];
  const cleanCode = code.trim();

  logs.push(`[SYSTEM] Initializing execution kernel for Mission #${missionId}...`);
  logs.push(`[SYSTEM] Parsing source code instructions...`);

  // Mission 1: Security Door (Conditions)
  if (missionId === 1) {
    let doorState: 'LOCKED' | 'OPEN' = 'LOCKED';
    let doorOpened = false;

    // Check for syntax or structural issues
    if (!cleanCode.includes('door.open') && !cleanCode.includes('door.lock')) {
      return {
        success: false,
        logs: [...logs, '[ERROR] Invalid syntax or missing system actions (door.open() / door.lock()).'],
        systemState: { doorState: 'LOCKED' },
        error: 'Syntax Error: Missing door action calls.',
        failedTest: 'door.open() was never called.'
      };
    }

    // Extract access_level assignment
    const accessMatch = cleanCode.match(/access_level\s*=\s*(\d+)/);
    const accessLevel = accessMatch ? parseInt(accessMatch[1], 10) : 7;
    logs.push(`[EXEC] Loaded access_level = ${accessLevel}`);

    // Parse conditional logic or python-to-js simplified evaluation
    try {
      // Convert python syntax (if x > 10: ... else: ...) to safe evaluation logic
      if (
        cleanCode.includes('access_level >= 7') ||
        cleanCode.includes('access_level > 5') ||
        cleanCode.includes('access_level > 6') ||
        cleanCode.includes('access_level == 7') ||
        cleanCode.includes('access_level <= 7') ||
        (cleanCode.includes('if access_level') && !cleanCode.includes('if access_level > 10') && !cleanCode.includes('if access_level > 7') && !cleanCode.includes('if access_level > 8') && !cleanCode.includes('if access_level > 9'))
      ) {
        if (accessLevel >= 7) {
          doorOpened = true;
          doorState = 'OPEN';
        }
      } else if (cleanCode.includes('if access_level > 10')) {
        if (accessLevel > 10) {
          doorOpened = true;
          doorState = 'OPEN';
        }
      } else {
        // Direct door.open() call or other condition
        if (cleanCode.includes('door.open()') && (!cleanCode.includes('else:') || cleanCode.indexOf('door.open()') < cleanCode.indexOf('else:'))) {
          doorOpened = true;
          doorState = 'OPEN';
        }
      }
    } catch {
      return {
        success: false,
        logs: [...logs, '[RUNTIME ERROR] Failed to evaluate conditional branch.'],
        systemState: { doorState: 'LOCKED' },
        error: 'Runtime Error in condition check.'
      };
    }

    if (doorOpened && doorState === 'OPEN') {
      logs.push(`[ACTION] door.open() executed.`);
      logs.push(`[STATUS] Security Gate Status: ONLINE (UNLOCKED).`);
      return {
        success: true,
        logs,
        systemState: { doorState: 'OPEN' }
      };
    } else {
      logs.push(`[ACTION] door.lock() executed.`);
      logs.push(`[STATUS] Security Gate Status: OFFLINE (LOCKED).`);
      return {
        success: false,
        logs,
        systemState: { doorState: 'LOCKED' },
        failedTest: 'Expected door.open() to be invoked, but door.lock() was triggered.',
        error: 'Security Door remains locked: condition evaluated to False for access_level = 7.'
      };
    }
  }

  // Mission 2: Elevator Shaft (Loops)
  if (missionId === 2) {
    let currentFloor = 0;
    const targetFloor = 5;
    let moveUpCalls = 0;

    logs.push(`[EXEC] Initial floor: ${currentFloor}, Target floor: ${targetFloor}`);

    // Check if player used a while or for loop vs if statement
    const hasWhileLoop = cleanCode.includes('while');
    const hasForLoop = cleanCode.includes('for');
    const hasIfStatement = cleanCode.includes('if ');

    if (hasWhileLoop) {
      logs.push(`[EXEC] Entering WHILE loop structure...`);
      // Simulate while loop iteration
      if (cleanCode.includes('current_floor < target_floor') || cleanCode.includes('current_floor < 5') || cleanCode.includes('current_floor <= 4')) {
        while (currentFloor < targetFloor && moveUpCalls < 10) {
          moveUpCalls++;
          currentFloor++;
          logs.push(`[LOOP #${moveUpCalls}] elevator.move_up() -> Arrived at floor ${currentFloor}`);
        }
      } else {
        logs.push(`[WARN] Loop condition was false on initial check.`);
      }
    } else if (hasForLoop) {
      logs.push(`[EXEC] Entering FOR loop structure...`);
      // Simulate range(5) or range(target_floor)
      const rangeMatch = cleanCode.match(/range\s*\(\s*(\d+|target_floor)\s*\)/);
      const limit = rangeMatch ? (rangeMatch[1] === 'target_floor' ? 5 : parseInt(rangeMatch[1], 10)) : 5;
      for (let i = 0; i < limit; i++) {
        moveUpCalls++;
        currentFloor++;
        logs.push(`[LOOP #${i + 1}] elevator.move_up() -> Arrived at floor ${currentFloor}`);
      }
    } else if (hasIfStatement) {
      logs.push(`[EXEC] Executing single IF conditional branch...`);
      if (currentFloor < targetFloor) {
        moveUpCalls++;
        currentFloor++;
        logs.push(`[IF STEP 1] elevator.move_up() -> Arrived at floor ${currentFloor}`);
      }
    } else {
      // Check manual step counts
      const matches = cleanCode.match(/elevator\.move_up\(\)/g);
      if (matches) {
        moveUpCalls = matches.length;
        currentFloor = Math.min(moveUpCalls, 5);
      }
    }

    if (currentFloor === targetFloor) {
      logs.push(`[SUCCESS] Elevator reached target floor ${currentFloor}. Transit complete!`);
      return {
        success: true,
        logs,
        systemState: { elevatorFloor: currentFloor }
      };
    } else {
      logs.push(`[FAIL] Elevator stopped at floor ${currentFloor}. Expected floor ${targetFloor}.`);
      return {
        success: false,
        logs,
        systemState: { elevatorFloor: currentFloor },
        failedTest: `Elevator stopped at floor ${currentFloor} (expected floor 5).`,
        error: `Insufficient loop iterations. Use 'while current_floor < target_floor:' to loop continuously.`
      };
    }
  }

  // Mission 3: Robot Arm (Functions)
  if (missionId === 3) {
    logs.push(`[EXEC] Analyzing function definitions...`);

    const hasDef = cleanCode.includes('def calibrate_arm');
    const hasCallInDef = cleanCode.includes('robot.repair_joint');
    const hasPass = cleanCode.includes('pass');
    const invokesFunction = cleanCode.includes('calibrate_arm(');

    if (!hasDef) {
      return {
        success: false,
        logs: [...logs, '[ERROR] Missing calibrate_arm function definition.'],
        systemState: { robotState: { calibrated: false, power: 0 } },
        error: 'Function calibrate_arm is not defined.'
      };
    }

    if (hasPass && !hasCallInDef) {
      logs.push(`[EXEC] Function calibrate_arm executed but contained 'pass' statement (no-op).`);
      logs.push(`[WARN] Robot arm joint remains unresponsive.`);
      return {
        success: false,
        logs,
        systemState: { robotState: { calibrated: false, power: 0 } },
        failedTest: 'calibrate_arm(100) was called, but no action was performed inside the function body.',
        error: 'Replace pass with robot.repair_joint(power_level) inside the function definition.'
      };
    }

    if (hasCallInDef && invokesFunction) {
      // Extract power level from call or param
      const powerMatch = cleanCode.match(/calibrate_arm\s*\(\s*(\d+)\s*\)/);
      const powerVal = powerMatch ? parseInt(powerMatch[1], 10) : 100;
      
      logs.push(`[CALL] calibrate_arm(${powerVal}) invoked.`);
      logs.push(`[ACTION] robot.repair_joint(${powerVal}) executed inside subroutine.`);
      logs.push(`[STATUS] Robot manipulator arm calibrated successfully.`);

      return {
        success: true,
        logs,
        systemState: { robotState: { calibrated: true, power: powerVal } }
      };
    }

    return {
      success: false,
      logs: [...logs, '[ERROR] Subroutine execution failed or was not invoked.'],
      systemState: { robotState: { calibrated: false, power: 0 } },
      failedTest: 'Function calibrate_arm does not call robot.repair_joint.',
      error: 'Ensure calibrate_arm function body calls robot.repair_joint(power_level).'
    };
  }

  // Mission 4: Power Core Reactor (Variables + Conditions)
  if (missionId === 4) {
    let basePower = 40;
    let auxPower = 60;
    let totalPower = 40;
    let powerCoreActivated = false;

    // Parse variable overrides
    const baseMatch = cleanCode.match(/base_power\s*=\s*(\d+)/);
    if (baseMatch) basePower = parseInt(baseMatch[1], 10);

    const auxMatch = cleanCode.match(/auxiliary_power\s*=\s*(\d+)/);
    if (auxMatch) auxPower = parseInt(auxMatch[1], 10);

    // Parse total_power calculation
    if (cleanCode.includes('total_power = base_power + auxiliary_power') || cleanCode.includes('total_power = base_power + aux') || cleanCode.includes('total_power = 100')) {
      totalPower = basePower + auxPower;
    } else if (cleanCode.includes('total_power = base_power')) {
      totalPower = basePower;
    } else {
      const totalMatch = cleanCode.match(/total_power\s*=\s*(\d+)/);
      if (totalMatch) totalPower = parseInt(totalMatch[1], 10);
    }

    logs.push(`[VAR] base_power = ${basePower}`);
    logs.push(`[VAR] auxiliary_power = ${auxPower}`);
    logs.push(`[CALC] total_power = ${totalPower}`);

    if (totalPower === 100 && (cleanCode.includes('power_core.activate()') || cleanCode.includes('if total_power == target_power:'))) {
      powerCoreActivated = true;
    }

    if (powerCoreActivated) {
      logs.push(`[ACTION] power_core.activate() triggered.`);
      logs.push(`[STATUS] Quantum Reactor Status: ONLINE (100 MW Nominal).`);
      return {
        success: true,
        logs,
        systemState: { powerCoreState: { status: 'ONLINE', power: 100 } }
      };
    } else {
      logs.push(`[ACTION] power_core.overload_warning() triggered.`);
      logs.push(`[STATUS] Power grid deficit detected (${totalPower}/100 MW).`);
      return {
        success: false,
        logs,
        systemState: { powerCoreState: { status: 'WARNING', power: totalPower } },
        failedTest: `total_power evaluated to ${totalPower} MW instead of target 100 MW.`,
        error: 'Sum base_power and auxiliary_power (total_power = base_power + auxiliary_power) to achieve 100 MW output.'
      };
    }
  }

  return {
    success: false,
    logs: ['[ERROR] Unknown mission identifier.'],
    systemState: {},
    error: 'Invalid Mission ID'
  };
}
