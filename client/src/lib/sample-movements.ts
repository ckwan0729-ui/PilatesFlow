import { type Movement } from "@shared/schema";

export const sampleMovements: Omit<Movement, 'id' | 'isPolestar'>[] = [
  {
    name: "The Hundred",
    category: "Warm-up",
    level: "All Levels",
    description: "A fundamental warm-up exercise that increases circulation and prepares the body for movement.",
    instructions: [
      "Lie supine with knees drawn into chest",
      "Lift head and shoulders, extending legs to 45 degrees",
      "Pump arms vigorously up and down",
      "Breathe in for 5 pumps, out for 5 pumps, repeat 10 times"
    ],
    precautions: [
      "Keep lower back pressed into carriage",
      "Modify by keeping knees bent if lower back lifts",
      "Rest head down if neck strain occurs",
      "Avoid if experiencing acute back pain"
    ],
    precautionLevel: "Low",
    duration: "2-3 minutes",
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    name: "Footwork Series",
    category: "Lower Body",
    level: "Beginner",
    description: "Foundational leg strengthening exercises performed with feet on the footbar.",
    instructions: [
      "Lie supine with feet on footbar in parallel position",
      "Press out to straight legs, maintaining neutral pelvis",
      "Return with control, knees tracking over toes",
      "Repeat in various foot positions: parallel, pilates V, wide second"
    ],
    precautions: [
      "Keep knees aligned over toes",
      "Don't allow knees to fall inward",
      "Maintain neutral spine throughout",
      "Avoid locking knees at extension"
    ],
    precautionLevel: "Low",
    duration: "5-8 minutes",
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    name: "Single Leg Stretch",
    category: "Core",
    level: "Beginner",
    description: "Core strengthening exercise that challenges stability while working each leg independently.",
    instructions: [
      "Lie supine on carriage, head and shoulders lifted",
      "Draw both knees into chest, hands on shins",
      "Extend one leg while pulling the other knee closer",
      "Switch legs in a smooth, controlled motion"
    ],
    precautions: [
      "Avoid if experiencing acute lower back pain",
      "Keep head and shoulders lifted throughout",
      "Modify by keeping head down if neck strain occurs",
      "Ensure pelvis remains stable and neutral"
    ],
    precautionLevel: "Moderate",
    duration: "3-5 minutes",
    thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    name: "Short Spine",
    category: "Full Body",
    level: "Intermediate",
    description: "Advanced exercise combining spinal articulation with leg and core work.",
    instructions: [
      "Lie supine with legs in straps, arms by sides",
      "Roll spine up vertebra by vertebra, legs overhead",
      "Open legs to shoulder width, bend knees",
      "Roll spine down with control, extending legs"
    ],
    precautions: [
      "Contraindicated for neck injuries",
      "Avoid if experiencing acute back pain",
      "Don't roll onto neck",
      "Modify range of motion as needed"
    ],
    precautionLevel: "High",
    duration: "3-4 minutes",
    thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    name: "Elephant",
    category: "Full Body",
    level: "Intermediate",
    description: "Standing exercise that strengthens the entire body while challenging balance and coordination.",
    instructions: [
      "Stand on carriage facing footbar, hands on footbar",
      "Round spine into C-curve, engaging abdominals",
      "Press carriage out by straightening legs",
      "Return with control, maintaining spinal curve"
    ],
    precautions: [
      "Keep wrists aligned under shoulders",
      "Don't allow back to arch",
      "Modify by reducing range of motion",
      "Avoid if wrist pain is present"
    ],
    precautionLevel: "Moderate",
    duration: "2-3 minutes",
    thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    name: "Long Stretch Series",
    category: "Full Body",
    level: "Advanced",
    description: "Challenging plank-based exercises that require significant core strength and stability.",
    instructions: [
      "Start in plank position on carriage, hands on footbar",
      "Press carriage out maintaining straight line from head to heels",
      "Return with control, engaging entire core",
      "Progress to up-stretch and down-stretch variations"
    ],
    precautions: [
      "Requires significant core strength",
      "Don't allow hips to sag or pike up",
      "Avoid if wrist or shoulder pain present",
      "Master basic plank before attempting"
    ],
    precautionLevel: "High",
    duration: "4-6 minutes",
    thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    name: "Stomach Massage",
    category: "Core",
    level: "Intermediate",
    description: "Sitting exercise that strengthens the core while improving spinal mobility.",
    instructions: [
      "Sit upright on carriage with feet on footbar",
      "Round spine forward, hands supporting behind thighs",
      "Press legs out to straight, lifting spine tall",
      "Return with control, rounding spine forward"
    ],
    precautions: [
      "Keep feet parallel and knees aligned",
      "Don't force spinal flexion",
      "Modify hand position if balance is challenging",
      "Avoid if acute back pain is present"
    ],
    precautionLevel: "Moderate",
    duration: "4-5 minutes",
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    name: "Coordination",
    category: "Full Body",
    level: "Advanced",
    description: "Complex exercise combining arm and leg movements with precise timing and control.",
    instructions: [
      "Lie supine holding straps, knees bent into chest",
      "Extend arms and legs simultaneously",
      "Hold position while opening and closing legs",
      "Return arms and legs together with control"
    ],
    precautions: [
      "Requires advanced coordination",
      "Keep lower back stable throughout",
      "Don't hold breath during movement",
      "Master basic single limb work first"
    ],
    precautionLevel: "High",
    duration: "3-4 minutes",
    thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    name: "Double Leg Stretch",
    category: "Core",
    level: "Intermediate",
    description: "Core exercise that challenges stability while both arms and legs move simultaneously.",
    instructions: [
      "Lie supine with head lifted, knees into chest",
      "Extend arms overhead and legs to 45 degrees",
      "Circle arms around to return to start position",
      "Maintain strong core connection throughout"
    ],
    precautions: [
      "Keep lower back pressed down",
      "Don't let legs drop too low",
      "Rest head if neck strain occurs",
      "Bend knees if back lifts off carriage"
    ],
    precautionLevel: "Moderate",
    duration: "2-3 minutes",
    thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  },
  {
    name: "Rowing Series",
    category: "Upper Body",
    level: "Intermediate",
    description: "Sitting exercises that strengthen the back and improve posture.",
    instructions: [
      "Sit tall on carriage holding straps with arms extended",
      "Draw elbows back, squeezing shoulder blades together",
      "Various arm patterns: from chest, from above, hug-a-tree",
      "Maintain tall spine throughout all variations"
    ],
    precautions: [
      "Don't round shoulders forward",
      "Keep core engaged to support spine",
      "Modify range if shoulder impingement present",
      "Avoid excessive neck tension"
    ],
    precautionLevel: "Low",
    duration: "5-7 minutes",
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  }
];
