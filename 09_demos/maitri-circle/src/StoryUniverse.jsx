import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  ArrowRight,
  BookOpenText,
  Compass,
  Gift,
  Minus,
  NotePencil,
  Package,
  Plant,
  Plus,
  Sparkle,
  Tag,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import "./storyUniverse.css";

const siteBase = import.meta.env.BASE_URL || "/";
const publicPath = (path = "") => `${siteBase}${path.replace(/^\/+/, "")}`;

const generatedAssets = {
  manu: publicPath("assets/generated/optimized/manu-portrait.jpg"),
};

const worldModelAsset = publicPath("assets/models/maitri-world-archipelago.glb");

const worldDestinations = [
  {
    id: "river",
    label: "Ganga Ghat",
    tone: "teal",
    icon: Compass,
    color: "#189a93",
    prompt: "Follow the river lamps, stone steps, and the brave promise trail.",
    description: "The emotional center of Maitri. Water, light, and memory set the tone for Manu's world.",
    streetPosition: new THREE.Vector3(-1.1, 1.55, 4.6),
    lookAt: new THREE.Vector3(-1.14, 1.55, -3.05),
    landmark: new THREE.Vector3(-1.14, 0, -3.05),
    infoLine: "River vows, lamps, and brave first steps",
  },
  {
    id: "library",
    label: "Story Library",
    tone: "violet",
    icon: BookOpenText,
    color: "#8b61c8",
    prompt: "Enter the reading hall to open books, letters, and the story archive.",
    description: "A lamp-lit reading hall where books, letters, and story objects feel sacred and central.",
    streetPosition: new THREE.Vector3(2.65, 1.55, -5.7),
    lookAt: new THREE.Vector3(2.65, 1.65, -11.38),
    landmark: new THREE.Vector3(2.65, 0, -11.38),
    infoLine: "Books, letters, and the reading sanctum",
  },
  {
    id: "bazaar",
    label: "Keepsake Bazaar",
    tone: "amber",
    icon: Gift,
    color: "#f3a823",
    prompt: "Step into the keepsake market to browse textiles, journals, and first-box treasures.",
    description: "A tactile market where objects from Manu's world become gifts, rituals, and keepsakes.",
    streetPosition: new THREE.Vector3(-7.03, 1.55, 9.6),
    lookAt: new THREE.Vector3(-7.03, 1.45, 4.41),
    landmark: new THREE.Vector3(-7.03, 0, 4.41),
    infoLine: "Artifacts, textiles, and first-box objects",
  },
  {
    id: "classroom",
    label: "Circle Courtyard",
    tone: "rose",
    icon: UsersThree,
    color: "#ef6f8b",
    prompt: "Walk into the courtyard to see how Maitri becomes a guided learning ritual.",
    description: "An open-air learning court for schools, read-aloud circles, and values-led practice.",
    streetPosition: new THREE.Vector3(-9.84, 1.55, -0.4),
    lookAt: new THREE.Vector3(-9.84, 1.45, -5.46),
    landmark: new THREE.Vector3(-9.84, 0, -5.46),
    infoLine: "School rituals and guided read-aloud circles",
  },
  {
    id: "hillside",
    label: "Mango Hillside",
    tone: "green",
    icon: Plant,
    color: "#2aa878",
    prompt: "Climb the quiet path for reflection, promise lanterns, and parent-child moments.",
    description: "A calm ridge of trees and resting stones where the world softens into reflection and ritual.",
    streetPosition: new THREE.Vector3(6.54, 1.55, 4.6),
    lookAt: new THREE.Vector3(6.54, 1.65, -0.82),
    landmark: new THREE.Vector3(6.54, 0, -0.82),
    infoLine: "Quiet reflection, lantern trees, and parent-child pauses",
  },
];

const storyJourneys = [
  {
    id: "manu",
    label: "Start with Manu",
    keepsake: "Brave Promise",
    destinationIds: ["river", "library", "bazaar", "hillside"],
  },
  {
    id: "box",
    label: "Build the First Box",
    keepsake: "First Box Bundle",
    destinationIds: ["library", "bazaar", "river", "hillside"],
  },
  {
    id: "schools",
    label: "For Schools",
    keepsake: "Teacher Prompt Pack",
    destinationIds: ["classroom", "library", "river"],
  },
];

const storyBooks = [
  {
    id: "horse",
    title: "Manu: The Horse Nobody Could Ride",
    character: "Manu",
    tone: "violet",
    premise: "Before Manu changed history, she learned to be brave one small step at a time.",
    seeds: ["stable", "Badal", "river stone", "brave question"],
    pages: [
      {
        page: 1,
        heading: "The courtyard rule",
        text: "In the morning courtyard, Manu watched the boys practice riding. Hooves tapped the dust, wooden swords clicked, and every sound made her step closer.",
      },
      {
        page: 2,
        heading: "Why not?",
        text: "Someone laughed softly and said, \"Girls do not need to ride like that.\" Manu did not shout. She looked at the horses, then asked the bravest question she knew: \"Why not?\"",
      },
      {
        page: 3,
        heading: "Moropant listens",
        text: "Her father, Moropant, heard the question. He saw that Manu was not asking to show off. She was asking because her heart wanted room to grow.",
      },
      {
        page: 4,
        heading: "A promise in the dust",
        text: "Manu picked up a small river stone from her pocket. \"I will learn,\" she whispered. \"Even if I have to begin with one tiny step.\"",
      },
      {
        page: 5,
        heading: "The horse arrives",
        text: "That afternoon, a dark, restless horse came to the stable. His name was Badal. He tossed his head whenever anyone came too near.",
      },
      {
        page: 6,
        heading: "Nobody could ride him",
        text: "The older riders tried strong voices and quick hands. Badal stamped, pulled away, and trembled. Soon people began calling him the horse nobody could ride.",
      },
      {
        page: 7,
        heading: "Manu notices",
        text: "Manu stood by the stable door and watched quietly. Badal was not mean. His ears twitched at sudden sounds, and his eyes searched for a safe place.",
      },
      {
        page: 8,
        heading: "No showing off",
        text: "\"He is frightened,\" Manu said. Some people smiled as if she were too small to understand. Manu kept watching anyway.",
      },
      {
        page: 9,
        heading: "The first visit",
        text: "She did not touch Badal. She only sat outside his stall with a bowl of water nearby. \"I am Manu,\" she said. \"I will not hurry you.\"",
      },
      {
        page: 10,
        heading: "A quiet answer",
        text: "Badal did not come close. But after a long while, he stopped stamping. Manu smiled because quiet answers count too.",
      },
      {
        page: 11,
        heading: "The second morning",
        text: "The next morning, Manu returned with fresh grass and the same patient voice. Badal looked at her, then looked away, as if deciding whether hope was safe.",
      },
      {
        page: 12,
        heading: "The stable decision",
        text: "By evening, the stable master sighed. \"If no one can handle him, Badal may have to leave.\" Manu felt the words land heavy in her chest.",
      },
      {
        page: 13,
        heading: "One chance",
        text: "\"Please give me one chance,\" Manu said. Her voice was small at first, but it did not disappear. \"Not to force him. To help him trust.\"",
      },
      {
        page: 14,
        heading: "Doubt in the courtyard",
        text: "Some children stared. Some adults frowned. Manu's hands felt cold, but she remembered her river stone and held it tight in her palm.",
      },
      {
        page: 15,
        heading: "Brave is not fearless",
        text: "Manu was afraid of falling. She was afraid of being laughed at. Then she remembered: brave does not mean fear is gone. Brave means care takes the next step.",
      },
      {
        page: 16,
        heading: "Care before control",
        text: "She brushed Badal's neck with slow, gentle strokes. When he stepped back, she stepped back too. Trust, Manu learned, cannot be pulled like a rope.",
      },
      {
        page: 17,
        heading: "The first walk",
        text: "At last, Badal lowered his head. Manu held the lead softly and walked beside him. Around the courtyard they went, one careful circle at a time.",
      },
      {
        page: 18,
        heading: "Badal chooses",
        text: "The next day, Badal came to the stall door before Manu called him. Manu laughed with surprise. It felt like the sun had opened inside the stable.",
      },
      {
        page: 19,
        heading: "Up on the saddle",
        text: "With Moropant nearby and the stable master watching, Manu placed one foot in the stirrup. Badal stood still. Manu breathed in, then climbed up.",
      },
      {
        page: 20,
        heading: "Slow is still forward",
        text: "They did not gallop. They walked. Then they turned. Then they walked again. Every gentle step said the same thing: we are learning together.",
      },
      {
        page: 21,
        heading: "A different kind of strong",
        text: "The courtyard grew quiet. The horse nobody could ride was listening to the girl nobody expected. Manu patted Badal and thanked him first.",
      },
      {
        page: 22,
        heading: "What everyone saw",
        text: "An elder smiled and said, \"Remember this child. One day, her courage will make many people stand taller.\" Manu did not know the future. She only knew Badal was safe.",
      },
      {
        page: 23,
        heading: "A letter from Manu",
        text: "Dear friend, some people may tell you what you can and cannot do. When that happens, you can ask a brave question. You can listen. You can learn. You can begin.",
      },
      {
        page: 24,
        heading: "One step forward",
        text: "I was scared too. Courage was not a loud roar for me. It was one small step toward Badal, then another. When you feel scared, take one kind step. I am cheering for you. Your friend, Manu",
      },
      {
        page: 25,
        heading: "Activity: Design your warrior crest",
        text: "Draw a crest that feels like you. Add stickers for the qualities you want to carry: brave, curious, kind, strong, or leader.",
      },
      {
        page: 26,
        heading: "Activity: What would Manu do?",
        text: "Circle the choice Manu might make: laugh at a nervous friend, help them try slowly, or walk away. Then draw your own fair choice.",
      },
      {
        page: 27,
        heading: "Activity: Courage tracker",
        text: "For seven days, write or draw one small brave action. It can be asking a question, trying again, saying sorry, or helping someone feel safe.",
      },
      {
        page: 28,
        heading: "Activity: Spot the stable details",
        text: "Look around Badal's stable. Find the water bowl, the river stone, the soft brush, the marigold thread, and the open gate.",
      },
      {
        page: 29,
        heading: "Activity: Jhansi maze",
        text: "Help Manu reach Badal by choosing the patient path. If a path feels rushed or noisy, try another way.",
      },
      {
        page: 30,
        heading: "Activity: My brave promise",
        text: "Complete the sentence: I promise to be brave when _____. Add a sticker or drawing beside your promise and share it with a grown-up.",
      },
      {
        page: 31,
        heading: "Sticker sheet: Story friends",
        text: "Use these stickers to retell the story: Manu, Badal, Young Nana Saheb, Moropant, the river stone, the brush, the shield, and the fort gate.",
      },
      {
        page: 32,
        heading: "Sticker sheet: Brave words",
        text: "Place these value stickers on your favorite pages: Brave, Curious, Kind, Strong, Leader. Add lotus, marigold, peacock feather, and star stickers wherever your story needs light.",
      },
    ],
  },
  {
    id: "festival",
    title: "Manu and the River Festival",
    character: "Manu",
    tone: "teal",
    premise: "A festival day becomes a lesson in helping without needing attention.",
    seeds: ["festival lamp", "river song", "lost garland", "helping hand"],
    pages: [
      {
        page: 1,
        heading: "Archive preview",
        text: "This future book follows Manu through a river festival where helping quietly matters more than being praised. It stays child-centered and gentle, like the first Manu story.",
      },
    ],
  },
  {
    id: "sunrise",
    title: "The Promise at Sunrise",
    character: "Manu",
    tone: "amber",
    premise: "Manu makes a promise to try again even when the first answer is no.",
    seeds: ["sunrise", "courtyard", "wooden sword", "promise"],
    pages: [
      {
        page: 1,
        heading: "Archive preview",
        text: "This future story is reserved for Manu's next step: trying again after disappointment, without rushing her into the later queen or battlefield arc.",
      },
    ],
  },
];

const bazaarItems = [
  {
    id: "badal",
    name: "Badal Companion Horse",
    status: "First-box concept",
    tone: "teal",
    icon: Package,
    detail: "A small horse companion for recreating Manu's stable scene.",
  },
  {
    id: "crest",
    name: "Courage Crest Sticker Pack",
    status: "Activity concept",
    tone: "rose",
    icon: Sparkle,
    detail: "Reusable symbols for promise notes, journals, and activity pages.",
  },
  {
    id: "journal",
    name: "Brave Promise Journal",
    status: "Reflection concept",
    tone: "violet",
    icon: NotePencil,
    detail: "Guided prompts for brave moments, questions, and doodles.",
  },
];

const routeStops = worldDestinations.map((item) => item.id);
const destinationById = new Map(worldDestinations.map((item) => [item.id, item]));
const storyBookById = new Map(storyBooks.map((item) => [item.id, item]));
const bazaarItemById = new Map(bazaarItems.map((item) => [item.id, item]));

function makeMaterial(color, extra = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.65, ...extra });
}

function makeLabelTexture(destination) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.shadowColor = "rgba(0,0,0,0.18)";
  ctx.shadowBlur = 24;
  ctx.fillStyle = "rgba(255, 252, 247, 0.98)";
  ctx.beginPath();
  const radius = 54;
  ctx.moveTo(radius, 18);
  ctx.lineTo(canvas.width - radius, 18);
  ctx.quadraticCurveTo(canvas.width - 18, 18, canvas.width - 18, radius);
  ctx.lineTo(canvas.width - 18, canvas.height - radius);
  ctx.quadraticCurveTo(canvas.width - 18, canvas.height - 18, canvas.width - radius, canvas.height - 18);
  ctx.lineTo(radius, canvas.height - 18);
  ctx.quadraticCurveTo(18, canvas.height - 18, 18, canvas.height - radius);
  ctx.lineTo(18, radius);
  ctx.quadraticCurveTo(18, 18, radius, 18);
  ctx.closePath();
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.fillStyle = destination.color;
  ctx.beginPath();
  ctx.arc(72, 80, 26, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#3b2b22";
  ctx.font = "600 38px Georgia";
  ctx.textBaseline = "middle";
  ctx.fillText(destination.label, 120, 80);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function StoryWorldCanvas({
  selectedDestinationId,
  enteredPlace,
  focusDestinationId,
  transitionPhase,
  activeBookId,
  readingBookMode,
  activeBazaarItemId,
  onDestinationClick,
  onInteriorItemClick,
  onHoverDestinationChange,
}) {
  const canvasRef = useRef(null);
  const selectedRef = useRef(selectedDestinationId);
  const enteredPlaceRef = useRef(enteredPlace);
  const focusDestinationRef = useRef(focusDestinationId);
  const transitionPhaseRef = useRef(transitionPhase);
  const transitionStartedAtRef = useRef(0);
  const activeBookRef = useRef(activeBookId);
  const readingBookModeRef = useRef(readingBookMode);
  const activeBazaarItemRef = useRef(activeBazaarItemId);
  const compactViewportRef = useRef(false);
  const orbitYawRef = useRef(0.68);
  const orbitPitchRef = useRef(0.74);
  const dragStateRef = useRef({ down: false, x: 0, y: 0, startX: 0, startY: 0 });

  useEffect(() => {
    selectedRef.current = selectedDestinationId;
  }, [selectedDestinationId]);

  useEffect(() => {
    enteredPlaceRef.current = enteredPlace;
  }, [enteredPlace]);

  useEffect(() => {
    focusDestinationRef.current = focusDestinationId;
  }, [focusDestinationId]);

  useEffect(() => {
    transitionPhaseRef.current = transitionPhase;
    transitionStartedAtRef.current = performance.now();
  }, [transitionPhase]);

  useEffect(() => {
    activeBookRef.current = activeBookId;
  }, [activeBookId]);

  useEffect(() => {
    readingBookModeRef.current = readingBookMode;
  }, [readingBookMode]);

  useEffect(() => {
    activeBazaarItemRef.current = activeBazaarItemId;
  }, [activeBazaarItemId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    compactViewportRef.current = window.matchMedia("(max-width: 700px)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, compactViewportRef.current ? 1.5 : 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#d8f3f6");
    scene.fog = new THREE.Fog("#d8f3f6", 16, 52);

    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    const lookTarget = new THREE.Vector3();
    const goalPosition = new THREE.Vector3();
    const goalTarget = new THREE.Vector3();
    const clickTargets = [];
    const interiorTargets = [];
    const districtMeshes = new Map();
    const interiorGroups = new Map();
    const bookMeshes = new Map();
    const bazaarMeshes = new Map();
    const hoveredRef = { current: null };
    const startedAt = performance.now();
    const worldVisibility = { current: true };

    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(58, 48, 32),
      new THREE.MeshBasicMaterial({ color: "#fdf7ea", side: THREE.BackSide }),
    );
    sky.position.y = 10;
    scene.add(sky);

    const ambient = new THREE.HemisphereLight(0xfff6e7, 0x6ca59d, 1.95);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xffe1af, 3.1);
    sun.position.set(-12, 15, 10);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -20;
    sun.shadow.camera.right = 20;
    sun.shadow.camera.top = 20;
    sun.shadow.camera.bottom = -20;
    scene.add(sun);

    const fill = new THREE.DirectionalLight(0xffd7d1, 1.35);
    fill.position.set(12, 8, -10);
    scene.add(fill);

    const riverGlow = new THREE.PointLight(0xf8d48e, 1.2, 18, 2.1);
    riverGlow.position.set(0, 3.5, 0.8);
    scene.add(riverGlow);

    const world = new THREE.Group();
    scene.add(world);
    const importedWorld = new THREE.Group();
    scene.add(importedWorld);
    const interiorRoot = new THREE.Group();
    interiorRoot.visible = false;
    scene.add(interiorRoot);

    const waterMaterial = makeMaterial("#4ab9ca", { transparent: true, opacity: 0.94, emissive: "#2d98a8", emissiveIntensity: 0.1 });
    const stoneMaterial = makeMaterial("#d6b48a");
    const pathMaterial = makeMaterial("#eadcbe");
    const plasterMaterial = makeMaterial("#fff3df");
    const woodMaterial = makeMaterial("#8f6243");
    const roofMaterial = makeMaterial("#cc7158");
    const greenMaterial = makeMaterial("#72aa6d");
    const deepGreenMaterial = makeMaterial("#4f855a");
    const tealMaterial = makeMaterial("#76c9bf");
    const violetMaterial = makeMaterial("#ae92d5");
    const amberMaterial = makeMaterial("#e4b25b");
    const roseMaterial = makeMaterial("#d6838f");
    const brassMaterial = makeMaterial("#c89a42", { metalness: 0.18, roughness: 0.48 });
    const pageMaterial = makeMaterial("#efe0bd", { roughness: 0.76 });

    function setWorldVisibility(visible) {
      if (worldVisibility.current === visible) {
        return;
      }
      worldVisibility.current = visible;
      world.visible = visible;
      importedWorld.visible = visible;
      interiorRoot.visible = !visible;
    }

    function setActiveInterior(id) {
      interiorGroups.forEach((group, key) => {
        group.visible = key === id;
      });
    }
    const loader = new GLTFLoader();
    function hideProceduralWorld() {
      world.children.forEach((child) => {
        if (!child.userData?.persistOverlay) {
          child.visible = false;
        }
      });
    }

    loader.load(
      worldModelAsset,
      (gltf) => {
        const model = gltf.scene;
        const bounds = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        bounds.getSize(size);
        bounds.getCenter(center);

        const maxHorizontal = Math.max(size.x, size.z) || 1;
        const scale = 21 / maxHorizontal;
        model.scale.setScalar(scale);

        const scaledBounds = new THREE.Box3().setFromObject(model);
        const scaledCenter = new THREE.Vector3();
        scaledBounds.getCenter(scaledCenter);

        model.position.set(-scaledCenter.x, -scaledBounds.min.y, -scaledCenter.z - 1.2);
        model.rotation.y = Math.PI * 0.08;

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        importedWorld.add(model);
        hideProceduralWorld();
      },
      undefined,
      () => undefined,
    );

    function addIsland(x, z, radius, height, topColor = "#efe0bb", edgeColor = "#d1ad7d") {
      const island = new THREE.Group();
      const base = new THREE.Mesh(
        new THREE.CylinderGeometry(radius * 0.94, radius, height, 28),
        makeMaterial(edgeColor),
      );
      base.position.set(x, -height * 0.42, z);
      base.castShadow = true;
      base.receiveShadow = true;
      island.add(base);

      const top = new THREE.Mesh(
        new THREE.CylinderGeometry(radius * 0.92, radius * 0.94, 0.28, 28),
        makeMaterial(topColor),
      );
      top.position.set(x, 0, z);
      top.receiveShadow = true;
      island.add(top);
      world.add(island);
      return island;
    }

    addIsland(0.2, 0.2, 4.7, 2.2, "#d9e8a4", "#c89e72");
    addIsland(-5.5, -1.5, 4.6, 1.8, "#c7b1dc", "#c59a74");
    addIsland(5.7, -1.2, 4.5, 1.8, "#ead8a3", "#d0a46c");
    addIsland(5.8, -9.8, 4.6, 1.9, "#d7d9a6", "#c5a07a");
    addIsland(-5.6, -10.3, 4.4, 1.8, "#cae1b0", "#c49d76");

    const river = new THREE.Mesh(new THREE.TorusGeometry(8.2, 1.55, 18, 120), waterMaterial);
    river.rotation.x = Math.PI / 2;
    river.position.set(-1.6, -0.45, 0.6);
    river.receiveShadow = true;
    world.add(river);

    const centralCanal = new THREE.Mesh(new THREE.CylinderGeometry(2.15, 2.35, 0.18, 28), waterMaterial);
    centralCanal.position.set(0.1, -0.2, 0.4);
    centralCanal.receiveShadow = true;
    world.add(centralCanal);

    const riverBridge = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.18, 1.5), stoneMaterial);
    riverBridge.position.set(-2.1, 0.04, 7.7);
    riverBridge.castShadow = true;
    riverBridge.receiveShadow = true;
    world.add(riverBridge);

    const ghatWalk = new THREE.Mesh(new THREE.CylinderGeometry(6.8, 7.3, 0.18, 10, 1, false, Math.PI * 0.12, Math.PI * 0.8), pathMaterial);
    ghatWalk.rotation.x = Math.PI / 2;
    ghatWalk.rotation.z = Math.PI * 0.5;
    ghatWalk.position.set(0.4, -0.02, 6.8);
    ghatWalk.receiveShadow = true;
    world.add(ghatWalk);

    const fortCourt = new THREE.Mesh(new THREE.BoxGeometry(12.2, 0.16, 10.6), pathMaterial);
    fortCourt.position.set(0.6, -0.02, -4.2);
    fortCourt.receiveShadow = true;
    world.add(fortCourt);

    const fortWall = new THREE.Group();
    [
      [0.6, 1.35, -9.5, 13.2, 2.8, 0.8],
      [0.6, 1.35, 1.3, 13.2, 2.8, 0.8],
      [-5.9, 1.35, -4.2, 0.8, 2.8, 11.8],
      [7.1, 1.35, -4.2, 0.8, 2.8, 11.8],
    ].forEach(([x, y, z, sx, sy, sz]) => {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), stoneMaterial);
      wall.position.set(x, y, z);
      wall.castShadow = true;
      wall.receiveShadow = true;
      fortWall.add(wall);
    });
    [-5.9, 7.1].forEach((x) => {
      [-9.5, 1.3].forEach((z) => {
        const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.05, 3.5, 14), stoneMaterial);
        tower.position.set(x, 1.75, z);
        tower.castShadow = true;
        tower.receiveShadow = true;
        fortWall.add(tower);
      });
    });
    world.add(fortWall);

    const mist = new THREE.Mesh(
      new THREE.TorusGeometry(11.5, 0.44, 10, 120),
      new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.1 }),
    );
    mist.rotation.x = Math.PI / 2;
    mist.position.set(0, 0.28, -0.3);
    mist.scale.set(1, 0.36, 1);
    world.add(mist);

    function addTree(x, z, scale = 1, dark = false) {
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 1.2, 10), woodMaterial);
      trunk.position.set(x, 0.6, z);
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      world.add(trunk);

      const foliage = new THREE.Mesh(
        new THREE.SphereGeometry(0.75 * scale, 18, 14),
        dark ? deepGreenMaterial : greenMaterial,
      );
      foliage.position.set(x, 1.55 * scale, z);
      foliage.scale.set(1, 1.15, 1);
      foliage.castShadow = true;
      world.add(foliage);
    }

    function addLantern(x, y, z, color) {
      const shell = new THREE.Mesh(
        new THREE.SphereGeometry(0.13, 14, 10),
        makeMaterial(color, { emissive: color, emissiveIntensity: 0.6, roughness: 0.24 }),
      );
      shell.position.set(x, y, z);
      world.add(shell);
      const glow = new THREE.PointLight(color, 1.3, 4.8);
      glow.position.copy(shell.position);
      scene.add(glow);
      return { shell, glow, baseY: y };
    }

    const floatingLights = [
      addLantern(-2.6, 1.8, 5.5, "#ffe0a3"),
      addLantern(2.7, 1.75, 6.4, "#ffd994"),
      addLantern(-4.8, 2.1, -1.8, "#dcc0ff"),
      addLantern(5.8, 2.2, -1.4, "#ffd482"),
      addLantern(0.2, 2.1, -0.2, "#fff0b8"),
      addLantern(-5.6, 2.35, -10.2, "#ccffe1"),
    ];

    const riverPavilion = new THREE.Group();
    riverPavilion.position.set(0.1, 0, 0.4);
    const pavilionBase = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.9, 0.3, 8), roseMaterial);
    pavilionBase.position.y = 0.17;
    riverPavilion.add(pavilionBase);
    [-1.25, 1.25].forEach((x) => {
      [-1.25, 1.25].forEach((z) => {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 2.1, 10), plasterMaterial);
        col.position.set(x, 1.22, z);
        riverPavilion.add(col);
      });
    });
    const pavilionRoof = new THREE.Mesh(new THREE.ConeGeometry(2.35, 1.4, 8), roofMaterial);
    pavilionRoof.position.y = 2.62;
    pavilionRoof.castShadow = true;
    riverPavilion.add(pavilionRoof);
    const finial = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 10), brassMaterial);
    finial.position.y = 3.42;
    riverPavilion.add(finial);
    riverPavilion.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    world.add(riverPavilion);

    function addSteps(startX, startZ, count, width, depth) {
      for (let index = 0; index < count; index += 1) {
        const step = new THREE.Mesh(new THREE.BoxGeometry(width - index * 0.28, 0.16, depth), stoneMaterial);
        step.position.set(startX, -0.02 + index * 0.08, startZ - index * 0.44);
        step.receiveShadow = true;
        world.add(step);
      }
    }
    addSteps(0.2, 9.8, 6, 8.2, 0.84);

    function addDistrictCard(destination) {
      const marker = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.3, 0.16, 24),
        makeMaterial(destination.color, {
          transparent: true,
          opacity: 0.9,
          emissive: destination.color,
          emissiveIntensity: 0.14,
        }),
      );
      marker.position.copy(destination.landmark);
      marker.position.y = 0.13;
      marker.userData.destination = destination.id;
      marker.userData.persistOverlay = true;
      marker.receiveShadow = true;
      world.add(marker);
      clickTargets.push(marker);
      districtMeshes.set(destination.id, marker);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.58, 0.035, 8, 34),
        makeMaterial(destination.color, {
          transparent: true,
          opacity: 0.64,
          emissive: destination.color,
          emissiveIntensity: 0.18,
        }),
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.copy(destination.landmark);
      ring.position.y = 0.22;
      ring.userData.destination = destination.id;
      ring.userData.persistOverlay = true;
      world.add(ring);
      districtMeshes.set(`${destination.id}-ring`, ring);

      const hitArea = new THREE.Mesh(
        new THREE.CylinderGeometry(1.12, 1.12, 1.4, 20),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
      );
      hitArea.position.copy(destination.landmark);
      hitArea.position.y = 0.72;
      hitArea.userData.destination = destination.id;
      hitArea.userData.persistOverlay = true;
      world.add(hitArea);
      clickTargets.push(hitArea);
    }

    function addLibrary() {
      const g = new THREE.Group();
      g.position.set(-5.2, 0, -1.5);
      const plinthBase = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.5, 5.6), stoneMaterial);
      plinthBase.position.y = 0.25;
      g.add(plinthBase);
      const plinthTop = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.24, 4.8), plasterMaterial);
      plinthTop.position.y = 0.58;
      g.add(plinthTop);

      const mainHall = new THREE.Mesh(new THREE.BoxGeometry(4.8, 2.9, 3.7), plasterMaterial);
      mainHall.position.set(0, 2.02, -0.2);
      g.add(mainHall);

      const frontPortico = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.35, 1.45), stoneMaterial);
      frontPortico.position.set(0, 1.7, 1.85);
      g.add(frontPortico);

      const entrancePath = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.12, 1.4), plasterMaterial);
      entrancePath.position.set(0, 0.72, 3.38);
      g.add(entrancePath);

      [-1.35, 1.35].forEach((x) => {
        const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.54, 0.62, 3.1, 12), stoneMaterial);
        tower.position.set(x, 1.7, 1.45);
        g.add(tower);

        const domeBase = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 0.26, 12), plasterMaterial);
        domeBase.position.set(x, 3.18, 1.45);
        g.add(domeBase);

        const dome = new THREE.Mesh(new THREE.SphereGeometry(0.78, 16, 14), violetMaterial);
        dome.position.set(x, 3.58, 1.45);
        dome.scale.set(1, 0.7, 1);
        g.add(dome);

        const finial = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 10), brassMaterial);
        finial.position.set(x, 4.15, 1.45);
        g.add(finial);
      });

      const centralRoofBase = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.9, 0.34, 8), plasterMaterial);
      centralRoofBase.position.set(0, 3.78, -0.2);
      g.add(centralRoofBase);

      const centralRoof = new THREE.Mesh(new THREE.ConeGeometry(1.74, 1.65, 8), violetMaterial);
      centralRoof.position.set(0, 4.66, -0.2);
      g.add(centralRoof);

      const centralFinial = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), brassMaterial);
      centralFinial.position.set(0, 5.62, -0.2);
      g.add(centralFinial);

      [-1.12, 0, 1.12].forEach((x) => {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 1.95, 10), stoneMaterial);
        pillar.position.set(x, 1.18, 2.45);
        g.add(pillar);
      });

      const archBand = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.26, 0.34), stoneMaterial);
      archBand.position.set(0, 2.14, 2.45);
      g.add(archBand);

      const archOpening = new THREE.Mesh(
        new THREE.CylinderGeometry(0.76, 0.76, 0.34, 18, 1, false, Math.PI, Math.PI),
        violetMaterial,
      );
      archOpening.rotation.z = Math.PI / 2;
      archOpening.position.set(0, 1.34, 2.46);
      g.add(archOpening);

      const doorway = new THREE.Mesh(
        new THREE.BoxGeometry(0.92, 1.5, 0.2),
        makeMaterial("#5d3d69", { emissive: "#5d3d69", emissiveIntensity: 0.22 }),
      );
      doorway.position.set(0, 1.08, 2.22);
      g.add(doorway);

      const thresholdGlow = new THREE.Mesh(
        new THREE.CircleGeometry(0.58, 22),
        new THREE.MeshBasicMaterial({ color: "#f8d9a0", transparent: true, opacity: 0.42 }),
      );
      thresholdGlow.rotation.x = -Math.PI / 2;
      thresholdGlow.position.set(0, 0.76, 2.6);
      g.add(thresholdGlow);

      [-1.45, -0.45, 0.45, 1.45].forEach((x) => {
        const windowFrame = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.9, 0.16), woodMaterial);
        windowFrame.position.set(x, 2.08, 1.72);
        g.add(windowFrame);
      });

      for (let stepIndex = 0; stepIndex < 4; stepIndex += 1) {
        const step = new THREE.Mesh(
          new THREE.BoxGeometry(2.8 - stepIndex * 0.28, 0.12, 0.52),
          stoneMaterial,
        );
        step.position.set(0, 0.68 + stepIndex * 0.08, 3.12 - stepIndex * 0.34);
        g.add(step);
      }

      [-1.15, 1.15].forEach((x) => {
        const lamp = new THREE.Mesh(
          new THREE.SphereGeometry(0.15, 10, 10),
          makeMaterial("#f6cb7b", { emissive: "#f6cb7b", emissiveIntensity: 0.68 }),
        );
        lamp.position.set(x, 2.18, 2.48);
        g.add(lamp);
      });

      const rearButtressLeft = new THREE.Mesh(new THREE.BoxGeometry(0.7, 2.2, 2.4), stoneMaterial);
      rearButtressLeft.position.set(-2.15, 1.55, -0.45);
      g.add(rearButtressLeft);

      const rearButtressRight = new THREE.Mesh(new THREE.BoxGeometry(0.7, 2.2, 2.4), stoneMaterial);
      rearButtressRight.position.set(2.15, 1.55, -0.45);
      g.add(rearButtressRight);

      g.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      world.add(g);
      addDistrictCard(destinationById.get("library"));
    }

    function addBazaar() {
      const g = new THREE.Group();
      g.position.set(5.55, 0, -1.15);
      const plinth = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 3.35, 0.5, 18), stoneMaterial);
      plinth.position.y = 0.26;
      g.add(plinth);
      const court = new THREE.Mesh(new THREE.CylinderGeometry(2.75, 2.92, 0.14, 18), pathMaterial);
      court.position.y = 0.58;
      g.add(court);

      const archShell = new THREE.Mesh(new THREE.BoxGeometry(4.8, 2.4, 2.8), plasterMaterial);
      archShell.position.set(0, 1.78, -0.1);
      g.add(archShell);

      const stripedRoof = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.9, 1.55, 6), amberMaterial);
      stripedRoof.position.set(0, 3.25, -0.1);
      stripedRoof.rotation.z = Math.PI / 2;
      stripedRoof.scale.set(1.1, 0.86, 1);
      g.add(stripedRoof);

      [-1.35, 0, 1.35].forEach((x) => {
        const arch = new THREE.Mesh(
          new THREE.CylinderGeometry(0.52, 0.52, 0.4, 18, 1, false, Math.PI, Math.PI),
          stoneMaterial,
        );
        arch.rotation.z = Math.PI / 2;
        arch.position.set(x, 1.25, 1.32);
        g.add(arch);

        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.45, 10), woodMaterial);
        post.position.set(x, 0.98, 1.15);
        g.add(post);
      });

      const counter = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.72, 1.15), woodMaterial);
      counter.position.set(0, 0.98, 0.5);
      g.add(counter);

      [-1.55, -0.5, 0.55, 1.58].forEach((x, index) => {
        const jar = new THREE.Mesh(
          new THREE.CylinderGeometry(0.2, 0.24, 0.5, 12),
          [tealMaterial, roseMaterial, amberMaterial, violetMaterial][index],
        );
        jar.position.set(x, 1.48, -0.58 + (index % 2) * 0.22);
        g.add(jar);
      });

      const caravan = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.1, 0.9), woodMaterial);
      caravan.position.set(-2.3, 0.94, 1.25);
      caravan.rotation.y = -0.2;
      g.add(caravan);

      const wheelLeft = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.06, 10, 18), brassMaterial);
      wheelLeft.position.set(-2.82, 0.42, 1.52);
      wheelLeft.rotation.y = Math.PI / 2;
      g.add(wheelLeft);
      const wheelRight = wheelLeft.clone();
      wheelRight.position.z = 0.98;
      g.add(wheelRight);

      for (let stepIndex = 0; stepIndex < 3; stepIndex += 1) {
        const step = new THREE.Mesh(new THREE.BoxGeometry(2.6 - stepIndex * 0.24, 0.11, 0.48), stoneMaterial);
        step.position.set(0, 0.64 + stepIndex * 0.07, 2.02 - stepIndex * 0.28);
        g.add(step);
      }

      g.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      world.add(g);
      addDistrictCard(destinationById.get("bazaar"));
    }

    function addClassroom() {
      const g = new THREE.Group();
      g.position.set(5.7, 0, -9.9);
      const plinth = new THREE.Mesh(new THREE.CylinderGeometry(3.05, 3.28, 0.46, 18), stoneMaterial);
      plinth.position.y = 0.23;
      g.add(plinth);
      const court = new THREE.Mesh(new THREE.CylinderGeometry(2.76, 2.92, 0.14, 18), pathMaterial);
      court.position.y = 0.54;
      g.add(court);

      const rearWall = new THREE.Mesh(new THREE.BoxGeometry(5.2, 2.6, 1.2), plasterMaterial);
      rearWall.position.set(0, 1.62, -1.08);
      g.add(rearWall);

      [-1.7, 0, 1.7].forEach((x) => {
        const arch = new THREE.Mesh(
          new THREE.CylinderGeometry(0.62, 0.62, 0.4, 18, 1, false, Math.PI, Math.PI),
          roseMaterial,
        );
        arch.rotation.z = Math.PI / 2;
        arch.position.set(x, 1.16, 1.02);
        g.add(arch);

        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 1.9, 10), stoneMaterial);
        pillar.position.set(x, 1.02, 0.86);
        g.add(pillar);
      });

      const chalkWall = new THREE.Mesh(new THREE.BoxGeometry(2.15, 1.18, 0.12), tealMaterial);
      chalkWall.position.set(0.95, 1.74, -0.42);
      g.add(chalkWall);

      const dais = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.28, 0.22, 24), amberMaterial);
      dais.position.set(-1.2, 0.72, 0.25);
      g.add(dais);

      const readingCircle = new THREE.Mesh(new THREE.TorusGeometry(1.16, 0.12, 10, 24), violetMaterial);
      readingCircle.rotation.x = Math.PI / 2;
      readingCircle.position.set(-1.18, 0.66, 0.25);
      g.add(readingCircle);

      const pergola = new THREE.Mesh(new THREE.BoxGeometry(5.55, 0.18, 2.5), roseMaterial);
      pergola.position.set(0, 2.86, 0.18);
      g.add(pergola);

      g.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      world.add(g);
      addDistrictCard(destinationById.get("classroom"));
    }

    function addHillside() {
      const g = new THREE.Group();
      g.position.set(-5.5, 0, -10.4);
      const hill = new THREE.Mesh(new THREE.CylinderGeometry(3.45, 4.3, 2.85, 28), greenMaterial);
      hill.position.y = 1.28;
      g.add(hill);
      const terrace = new THREE.Mesh(new THREE.CylinderGeometry(2.35, 2.55, 0.22, 20), pathMaterial);
      terrace.position.set(0, 2.62, 0.04);
      g.add(terrace);

      const shrineBase = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.7, 2.1), plasterMaterial);
      shrineBase.position.set(0, 3.62, 0.15);
      g.add(shrineBase);
      const shrineRoof = new THREE.Mesh(new THREE.ConeGeometry(2.05, 1.4, 6), deepGreenMaterial);
      shrineRoof.position.set(0, 4.98, 0.15);
      shrineRoof.rotation.y = Math.PI / 6;
      g.add(shrineRoof);
      const archDoor = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 0.55, 0.25, 18, 1, false, Math.PI, Math.PI),
        roseMaterial,
      );
      archDoor.rotation.z = Math.PI / 2;
      archDoor.position.set(0, 3.32, 1.12);
      g.add(archDoor);

      [-1.15, 1.15].forEach((x) => {
        const lanternTreeTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.15, 1.45, 10), woodMaterial);
        lanternTreeTrunk.position.set(x, 3.42, -0.74);
        g.add(lanternTreeTrunk);
        const lanternTreeTop = new THREE.Mesh(new THREE.SphereGeometry(0.72, 14, 12), deepGreenMaterial);
        lanternTreeTop.position.set(x, 4.4, -0.74);
        lanternTreeTop.scale.set(1, 1.2, 1);
        g.add(lanternTreeTop);
      });

      for (let stepIndex = 0; stepIndex < 4; stepIndex += 1) {
        const step = new THREE.Mesh(new THREE.BoxGeometry(2.2 - stepIndex * 0.2, 0.1, 0.44), stoneMaterial);
        step.position.set(0, 0.54 + stepIndex * 0.08, 1.95 - stepIndex * 0.4);
        g.add(step);
      }

      [-1.9, 0.8].forEach((x, index) => addTree(g.position.x + x, g.position.z - 0.8 - index * 0.7, 0.9 + index * 0.18));
      g.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      world.add(g);
      addDistrictCard(destinationById.get("hillside"));
    }

    const storyBridges = [
      { x: -2.6, z: -0.9, rotation: -0.26, length: 2.7 },
      { x: 2.95, z: -0.85, rotation: 0.28, length: 2.8 },
      { x: -2.4, z: -6.1, rotation: 0.72, length: 3.2 },
      { x: 3.2, z: -6.2, rotation: -0.78, length: 3.4 },
    ];

    storyBridges.forEach((bridge) => {
      const plank = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.16, bridge.length), woodMaterial);
      plank.position.set(bridge.x, 0.32, bridge.z);
      plank.rotation.y = bridge.rotation;
      plank.castShadow = true;
      plank.receiveShadow = true;
      world.add(plank);
    });

    addLibrary();
    addBazaar();
    addClassroom();
    addHillside();

    [-9.8, -7.4, -4.9, 4.1, 7.2, 9.2].forEach((x, index) => addTree(x, 8.8 - index * 1.5, 0.92 + (index % 2) * 0.12));
    [-8.2, -3.8, 2.2, 6.8].forEach((x, index) => addTree(x, -13 + index * 1.2, 1.08, true));
    [-2.1, 1.8, 5.4].forEach((x) => addTree(x, 11.2, 0.92));

    const stable = new THREE.Group();
    stable.position.set(1.4, 0, -6.2);
    const stableBase = new THREE.Mesh(new THREE.BoxGeometry(4.6, 2.2, 2.7), woodMaterial);
    stableBase.position.y = 1.1;
    stable.add(stableBase);
    const stableRoof = new THREE.Mesh(new THREE.ConeGeometry(2.9, 1.35, 4), roofMaterial);
    stableRoof.position.y = 2.95;
    stableRoof.rotation.y = Math.PI / 4;
    stable.add(stableRoof);
    const doorway = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.7, 0.2), plasterMaterial);
    doorway.position.set(0, 0.84, 1.36);
    stable.add(doorway);
    stable.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    world.add(stable);

    const promiseStones = new THREE.Group();
    [
      [-0.9, 7.1, tealMaterial],
      [0.1, 6.4, amberMaterial],
      [1.25, 7, roseMaterial],
      [2.05, 6.1, violetMaterial],
    ].forEach(([x, z, material]) => {
      const stone = new THREE.Mesh(new THREE.SphereGeometry(0.32, 14, 12), material);
      stone.position.set(x, 0.18, z);
      stone.scale.set(1.25, 0.58, 1);
      stone.castShadow = true;
      stone.receiveShadow = true;
      promiseStones.add(stone);
    });
    world.add(promiseStones);

    const banners = [];
    [-4.3, -1.2, 2.2, 5.8].forEach((x, index) => {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 2.7, 8), woodMaterial);
      pole.position.set(x, 1.35, -8.9);
      pole.castShadow = true;
      world.add(pole);
      const cloth = new THREE.Mesh(
        new THREE.PlaneGeometry(0.92, 1.25),
        new THREE.MeshStandardMaterial({
          color: ["#de857f", "#efc366", "#7dc7c1", "#b496da"][index],
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.96,
        }),
      );
      cloth.position.set(x + 0.44, 1.9, -8.9);
      world.add(cloth);
      banners.push({ cloth, phase: index * 0.8 });
    });

    function addInteriorFloor(group, color = "#d6b48a", radius = 6.8) {
      const floor = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * 1.04, 0.3, 42), makeMaterial(color));
      floor.position.y = -0.18;
      floor.receiveShadow = true;
      group.add(floor);

      const border = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.92, 0.045, 8, 80), brassMaterial);
      border.rotation.x = Math.PI / 2;
      border.position.y = 0.02;
      group.add(border);
      return floor;
    }

    function addInteriorArch(group, x, z, material, accentMaterial) {
      const left = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 3.2, 12), material);
      left.position.set(x - 0.8, 1.6, z);
      group.add(left);
      const right = left.clone();
      right.position.x = x + 0.8;
      group.add(right);

      const crown = new THREE.Mesh(
        new THREE.CylinderGeometry(0.92, 0.92, 0.34, 18, 1, false, Math.PI, Math.PI),
        accentMaterial,
      );
      crown.rotation.z = Math.PI / 2;
      crown.position.set(x, 2.82, z);
      group.add(crown);
    }

    function addLibraryInterior() {
      const group = new THREE.Group();
      group.visible = false;
      interiorGroups.set("library", group);
      interiorRoot.add(group);

      addInteriorFloor(group, "#6f4a38", 6.9);

      const backWall = new THREE.Mesh(new THREE.BoxGeometry(10.8, 4.2, 0.44), makeMaterial("#5b3d31"));
      backWall.position.set(0, 2.0, -3.4);
      backWall.castShadow = true;
      backWall.receiveShadow = true;
      group.add(backWall);

      [-4.2, -1.4, 1.4, 4.2].forEach((x) => addInteriorArch(group, x, -3.04, stoneMaterial, violetMaterial));

      [-3.8, -1.28, 1.28, 3.8].forEach((x, shelfIndex) => {
        const shelf = new THREE.Mesh(new THREE.BoxGeometry(1.9, 3.0, 0.42), woodMaterial);
        shelf.position.set(x, 1.55, -2.74);
        shelf.castShadow = true;
        shelf.receiveShadow = true;
        group.add(shelf);

        for (let row = 0; row < 3; row += 1) {
          for (let col = 0; col < 5; col += 1) {
            const book = new THREE.Mesh(
              new THREE.BoxGeometry(0.18, 0.66, 0.18),
              [violetMaterial, tealMaterial, amberMaterial, roseMaterial, pageMaterial][(row + col + shelfIndex) % 5],
            );
            book.position.set(x - 0.72 + col * 0.36, 0.72 + row * 0.82, -2.44);
            book.rotation.z = (col % 2 === 0 ? -0.04 : 0.05);
            book.castShadow = true;
            group.add(book);
          }
        }
      });

      const tableBase = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.5, 0.78, 20), woodMaterial);
      tableBase.position.set(0, 0.38, 0.9);
      tableBase.castShadow = true;
      tableBase.receiveShadow = true;
      group.add(tableBase);

      const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(2.05, 2.15, 0.2, 28), makeMaterial("#9a6647"));
      tableTop.position.set(0, 0.86, 0.9);
      tableTop.castShadow = true;
      tableTop.receiveShadow = true;
      group.add(tableTop);

      storyBooks.forEach((book, index) => {
        const coverMaterial = {
          violet: violetMaterial,
          teal: tealMaterial,
          amber: amberMaterial,
        }[book.tone] || violetMaterial;
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.18, 1.18), coverMaterial);
        const homePosition = new THREE.Vector3(-1.95 + index * 1.95, 1.28, -0.82);
        const tablePosition = new THREE.Vector3(-0.2 + index * 0.2, 1.08, 0.9);
        mesh.position.copy(homePosition);
        mesh.rotation.set(-0.08, 0.2 - index * 0.16, 0);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData = {
          interiorItem: { type: "book", id: book.id },
          homePosition,
          tablePosition,
          homeRotation: mesh.rotation.clone(),
        };
        group.add(mesh);
        interiorTargets.push(mesh);
        bookMeshes.set(book.id, mesh);

        const page = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.04, 1.04), pageMaterial);
        page.position.set(0, 0.12, 0);
        page.userData.followBook = book.id;
        mesh.add(page);

        const hitBox = new THREE.Mesh(
          new THREE.BoxGeometry(1.35, 0.54, 1.62),
          new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
        );
        hitBox.position.set(0, 0.18, 0);
        hitBox.userData.interiorItem = { type: "book", id: book.id };
        mesh.add(hitBox);
      });

      [-2.8, 2.8].forEach((x) => {
        const lamp = new THREE.Mesh(
          new THREE.SphereGeometry(0.2, 16, 12),
          makeMaterial("#ffd88a", { emissive: "#ffd88a", emissiveIntensity: 0.78 }),
        );
        lamp.position.set(x, 2.25, 0.3);
        group.add(lamp);
        const glow = new THREE.PointLight(0xffcf7a, 1.4, 5.5);
        glow.position.copy(lamp.position);
        group.add(glow);
      });

      group.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }

    function addBazaarInterior() {
      const group = new THREE.Group();
      group.visible = false;
      interiorGroups.set("bazaar", group);
      interiorRoot.add(group);

      addInteriorFloor(group, "#8a5a32", 6.7);

      const canopy = new THREE.Mesh(new THREE.BoxGeometry(9.2, 0.2, 2.35), amberMaterial);
      canopy.position.set(0, 3.62, -2.35);
      canopy.castShadow = true;
      group.add(canopy);

      [-3.2, -1.1, 1.1, 3.2].forEach((x, index) => {
        const awningBand = new THREE.Mesh(
          new THREE.BoxGeometry(1.3, 0.08, 2.48),
          index % 2 === 0 ? pageMaterial : amberMaterial,
        );
        awningBand.position.set(x, 3.76, -2.34);
        group.add(awningBand);
      });

      [-4.4, -1.5, 1.5, 4.4].forEach((x) => {
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, 3.6, 10), woodMaterial);
        pole.position.set(x, 1.75, -2.9);
        pole.castShadow = true;
        group.add(pole);
      });

      const counter = new THREE.Mesh(new THREE.BoxGeometry(7.8, 0.82, 1.4), woodMaterial);
      counter.position.set(0, 0.68, -1.05);
      counter.castShadow = true;
      counter.receiveShadow = true;
      group.add(counter);

      bazaarItems.forEach((item, index) => {
        const material = { teal: tealMaterial, rose: roseMaterial, violet: violetMaterial, amber: amberMaterial }[item.tone] || amberMaterial;
        const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.72, 16), material);
        mesh.position.set(-2.4 + index * 2.4, 1.34, -1.05);
        mesh.castShadow = true;
        mesh.userData.interiorItem = { type: "bazaarItem", id: item.id };
        group.add(mesh);
        interiorTargets.push(mesh);
        bazaarMeshes.set(item.id, mesh);

        const lid = new THREE.Mesh(new THREE.SphereGeometry(0.36, 14, 10), brassMaterial);
        lid.position.set(0, 0.46, 0);
        lid.scale.set(1, 0.32, 1);
        mesh.add(lid);
      });

      [-3.9, -2.9, 2.9, 3.9].forEach((x, index) => {
        const crate = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.58, 0.9), makeMaterial(index % 2 ? "#b67648" : "#c29356"));
        crate.position.set(x, 0.3, 1.55 + (index % 2) * 0.4);
        crate.castShadow = true;
        crate.receiveShadow = true;
        group.add(crate);
      });
    }

    function addRiverInterior() {
      const group = new THREE.Group();
      group.visible = false;
      interiorGroups.set("river", group);
      interiorRoot.add(group);

      addInteriorFloor(group, "#7cbfc4", 7.2);
      const water = new THREE.Mesh(
        new THREE.CircleGeometry(5.4, 48),
        makeMaterial("#42aeb9", { transparent: true, opacity: 0.86, emissive: "#2d98a8", emissiveIntensity: 0.16 }),
      );
      water.rotation.x = -Math.PI / 2;
      water.position.set(0, 0.02, -1.9);
      group.add(water);

      for (let stepIndex = 0; stepIndex < 7; stepIndex += 1) {
        const step = new THREE.Mesh(new THREE.BoxGeometry(7.8 - stepIndex * 0.35, 0.18, 0.68), stoneMaterial);
        step.position.set(0, 0.1 + stepIndex * 0.09, 2.8 - stepIndex * 0.52);
        step.castShadow = true;
        step.receiveShadow = true;
        group.add(step);
      }

      [-2.6, -0.9, 0.9, 2.6].forEach((x, index) => {
        const lamp = new THREE.Mesh(
          new THREE.SphereGeometry(0.18, 14, 10),
          makeMaterial("#ffe0a3", { emissive: "#ffe0a3", emissiveIntensity: 0.75 }),
        );
        lamp.position.set(x, 1.2 + (index % 2) * 0.18, 0.18 - index * 0.2);
        group.add(lamp);
        const glow = new THREE.PointLight(0xffd18a, 1.1, 4.2);
        glow.position.copy(lamp.position);
        group.add(glow);
      });
    }

    function addClassroomInterior() {
      const group = new THREE.Group();
      group.visible = false;
      interiorGroups.set("classroom", group);
      interiorRoot.add(group);

      addInteriorFloor(group, "#c98682", 6.8);
      [-3.2, 0, 3.2].forEach((x) => addInteriorArch(group, x, -3.2, stoneMaterial, roseMaterial));

      const rug = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.14, 10, 48), violetMaterial);
      rug.rotation.x = Math.PI / 2;
      rug.position.set(0, 0.1, 0.62);
      group.add(rug);

      const chalkWall = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.65, 0.22), tealMaterial);
      chalkWall.position.set(1.8, 1.8, -2.8);
      chalkWall.castShadow = true;
      group.add(chalkWall);

      for (let index = 0; index < 8; index += 1) {
        const angle = (index / 8) * Math.PI * 2;
        const stool = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 0.28, 12), woodMaterial);
        stool.position.set(Math.sin(angle) * 2.3, 0.15, Math.cos(angle) * 1.55 + 0.62);
        stool.castShadow = true;
        stool.receiveShadow = true;
        group.add(stool);
      }
    }

    function addHillsideInterior() {
      const group = new THREE.Group();
      group.visible = false;
      interiorGroups.set("hillside", group);
      interiorRoot.add(group);

      addInteriorFloor(group, "#6da46b", 7.1);
      const ridge = new THREE.Mesh(new THREE.CylinderGeometry(4.6, 5.2, 1.5, 32), greenMaterial);
      ridge.position.set(0, 0.54, -0.4);
      ridge.castShadow = true;
      ridge.receiveShadow = true;
      group.add(ridge);

      const shrine = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.55, 1.8), plasterMaterial);
      shrine.position.set(0, 1.55, -1.8);
      shrine.castShadow = true;
      shrine.receiveShadow = true;
      group.add(shrine);

      const shrineRoof = new THREE.Mesh(new THREE.ConeGeometry(1.78, 1.2, 6), deepGreenMaterial);
      shrineRoof.position.set(0, 2.92, -1.8);
      shrineRoof.rotation.y = Math.PI / 6;
      shrineRoof.castShadow = true;
      group.add(shrineRoof);

      [-3.1, -1.9, 2.0, 3.2].forEach((x, index) => {
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 1.6, 10), woodMaterial);
        trunk.position.set(x, 1.1, 0.3 - (index % 2) * 1.4);
        group.add(trunk);
        const top = new THREE.Mesh(new THREE.SphereGeometry(0.82, 14, 12), deepGreenMaterial);
        top.position.set(x, 2.25, 0.3 - (index % 2) * 1.4);
        top.scale.set(1, 1.16, 1);
        group.add(top);
        const lantern = new THREE.Mesh(
          new THREE.SphereGeometry(0.12, 10, 8),
          makeMaterial("#ccffe1", { emissive: "#ccffe1", emissiveIntensity: 0.75 }),
        );
        lantern.position.set(x + 0.34, 1.72, 0.3 - (index % 2) * 1.4);
        group.add(lantern);
      });
    }

    addLibraryInterior();
    addBazaarInterior();
    addRiverInterior();
    addClassroomInterior();
    addHillsideInterior();

    function updateSize() {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      compactViewportRef.current = width < 700;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, compactViewportRef.current ? 1.5 : 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    function pointerToNdc(event) {
      const rect = canvas.getBoundingClientRect();
      return new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
      );
    }

    const raycaster = new THREE.Raycaster();

    function onPointerDown(event) {
      dragStateRef.current = {
        down: true,
        x: event.clientX,
        y: event.clientY,
        startX: event.clientX,
        startY: event.clientY,
      };
      canvas.style.cursor = "grabbing";
    }

    function onPointerMove(event) {
      if (dragStateRef.current.down) {
        const deltaX = event.clientX - dragStateRef.current.x;
        const deltaY = event.clientY - dragStateRef.current.y;
        dragStateRef.current.x = event.clientX;
        dragStateRef.current.y = event.clientY;
        orbitYawRef.current -= deltaX * 0.0065;
        orbitPitchRef.current = THREE.MathUtils.clamp(orbitPitchRef.current + deltaY * 0.0042, 0.46, 1.18);
        return;
      }

      if (enteredPlaceRef.current) {
        const ndc = pointerToNdc(event);
        raycaster.setFromCamera(ndc, camera);
        const interiorHit = raycaster.intersectObjects(interiorTargets, true).find((hit) => {
          const item = hit.object.userData?.interiorItem || hit.object.parent?.userData?.interiorItem;
          return Boolean(item);
        });
        canvas.style.cursor = interiorHit ? "pointer" : "grab";
        if (hoveredRef.current !== null) {
          hoveredRef.current = null;
          onHoverDestinationChange(null, null);
        }
        return;
      }

      const ndc = pointerToNdc(event);
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.intersectObjects(clickTargets, false)[0];
      const hoveredId = hit?.object?.userData?.destination || null;
      canvas.style.cursor = hoveredId ? "pointer" : "grab";
      if (hoveredRef.current !== hoveredId) {
        hoveredRef.current = hoveredId;
        onHoverDestinationChange(hoveredId, hoveredId ? { x: event.clientX, y: event.clientY } : null);
      } else if (hoveredId) {
        onHoverDestinationChange(hoveredId, { x: event.clientX, y: event.clientY });
      }
    }

    function onPointerUp(event) {
      const wasDrag =
        Math.abs(event.clientX - dragStateRef.current.startX) > 4 ||
        Math.abs(event.clientY - dragStateRef.current.startY) > 4;
      dragStateRef.current.down = false;
      canvas.style.cursor = "grab";
      if (wasDrag) {
        return;
      }

      const ndc = pointerToNdc(event);
      raycaster.setFromCamera(ndc, camera);

      if (enteredPlaceRef.current) {
        const interiorHit = raycaster.intersectObjects(interiorTargets, true).find((hit) => {
          const item = hit.object.userData?.interiorItem || hit.object.parent?.userData?.interiorItem;
          return Boolean(item);
        });
        const interiorItem = interiorHit?.object?.userData?.interiorItem || interiorHit?.object?.parent?.userData?.interiorItem;
        if (interiorItem) {
          onInteriorItemClick(interiorItem);
        }
        return;
      }

      const hit = raycaster.intersectObjects(clickTargets, false)[0];
      if (hit?.object?.userData?.destination) {
        onDestinationClick(hit.object.userData.destination);
      }
    }

    function onCanvasClick(event) {
      if (dragStateRef.current.down) {
        return;
      }

      const ndc = pointerToNdc(event);
      raycaster.setFromCamera(ndc, camera);

      if (enteredPlaceRef.current) {
        const interiorHit = raycaster.intersectObjects(interiorTargets, true).find((hit) => {
          const item = hit.object.userData?.interiorItem || hit.object.parent?.userData?.interiorItem;
          return Boolean(item);
        });
        const interiorItem = interiorHit?.object?.userData?.interiorItem || interiorHit?.object?.parent?.userData?.interiorItem;
        if (interiorItem) {
          onInteriorItemClick(interiorItem);
        }
        return;
      }

      const hit = raycaster.intersectObjects(clickTargets, false)[0];
      if (hit?.object?.userData?.destination) {
        onDestinationClick(hit.object.userData.destination);
      }
    }

    function onPointerLeave() {
      dragStateRef.current.down = false;
      canvas.style.cursor = "grab";
      if (hoveredRef.current !== null) {
        hoveredRef.current = null;
        onHoverDestinationChange(null, null);
      }
    }

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("click", onCanvasClick);
    window.addEventListener("resize", updateSize);
    updateSize();

    let frameId = 0;
    let renderedInteriorId = null;
    function animate(time) {
      const selected = destinationById.get(selectedRef.current) || worldDestinations[0];
      const introProgress = THREE.MathUtils.clamp((time - startedAt) / 2600, 0, 1);
      const introEase = 1 - Math.pow(1 - introProgress, 3);
      const activeInteriorId = enteredPlaceRef.current;
      const phase = transitionPhaseRef.current;
      const phaseProgress = THREE.MathUtils.clamp((time - transitionStartedAtRef.current) / 1300, 0, 1);
      const phaseEase = 1 - Math.pow(1 - phaseProgress, 3);

      sky.rotation.y = time * 0.00001;
      river.material.opacity = 0.9 + Math.sin(time * 0.0012) * 0.04;
      mist.rotation.z = time * 0.00008;
      setWorldVisibility(!activeInteriorId);
      setActiveInterior(activeInteriorId);

      floatingLights.forEach((item, index) => {
        item.shell.position.y = item.baseY + Math.sin(time * 0.0012 + index) * 0.08;
        item.glow.position.copy(item.shell.position);
      });

      districtMeshes.forEach((mesh, id) => {
        const baseId = String(id).replace(/-label$/, "");
        const destination = destinationById.get(baseId);
        const isActive = baseId === selected.id || baseId === hoveredRef.current;
        mesh.scale.setScalar(isActive ? 1.18 + Math.sin(time * 0.002) * 0.04 : 1);
        if (mesh.material?.opacity != null) {
          mesh.material.opacity = isActive ? 0.96 : 0.58;
        }
        if (destination) {
          mesh.position.y = id.endsWith("-ring") ? 0.22 + (isActive ? Math.sin(time * 0.0018) * 0.05 : 0) : 0.13;
        }
      });

      bookMeshes.forEach((mesh, id) => {
        const active = activeBookRef.current === id;
        const reading = active && readingBookModeRef.current;
        const targetPosition = active ? mesh.userData.tablePosition : mesh.userData.homePosition;
        mesh.position.lerp(targetPosition, 0.12);
        mesh.rotation.x += ((reading ? -0.34 : active ? -0.18 : mesh.userData.homeRotation.x) - mesh.rotation.x) * 0.12;
        mesh.rotation.y += ((reading ? 0 : active ? 0.05 : mesh.userData.homeRotation.y) - mesh.rotation.y) * 0.12;
        mesh.rotation.z += ((reading ? 0 : active ? Math.sin(time * 0.0016) * 0.02 : mesh.userData.homeRotation.z) - mesh.rotation.z) * 0.12;
        mesh.scale.lerp(new THREE.Vector3(reading ? 2.22 : active ? 1.55 : 1, reading ? 1.2 : active ? 1.12 : 1, reading ? 2.22 : active ? 1.55 : 1), 0.12);
      });

      bazaarMeshes.forEach((mesh, id) => {
        const active = activeBazaarItemRef.current === id;
        mesh.position.y += ((active ? 1.58 : 1.34) - mesh.position.y) * 0.1;
        mesh.rotation.y += active ? 0.018 : 0.006;
        mesh.scale.lerp(new THREE.Vector3(active ? 1.2 : 1, active ? 1.2 : 1, active ? 1.2 : 1), 0.1);
      });

      if (activeInteriorId) {
        const yaw = orbitYawRef.current - 0.68;
        const pitch = THREE.MathUtils.clamp(orbitPitchRef.current - 0.22, 0.34, 0.76);
        const readingLibraryBook = activeInteriorId === "library" && readingBookModeRef.current;
        const settledDistance = activeInteriorId === "library" ? 8.7 : 9.8;
        const farDistance = activeInteriorId === "library" ? 12.8 : 13.8;
        const exitDistance = activeInteriorId === "library" ? 14.4 : 15.2;
        let insideDistance = settledDistance;
        if (phase === "inside") {
          insideDistance = THREE.MathUtils.lerp(farDistance, settledDistance, phaseEase);
        } else if (phase === "exit") {
          insideDistance = THREE.MathUtils.lerp(settledDistance, exitDistance, phaseEase);
        }
        if (readingLibraryBook) {
          goalTarget.set(0, 1.04, 0.9);
          goalPosition.set(0, 4.34 + Math.sin(time * 0.0009) * 0.025, 3.96);
        } else {
          const horizontal = Math.cos(pitch) * insideDistance;
          goalTarget.set(0, activeInteriorId === "hillside" ? 1.85 : 1.35, activeInteriorId === "river" ? 0.1 : -0.72);
          goalPosition.set(
            goalTarget.x + Math.sin(yaw) * horizontal,
            goalTarget.y + Math.sin(pitch) * insideDistance + Math.sin(time * 0.0009) * 0.04,
            goalTarget.z + Math.cos(yaw) * horizontal,
          );
        }
        if (renderedInteriorId !== activeInteriorId) {
          camera.position.copy(goalPosition);
          lookTarget.copy(goalTarget);
          renderedInteriorId = activeInteriorId;
        }
      } else {
        renderedInteriorId = null;
        const focusId = enteredPlaceRef.current || focusDestinationRef.current;
        const focusDestination = destinationById.get(focusId || "");
        if (focusDestination) {
          goalTarget.copy(focusDestination.lookAt);
          goalPosition.copy(focusDestination.streetPosition);
          goalPosition.y += Math.sin(time * 0.0012) * 0.035;
        } else {
          const yaw = orbitYawRef.current;
          const pitch = orbitPitchRef.current;
          const compactDistanceBoost = compactViewportRef.current ? 5.4 : 0;
          const compactTargetZ = compactViewportRef.current ? -2.2 : -1.4;
          const worldDistance = THREE.MathUtils.lerp(22.5 + compactDistanceBoost, 18.8 + compactDistanceBoost, introEase);
          const horizontal = Math.cos(pitch) * worldDistance;
          goalTarget.set(0.15, 1.1, compactTargetZ);
          goalPosition.set(
            goalTarget.x + Math.sin(yaw) * horizontal,
            goalTarget.y + Math.sin(pitch) * worldDistance + Math.sin(time * 0.0009) * 0.06,
            goalTarget.z + Math.cos(yaw) * horizontal,
          );
        }
      }

      banners.forEach((item) => {
        item.cloth.rotation.y = Math.sin(time * 0.0016 + item.phase) * 0.18;
      });

      camera.position.lerp(goalPosition, activeInteriorId ? 0.09 : 0.07);
      lookTarget.lerp(goalTarget, activeInteriorId ? 0.14 : 0.1);
      camera.lookAt(lookTarget);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("click", onCanvasClick);
      window.removeEventListener("resize", updateSize);
      renderer.dispose();
    };
  }, [onDestinationClick, onHoverDestinationChange, onInteriorItemClick]);

  return <canvas ref={canvasRef} className="story-world-canvas" aria-label="Maitri world map view" />;
}

function StoryUniverseHeader() {
  return (
    <header className="story-universe-header">
      <a className="story-universe-brand" href={publicPath("")} aria-label="Maitri home">
        <span>Maitri</span>
        <strong>Story World</strong>
      </a>
      <nav className="story-universe-nav" aria-label="World navigation">
        <a className="active" href={publicPath("story-universe.html")}>
          <Sparkle size={18} weight="duotone" />
          <span>World</span>
        </a>
        <a href={publicPath("characters.html")}>
          <UsersThree size={18} weight="duotone" />
          <span>Characters</span>
        </a>
      </nav>
    </header>
  );
}

function WorldStatusHud({ journeyId, selectedDestinationId, enteredPlace }) {
  const journey = storyJourneys.find((item) => item.id === journeyId) || storyJourneys[0];
  const destination = destinationById.get(enteredPlace || selectedDestinationId) || worldDestinations[0];
  return (
    <div className="world-status-hud" aria-live="polite">
      <span>Story world</span>
      <strong>{journey.label}</strong>
      <small>{enteredPlace ? `INSIDE ${destination.label.toUpperCase()}` : `TRACKING ${destination.label.toUpperCase()}`}</small>
    </div>
  );
}

function JourneyDock({ journeyId, selectedDestinationId, onSelectJourney, onSelectDestination }) {
  const journey = storyJourneys.find((item) => item.id === journeyId) || storyJourneys[0];

  return (
    <div className="journey-dock" aria-label="Journey navigator">
      <div className="journey-dock-head">
        <span>Journey</span>
        <strong>{journey.label}</strong>
      </div>
      <div className="journey-dock-switcher">
        {storyJourneys.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === journey.id ? "active" : ""}
            onClick={() => onSelectJourney(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="journey-dock-stops">
        {journey.destinationIds.map((id, index) => {
          const destination = destinationById.get(id);
          if (!destination) {
            return null;
          }
          const Icon = destination.icon;
          return (
            <button
              key={id}
              type="button"
              aria-label={`Select ${destination.label} journey stop`}
              className={selectedDestinationId === id ? "active" : ""}
              onClick={() => onSelectDestination(id)}
            >
              <span>{index + 1}</span>
              <Icon size={16} weight="duotone" />
              <strong>{destination.label}</strong>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WorldMiniMap({ selectedDestinationId, onSelectDestination }) {
  return (
    <aside className="world-mini-map" aria-label="World districts">
      <div className="world-mini-map-head">
        <span>Districts</span>
      </div>
      <div className="world-mini-map-grid">
        {worldDestinations.map((destination) => {
          const Icon = destination.icon;
          return (
            <button
              key={destination.id}
              type="button"
              aria-label={`Select ${destination.label} district`}
              className={`${destination.tone} ${selectedDestinationId === destination.id ? "active" : ""}`}
              onClick={() => onSelectDestination(destination.id)}
            >
              <Icon size={18} weight={selectedDestinationId === destination.id ? "fill" : "duotone"} />
              <span>{destination.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function WorldHoverCard({ destinationId }) {
  if (!destinationId) {
    return null;
  }

  const destination = destinationById.get(destinationId);
  if (!destination) {
    return null;
  }

  return (
    <aside className={`world-hover-card ${destination.tone}`} aria-live="polite">
      <span>{destination.label}</span>
      <strong>{destination.prompt}</strong>
      <small>{destination.infoLine}</small>
      <p>{destination.description}</p>
    </aside>
  );
}

function MinimalHoverLabel({ destinationId, position }) {
  const destination = destinationById.get(destinationId || "");
  if (!destination || !position) {
    return null;
  }

  return (
    <div
      className={`world-hover-label ${destination.tone}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {destination.label}
    </div>
  );
}

function WorldHint() {
  return (
    <div className="world-hint" aria-live="polite">
      <span>Drag to orbit</span>
      <span>Click a place to enter</span>
    </div>
  );
}

function StreetNavigator({ selectedDestinationId, focusDestinationId, onSelectDestination, onEnterPlace }) {
  const index = routeStops.indexOf(selectedDestinationId);
  const previous = routeStops[(index - 1 + routeStops.length) % routeStops.length];
  const next = routeStops[(index + 1) % routeStops.length];
  const selected = destinationById.get(selectedDestinationId) || worldDestinations[0];
  const focused = destinationById.get(focusDestinationId || "");

  return (
    <div className="street-navigator">
      <button type="button" onClick={() => onSelectDestination(previous)} aria-label="Move to previous district">
        <Minus size={18} weight="bold" />
      </button>
      <div className="street-navigator-center">
        <span>World View</span>
        <strong>{selected.label}</strong>
        <small>
          {focused
            ? `Flying into ${focused.label} with a soft transition.`
            : "Swipe the world to orbit, use the district controls, then enter a place."}
        </small>
      </div>
      <button type="button" onClick={() => onSelectDestination(next)} aria-label="Move to next district">
        <Plus size={18} weight="bold" />
      </button>
      <button
        className="street-enter"
        type="button"
        onClick={() => onEnterPlace(selectedDestinationId)}
      >
        <span>{focusDestinationId ? "Entering..." : "Enter Place"}</span>
        <ArrowRight size={16} weight="bold" />
      </button>
    </div>
  );
}

function SceneLocationBadge({ destination, onBackToStreet }) {
  const Icon = destination.icon;
  return (
    <div className={`scene-location-badge ${destination.tone}`} aria-live="polite">
      <Icon size={20} weight="duotone" />
      <span>{destination.label}</span>
      <button type="button" onClick={onBackToStreet}>
        <ArrowRight className="back-icon" size={15} weight="bold" />
        <small>Street</small>
      </button>
    </div>
  );
}

function LibrarySceneExperience({ activeBookId, page, onPageChange, onSelectBook, onClose }) {
  const activeBook = storyBookById.get(activeBookId || storyBooks[0].id) || storyBooks[0];
  const pageCount = activeBook.pages.length;
  const currentPage = Math.min(page, pageCount);
  const activePage = activeBook.pages[currentPage - 1] || activeBook.pages[0];

  return (
    <section className={`table-book-reader ${activeBook.tone}`} aria-label={`${activeBook.title} reader`}>
      <button className="scene-card-close" type="button" onClick={onClose}>
        <X size={17} weight="bold" />
      </button>
      <div className="table-book-shell">
        <div className="table-book-meta">
          <span>Reading Table</span>
          <strong>{activeBook.title}</strong>
        </div>
        <article className="book-spread">
          <div className="book-page book-page-left">
            <span>{activeBook.character}</span>
            <h3>{activeBook.title}</h3>
            <p>{activeBook.premise}</p>
            <small>Page {activePage.page} of {pageCount}</small>
          </div>
          <div className="book-page book-page-right">
            <span>Page {activePage.page}</span>
            <h3>{activePage.heading}</h3>
            <p>{activePage.text}</p>
          </div>
        </article>
        <div className="table-book-controls">
          <button type="button" onClick={() => onPageChange(Math.max(1, currentPage - 1))}>Previous</button>
          <input type="range" min="1" max={pageCount} value={currentPage} onChange={(event) => onPageChange(Number(event.target.value))} />
          <button type="button" onClick={() => onPageChange(Math.min(pageCount, currentPage + 1))}>Next</button>
        </div>
        <div className="table-book-switcher" aria-label="Library books">
          {storyBooks.map((book) => (
            <button
              key={book.id}
              className={book.id === activeBook.id ? "active" : ""}
              type="button"
              onClick={() => onSelectBook(book.id)}
            >
              {book.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function BazaarSceneExperience({ activeItemId, onSelectItem, onClose }) {
  const activeItem = bazaarItemById.get(activeItemId || bazaarItems[0].id) || bazaarItems[0];
  const ActiveIcon = activeItem.icon;
  return (
    <section className={`scene-item-card location-environment bazaar-chamber ${activeItem.tone}`} aria-label={`${activeItem.name} details`}>
      <button className="scene-card-close" type="button" onClick={onClose}>
        <X size={17} weight="bold" />
      </button>
      <div className="scene-environment-art" aria-hidden="true">
        <div className="bazaar-canopy" />
        <div className="bazaar-counter" />
        <div className="bazaar-crates">
          <div />
          <div />
          <div />
        </div>
      </div>
      <span className="item-icon">
        <ActiveIcon size={30} weight="duotone" />
      </span>
      <div>
        <span>Bazaar Object</span>
        <h2>{activeItem.name}</h2>
        <p>{activeItem.detail}</p>
        <strong>{activeItem.status}</strong>
      </div>
      <div className="bazaar-grid compact">
        {bazaarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              className={`bazaar-pick ${item.id === activeItem.id ? "active" : ""}`}
              onClick={() => onSelectItem(item.id)}
            >
              <Icon size={18} weight="duotone" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>
      <button className="scene-buy-button concept-only" type="button" disabled>
        <Tag size={16} weight="fill" />
        Preview concept
      </button>
    </section>
  );
}

function RiverSceneExperience({ destination, onClose }) {
  return (
    <section className={`scene-item-card location-environment river-chamber ${destination.tone}`} aria-label={`${destination.label} details`}>
      <button className="scene-card-close" type="button" onClick={onClose}>
        <X size={17} weight="bold" />
      </button>
      <div className="scene-environment-art" aria-hidden="true">
        <div className="river-lamps">
          <div />
          <div />
          <div />
        </div>
        <div className="river-steps" />
      </div>
      <div className="simple-location-copy">
        <span>{destination.label}</span>
        <h2>{destination.prompt}</h2>
        <p>{destination.description}</p>
        <p>The entry experience should feel like descending onto stone steps, seeing floating lamps, and starting the emotional tone of the world.</p>
      </div>
    </section>
  );
}

function CourtyardSceneExperience({ destination, onClose }) {
  return (
    <section className={`scene-item-card location-environment courtyard-chamber ${destination.tone}`} aria-label={`${destination.label} details`}>
      <button className="scene-card-close" type="button" onClick={onClose}>
        <X size={17} weight="bold" />
      </button>
      <div className="scene-environment-art" aria-hidden="true">
        <div className="courtyard-arches">
          <div />
          <div />
          <div />
        </div>
        <div className="courtyard-rug" />
      </div>
      <div className="simple-location-copy">
        <span>{destination.label}</span>
        <h2>{destination.prompt}</h2>
        <p>{destination.description}</p>
        <p>This space should read like a teaching courtyard, not a panel: open arches, a circle rug, and a mentor-led ritual zone.</p>
      </div>
    </section>
  );
}

function HillsideSceneExperience({ destination, onClose }) {
  return (
    <section className={`scene-item-card location-environment hillside-chamber ${destination.tone}`} aria-label={`${destination.label} details`}>
      <button className="scene-card-close" type="button" onClick={onClose}>
        <X size={17} weight="bold" />
      </button>
      <div className="scene-environment-art" aria-hidden="true">
        <div className="hillside-shrine" />
        <div className="hillside-lantern-tree">
          <div />
          <div />
          <div />
        </div>
      </div>
      <div className="simple-location-copy">
        <span>{destination.label}</span>
        <h2>{destination.prompt}</h2>
        <p>{destination.description}</p>
        <p>Users should feel they have climbed into a quiet ritual clearing with trees, soft lantern light, and a reflective pause.</p>
      </div>
    </section>
  );
}

function LocationPocketPanel({ destination, children, onBackToWorld }) {
  const Icon = destination.icon;
  return (
    <aside className={`location-pocket-panel ${destination.tone}`} aria-live="polite">
      <div className="location-pocket-title">
        <Icon size={18} weight="duotone" />
        <span>{destination.label}</span>
      </div>
      {children}
      <button type="button" onClick={onBackToWorld}>
        Back to world
      </button>
    </aside>
  );
}

function LibraryReaderPanel({ activeBookId, page, onPageChange, onSelectBook, onBackToWorld }) {
  const activeBook = storyBookById.get(activeBookId || storyBooks[0].id) || storyBooks[0];
  const pageCount = activeBook.pages.length;
  const currentPage = Math.min(page, pageCount);
  const activePage = activeBook.pages[currentPage - 1] || activeBook.pages[0];

  return (
    <LocationPocketPanel destination={destinationById.get("library")} onBackToWorld={onBackToWorld}>
      <div className="library-reader-panel">
        <span>{activeBook.title}</span>
        <h2>{activePage.heading}</h2>
        <p>{activePage.text}</p>
        <div className="library-book-tabs" aria-label="Library books">
          {storyBooks.map((book) => (
            <button
              key={book.id}
              type="button"
              className={book.id === activeBook.id ? "active" : ""}
              onClick={() => onSelectBook(book.id)}
            >
              {book.title}
            </button>
          ))}
        </div>
        <div className="library-page-control">
          <button type="button" onClick={() => onPageChange(Math.max(1, currentPage - 1))}>Prev</button>
          <span>{currentPage}/{pageCount}</span>
          <button type="button" onClick={() => onPageChange(Math.min(pageCount, currentPage + 1))}>Next</button>
        </div>
      </div>
    </LocationPocketPanel>
  );
}

function BazaarObjectPanel({ activeItemId, onSelectItem, onBackToWorld }) {
  const activeItem = bazaarItemById.get(activeItemId || bazaarItems[0].id) || bazaarItems[0];
  return (
    <LocationPocketPanel destination={destinationById.get("bazaar")} onBackToWorld={onBackToWorld}>
      <div className="bazaar-object-panel">
        <span>{activeItem.status}</span>
        <h2>{activeItem.name}</h2>
        <p>{activeItem.detail}</p>
        <div className="library-book-tabs" aria-label="Bazaar objects">
          {bazaarItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === activeItem.id ? "active" : ""}
              onClick={() => onSelectItem(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <button className="inventory-add-button concept-only" type="button" disabled>
          Preview concept only
        </button>
      </div>
    </LocationPocketPanel>
  );
}

function PlaceMoodPanel({ destination, onBackToWorld }) {
  return (
    <LocationPocketPanel destination={destination} onBackToWorld={onBackToWorld}>
      <div className="place-mood-panel">
        <h2>{destination.prompt}</h2>
        <p>{destination.description}</p>
      </div>
    </LocationPocketPanel>
  );
}

export function StoryUniversePage() {
  const [selectedDestination, setSelectedDestination] = useState("river");
  const [enteredPlace, setEnteredPlace] = useState(null);
  const [focusDestination, setFocusDestination] = useState(null);
  const [hoveredDestination, setHoveredDestination] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(null);
  const [transitionPhase, setTransitionPhase] = useState("idle");
  const [activeJourney, setActiveJourney] = useState("manu");
  const [activeBookId, setActiveBookId] = useState(storyBooks[0].id);
  const [activeBookPage, setActiveBookPage] = useState(1);
  const [readingBookMode, setReadingBookMode] = useState(false);
  const [activeBazaarItemId, setActiveBazaarItemId] = useState(bazaarItems[0].id);

  const selected = destinationById.get(selectedDestination) || worldDestinations[0];
  const activePlace = destinationById.get(enteredPlace || selectedDestination) || worldDestinations[0];

  const leavePlace = useCallback(() => {
    const exitingPlace = enteredPlace;
    if (!exitingPlace) {
      return;
    }

    setFocusDestination(exitingPlace);
    setTransitionPhase("exit");
    setReadingBookMode(false);

    window.setTimeout(() => {
      setEnteredPlace(null);
    }, 680);

    window.setTimeout(() => {
      setTransitionPhase("settle");
    }, 1120);

    window.setTimeout(() => {
      setFocusDestination(null);
      setTransitionPhase("idle");
    }, 1980);
  }, [enteredPlace]);

  const previewDestination = useCallback((id) => {
    setSelectedDestination(id);
    setFocusDestination(id);
    setHoveredDestination(null);
    setHoverPosition(null);
    setTransitionPhase("glide");
  }, []);

  const selectDestination = useCallback((id) => {
    setSelectedDestination(id);
    setFocusDestination(null);
    setHoveredDestination(null);
    setHoverPosition(null);
    setTransitionPhase("idle");
  }, []);

  useEffect(() => {
    if (enteredPlace || !focusDestination || transitionPhase !== "glide") {
      return undefined;
    }

    const enterTimer = window.setTimeout(() => {
      setEnteredPlace(focusDestination);
      setTransitionPhase("inside");
    }, 1180);

    return () => {
      window.clearTimeout(enterTimer);
    };
  }, [enteredPlace, focusDestination, transitionPhase]);

  useEffect(() => {
    if (!enteredPlace || transitionPhase !== "inside") {
      return undefined;
    }

    const settleTimer = window.setTimeout(() => {
      setTransitionPhase("idle");
    }, 720);

    return () => {
      window.clearTimeout(settleTimer);
    };
  }, [enteredPlace, transitionPhase]);

  const handleHoverDestinationChange = useCallback((id, position) => {
    setHoveredDestination(id);
    setHoverPosition(position);
  }, []);

  const handleInteriorItemClick = useCallback((item) => {
    if (item.type === "book") {
      setActiveBookId(item.id);
      setActiveBookPage(1);
      setReadingBookMode(true);
    }
    if (item.type === "bazaarItem") {
      setActiveBazaarItemId(item.id);
    }
  }, []);

  const pageClass = useMemo(
    () =>
      `story-universe-page world-live ${enteredPlace ? "place-entered" : "street-view"} transition-${transitionPhase}`,
    [enteredPlace, transitionPhase],
  );

  return (
    <main className={pageClass}>
      <StoryUniverseHeader />
      <section className="story-universe-stage" aria-label="Maitri drone world">
        <StoryWorldCanvas
          selectedDestinationId={selectedDestination}
          enteredPlace={enteredPlace}
          focusDestinationId={focusDestination}
          transitionPhase={transitionPhase}
          activeBookId={activeBookId}
          readingBookMode={readingBookMode}
          activeBazaarItemId={activeBazaarItemId}
          onDestinationClick={previewDestination}
          onInteriorItemClick={handleInteriorItemClick}
          onHoverDestinationChange={handleHoverDestinationChange}
        />
        <div className="story-world-vignette" aria-hidden="true" />
        <div className={`story-world-transition transition-${transitionPhase}`} aria-hidden="true" />

        {!enteredPlace && <WorldHint />}
        {!enteredPlace && (
          <>
            <WorldStatusHud
              journeyId={activeJourney}
              selectedDestinationId={selectedDestination}
              enteredPlace={enteredPlace}
            />
            <WorldMiniMap
              selectedDestinationId={selectedDestination}
              onSelectDestination={selectDestination}
            />
            <JourneyDock
              journeyId={activeJourney}
              selectedDestinationId={selectedDestination}
              onSelectJourney={setActiveJourney}
              onSelectDestination={selectDestination}
            />
            <StreetNavigator
              selectedDestinationId={selectedDestination}
              focusDestinationId={focusDestination}
              onSelectDestination={selectDestination}
              onEnterPlace={previewDestination}
            />
          </>
        )}
        {!enteredPlace && <MinimalHoverLabel destinationId={hoveredDestination} position={hoverPosition} />}

        {enteredPlace === "library" && readingBookMode && (
          <LibrarySceneExperience
            activeBookId={activeBookId}
            page={activeBookPage}
            onPageChange={setActiveBookPage}
            onSelectBook={(id) => {
              setActiveBookId(id);
              setActiveBookPage(1);
            }}
            onClose={() => setReadingBookMode(false)}
          />
        )}

        {enteredPlace === "library" && !readingBookMode && (
          <LibraryReaderPanel
            activeBookId={activeBookId}
            page={activeBookPage}
            onPageChange={setActiveBookPage}
            onSelectBook={(id) => {
              setActiveBookId(id);
              setActiveBookPage(1);
            }}
            onBackToWorld={leavePlace}
          />
        )}

        {enteredPlace === "bazaar" && (
          <BazaarObjectPanel
            activeItemId={activeBazaarItemId}
            onSelectItem={setActiveBazaarItemId}
            onBackToWorld={leavePlace}
          />
        )}

        {enteredPlace === "river" && <PlaceMoodPanel destination={activePlace} onBackToWorld={leavePlace} />}
        {enteredPlace === "classroom" && <PlaceMoodPanel destination={activePlace} onBackToWorld={leavePlace} />}
        {enteredPlace === "hillside" && <PlaceMoodPanel destination={activePlace} onBackToWorld={leavePlace} />}

      </section>
    </main>
  );
}
