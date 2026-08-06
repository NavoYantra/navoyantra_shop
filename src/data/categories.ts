import { CategoryType } from '../types';

export interface CategoryInfo {
  id: CategoryType;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  itemCount: number;
  featuredImg: string;
  color: string;
  badge?: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'Robotics',
    title: 'Robotics & Rovers',
    subtitle: 'Build Autonomous Bots',
    description: 'Line followers, obstacle avoidance, ROS rovers, and 4-DOF robotic arms with smartphone controls.',
    iconName: 'Bot',
    itemCount: 14,
    featuredImg: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    color: 'from-blue-600 to-indigo-700',
    badge: 'Popular'
  },
  {
    id: 'AI & Machine Learning',
    title: 'AI & Vision Kits',
    subtitle: 'Machine Learning for Kids & Students',
    description: 'Camera vision modules, neural network accelerators, gesture recognition, and voice processing.',
    iconName: 'BrainCircuit',
    itemCount: 9,
    featuredImg: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=600&q=80',
    color: 'from-violet-600 to-purple-800',
    badge: 'Hot'
  },
  {
    id: 'IoT & Smart Home',
    title: 'IoT & Smart Cities',
    subtitle: 'Cloud Connected Sensors',
    description: 'Environment logging, smart irrigation, home relays, and cloud dashboard integrations.',
    iconName: 'Wifi',
    itemCount: 12,
    featuredImg: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=600&q=80',
    color: 'from-emerald-500 to-teal-700'
  },
  {
    id: 'Embedded Systems',
    title: 'Embedded Systems',
    subtitle: 'Arduino & ESP32 Labs',
    description: 'Microcontroller development boards, sensor arrays, OLED displays, and circuit prototyping.',
    iconName: 'Cpu',
    itemCount: 18,
    featuredImg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'STEM Starter',
    title: 'STEM Starter Kits',
    subtitle: 'Safe Hands-On Kits for Ages 8+',
    description: 'Magnetic snap blocks, Micro:bit badges, and foundational electronics with storybook guides.',
    iconName: 'Zap',
    itemCount: 10,
    featuredImg: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=600&q=80',
    color: 'from-sky-500 to-blue-600',
    badge: 'Kids Favorite'
  },
  {
    id: 'Drones & Automation',
    title: 'Drones & Flight',
    subtitle: 'Quadcopter & Flight Dynamics',
    description: 'Solderless programmable quadcopters with altitude-hold optics and 360-degree stunt maneuvers.',
    iconName: 'Plane',
    itemCount: 6,
    featuredImg: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80',
    color: 'from-orange-500 to-red-600'
  }
];
