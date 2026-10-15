import type { ExecutionResult, Language } from '../types/game';

/**
 * Deterministic, safe code execution engine for CODEBREAK Game Arena.
 * Evaluates Python, JavaScript, and TypeScript code snippets against predefined mission specs
 * without running unsafe arbitrary code on servers or un-sandboxed DOM.
 */
export function executeCode(missionId: number, code: string, language: Language = 'python'): ExecutionResult {
  const logs: string[] = [];
  const cleanCode = code.trim();

  logs.push(`[SYSTEM] Initializing execution kernel for Mission #${missionId} [Runtime: ${language.toUpperCase()}]...`);
  logs.push(`[SYSTEM] Parsing and analyzing AST syntax instructions...`);

  // Mission 1: Security Door (Conditions)
  if (missionId === 1) {
    let doorState: 'LOCKED' | 'OPEN' = 'LOCKED';
    let doorOpened = false;

    // Check for presence of door action calls in any syntax
    const hasDoorCall = cleanCode.includes('door.open') || cleanCode.includes('door.lock');
    if (!hasDoorCall) {
      return {
        success: false,
        logs: [...logs, '[ERROR] Invalid syntax or missing system actions (door.open() / door.lock()).'],
        systemState: { doorState: 'LOCKED' },
        error: 'Syntax Error: Missing door action calls.',
        failedTest: 'door.open() was never called.'
      };
    }

    // Extract access_level or accessLevel assignment
    const accessMatch = cleanCode.match(/(?:access_level|accessLevel)\s*[:=]\s*(?:number\s*=\s*)?(\d+)/);
    const accessLevel = accessMatch ? parseInt(accessMatch[1], 10) : 7;
    logs.push(`[EXEC] Loaded access_level = ${accessLevel}`);

    // Check conditions
    const hasPassingCondition =
      cleanCode.includes('>= 7') ||
      cleanCode.includes('> 6') ||
      cleanCode.includes('> 5') ||
      cleanCode.includes('== 7') ||
      cleanCode.includes('=== 7') ||
      cleanCode.includes('<= 7') ||
      ((cleanCode.includes('access_level') || cleanCode.includes('accessLevel')) &&
       !cleanCode.includes('> 10') &&
       !cleanCode.includes('> 7') &&
       !cleanCode.includes('> 8') &&
       !cleanCode.includes('> 9'));

    const hasOriginalFailingCondition =
      cleanCode.includes('access_level > 10') ||
      cleanCode.includes('accessLevel > 10');

    if (hasPassingCondition && !hasOriginalFailingCondition) {
      if (accessLevel >= 7) {
        doorOpened = true;
        doorState = 'OPEN';
      }
    } else if (hasOriginalFailingCondition) {
      if (accessLevel > 10) {
        doorOpened = true;
        doorState = 'OPEN';
      }
    } else {
      // Direct call or else branch
      if (cleanCode.includes('door.open()')) {
        doorOpened = true;
        doorState = 'OPEN';
      }
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
        error: 'Security Door remains locked: condition evaluated to False for accessLevel = 7.'
      };
    }
  }

  // Mission 2: Elevator Shaft (Loops)
  if (missionId === 2) {
    let currentFloor = 0;
    const targetFloor = 5;
    let moveUpCalls = 0;

    logs.push(`[EXEC] Initial floor: ${currentFloor}, Target floor: ${targetFloor}`);

    const hasWhileLoop = cleanCode.includes('while');
    const hasForLoop = cleanCode.includes('for');
    const hasIfStatement = cleanCode.includes('if ') || cleanCode.includes('if(');

    if (hasWhileLoop) {
      logs.push(`[EXEC] Entering WHILE loop structure...`);
      const loopConditionPasses =
        cleanCode.includes('target_floor') ||
        cleanCode.includes('targetFloor') ||
        cleanCode.includes('< 5') ||
        cleanCode.includes('<= 4') ||
        cleanCode.includes('<= 5');

      if (loopConditionPasses) {
        while (currentFloor < targetFloor && moveUpCalls < 10) {
          moveUpCalls++;
          currentFloor++;
          logs.push(`[LOOP #${moveUpCalls}] elevator transit -> Arrived at floor ${currentFloor}`);
        }
      } else {
        logs.push(`[WARN] Loop condition was false on initial check.`);
      }
    } else if (hasForLoop) {
      logs.push(`[EXEC] Entering FOR loop structure...`);
      const rangeMatch = cleanCode.match(/range\s*\(\s*(\d+|target_floor)\s*\)/) ||
                         cleanCode.match(/<\s*(\d+|targetFloor|target_floor)/);
      const limit = rangeMatch ? (rangeMatch[1] === 'target_floor' || rangeMatch[1] === 'targetFloor' ? 5 : parseInt(rangeMatch[1], 10)) : 5;
      for (let i = 0; i < Math.min(limit, 5); i++) {
        moveUpCalls++;
        currentFloor++;
        logs.push(`[LOOP #${i + 1}] elevator transit -> Arrived at floor ${currentFloor}`);
      }
    } else if (hasIfStatement) {
      logs.push(`[EXEC] Executing single IF conditional branch...`);
      if (currentFloor < targetFloor) {
        moveUpCalls++;
        currentFloor++;
        logs.push(`[IF STEP 1] elevator transit -> Arrived at floor ${currentFloor}`);
      }
    } else {
      const matches = cleanCode.match(/elevator\.(?:move_up|moveUp)\(\)/g);
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
        error: `Insufficient loop iterations. Use 'while' to loop continuously until target floor is reached.`
      };
    }
  }

  // Mission 3: Robot Arm (Functions)
  if (missionId === 3) {
    logs.push(`[EXEC] Analyzing subroutine function definitions...`);

    const hasDef = cleanCode.includes('def calibrate_arm') ||
                   cleanCode.includes('function calibrateArm') ||
                   cleanCode.includes('const calibrateArm') ||
                   cleanCode.includes('let calibrateArm');

    const hasCallInDef = cleanCode.includes('robot.repair_joint') ||
                         cleanCode.includes('robot.repairJoint');

    const hasPass = cleanCode.includes('pass') || (cleanCode.includes('calibrateArm') && cleanCode.includes('{}'));
    const invokesFunction = cleanCode.includes('calibrate_arm(') || cleanCode.includes('calibrateArm(');

    if (!hasDef) {
      return {
        success: false,
        logs: [...logs, '[ERROR] Missing calibrate function definition.'],
        systemState: { robotState: { calibrated: false, power: 0 } },
        error: 'Function calibrateArm / calibrate_arm is not defined.'
      };
    }

    if (hasPass && !hasCallInDef) {
      logs.push(`[EXEC] Function executed but contained no action (no-op).`);
      logs.push(`[WARN] Robot arm joint remains unresponsive.`);
      return {
        success: false,
        logs,
        systemState: { robotState: { calibrated: false, power: 0 } },
        failedTest: 'calibrateArm(100) was called, but no action was performed inside the function body.',
        error: 'Call robot.repairJoint(powerLevel) / robot.repair_joint(power_level) inside the function definition.'
      };
    }

    if (hasCallInDef && invokesFunction) {
      const powerMatch = cleanCode.match(/calibrate(?:_arm|Arm)\s*\(\s*(\d+)\s*\)/);
      const powerVal = powerMatch ? parseInt(powerMatch[1], 10) : 100;
      
      logs.push(`[CALL] calibrateArm(${powerVal}) invoked.`);
      logs.push(`[ACTION] robot.repairJoint(${powerVal}) executed inside subroutine.`);
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
      failedTest: 'Function calibrateArm does not call robot.repairJoint.',
      error: 'Ensure calibrateArm function body calls robot.repairJoint(powerLevel).'
    };
  }

  // Mission 4: Power Core Reactor (Variables + Conditions)
  if (missionId === 4) {
    let basePower = 40;
    let auxPower = 60;
    let totalPower = 40;
    let powerCoreActivated = false;

    // Parse variable overrides
    const baseMatch = cleanCode.match(/(?:base_power|basePower)\s*[:=]\s*(?:number\s*=\s*)?(\d+)/);
    if (baseMatch) basePower = parseInt(baseMatch[1], 10);

    const auxMatch = cleanCode.match(/(?:auxiliary_power|auxiliaryPower)\s*[:=]\s*(?:number\s*=\s*)?(\d+)/);
    if (auxMatch) auxPower = parseInt(auxMatch[1], 10);

    // Parse total_power calculation
    const hasSumExpression =
      cleanCode.includes('base_power + auxiliary_power') ||
      cleanCode.includes('basePower + auxiliaryPower') ||
      cleanCode.includes('40 + 60') ||
      cleanCode.includes('100');

    if (hasSumExpression) {
      totalPower = basePower + auxPower;
    } else {
      const totalMatch = cleanCode.match(/(?:total_power|totalPower)\s*[:=]\s*(?:number\s*=\s*)?(\d+)/);
      if (totalMatch) totalPower = parseInt(totalMatch[1], 10);
    }

    logs.push(`[VAR] basePower = ${basePower}`);
    logs.push(`[VAR] auxiliaryPower = ${auxPower}`);
    logs.push(`[CALC] totalPower = ${totalPower}`);

    const hasActivationTrigger =
      cleanCode.includes('power_core.activate()') ||
      cleanCode.includes('powerCore.activate()');

    if (totalPower === 100 && hasActivationTrigger) {
      powerCoreActivated = true;
    }

    if (powerCoreActivated) {
      logs.push(`[ACTION] powerCore.activate() triggered.`);
      logs.push(`[STATUS] Quantum Reactor Status: ONLINE (100 MW Nominal).`);
      return {
        success: true,
        logs,
        systemState: { powerCoreState: { status: 'ONLINE', power: 100 } }
      };
    } else {
      logs.push(`[ACTION] powerCore.overloadWarning() triggered.`);
      logs.push(`[STATUS] Power grid deficit detected (${totalPower}/100 MW).`);
      return {
        success: false,
        logs,
        systemState: { powerCoreState: { status: 'WARNING', power: totalPower } },
        failedTest: `totalPower evaluated to ${totalPower} MW instead of target 100 MW.`,
        error: 'Sum basePower and auxiliaryPower (totalPower = basePower + auxiliaryPower) to achieve 100 MW output.'
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
