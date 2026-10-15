import type { CampaignLevel } from '../types/game';

export const CAMPAIGN_LEVELS: CampaignLevel[] = [
  {
    levelNumber: 1,
    codename: 'LEVEL 01',
    theme: 'SYSTEM ACCESS',
    description: 'Establish foundational connection. Master variable initialization, state mutations, and primitive conditional guards.',
    concepts: ['Variables', 'Basic conditions', 'Comparisons'],
    totalTasks: 10,
    completedTasks: 0,
    isUnlocked: true,
    tasks: [
      {
        id: 101,
        missionId: 1,
        taskNumber: 1,
        title: 'Security Door Protocol',
        subtitle: 'Primary Containment Gate',
        concept: 'Conditions',
        difficulty: 'Easy',
        xpReward: 150,
        isUnlocked: true,
        isCompleted: false
      },
      {
        id: 102,
        missionId: 4,
        taskNumber: 2,
        title: 'Reactor Core Ignition',
        subtitle: 'Quantum Auxiliary Grid',
        concept: 'Variables + Conditions',
        difficulty: 'Hard',
        xpReward: 300,
        isUnlocked: true,
        isCompleted: false
      },
      {
        id: 103,
        missionId: 1,
        taskNumber: 3,
        title: 'Secondary Air Lock',
        subtitle: 'Emergency Purge Check',
        concept: 'Comparisons',
        difficulty: 'Easy',
        xpReward: 160,
        isUnlocked: false,
        isCompleted: false
      },
      {
        id: 104,
        missionId: 4,
        taskNumber: 4,
        title: 'Auxiliary Capacitors',
        subtitle: 'Power Balancing',
        concept: 'Variables',
        difficulty: 'Easy',
        xpReward: 175,
        isUnlocked: false,
        isCompleted: false
      },
      {
        id: 105,
        missionId: 1,
        taskNumber: 5,
        title: 'Laser Perimeter Barrier',
        subtitle: 'Sensor Validation',
        concept: 'Conditions',
        difficulty: 'Intermediate',
        xpReward: 200,
        isUnlocked: false,
        isCompleted: false
      },
      {
        id: 106,
        missionId: 4,
        taskNumber: 6,
        title: 'Coolant Flow Valve',
        subtitle: 'Threshold Logic',
        concept: 'Conditions',
        difficulty: 'Intermediate',
        xpReward: 220,
        isUnlocked: false,
        isCompleted: false
      },
      {
        id: 107,
        missionId: 1,
        taskNumber: 7,
        title: 'Biometric Gate Sensor',
        subtitle: 'Identity Range Check',
        concept: 'Comparisons',
        difficulty: 'Intermediate',
        xpReward: 225,
        isUnlocked: false,
        isCompleted: false
      },
      {
        id: 108,
        missionId: 4,
        taskNumber: 8,
        title: 'Shield Harmonic Array',
        subtitle: 'Frequency Sync',
        concept: 'Variables + Conditions',
        difficulty: 'Hard',
        xpReward: 260,
        isUnlocked: false,
        isCompleted: false
      },
      {
        id: 109,
        missionId: 1,
        taskNumber: 9,
        title: 'Sub-Level Vault Lock',
        subtitle: 'Multi-Key Gate',
        concept: 'Conditions',
        difficulty: 'Hard',
        xpReward: 280,
        isUnlocked: false,
        isCompleted: false
      },
      {
        id: 110,
        missionId: 4,
        taskNumber: 10,
        title: 'Master Grid Synchronizer',
        subtitle: 'Level 1 Overcharge Terminal',
        concept: 'System Access Integration',
        difficulty: 'Hard',
        xpReward: 350,
        isUnlocked: false,
        isCompleted: false
      }
    ]
  },
  {
    levelNumber: 2,
    codename: 'LEVEL 02',
    theme: 'CONTROL SYSTEMS',
    description: 'Diagnose compound boolean logic, multi-branch arbitration, and critical boundary conditions across facility infrastructure.',
    concepts: ['Boolean logic', 'Compound conditions', 'Boundary conditions'],
    totalTasks: 10,
    completedTasks: 0,
    isUnlocked: false,
    tasks: Array.from({ length: 10 }, (_, i) => ({
      id: 201 + i,
      missionId: 1,
      taskNumber: i + 1,
      title: `Subsystem Gate 0${i + 1}`,
      subtitle: 'Logic Grid Inspection',
      concept: i % 2 === 0 ? 'Compound conditions' : 'Boundary conditions',
      difficulty: i < 4 ? 'Easy' : (i < 8 ? 'Intermediate' : 'Hard'),
      xpReward: 200 + i * 20,
      isUnlocked: false,
      isCompleted: false
    }))
  },
  {
    levelNumber: 3,
    codename: 'LEVEL 03',
    theme: 'AUTOMATION',
    description: 'Restore automated transit systems and industrial repeaters using structured while-loops and iterative controllers.',
    concepts: ['while loops', 'for loops', 'loop conditions', 'loop termination'],
    totalTasks: 10,
    completedTasks: 0,
    isUnlocked: false,
    tasks: [
      {
        id: 301,
        missionId: 2,
        taskNumber: 1,
        title: 'Elevator Shaft Transit',
        subtitle: 'Vertical Transit Core',
        concept: 'Loops',
        difficulty: 'Easy',
        xpReward: 200,
        isUnlocked: false,
        isCompleted: false
      },
      ...Array.from({ length: 9 }, (_, i) => ({
        id: 302 + i,
        missionId: 2,
        taskNumber: i + 2,
        title: `Conveyor Belt Motor 0${i + 2}`,
        subtitle: 'Automated Transport Loop',
        concept: 'while loops',
        difficulty: (i < 3 ? 'Easy' : i < 6 ? 'Intermediate' : 'Hard') as 'Easy' | 'Intermediate' | 'Hard',
        xpReward: 220 + i * 20,
        isUnlocked: false,
        isCompleted: false
      }))
    ]
  },
  {
    levelNumber: 4,
    codename: 'LEVEL 04',
    theme: 'ROBOTICS',
    description: 'Rebuild robotic subroutines. Calibrate kinematic manipulator joints through parameterized function calls and return handlers.',
    concepts: ['Functions', 'Parameters', 'Return values'],
    totalTasks: 10,
    completedTasks: 0,
    isUnlocked: false,
    tasks: [
      {
        id: 401,
        missionId: 3,
        taskNumber: 1,
        title: 'Robot Arm Assembly',
        subtitle: 'Automation Joint Protocol',
        concept: 'Functions',
        difficulty: 'Intermediate',
        xpReward: 250,
        isUnlocked: false,
        isCompleted: false
      },
      ...Array.from({ length: 9 }, (_, i) => ({
        id: 402 + i,
        missionId: 3,
        taskNumber: i + 2,
        title: `Kinematic Servo 0${i + 2}`,
        subtitle: 'Subroutine Calibration',
        concept: 'Parameters',
        difficulty: (i < 3 ? 'Intermediate' : 'Hard') as 'Easy' | 'Intermediate' | 'Hard',
        xpReward: 270 + i * 20,
        isUnlocked: false,
        isCompleted: false
      }))
    ]
  },
  {
    levelNumber: 5,
    codename: 'LEVEL 05',
    theme: 'DATA SYSTEMS',
    description: 'Process telemetry logs and sensor queues with collections, list iteration, and sequence filtering.',
    concepts: ['Arrays / Lists', 'Iteration', 'Data manipulation'],
    totalTasks: 10,
    completedTasks: 0,
    isUnlocked: false,
    tasks: Array.from({ length: 10 }, (_, i) => ({
      id: 501 + i,
      missionId: 2,
      taskNumber: i + 1,
      title: `Telemetry Buffer 0${i + 1}`,
      subtitle: 'Stream Parser',
      concept: 'Arrays / Lists',
      difficulty: 'Intermediate',
      xpReward: 300 + i * 15,
      isUnlocked: false,
      isCompleted: false
    }))
  },
  {
    levelNumber: 6,
    codename: 'LEVEL 06',
    theme: 'NETWORK CORE',
    description: 'Decode packet strings, serialize nested object dictionaries, and enforce packet schema integrity.',
    concepts: ['Strings', 'Objects / dictionaries', 'Data validation'],
    totalTasks: 10,
    completedTasks: 0,
    isUnlocked: false,
    tasks: Array.from({ length: 10 }, (_, i) => ({
      id: 601 + i,
      missionId: 4,
      taskNumber: i + 1,
      title: `Subspace Node 0${i + 1}`,
      subtitle: 'Packet Integrity',
      concept: 'Data validation',
      difficulty: 'Intermediate',
      xpReward: 320 + i * 15,
      isUnlocked: false,
      isCompleted: false
    }))
  },
  {
    levelNumber: 7,
    codename: 'LEVEL 07',
    theme: 'DIAGNOSTICS',
    description: 'Isolate elusive edge cases, silent off-by-one errors, null dereferences, and state race conditions.',
    concepts: ['Debugging', 'Runtime errors', 'Logical errors', 'Edge cases'],
    totalTasks: 10,
    completedTasks: 0,
    isUnlocked: false,
    tasks: Array.from({ length: 10 }, (_, i) => ({
      id: 701 + i,
      missionId: 1,
      taskNumber: i + 1,
      title: `Glitch Investigation 0${i + 1}`,
      subtitle: 'Fault Isolation',
      concept: 'Debugging',
      difficulty: 'Hard',
      xpReward: 350 + i * 20,
      isUnlocked: false,
      isCompleted: false
    }))
  },
  {
    levelNumber: 8,
    codename: 'LEVEL 08',
    theme: 'ALGORITHM SYSTEMS',
    description: 'Optimize high-throughput computational subsystems through binary searches, sorting algorithms, and complexity reduction.',
    concepts: ['Searching', 'Sorting', 'Basic algorithms'],
    totalTasks: 10,
    completedTasks: 0,
    isUnlocked: false,
    tasks: Array.from({ length: 10 }, (_, i) => ({
      id: 801 + i,
      missionId: 2,
      taskNumber: i + 1,
      title: `Search Pipeline 0${i + 1}`,
      subtitle: 'Complexity Optimizer',
      concept: 'Searching',
      difficulty: 'Hard',
      xpReward: 380 + i * 20,
      isUnlocked: false,
      isCompleted: false
    }))
  },
  {
    levelNumber: 9,
    codename: 'LEVEL 09',
    theme: 'ADVANCED SYSTEMS',
    description: 'Orchestrate distributed state machines, recursive cascades, and fault-tolerant automated fallbacks.',
    concepts: ['Multiple concepts', 'Complex debugging', 'State management'],
    totalTasks: 10,
    completedTasks: 0,
    isUnlocked: false,
    tasks: Array.from({ length: 10 }, (_, i) => ({
      id: 901 + i,
      missionId: 3,
      taskNumber: i + 1,
      title: `Orchestrator Node 0${i + 1}`,
      subtitle: 'State Cascade',
      concept: 'State management',
      difficulty: 'Hard',
      xpReward: 420 + i * 25,
      isUnlocked: false,
      isCompleted: false
    }))
  },
  {
    levelNumber: 10,
    codename: 'LEVEL 10',
    theme: 'CORE BREAK',
    description: 'The ultimate system collapse. Fix multi-threaded race conditions and quantum reactor cascades before total facility blackout.',
    concepts: ['Advanced multi-concept', 'Complex system failures', 'Final missions'],
    totalTasks: 10,
    completedTasks: 0,
    isUnlocked: false,
    tasks: Array.from({ length: 10 }, (_, i) => ({
      id: 1001 + i,
      missionId: 4,
      taskNumber: i + 1,
      title: `Quantum Core Collapse 0${i + 1}`,
      subtitle: 'Emergency Failsafe',
      concept: 'Core Break Protocol',
      difficulty: 'Hard',
      xpReward: 500 + i * 50,
      isUnlocked: false,
      isCompleted: false
    }))
  }
];

export function getCampaignOverview(completedMissionIds: number[]) {
  return CAMPAIGN_LEVELS.map((level, lvlIdx) => {
    const completedCount = level.tasks.filter(t => completedMissionIds.includes(t.missionId)).length;
    const isUnlocked = lvlIdx === 0 || completedMissionIds.length >= lvlIdx * 2;

    const tasksWithState = level.tasks.map((task, tIdx) => {
      const isCompleted = completedMissionIds.includes(task.missionId);
      // First task in unlocked level is unlocked; others unlock as player completes previous
      const isTaskUnlocked = isUnlocked && (tIdx === 0 || completedMissionIds.includes(level.tasks[tIdx - 1]?.missionId || -1));
      return {
        ...task,
        isUnlocked: isTaskUnlocked,
        isCompleted
      };
    });

    return {
      ...level,
      isUnlocked,
      completedTasks: completedCount,
      tasks: tasksWithState
    };
  });
}
