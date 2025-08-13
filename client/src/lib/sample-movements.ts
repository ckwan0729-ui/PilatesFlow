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
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    tags: ["circulation", "warm-up", "coordination", "breathing"],
    benefits: [
      "Improves circulation and blood flow",
      "Activates deep abdominal muscles",
      "Enhances coordination and concentration",
      "Prepares body for more challenging exercises"
    ],
    contraindications: [
      "Acute neck injury",
      "Recent abdominal surgery",
      "Severe osteoporosis",
      "Uncontrolled high blood pressure"
    ],
    modifications: [
      "Keep head down for neck issues",
      "Bend knees to 90 degrees for back problems",
      "Use lighter spring tension",
      "Reduce arm pumping range"
    ],
    equipment: ["Reformer carriage", "Light springs"],
    muscleGroups: ["Deep abdominals", "Hip flexors", "Neck flexors"],
    breathingPattern: "Rhythmic - 5 breaths in, 5 breaths out"
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
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    tags: ["strength", "foundation", "lower-body", "alignment"],
    benefits: [
      "Strengthens quadriceps and calves",
      "Improves knee and ankle alignment",
      "Develops proprioception and balance",
      "Establishes proper movement patterns"
    ],
    contraindications: [
      "Recent knee surgery",
      "Acute ankle injury",
      "Severe arthritis in knees or ankles",
      "Unstable blood pressure"
    ],
    modifications: [
      "Reduce spring tension for weakness",
      "Smaller range of motion for joint issues",
      "One leg at a time for asymmetries",
      "Support under knees for comfort"
    ],
    equipment: ["Reformer", "Footbar", "Medium springs"],
    muscleGroups: ["Quadriceps", "Calves", "Glutes", "Deep stabilizers"],
    breathingPattern: "Exhale to press out, inhale to return"
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
    thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    tags: ["core", "stability", "coordination", "unilateral"],
    benefits: [
      "Strengthens deep abdominal muscles",
      "Improves hip flexor flexibility",
      "Enhances coordination and motor control",
      "Develops independent leg movement"
    ],
    contraindications: [
      "Acute lower back pain",
      "Recent hip surgery",
      "Severe neck problems",
      "Pregnancy (2nd-3rd trimester)"
    ],
    modifications: [
      "Keep head down for neck issues",
      "Bend extended leg slightly",
      "Hold legs instead of shins",
      "Smaller range of motion"
    ],
    equipment: ["Reformer carriage"],
    muscleGroups: ["Rectus abdominis", "Transverse abdominis", "Hip flexors"],
    breathingPattern: "Exhale on leg change, inhale to hold"
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
    thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    tags: ["inversion", "spinal-mobility", "advanced", "coordination"],
    benefits: [
      "Improves spinal mobility and articulation",
      "Enhances circulation through inversion",
      "Strengthens deep abdominals",
      "Develops advanced coordination"
    ],
    contraindications: [
      "Neck injuries or disc problems",
      "Glaucoma or eye pressure issues",
      "Uncontrolled high blood pressure",
      "Recent abdominal surgery",
      "Pregnancy"
    ],
    modifications: [
      "Reduce range of motion",
      "Keep legs more bent",
      "Support head with pillow",
      "Use lighter springs"
    ],
    equipment: ["Reformer", "Leg straps", "Light springs"],
    muscleGroups: ["Spinal extensors", "Deep abdominals", "Hip flexors"],
    breathingPattern: "Exhale to roll up, inhale to roll down"
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
    thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    tags: ["standing", "full-body", "balance", "c-curve"],
    benefits: ["Strengthens entire posterior chain", "Improves spinal flexion", "Challenges proprioception", "Develops functional strength"],
    contraindications: ["Wrist injuries", "Severe kyphosis", "Acute back pain", "Balance disorders"],
    modifications: ["Hands on higher surface", "Smaller range of motion", "One leg at a time", "Support under hands"],
    equipment: ["Reformer", "Footbar", "Medium springs"],
    muscleGroups: ["Abdominals", "Hamstrings", "Calves", "Spinal extensors"],
    breathingPattern: "Exhale to press out, inhale to return"
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
    thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    tags: ["advanced", "strength", "plank", "upper-body"],
    benefits: ["Builds core strength", "Improves shoulder stability", "Enhances coordination", "Develops body control"],
    contraindications: ["Wrist injuries", "Shoulder impingement", "Lower back pain", "Pregnancy"],
    modifications: ["Hands on higher surface", "Knees down version", "Smaller range", "Support under wrists"],
    equipment: ["Reformer", "Footbar", "Heavy springs"],
    muscleGroups: ["Core", "Shoulders", "Arms", "Legs"],
    breathingPattern: "Steady breathing throughout"
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
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    tags: ["sitting", "spinal-mobility", "core", "massage"],
    benefits: ["Improves spinal articulation", "Strengthens abdominals", "Enhances leg strength", "Promotes spinal health"],
    contraindications: ["Acute back pain", "Recent spinal surgery", "Severe osteoporosis", "Hip replacement"],
    modifications: ["Hands on carriage handles", "Smaller range of motion", "Support behind back", "Bend knees slightly"],
    equipment: ["Reformer", "Footbar", "Medium springs"],
    muscleGroups: ["Abdominals", "Hip flexors", "Quadriceps", "Spinal extensors"],
    breathingPattern: "Exhale to extend, inhale to flex"
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
    thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    tags: ["advanced", "coordination", "multi-limb", "control"],
    benefits: ["Enhances complex motor patterns", "Improves brain-body connection", "Develops advanced coordination", "Challenges core stability"],
    contraindications: ["Lower back injury", "Shoulder impingement", "Cognitive impairments", "Recent surgery"],
    modifications: ["One limb at a time", "Smaller range of motion", "Support head with pillow", "Lighter springs"],
    equipment: ["Reformer", "Arm straps", "Light springs"],
    muscleGroups: ["Full body integration", "Core stabilizers", "Limb coordination"],
    breathingPattern: "Continuous controlled breathing"
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
    thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    tags: ["core", "coordination", "arm-circles", "stability"],
    benefits: ["Strengthens deep abdominals", "Improves arm-leg coordination", "Enhances core endurance", "Develops movement flow"],
    contraindications: ["Neck injuries", "Lower back pain", "Shoulder problems", "Recent abdominal surgery"],
    modifications: ["Keep head down", "Bend legs higher", "Smaller arm circles", "One limb at a time"],
    equipment: ["Reformer carriage"],
    muscleGroups: ["Rectus abdominis", "Transverse abdominis", "Hip flexors", "Shoulders"],
    breathingPattern: "Exhale to extend, inhale to return"
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
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    tags: ["upper-body", "posture", "back-strength", "sitting"],
    benefits: ["Improves posture", "Strengthens posterior chain", "Enhances shoulder mobility", "Counteracts forward head posture"],
    contraindications: ["Acute shoulder pain", "Recent shoulder surgery", "Severe kyphosis", "Rotator cuff tears"],
    modifications: ["Lighter springs", "Smaller range of motion", "Support behind back", "Seated on higher surface"],
    equipment: ["Reformer", "Arm straps", "Medium springs"],
    muscleGroups: ["Rhomboids", "Middle trapezius", "Posterior deltoids", "Latissimus dorsi"],
    breathingPattern: "Exhale on pulling, inhale on return"
  }
];
