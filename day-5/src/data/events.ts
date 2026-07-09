export type EventItem = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  date: string;
  time: string;
  venue: string;
  prize: string;
  icon: string;
};

export const events: EventItem[] = [
  {
    slug: 'coding-challenge',
    title: 'Coding Challenge',
    tagline: 'Crack the algorithm. Beat the clock.',
    description:
      'A high-intensity competitive programming contest where participants solve algorithmic puzzles under a strict time limit. Three rounds of escalating difficulty across data structures, dynamic programming, and system design.',
    image:
      'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: 'Jul 11, 2026',
    time: '10:00 AM',
    venue: 'CS Block, Lab 3',
    prize: 'Rs. 15,000',
    icon: 'Code2',
  },
  {
    slug: 'robotics',
    title: 'Robotics Arena',
    tagline: 'Build. Battle. Dominate the arena.',
    description:
      'Design and deploy a combat or task-based robot in a live arena. Teams compete in obstacle navigation, object manipulation, and head-to-head combat rounds. Bring your bots, bring your A-game.',
    image:
      'https://images.pexels.com/photos/259924/pexels-photo-259924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: 'Jul 11, 2026',
    time: '11:00 AM',
    venue: 'Innovation Hall',
    prize: 'Rs. 25,000',
    icon: 'Bot',
  },
  {
    slug: 'gaming',
    title: 'Gaming Championship',
    tagline: 'GG. No re.',
    description:
      'A multi-title esports tournament featuring Valorant, BGMI, and FIFA. Solo and squad brackets, double-elimination, live casting on the main stage. Prove your reflexes and claim the trophy.',
    image:
      'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: 'Jul 12, 2026',
    time: '09:00 AM',
    venue: 'Auditorium',
    prize: 'Rs. 20,000',
    icon: 'Gamepad2',
  },
  {
    slug: 'treasure-hunt',
    title: 'Treasure Hunt',
    tagline: 'Decode. Discover. Conquer the campus.',
    description:
      'A campus-wide adventure race combining riddles, physical challenges, and lateral thinking. Teams of four race through checkpoints, each unlocking the next clue. First to the treasure wins.',
    image:
      'https://images.pexels.com/photos/7432/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: 'Jul 13, 2026',
    time: '02:00 PM',
    venue: 'Main Quad',
    prize: 'Rs. 10,000',
    icon: 'Compass',
  },
];

export const REGISTRATION_DEADLINE = new Date('2026-07-08T23:59:59+05:30');
export const FESTIVAL_DATES_LABEL = 'July 11 - 13, 2026';

export const getEventBySlug = (slug: string): EventItem | undefined =>
  events.find((e) => e.slug === slug);
