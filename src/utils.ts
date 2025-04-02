export type TStepOriginal = {
  title: string;
  endpoint: string;
  substeps: number;
};

export type TStep = {
  title: string;
  endpoint: string;
  substeps: {
    key: string;
    value: string;
    color?: string;
  }[];
};

export const animationDuration = 0.33;
export const animationDurationMS = animationDuration * 1000;
export const cardAnimationDuration = animationDuration * 3;
export const cardAnimationDurationMS = cardAnimationDuration * 1000;

export const stepsArray: TStepOriginal[] = [
  {
    title: '',
    endpoint: '/signup',
    substeps: 4,
  },
  {
    title: '',
    endpoint: '/activate-user',
    substeps: 8,
  },
  {
    title: '',
    endpoint: '/send-verification',
    substeps: 2,
  },
  {
    title: '',
    endpoint: '/',
    substeps: 3,
  },
];

// AI generated helpers

const nouns = [
  'hamster wheel',
  'quantum flux capacitor',
  'coffee maker',
  'rubber duck debugger',
  'stack overflow copier',
  'keyboard warrior',
  'code monkey',
  'bug factory',
  'spaghetti code generator',
  'infinite loop machine',
];

const verbs = [
  'bootstrapping',
  'parameterizing',
  'buffering',
  'executing',
  'authenticating',
  'normalizing',
  'replicating',
  'propagating',
  'provisioning',
];

export const generateRandomPhrase = () => {
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
  return `${randomVerb} ${randomNoun}`;
};

export const generateRandomValue = () => {
  const allWords = [...nouns, ...verbs];
  const includeNumber = Math.random() > 0.5;

  if (includeNumber) {
    return Math.floor(Math.random() * 100).toString();
  }

  return `"${allWords[Math.floor(Math.random() * allWords.length)]}"`;
};

export const generateRandomColor = () => {
  const rand = Math.random();

  // 33% chance for random color
  if (rand < 0.5) {
    const colors = [
      'red',
      'blue',
      'green',
      'yellow',
      'purple',
      'orange',
      'pink',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  return 'gray';
};
