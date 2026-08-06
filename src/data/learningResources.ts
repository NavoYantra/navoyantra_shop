import { LearningResource } from '../types';

export const LEARNING_RESOURCES: LearningResource[] = [
  {
    id: 'res-1',
    title: 'NavoBot V4 Quick Start: Building your first Autonomous Line Follower',
    type: 'Video Tutorial',
    category: 'Robotics',
    difficulty: 'Beginner',
    duration: '14 mins',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    description: 'Step-by-step video guide covering chassis assembly, IR sensor calibration, and upload of Scratch Block code.'
  },
  {
    id: 'res-2',
    title: 'AI Face & Mask Tracking Model Deployment on ESP32-CAM',
    type: 'Project PDF',
    category: 'AI & Machine Learning',
    difficulty: 'Intermediate',
    downloads: 3420,
    thumbnail: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=600&q=80',
    description: 'Complete 24-page PDF manual with circuit diagrams, neural net training steps, and MicroPython source code.'
  },
  {
    id: 'res-3',
    title: 'Blynk Cloud IoT Home Automation Dashboard Masterclass',
    type: 'Code Repository',
    category: 'IoT & Smart Home',
    difficulty: 'Intermediate',
    downloads: 5120,
    thumbnail: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=600&q=80',
    description: 'GitHub repository containing ESP32 C++ sketches, mobile app layout templates, and webhooks.'
  },
  {
    id: 'res-4',
    title: 'CBSE Aligned K-12 STEM & Robotics School Curriculum Map 2026',
    type: 'Curriculum Guide',
    category: 'Institutions',
    difficulty: 'Beginner',
    downloads: 1890,
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    description: 'Comprehensive grade-by-grade STEM learning objectives, experiment rubrics, and project assessment sheets.'
  }
];
