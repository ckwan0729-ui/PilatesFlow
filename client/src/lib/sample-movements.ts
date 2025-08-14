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
  {
  name: "Elephant",
  category: "Core & Lower Body",
  level: "Intermediate",
  description: "Hamstring stretch and core stabilization exercise performed on the Reformer.",
  instructions: [
    "Stand on carriage with hands on footbar, hips high",
    "Press carriage out using abdominal control, keeping legs straight",
    "Return slowly to start position",
    "Keep spine long and shoulders away from ears"
  ],
  precautions: [
    "Do not hyperextend lower back",
    "Keep shoulders engaged",
    "Avoid if hamstring strain exists"
  ],
  precautionLevel: "Moderate",
  duration: "2-3 minutes",
  thumbnailUrl: "https://images.unsplash.com/photo-1605285829836-2d0a9b2f1a2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  tags: ["hamstrings", "core", "spinal-stability", "standing"],
  benefits: ["Strengthens core", "Stretches hamstrings", "Improves posture"],
  contraindications: ["Hamstring tear", "Lower back pain", "Shoulder injury"],
  modifications: ["Bend knees slightly", "Use lighter springs", "Shorten range of motion"],
  equipment: ["Reformer", "Footbar", "Medium springs"],
  muscleGroups: ["Hamstrings", "Glutes", "Core", "Shoulders"],
  breathingPattern: "Exhale to press out, inhale to return"
},
{
  name: "Short Box – Round Back",
  category: "Core",
  level: "Intermediate",
  description: "Seated spinal articulation exercise targeting abdominals and obliques.",
  instructions: [
    "Sit on short box, knees bent, feet under strap",
    "Round spine forward over legs, reach hands toward feet",
    "Return to upright posture with control"
  ],
  precautions: [
    "Avoid pulling neck forward",
    "Keep shoulders relaxed",
    "Do not force spinal rounding"
  ],
  precautionLevel: "Moderate",
  duration: "3-4 minutes",
  thumbnailUrl: "https://images.unsplash.com/photo-1594737625785-3c9175a5932b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  tags: ["core", "spinal-articulation", "short-box", "abdominals"],
  benefits: ["Strengthens abdominals", "Improves spinal mobility", "Enhances posture"],
  contraindications: ["Acute back pain", "Spinal injury"],
  modifications: ["Use smaller box", "Reduce range of motion", "Keep feet on floor if needed"],
  equipment: ["Reformer", "Short box", "Straps", "Light springs"],
  muscleGroups: ["Rectus abdominis", "Obliques", "Spinal flexors"],
  breathingPattern: "Exhale to round forward, inhale to return"
},
{
  name: "Short Box – Flat Back",
  category: "Core",
  level: "Intermediate",
  description: "Seated core strengthening with neutral spine alignment.",
  instructions: [
    "Sit on short box, knees bent, feet under strap",
    "Keep spine long and neutral, hinge slightly from hips",
    "Reach arms forward or overhead without rounding back",
    "Return with control"
  ],
  precautions: [
    "Do not hyperextend back",
    "Keep shoulders relaxed",
    "Avoid if spinal pain exists"
  ],
  precautionLevel: "Moderate",
  duration: "3-4 minutes",
  thumbnailUrl: "https://images.unsplash.com/photo-1594737625785-3c9175a5932b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  tags: ["core", "spinal-stability", "short-box", "abdominals"],
  benefits: ["Strengthens core", "Maintains spinal neutrality", "Improves posture"],
  contraindications: ["Acute back pain", "Spinal injury"],
  modifications: ["Use smaller box", "Reduce range of motion", "Keep feet on floor if needed"],
  equipment: ["Reformer", "Short box", "Straps", "Light springs"],
  muscleGroups: ["Rectus abdominis", "Obliques", "Spinal stabilizers"],
  breathingPattern: "Exhale to hinge, inhale to return"
},
{
  name: "Jackknife",
  category: "Core & Full Body",
  level: "Advanced",
  description: "Dynamic movement to strengthen abdominals, shoulders, and hamstrings while articulating spine.",
  instructions: [
    "Lie supine on carriage with feet in straps",
    "Lift legs overhead, reaching feet toward ceiling",
    "Roll spine off carriage, pressing feet toward ceiling",
    "Return slowly to start position"
  ],
  precautions: [
    "Avoid neck strain",
    "Control movement through core",
    "Do not perform with lower back pain"
  ],
  precautionLevel: "High",
  duration: "2-3 minutes",
  thumbnailUrl: "https://images.unsplash.com/photo-1622035562820-5de5ed98f0a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  tags: ["core", "full-body", "spinal-articulation", "advanced"],
  benefits: ["Strengthens core", "Improves spinal flexibility", "Engages hamstrings and shoulders"],
  contraindications: ["Neck or lower back injury", "Poor shoulder stability"],
  modifications: ["Bend knees", "Use lighter springs", "Perform smaller range of motion"],
  equipment: ["Reformer", "Foot straps", "Medium springs"],
  muscleGroups: ["Abdominals", "Spinal extensors", "Hamstrings", "Shoulders"],
  breathingPattern: "Exhale to roll up, inhale to return"
},
{
  name: "Semi-Circle",
  category: "Core & Flexibility",
  level: "Advanced",
  description: "Back extension and hamstring stretch from supine position with feet in straps.",
  instructions: [
    "Lie supine with feet in straps",
    "Lift legs overhead, arching back",
    "Circle legs over head in semi-circle motion",
    "Return to starting position with control"
  ],
  precautions: [
    "Avoid neck strain",
    "Maintain core engagement",
    "Do not perform with spinal injury"
  ],
  precautionLevel: "High",
  duration: "2-3 minutes",
  thumbnailUrl: "https://images.unsplash.com/photo-1622035562820-5de5ed98f0a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  tags: ["core", "hamstrings", "spinal-articulation", "advanced"],
  benefits: ["Strengthens core", "Increases spinal flexibility", "Stretches hamstrings"],
  contraindications: ["Neck or spinal injuries", "Hamstring tears"],
  modifications: ["Bend knees", "Use lighter springs", "Reduce range of motion"],
  equipment: ["Reformer", "Foot straps", "Medium springs"],
  muscleGroups: ["Abdominals", "Spinal extensors", "Hamstrings", "Glutes"],
  breathingPattern: "Exhale to circle legs, inhale to return"
},
{
  name: "Stomach Massage – Round Back",
  category: "Core & Lower Body",
  level: "Intermediate",
  description: "Seated spinal flexion exercise improving abdominal strength and hip mobility.",
  instructions: [
    "Sit on carriage with feet against footbar",
    "Round spine forward, place hands on carriage",
    "Press carriage out using core engagement",
    "Return to start maintaining control"
  ],
  precautions: [
    "Avoid neck strain",
    "Keep shoulders relaxed",
    "Do not overextend lower back"
  ],
  precautionLevel: "Moderate",
  duration: "3-4 minutes",
  thumbnailUrl: "https://images.unsplash.com/photo-1605285829836-2d0a9b2f1a2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  tags: ["core", "spinal-articulation", "lower-body", "seated"],
  benefits: ["Strengthens abdominals", "Improves spinal mobility", "Increases hip flexibility"],
  contraindications: ["Acute back pain", "Knee injury"],
  modifications: ["Use cushion under knees", "Reduce range of motion", "Use lighter springs"],
  equipment: ["Reformer", "Footbar", "Medium springs"],
  muscleGroups: ["Abdominals", "Obliques", "Hip flexors", "Spinal stabilizers"],
  breathingPattern: "Exhale to press out, inhale to return"
},
{
  name: "Stomach Massage – Flat Back",
  category: "Core & Lower Body",
  level: "Intermediate",
  description: "Variation with neutral spine for abdominal strengthening and hip mobility.",
  instructions: [
    "Sit on carriage with feet against footbar",
    "Keep spine neutral, hands on carriage",
    "Press carriage out using core, return with control"
  ],
  precautions: [
    "Avoid hyperextension",
    "Maintain shoulders relaxed",
    "Do not perform with back pain"
  ],
  precautionLevel: "Moderate",
  duration: "3-4 minutes",
  thumbnailUrl: "https://images.unsplash.com/photo-1605285829836-2d0a9b2f1a2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  tags: ["core", "spinal-stability", "lower-body", "seated"],
  benefits: ["Strengthens core", "Maintains spinal neutrality", "Improves hip mobility"],
  contraindications: ["Acute back pain", "Knee injury"],
  modifications: ["Cushion under knees", "Reduce range of motion", "Lighter springs"],
  equipment: ["Reformer", "Footbar", "Medium springs"],
  muscleGroups: ["Abdominals", "Obliques", "Hip flexors", "Spinal stabilizers"],
  breathingPattern: "Exhale to press out, inhale to return"
},
{
  name: "Long Stretch Series – Plank",
  category: "Core & Full Body",
  level: "Advanced",
  description: "Plank-based sequence focusing on core stabilization, shoulder strength, and spinal alignment.",
  instructions: [
    "Place hands on footbar, feet on carriage",
    "Press carriage out while maintaining straight line from head to heels",
    "Return slowly to start position",
    "Focus on shoulder engagement and core stability"
  ],
  precautions: [
    "Avoid sagging hips",
    "Keep shoulders stable",
    "Do not perform if wrist pain exists"
  ],
  precautionLevel: "High",
  duration: "3-5 minutes",
  thumbnailUrl: "https://images.unsplash.com/photo-1610237890237-7c5e7cdebe8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  tags: ["plank", "core", "full-body", "spinal-stability"],
  benefits: ["Strengthens core", "Improves posture", "Engages shoulders and glutes"],
  contraindications: ["Wrist or shoulder injuries", "Lower back pain"],
  modifications: ["Knees down variation", "Use lighter springs", "Shorter range of motion"],
  equipment: ["Reformer", "Footbar", "Medium springs"],
  muscleGroups: ["Core", "Shoulders", "Glutes", "Spinal stabilizers"],
  breathingPattern: "Exhale to press out, inhale to return"
},
{
  name: "Twist",
  category: "Core & Flexibility",
  level: "Intermediate",
  description: "Seated rotational movement targeting obliques and spinal mobility.",
  instructions: [
    "Sit tall on carriage with feet under strap",
    "Twist torso to one side, keeping hips stable",
    "Return to center and repeat on opposite side",
    "Maintain controlled breathing and spinal alignment"
  ],
  precautions: [
    "Avoid forcing rotation",
    "Keep shoulders relaxed",
    "Do not perform if spinal injury exists"
  ],
  precautionLevel: "Moderate",
  duration: "2-3 minutes",
  thumbnailUrl: "https://images.unsplash.com/photo-1622035562820-5de5ed98f0a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  tags: ["core", "obliques", "spinal-mobility", "seated"],
  benefits: ["Strengthens obliques", "Improves spinal rotation", "Enhances posture"],
  contraindications: ["Spinal injury", "Acute back pain"],
  modifications: ["Reduce rotation range", "Use support under hips", "Lighter springs"],
  equipment: ["Reformer", "Footbar", "Light springs"],
  muscleGroups: ["Obliques", "Spinal rotators", "Abdominals"],
  breathingPattern: "Exhale to twist, inhale to return"
},
{
  name: "Mermaid Stretch",
  category: "Flexibility",
  level: "Beginner",
  description: "Seated side stretch that opens the spine and improves lateral flexibility.",
  instructions: [
    "Sit sideways on the carriage, knees bent with feet under body",
    "Place one hand on footbar, other arm overhead",
    "Reach over the head while keeping spine long",
    "Return to upright and switch sides"
  ],
  precautions: [
    "Keep hips grounded",
    "Avoid overextending the spine",
    "Do not force stretch if experiencing pain"
  ],
  precautionLevel: "Low",
  duration: "2-3 minutes",
  thumbnailUrl: "https://images.unsplash.com/photo-1594737625785-3c9175a5932b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  tags: ["flexibility", "spinal-mobility", "side-stretch", "seated"],
  benefits: [
    "Increases lateral flexibility",
    "Improves spinal mobility",
    "Relieves tension in ribcage and waist"
  ],
  contraindications: ["Recent spinal surgery", "Acute side or hip pain"],
  modifications: [
    "Shorten range of motion",
    "Use lighter spring tension",
    "Support arm on pillow if needed"
  ],
  equipment: ["Reformer carriage", "Footbar", "Light springs"],
  muscleGroups: ["Obliques", "Spinal extensors", "Latissimus dorsi"],
  breathingPattern: "Inhale to prepare, exhale to reach over"
},
{
  name: "Back Rowing – From the Chest",
  category: "Upper Body",
  level: "Intermediate",
  description: "Strengthens the back and improves posture using arm and scapular control.",
  instructions: [
    "Sit tall on carriage with feet against footbar, knees slightly bent",
    "Hold straps at chest level with elbows wide",
    "Draw elbows back, squeezing shoulder blades together",
    "Return to start with control"
  ],
  precautions: [
    "Avoid shrugging shoulders",
    "Keep spine neutral",
    "Do not overextend elbows"
  ],
  precautionLevel: "Moderate",
  duration: "3-4 minutes",
  thumbnailUrl: "https://images.unsplash.com/photo-1594737625785-3c9175a5932b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  tags: ["upper-body", "back-strength", "scapular-stability", "rowing"],
  benefits: [
    "Strengthens upper back muscles",
    "Improves shoulder stability",
    "Enhances posture and spinal alignment"
  ],
  contraindications: ["Acute shoulder injury", "Recent rotator cuff surgery"],
  modifications: [
    "Use lighter springs",
    "Reduce range of motion",
    "Perform one arm at a time for control"
  ],
  equipment: ["Reformer", "Arm straps", "Medium springs"],
  muscleGroups: ["Rhomboids", "Trapezius", "Posterior deltoids", "Biceps"],
  breathingPattern: "Exhale to pull, inhale to return"
},
{
  name: "Knee Stretches – Round Back",
  category: "Core & Lower Body",
  level: "Beginner",
  description: "Seated movement that mobilizes the spine while strengthening abdominals and legs.",
  instructions: [
    "Kneel on carriage, hands on footbar",
    "Round spine forward, draw knees toward chest",
    "Press carriage out keeping spine rounded",
    "Return knees toward chest with control"
  ],
  precautions: [
    "Keep shoulders relaxed",
    "Do not collapse through lower back",
    "Avoid if wrist pain exists"
  ],
  precautionLevel: "Low",
  duration: "3-5 minutes",
  thumbnailUrl: "https://images.unsplash.com/photo-1605285829836-2d0a9b2f1a2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  tags: ["core", "spinal-mobility", "kneeling", "lower-body"],
  benefits: [
    "Strengthens core and hip flexors",
    "Improves spinal articulation",
    "Enhances posture and coordination"
  ],
  contraindications: ["Knee or wrist injuries", "Acute back pain"],
  modifications: ["Use cushion under knees", "Reduce spring tension", "Smaller range of motion"],
  equipment: ["Reformer carriage", "Footbar", "Light springs"],
  muscleGroups: ["Rectus abdominis", "Obliques", "Quadriceps", "Spinal extensors"],
  breathingPattern: "Exhale to press out, inhale to return"
},
{
  name: "Knee Stretches – Flat Back",
  category: "Core & Lower Body",
  level: "Beginner",
  description: "Variation of knee stretches with a neutral spine to strengthen abdominals and legs.",
  instructions: [
    "Kneel on carriage with hands on footbar",
    "Keep spine long and neutral",
    "Press carriage out by straightening knees slightly",
    "Return to start with control"
  ],
  precautions: [
    "Do not overarch lower back",
    "Keep shoulders stable",
    "Avoid if wrist pain present"
  ],
  precautionLevel: "Low",
  duration: "3-5 minutes",
  thumbnailUrl: "https://images.unsplash.com/photo-1605285829836-2d0a9b2f1a2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  tags: ["core", "spinal-stability", "kneeling", "lower-body"],
  benefits: [
    "Strengthens core and legs",
    "Maintains spinal neutrality",
    "Enhances coordination and control"
  ],
  contraindications: ["Knee or wrist injuries", "Acute back pain"],
  modifications: ["Cushion under knees", "Reduce spring tension", "Smaller range of motion"],
  equipment: ["Reformer carriage", "Footbar", "Light springs"],
  muscleGroups: ["Rectus abdominis", "Obliques", "Quadriceps", "Spinal stabilizers"],
  breathingPattern: "Exhale to press out, inhale to return"
},
{
  name: "Long Back Stretch",
  category: "Full Body",
  level: "Intermediate",
  description: "Plank-based exercise that strengthens the core and stretches the spine.",
  instructions: [
    "Place hands on footbar, feet on carriage",
    "Press carriage out keeping body in straight line",
    "Return slowly maintaining control",
    "Focus on keeping shoulders away from ears"
  ],
  precautions: [
    "Maintain neutral spine",
    "Do not collapse hips",
    "Avoid if wrist or shoulder pain present"
  ],
  precautionLevel: "Moderate",
  duration: "2-3 minutes",
  thumbnailUrl: "https://images.unsplash.com/photo-1610237890237-7c5e7cdebe8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  tags: ["plank", "core", "full-body", "spinal-stability"],
  benefits: [
    "Strengthens core and shoulders",
    "Improves posture",
    "Develops spinal stability"
  ],
  contraindications: ["Wrist injuries", "Shoulder impingement", "Lower back pain"],
  modifications: ["Hands on higher surface", "Knees down variation", "Reduce range of motion"],
  equipment: ["Reformer", "Footbar", "Medium springs"],
  muscleGroups: ["Core", "Shoulders", "Spinal stabilizers", "Glutes"],
  breathingPattern: "Exhale to press out, inhale to return"
},
{
  name: "Tendon Stretch",
  category: "Lower Body",
  level: "Advanced",
  description: "Challenging hamstring and ankle stretch performed from plank position on the reformer.",
  instructions: [
    "Start in plank with toes on footbar, hands on carriage",
    "Press heels toward carriage while keeping hips high",
    "Return to plank position with control",
    "Repeat for multiple reps focusing on lengthening hamstrings"
  ],
  precautions: [
    "Do not let lower back sag",
    "Keep shoulders engaged",
    "Avoid if hamstring strain exists"
  ],
  precautionLevel: "High",
  duration: "2-3 minutes",
  thumbnailUrl: "https://images.unsplash.com/photo-1622035562820-5de5ed98f0a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  tags: ["hamstrings", "ankles", "plank", "stretch"],
  benefits: ["Lengthens hamstrings", "Strengthens posterior chain", "Improves ankle mobility"],
  contraindications: ["Hamstring tear", "Lower back pain", "Shoulder injury"],
  modifications: ["Reduce range of motion", "Use lighter spring", "Bend knees slightly"],
  equipment: ["Reformer", "Footbar", "Medium springs"],
  muscleGroups: ["Hamstrings", "Calves", "Glutes", "Core"],
  breathingPattern: "Exhale to stretch, inhale to return"
},
{
  name: "Arm Circles",
  category: "Upper Body",
  level: "Beginner",
  description: "Sitting exercise to strengthen shoulders and arms while stabilizing the core.",
  instructions: [
    "Sit tall on carriage holding straps",
    "Extend arms forward",
    "Make small controlled circles in the air",
    "Reverse direction after several reps"
  ],
  precautions: [
    "Do not shrug shoulders",
    "Maintain upright spine",
    "Avoid if shoulder pain exists"
  ],
  precautionLevel: "Low",
  duration: "2-3 minutes",
  thumbnailUrl: "https://images.unsplash.com/photo-1622035562820-5de5ed98f0a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  tags: ["shoulders", "arms", "upper-body", "stability"],
  benefits: ["Strengthens deltoids and arms", "Improves shoulder mobility", "Enhances core stability"],
  contraindications: ["Shoulder injury", "Rotator cuff issues"],
  modifications: ["Smaller circles", "Lighter springs", "Support back against carriage"],
  equipment: ["Reformer", "Arm straps", "Light springs"],
  muscleGroups: ["Deltoids", "Biceps", "Triceps", "Core stabilizers"],
  breathingPattern: "Exhale to circle, inhale to return"
},
{
  name: "Pulling Straps – High Row",
  category: "Upper Body",
  level: "Intermediate",
  description: "Strengthens upper back, shoulders, and arms while engaging core for stability.",
  instructions: [
    "Sit tall on carriage holding straps",
    "Pull straps toward chest with elbows wide",
    "Return slowly to start position",
    "Keep shoulders down and spine neutral"
  ],
  precautions: [
    "Avoid shrugging shoulders",
    "Do not lean backward excessively",
    "Modify range for shoulder discomfort"
  ],
  precautionLevel: "Moderate",
  duration: "3-4 minutes",
  thumbnailUrl: "https://images.unsplash.com/photo-1622035562820-5de5ed98f0a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  tags: ["upper-body", "back-strength", "posture", "rowing"],
  benefits: ["Strengthens upper back", "Improves shoulder stability", "Enhances posture"],
  contraindications: ["Shoulder injuries", "Rotator cuff issues"],
  modifications: ["Reduce range of motion", "Lighter springs", "One arm at a time"],
  equipment: ["Reformer", "Arm straps", "Medium springs"],
  muscleGroups: ["Rhomboids", "Trapezius", "Posterior deltoids", "Biceps"],
  breathingPattern: "Exhale to pull, inhale to return"
}


];
