import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'ny-bot-v4',
    name: 'NavoBot Pro V4 - AI Autonomous Rover Kit',
    tagline: 'Build & Program your first Autonomous AI Vision Rover with ESP32-CAM & ROS',
    description: 'The ultimate robotics innovation kit for young engineers. Features AI object recognition, line tracking, obstacle avoidance, and smartphone app control with block & Python coding.',
    price: 4999,
    originalPrice: 6999,
    discountPercent: 28,
    rating: 4.9,
    reviewCount: 328,
    category: 'Robotics',
    ageGroup: '11-13',
    ageText: 'Ages 11-14 Years',
    techStack: ['ESP32', 'AI & Computer Vision', 'ROS & Motors'],
    skillLevel: 'Intermediate',
    images: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Bestseller', 'School Approved', 'CBSE Aligned'],
    inStock: true,
    stockCount: 45,
    specs: {
      microcontroller: 'ESP32 Dual-Core 240MHz Wi-Fi + Bluetooth',
      sensors: ['ESP32-CAM Module', 'Ultrasonic Distance Sensor', 'Dual Infrared Line Sensors', 'MPU6050 Gyroscope'],
      codingLanguages: ['Scratch Block Coding', 'C++ (Arduino IDE)', 'Python'],
      powerSource: 'Rechargeable 18650 Li-ion Battery with USB-C Charging',
      includedProjectsCount: 15,
      boxWeight: '850 grams',
      warranty: '1 Year Full Replacement Warranty'
    },
    whatsInside: [
      'NavoBot Laser-Cut Acrylic Chassis',
      'ESP32 Wi-Fi + BT Microcontroller Board',
      'ESP32-CAM AI Vision Camera Module',
      '4x High-Torque Gear Motors & All-Terrain Wheels',
      'L298N Motor Driver Module',
      'Ultrasonic & Infrared Sensor Suite',
      '18650 Rechargeable Battery Pack with USB-C Charger',
      'Color-Coded Jumper Cables (No Soldering Needed)',
      '120-Page Full-Color Project & Code Workbook'
    ],
    sampleProjects: [
      'Self-Driving Line Follower Bot',
      'AI Color & Face Tracking Rover',
      'Obstacle Avoidance & Maze Navigator',
      'Wi-Fi Smartphone FPV Video Streaming Tank'
    ],
    isFeatured: true
  },
  {
    id: 'ny-ai-vision',
    name: 'NavoAI Vision & Machine Learning Starter Lab',
    tagline: 'Explore Artificial Intelligence, Object Recognition & Voice Control without complex math',
    description: 'Designed specifically for school students to learn Machine Learning fundamentals. Includes camera sensor, OLED display, and pre-trained AI models for face recognition, gesture control, and voice commands.',
    price: 3499,
    originalPrice: 4499,
    discountPercent: 22,
    rating: 4.8,
    reviewCount: 215,
    category: 'AI & Machine Learning',
    ageGroup: '11-13',
    ageText: 'Ages 10-15 Years',
    techStack: ['ESP32', 'AI & Computer Vision'],
    skillLevel: 'Beginner',
    images: [
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Top Rated', 'AI Innovation Award'],
    inStock: true,
    stockCount: 28,
    specs: {
      microcontroller: 'ESP32 AI Microcontroller with Neural Accelerator',
      sensors: ['OV2640 HD Camera Module', 'I2C 0.96 inch OLED Display', 'MEMS Digital Microphone'],
      codingLanguages: ['Block-based AI Studio', 'MicroPython', 'C++'],
      powerSource: 'USB Power / 5V Power Bank',
      includedProjectsCount: 12,
      boxWeight: '620 grams',
      warranty: '1 Year Warranty'
    },
    whatsInside: [
      'NavoAI Master Processing Unit',
      'HD Vision Camera & Servo Pan-Tilt Base',
      '0.96 inch OLED Live Status Display',
      'Custom AI Training Cards (Animals, Traffic Signs, Gestures)',
      'Quick Start Scratch AI Block Plugin Access',
      'USB-C Data & Power Cables'
    ],
    sampleProjects: [
      'Gesture Controlled Smart Home Appliance',
      'Face Mask Detector & Attendance Log',
      'AI Waste Sorting Classifier',
      'Voice Activated Smart Speaker Helper'
    ],
    isFeatured: true
  },
  {
    id: 'ny-iot-smart-home',
    name: 'NavoIoT Smart Automation & Green Earth Kit',
    tagline: 'Connect sensors to Cloud Dashboard, build Smart Home & Agriculture Automation',
    description: 'Learn Internet of Things (IoT) hands-on! Connect environmental sensors to real-time cloud dashboards (Blynk/ThingSpeak), control home relays, and build smart plant irrigation systems.',
    price: 2999,
    originalPrice: 3999,
    discountPercent: 25,
    rating: 4.7,
    reviewCount: 184,
    category: 'IoT & Smart Home',
    ageGroup: '14-16',
    ageText: 'Ages 12-18 Years',
    techStack: ['ESP32', 'IoT Sensors', 'Arduino'],
    skillLevel: 'Beginner',
    images: [
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Eco Innovation', 'ATL Recommended'],
    inStock: true,
    stockCount: 60,
    specs: {
      microcontroller: 'NodeMCU ESP8266 / ESP32 IoT Board',
      sensors: ['DHT11 Temp & Humidity', 'Soil Moisture Sensor', 'Rain Drop Sensor', 'Gas/Smoke Sensor', 'LDR Light Sensor'],
      codingLanguages: ['C++ Arduino', 'Blynk Cloud IoT App'],
      powerSource: '5V USB Power / Solar Panel Ready',
      includedProjectsCount: 18,
      boxWeight: '710 grams',
      warranty: '1 Year Warranty'
    },
    whatsInside: [
      'ESP32 Wi-Fi Node Module',
      '5-in-1 Climate & Environmental Sensor Pack',
      '5V Relay Module for AC/DC Appliance Control',
      '5V Submersible Water Pump & Tubing',
      '16x2 I2C LCD Display Module',
      'Free Lifetime Access to NavoCloud Dashboard'
    ],
    sampleProjects: [
      'Smart Automated Plant Irrigation System',
      'Cloud Weather Station with Phone Alerts',
      'Smart Home Security & Gas Leak Alert',
      'Touchless RFID Door Lock'
    ],
    isFeatured: true
  },
  {
    id: 'ny-stem-junior',
    name: 'NavoJunior Explorer Kit (Kids 8-10 Years)',
    tagline: 'No-coding electronic blocks & modular snap-together magnetic circuits for young kids',
    description: 'Safe, magnetic, color-coded electronic building blocks that introduce electricity, motors, buzzers, and lights through fun stories and games. Zero soldering, 100% safe for kids.',
    price: 1999,
    originalPrice: 2799,
    discountPercent: 28,
    rating: 4.9,
    reviewCount: 412,
    category: 'STEM Starter',
    ageGroup: '8-10',
    ageText: 'Ages 8-10 Years',
    techStack: ['Micro:bit'],
    skillLevel: 'Beginner',
    images: [
      'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Bestseller', '100% Kid Safe', 'Parent Choice Award'],
    inStock: true,
    stockCount: 80,
    specs: {
      microcontroller: 'Plug-and-Play Snap Modules',
      sensors: ['Light Sensor', 'Touch Switch', 'Sound Sensor Module'],
      codingLanguages: ['Physical Circuits (No Screen Needed)'],
      powerSource: '2x AA Batteries (Included)',
      includedProjectsCount: 25,
      boxWeight: '950 grams',
      warranty: '1 Year Replacement Warranty'
    },
    whatsInside: [
      '30x Magnetic Snap Electronic Modules',
      'Propeller Motor Module & Flying Disk',
      'Multi-Color LED Light Strips & Buzzer',
      'Illustrated Storybook & Experiment Map',
      'Battery Pack with Short-Circuit Protection'
    ],
    sampleProjects: [
      'Flying Saucer Propeller Launcher',
      'Police Siren & Flashing Lights',
      'Secret Intruder Alarm for Bedroom',
      'Solar Powered Windmill Generator'
    ],
    isFeatured: true
  },
  {
    id: 'ny-quad-drone',
    name: 'NavoFlyer STEM Micro Quadcopter Drone Kit',
    tagline: 'Assemble, solder-free wire, program & fly your own indoor altitude-hold drone',
    description: 'Learn aerodynamics, propeller thrust dynamics, and sensor stabilization. Features optical flow positioning, 360-degree flips, and programmable flight paths via Scratch/Python.',
    price: 3999,
    originalPrice: 5499,
    discountPercent: 27,
    rating: 4.8,
    reviewCount: 156,
    category: 'Drones & Automation',
    ageGroup: '14-16',
    ageText: 'Ages 13-18 Years',
    techStack: ['ESP32', 'ROS & Motors'],
    skillLevel: 'Intermediate',
    images: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['STEM Drone Certified', 'Popular'],
    inStock: true,
    stockCount: 35,
    specs: {
      microcontroller: 'NavoFlight 32-bit Core Flight Controller',
      sensors: ['6-Axis Gyro & Accelerometer', 'Barometric Altitude Sensor', 'Optical Flow Camera'],
      codingLanguages: ['Scratch Drone Blocks', 'Python API'],
      powerSource: '3.7V 600mAh LiPo Battery (Includes 2x Batteries + Multi-charger)',
      includedProjectsCount: 10,
      boxWeight: '450 grams',
      warranty: '1 Year Warranty'
    },
    whatsInside: [
      'Impact-Resistant Carbon Fiber / ABS Drone Frame',
      '4x Coreless High-RPM Motors & Spare Propellers',
      'NavoFlight Stabilization Board',
      '2.4GHz Wireless Remote Controller',
      '2x Rechargeable Flight Batteries + USB Charger',
      'Propeller Guards for Safe Indoor Flying'
    ],
    sampleProjects: [
      'Automatic Flip & Aerial Stunt Programming',
      'Autonomous Waypoint Mission Flying',
      'Obstacle Avoidance Flight Challenge'
    ],
    isFeatured: true
  },
  {
    id: 'ny-arduino-master',
    name: 'NavoMaker Ultimate Arduino Uno R3 Sensor Super Kit',
    tagline: 'The most comprehensive 65-in-1 electronics & micro-controller learning laboratory',
    description: 'Everything an aspiring electronics enthusiast needs. 65+ component types, detailed step-by-step PDF & video guides for 50+ projects ranging from basic LEDs to advanced robotic arms.',
    price: 2499,
    originalPrice: 3299,
    discountPercent: 24,
    rating: 4.9,
    reviewCount: 520,
    category: 'Embedded Systems',
    ageGroup: '14-16',
    ageText: 'Ages 12+ Years & College',
    techStack: ['Arduino', 'IoT Sensors'],
    skillLevel: 'Beginner',
    images: [
      'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Bestseller', 'College Favorite', '65+ Components'],
    inStock: true,
    stockCount: 110,
    specs: {
      microcontroller: 'Arduino Uno R3 Compatible Board (ATmega328P)',
      sensors: ['30+ Sensor Modules (Temp, Distance, Flame, Touch, RFID, Gyro, Sound, Humidity)'],
      codingLanguages: ['C / C++ (Arduino IDE)', 'mBlock'],
      powerSource: '9V Battery / USB Power',
      includedProjectsCount: 50,
      boxWeight: '1.2 kg',
      warranty: '1 Year Warranty'
    },
    whatsInside: [
      'NavoMaker Uno R3 Microcontroller Board',
      '830-Point Solderless Breadboard & 65x Jumper Wires',
      'Stepper Motor & Servo Motors',
      'RFID RC522 Reader Module & Smart Cards',
      '16x2 LCD Display & 4-Digit 7-Segment Display',
      'Heavy Duty Sturdy Toolbox Carrying Case'
    ],
    sampleProjects: [
      'Digital Calculator with Keypad & LCD',
      'RFID Door Lock System',
      'Ultrasonic Radar Scanner on Servo Motor',
      'Automatic Temperature Controlled Fan'
    ],
    isFeatured: true
  },
  {
    id: 'ny-arm-robot',
    name: 'NavoArm 4-DOF Robotic Arm with Bluetooth Control',
    tagline: 'Precision 4-Axis robotic manipulator for factory automation & pick-and-place projects',
    description: 'Build your own industrial robotic arm. Learn forward and inverse kinematics, servo motor control, and automate pick-and-place tasks via custom Android/iOS Bluetooth app.',
    price: 4299,
    originalPrice: 5999,
    discountPercent: 28,
    rating: 4.8,
    reviewCount: 142,
    category: 'Robotics',
    ageGroup: '17+',
    ageText: 'Ages 14+ Years & College',
    techStack: ['Arduino', 'ROS & Motors', 'ESP32'],
    skillLevel: 'Advanced',
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['College & B.Tech Choice', 'Industrial Grade'],
    inStock: true,
    stockCount: 22,
    specs: {
      microcontroller: 'Arduino Mega 2560 / Uno Driver Shield',
      sensors: ['4x MG996R Metal Gear High-Torque Servos', 'Bluetooth HC-05 Module'],
      codingLanguages: ['C++', 'Python Kinematics Script'],
      powerSource: '5V 4A DC Power Adapter Included',
      includedProjectsCount: 12,
      boxWeight: '1.4 kg',
      warranty: '1 Year Warranty'
    },
    whatsInside: [
      'Precision Laser-Cut Acrylic Arm Mechanics',
      '4x Metal Gear Servos (10kg/cm torque)',
      'NavoShield Motor & Bluetooth Board',
      'Bluetooth Module for Wireless Phone Control',
      'Power Supply Adapter (5V 4A)',
      'Assembly Tools & Hex Keys'
    ],
    sampleProjects: [
      'Automated Color Sorting Assembly Line',
      'Memory Mode Record & Playback Trajectory',
      'Joystick Controlled Precision Gripper'
    ],
    isFeatured: false
  },
  {
    id: 'ny-raspi-ai',
    name: 'NavoPi AI Computer Vision & Edge AI Hub',
    tagline: 'Raspberry Pi 4 / 5 AI starter kit for deep learning, OpenCV, and Object Detection',
    description: 'For advanced high school and college engineering students. Master Python computer vision, TensorFlow Lite models, real-time object tracking, and edge computing.',
    price: 9999,
    originalPrice: 12999,
    discountPercent: 23,
    rating: 4.9,
    reviewCount: 98,
    category: 'AI & Machine Learning',
    ageGroup: '17+',
    ageText: 'College & Engineering',
    techStack: ['Raspberry Pi', 'AI & Computer Vision'],
    skillLevel: 'Advanced',
    images: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Engineering Grade', 'Deep Learning'],
    inStock: true,
    stockCount: 15,
    specs: {
      microcontroller: 'Raspberry Pi 4B (4GB RAM) / Pi 5 Ready',
      sensors: ['Wide-Angle 8MP Camera Module', 'Pan-Tilt Dual Servo Assembly'],
      codingLanguages: ['Python 3', 'OpenCV', 'TensorFlow Lite', 'PyTorch'],
      powerSource: '5V 3.5A USB-C Power Adapter with Inline Switch',
      includedProjectsCount: 10,
      boxWeight: '890 grams',
      warranty: '1 Year Warranty'
    },
    whatsInside: [
      'Raspberry Pi 4 Model B (4GB RAM Board)',
      'High-Speed 64GB Class 10 MicroSD Pre-loaded with NavoOS',
      '8MP Sony IMX219 Camera Module with Flex Ribbon',
      'Aluminum Armor Heatsink Case with Dual Cooling Fans',
      'Official Raspberry Pi 15W USB-C Power Supply'
    ],
    sampleProjects: [
      'Real-Time License Plate Recognition System',
      'Autonomous Object Tracking Pan-Tilt Turret',
      'AI Drowsiness Detection System for Drivers'
    ],
    isFeatured: false
  },
  {
    id: 'ny-atl-lab-bundle',
    name: 'NavoLab Complete School STEM & ATL Package',
    tagline: 'Turnkey STEM Laboratory setup for 30 students aligned with NITI Aayog guidelines',
    description: 'The ultimate all-in-one institutional bundle for schools establishing Atal Tinkering Labs or modern STEM rooms. Includes 15x student kits, teacher manual, safety gear, and online teacher training certification.',
    price: 49999,
    originalPrice: 65000,
    discountPercent: 23,
    rating: 5.0,
    reviewCount: 45,
    category: 'STEM Starter',
    ageGroup: '11-13',
    ageText: 'Schools & Institutions',
    techStack: ['Arduino', 'ESP32', 'Micro:bit', 'IoT Sensors'],
    skillLevel: 'Intermediate',
    images: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['School Package', 'ATL Compliant', 'Includes Teacher Training'],
    inStock: true,
    stockCount: 10,
    specs: {
      microcontroller: '15x Mixed Microcontroller Packs (Arduino, ESP32, Micro:bit)',
      sensors: ['Over 300+ Sensors & Electronic Components Included'],
      codingLanguages: ['Scratch', 'Blockly', 'Python', 'C++'],
      powerSource: 'AC Power Adapters & Battery Packs',
      includedProjectsCount: 100,
      boxWeight: '14.5 kg',
      warranty: '2 Years Institutional Warranty'
    },
    whatsInside: [
      '5x NavoBot Pro V4 Kits',
      '5x NavoAI Vision Labs',
      '5x NavoIoT Smart Automation Kits',
      '30x Student STEM Workbooks & Teacher Guidebook',
      'Heavy Duty Wall Cabinet Organizer Box',
      'Free 2-Day On-Site / Live Online Teacher Training'
    ],
    sampleProjects: [
      'Complete K-12 Robotics & Coding School Curriculum',
      'Annual Science Exhibition Championship Projects'
    ],
    isFeatured: true
  },
  {
    id: 'ny-3d-fab',
    name: 'NavoPrint Mini Desktop 3D Printer for Schools',
    tagline: 'Compact, silent, auto-leveling 3D printer for student rapid prototyping',
    description: 'Safe, easy-to-use 3D printer designed for classrooms and home makers. Bring 3D CAD models to life in PLA bioplastic with single-button printing.',
    price: 18999,
    originalPrice: 24999,
    discountPercent: 24,
    rating: 4.8,
    reviewCount: 76,
    category: '3D Printing & Fabrication',
    ageGroup: '14-16',
    ageText: 'Ages 12+ & Schools',
    techStack: ['ROS & Motors'],
    skillLevel: 'Intermediate',
    images: [
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Fabrication', 'Quiet Operation'],
    inStock: true,
    stockCount: 12,
    specs: {
      microcontroller: 'Silent 32-bit Mainboard',
      sensors: ['Auto Bed Leveling Sensor', 'Filament Runout Sensor'],
      codingLanguages: ['G-Code / Cura / Tinkercad Aligned'],
      powerSource: '24V DC Power Supply',
      includedProjectsCount: 20,
      boxWeight: '6.8 kg',
      warranty: '1 Year Warranty'
    },
    whatsInside: [
      'NavoPrint Mini 3D Printer Unit (Pre-assembled)',
      '1kg Eco-Friendly PLA Filament Spool',
      'Magnetic Removable Flexible Build Plate',
      'MicroSD Card loaded with Tinkercad 3D Models',
      'Tool Kit & Nozzle Cleaning Set'
    ],
    sampleProjects: [
      'Custom Robot Chassis & Gears Printing',
      'Anatomical Science & Math Visual Models'
    ],
    isFeatured: false
  },
  {
    id: 'ny-microbit-go',
    name: 'NavoBit Smart Coding Badge Kit',
    tagline: 'BBC Micro:bit V2.2 entry kit with built-in speaker, mic, and LED matrix',
    description: 'The easiest way for beginners to start coding! Create pocket games, compasses, musical instruments, and step counters with block drag-and-drop.',
    price: 1899,
    originalPrice: 2499,
    discountPercent: 24,
    rating: 4.9,
    reviewCount: 290,
    category: 'STEM Starter',
    ageGroup: '8-10',
    ageText: 'Ages 8-12 Years',
    techStack: ['Micro:bit'],
    skillLevel: 'Beginner',
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Beginner Choice', 'BBC Certified'],
    inStock: true,
    stockCount: 75,
    specs: {
      microcontroller: 'BBC Micro:bit V2.2 Board',
      sensors: ['5x5 LED Matrix', 'Built-in Speaker & Mic', 'Compass & Accelerometer', 'Touch Logo'],
      codingLanguages: ['Microsoft MakeCode Blocks', 'Python'],
      powerSource: '2x AAA Battery Holder + USB Cable',
      includedProjectsCount: 20,
      boxWeight: '320 grams',
      warranty: '1 Year Warranty'
    },
    whatsInside: [
      'BBC Micro:bit V2.2 Board',
      'USB Connection Cable',
      'AAA Battery Holder & 2x Batteries',
      'Quick Start Guide & Project Cards'
    ],
    sampleProjects: [
      'Digital Pedometer Step Counter',
      'Rock-Paper-Scissors Pocket Game',
      'Soil Moisture Plant Monitor'
    ],
    isFeatured: false
  },
  {
    id: 'ny-esp32-starter',
    name: 'NavoESP32 Wi-Fi & Bluetooth IoT Starter Kit',
    tagline: 'Powerful dual-core 240MHz wireless micro-controller lab for smart connectivity',
    description: 'Learn modern wireless networking, Web Server hosting, Bluetooth BLE beacons, and cloud data logging on the ultra-popular ESP32 chip.',
    price: 2199,
    originalPrice: 2899,
    discountPercent: 24,
    rating: 4.8,
    reviewCount: 167,
    category: 'Embedded Systems',
    ageGroup: '14-16',
    ageText: 'Ages 12+ & College',
    techStack: ['ESP32', 'IoT Sensors'],
    skillLevel: 'Intermediate',
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Wi-Fi & Bluetooth', 'IoT Ready'],
    inStock: true,
    stockCount: 50,
    specs: {
      microcontroller: 'ESP32 30-Pin Development Board',
      sensors: ['OLED Display', 'DHT22 Sensor', 'Relay', 'Buzzer', 'Rotary Encoder'],
      codingLanguages: ['C++ Arduino', 'MicroPython'],
      powerSource: 'USB-C Cable',
      includedProjectsCount: 20,
      boxWeight: '550 grams',
      warranty: '1 Year Warranty'
    },
    whatsInside: [
      'ESP32 Development Board',
      '0.96 OLED Display',
      'Sensor & Component Assortment',
      'Full Color Lab Manual'
    ],
    sampleProjects: [
      'ESP32 Wi-Fi Web Server Switch',
      'Bluetooth BLE Smart Key Finder'
    ],
    isFeatured: false
  }
];
