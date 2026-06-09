export const characterLabData = {
  manu: {
    name: 'Manu',
    badge: 'Active',
    tagline: 'A curious-hearted girl who sees the world with wonder and leads with kindness.',
    worldPill: 'Bithoor and the Ganga banks',
    origin: 'Rani Laxmibai of Jhansi',
    description: 'A curious-hearted girl who sees the world with wonder and leads with kindness. Manu believes small acts of courage can create big change.',
    avatar: 'assets/manu_avatar.png',
    backdrop: 'assets/manu_bg.png',
    values: [
      { label: 'Courage', text: 'She stands up for what is right.', color: '#063f47', icon: 'shield' },
      { label: 'Care', text: 'She looks out for people and nature.', color: '#aa432f', icon: 'heart' },
      { label: 'Curiosity', text: 'She asks questions and loves to learn.', color: '#c9952f', icon: 'lightbulb' }
    ],
    traits: ['Empathetic', 'Brave', 'Inquisitive', 'Thoughtful', 'Resilient', 'Playful', 'Nature-loving', 'Community-minded'],
    meta: {
      age: '8-10 years',
      world: 'A small town in India',
      loves: 'Stories, kites, rivers, & animals',
      inspiredBy: 'Everyday people doing good'
    },
    prompts: [
      {
        id: 'story',
        label: 'Write a short story where Manu helps her friend.',
        title: 'Story Draft',
        text: 'Manu saw her friend Meera sitting alone under the neem tree. She walked over, sat beside her, and asked, "Want to fly kites together?" Meera smiled. They ran to the field, their kites dancing like birds in the sky.'
      },
      {
        id: 'unfair',
        label: 'Manu notices something unfair. What does she do?',
        title: 'Standing Up',
        text: 'Manu saw the older boys blocking the path to the swing. She walked up, looked them in the eye, and said, "Everyone gets a turn to play." Her steady voice made them step aside.'
      },
      {
        id: 'monsoon',
        label: 'A day in Manu\'s village during the monsoon.',
        title: 'Village Monsoon',
        text: 'Rain poured over the tiled roofs of Bithoor. Manu ran out to help her father cover the grain sacks with tarpaulin, laughing as the cool drops washed over her face.'
      },
      {
        id: 'nature',
        label: 'Manu learns something new from nature.',
        title: 'River Lesson',
        text: 'By the Ganga ghats, Manu watched a tiny sparrow build a nest twig by twig. "It takes many small efforts to build something strong," she whispered.'
      }
    ],
    health: {
      storyDepth: 92,
      voiceConsistency: 88,
      worldRichness: 90
    },
    modules: [
      { label: 'Story Draft', desc: 'Generate and refine stories for Manu.', status: 'Ready' },
      { label: 'Parent Prompt', desc: 'Questions to spark meaningful conversations.', status: 'Ready' },
      { label: 'World Notes', desc: 'Context, locations, people and cultural details.', status: 'In Progress' },
      { label: 'Social Snippet', desc: 'Short, shareable content from Manu\'s world.', status: 'Ready' }
    ],
    tabs: {
      profile: {
        title: 'Profile',
        lead: 'Manu is built around courage with tenderness: a girl who asks, tries, and keeps moving.'
      },
      studio: {
        title: 'Story Studio',
        lead: 'Generate story beats, parent prompts, and classroom-ready moments from one character.'
      },
      voice: {
        title: 'Voice & Tone',
        lead: 'Warm, brave, child-friendly, and specific. Never flat, preachy, or generic.'
      },
      world: {
        title: 'Visual World',
        lead: 'Bithoor, river light, palace textures, horses, wood, brass, and warm dawn color.'
      },
      notes: {
        title: 'Notes',
        lead: 'Inspired by history, but written as a child-safe story universe with clear fictionalized moments.'
      }
    }
  },
  kalpana: {
    name: 'Kalpana',
    badge: 'Active',
    tagline: 'A determined dreamer who looked at the stars and flew beyond the clouds.',
    worldPill: 'Outer space and Karnal skies',
    origin: 'Kalpana Chawla, the astronaut',
    description: 'A curious mind from Haryana who dreamed of flying among the stars. Kalpana showed the world that no dream is too big if you have the courage to follow it.',
    avatar: 'assets/kalpana_avatar.png',
    backdrop: 'assets/kalpana_bg.png',
    values: [
      { label: 'Science', text: 'She explores the mysteries of space.', color: '#063f47', icon: 'rocket' },
      { label: 'Adventure', text: 'She flies beyond known horizons.', color: '#aa432f', icon: 'compass' },
      { label: 'Wonder', text: 'She sees the beauty of the cosmos.', color: '#c9952f', icon: 'stars' }
    ],
    traits: ['Dreamer', 'Persistent', 'Scientific', 'Adventurous', 'Humble', 'Curious', 'Detail-oriented', 'Pioneering'],
    meta: {
      age: '10-12 years',
      world: 'Karnal to Space Shuttle Columbia',
      loves: 'Aerodynamics, stars, music, & flying',
      inspiredBy: 'Pioneers of aviation and space'
    },
    prompts: [
      {
        id: 'story',
        label: 'Write a short story about Kalpana looking at the night sky.',
        title: 'Starry Dream',
        text: 'Sitting on the terrace in Karnal, Kalpana drew maps of constellations. "One day," she whispered to her brother, "I will touch those stars myself." She never let go of that promise.'
      },
      {
        id: 'weightless',
        label: 'Kalpana experiences weightlessness for the first time.',
        title: 'Zero Gravity',
        text: 'Floating in the cabin of the space shuttle, Kalpana watched a drop of water float like a perfect glass marble. She smiled, feeling completely free.'
      },
      {
        id: 'earthView',
        label: 'Kalpana shares what Earth looks like from space.',
        title: 'The Blue Planet',
        text: 'Looking through the shuttle window, Kalpana saw Earth as a glowing blue jewel set against deep black ink. "No borders," she wrote, "just one beautiful home."'
      },
      {
        id: 'hardWork',
        label: 'A moment of hard study in Kalpana\'s journey.',
        title: 'Persistent Flight',
        text: 'Late at night, surrounded by thick books on aerospace design, Kalpana worked out the equations. She knew that wings are built with hard work before they fly.'
      }
    ],
    health: {
      storyDepth: 94,
      voiceConsistency: 91,
      worldRichness: 89
    },
    modules: [
      { label: 'Story Draft', desc: 'Generate and refine space missions for Kalpana.', status: 'Ready' },
      { label: 'Parent Prompt', desc: 'Questions to inspire kids about big ambitions.', status: 'Ready' },
      { label: 'World Notes', desc: 'Details on space cabin, earth orbit, and Karnal childhood.', status: 'Ready' },
      { label: 'Social Snippet', desc: 'Cosmic thoughts and quotes on following dreams.', status: 'In Progress' }
    ],
    tabs: {
      profile: {
        title: 'Profile',
        lead: 'Kalpana\'s profile details her journey from a small town in India to space.'
      },
      studio: {
        title: 'Story Studio',
        lead: 'Design space adventures and science puzzles for children.'
      },
      voice: {
        title: 'Voice & Tone',
        lead: 'Inspiring, clear, scientific, and dream-focused.'
      },
      world: {
        title: 'Visual World',
        lead: 'Cosmic blue, spaceship details, starry skies, and Haryana fields.'
      },
      notes: {
        title: 'Notes',
        lead: 'Historical background: First Indian-born woman in space.'
      }
    }
  },
  mary_kom: {
    name: 'Mary Kom',
    badge: 'Active',
    tagline: 'A relentless fighter who boxed her way to victory and never gave up.',
    worldPill: 'Manipur ring and training fields',
    origin: 'MC Mary Kom, world champion boxer',
    description: 'A farmer\'s daughter from Manipur who fought against all odds to become a world boxing champion. Mary teaches children that strength is built through grit and passion.',
    avatar: 'assets/mary_kom_avatar.png',
    backdrop: 'assets/mary_kom_bg.png',
    values: [
      { label: 'Grit', text: 'She trains hard and never backs down.', color: '#aa432f', icon: 'fist' },
      { label: 'Passion', text: 'She loves the sport and boxing ring.', color: '#c9952f', icon: 'fire' },
      { label: 'Discipline', text: 'She stays focused on her goals.', color: '#063f47', icon: 'trophy' }
    ],
    traits: ['Relentless', 'Resilient', 'Disciplined', 'Strong-willed', 'Athletic', 'Caring', 'Determined', 'Pioneering'],
    meta: {
      age: '9-11 years',
      world: 'A green village in Manipur',
      loves: 'Boxing, running, family, & spicy food',
      inspiredBy: 'Her community and local boxing heroes'
    },
    prompts: [
      {
        id: 'story',
        label: 'Write a short story about Mary Kom\'s first practice.',
        title: 'First Punch',
        text: 'Mary stood before the heavy punching bag, wrapping her hands. She took a breath and struck. It stung her knuckles, but she smiled. She knew she was right where she belonged.'
      },
      {
        id: 'comeback',
        label: 'Mary trains early in the morning in the hills.',
        title: 'Morning Run',
        text: 'Before the sun rose over the Manipur hills, Mary was already running. The cool mist filled her lungs as her feet beat a steady rhythm on the mud track.'
      },
      {
        id: 'champion',
        label: 'Mary wins a match and celebrates with her kids.',
        title: 'Gold Medal',
        text: 'With the gold medal shining around her neck, Mary hugged her twin boys. "This isn\'t just my medal," she told them, "it belongs to everyone who stood by us."'
      },
      {
        id: 'village',
        label: 'Mary helps young kids learn boxing in her village.',
        title: 'Giving Back',
        text: 'Mary held the pads for a young girl in her academy. "Keep your eyes on the target," she coached gently. "Your strength comes from your heart, not just your arms."'
      }
    ],
    health: {
      storyDepth: 90,
      voiceConsistency: 87,
      worldRichness: 88
    },
    modules: [
      { label: 'Story Draft', desc: 'Generate and refine boxing ring story beats.', status: 'Ready' },
      { label: 'Parent Prompt', desc: 'Prompts to discuss resilience and hard work.', status: 'Ready' },
      { label: 'World Notes', desc: 'Details on Manipuri village, boxing ring, and running tracks.', status: 'In Progress' },
      { label: 'Social Snippet', desc: 'Powerful boxing quotes and motivation snippets.', status: 'Ready' }
    ],
    tabs: {
      profile: {
        title: 'Profile',
        lead: 'Mary\'s profile outlines her rise from Manipur to world boxing podiums.'
      },
      studio: {
        title: 'Story Studio',
        lead: 'Design athletic challenges and training day storyboards.'
      },
      voice: {
        title: 'Voice & Tone',
        lead: 'Relentless, punchy, honest, and deeply encouraging.'
      },
      world: {
        title: 'Visual World',
        lead: 'Boxing ring textures, green hills, mist, wraps, and gold highlights.'
      },
      notes: {
        title: 'Notes',
        lead: 'Historical background: Six-time World Amateur Boxing Champion.'
      }
    }
  }
};

export const characterOrder = ['manu', 'kalpana', 'mary_kom'];
