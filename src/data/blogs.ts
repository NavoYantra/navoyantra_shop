import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'ai-robotics-k12-2026',
    title: 'How AI & Computer Vision Are Transforming K-12 Robotics Education in India',
    excerpt: 'Machine Learning is no longer restricted to university labs. Discover how ESP32-CAM and Scratch Block AI plugins allow school students to build face-tracking rovers in 2026.',
    content: `
      <p>Artificial Intelligence (AI) and Computer Vision are revolutionizing how students interact with technology. Historically, teaching computer vision required deep mathematical knowledge of linear algebra, matrix calculus, and complex C++ frameworks like OpenCV.</p>
      
      <h3>The Paradigm Shift in School STEM Education</h3>
      <p>With modern microcontrollers like the ESP32-CAM dual-core processor and block-based AI interfaces, students as young as 10 years old can train neural network models directly inside their browser. They can deploy these models onto autonomous rovers to recognize color traffic signs, track human faces, or sort recyclable waste.</p>

      <h3>Key Learning Milestones</h3>
      <ul>
        <li><strong>Data Collection:</strong> Capturing camera samples of gestures or objects.</li>
        <li><strong>Model Training:</strong> Utilizing lightweight neural net accelerators.</li>
        <li><strong>Hardware Control:</strong> Binding AI classification outputs to servo motors and motor drivers.</li>
      </ul>

      <p>At NavoYantra Technology, our vision lab kits bridge the gap between classroom theory and real-world AI applications, giving Indian school students a massive head start in global innovation.</p>
    `,
    categories: ['AI & Innovation'],
    author: {
      name: 'Dr. Ananya Roy',
      role: 'Head of STEM Research, NavoYantra',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      isOfficial: true
    },
    publishedDate: 'Aug 4, 2026',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1000&q=80',
    tags: ['Artificial Intelligence', 'ESP32', 'CBSE Robotics', 'EdTech'],
    isFeatured: true,
    status: 'published'
  },
  {
    id: 'atl-lab-checklist-schools',
    title: 'Setting up an Atal Tinkering Lab (ATL): Step-by-Step Guide for School Principals',
    excerpt: 'A comprehensive operational roadmap for school management to establish a NITI Aayog compliant STEM robotics laboratory under the Atal Innovation Mission.',
    content: `
      <p>The Atal Tinkering Lab (ATL) initiative by NITI Aayog has ignited a maker movement across Indian schools. Establishing a successful ATL requires careful planning across space allocation, safety equipment, component procurement, and faculty enablement.</p>

      <h3>1. Spatial & Infrastructure Setup</h3>
      <p>An ideal ATL room requires a minimum of 1,500 sq. ft. well-ventilated space equipped with modular workbenches, storage cabinets, ESD anti-static mats, and robust 230V electrical outlets.</p>

      <h3>2. Essential Hardware Packages</h3>
      <p>The core inventory must cover 3D printers, DIY robotics rovers, sensor modules (ultrasonic, line-tracking, gas sensors), soldering safety stations, and microcontrollers (Arduino Uno, ESP32, Raspberry Pi).</p>

      <h3>3. Teacher Enablement & Workshops</h3>
      <p>Equipment alone is insufficient without trained educators. Continuous teacher certification workshops ensure teachers are confident leading Scratch, C++, and Python hands-on projects.</p>
    `,
    categories: ['School Administration'],
    author: {
      name: 'Prof. Vikramaditya Naik',
      role: 'Senior Atal Lab Consultant',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      isOfficial: true
    },
    publishedDate: 'Jul 28, 2026',
    readTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
    tags: ['Atal Tinkering Lab', 'School STEM', 'NITI Aayog', 'Curriculum'],
    isFeatured: true,
    status: 'published'
  },
  {
    id: 'top-5-kids-robotics-projects',
    title: '5 Exciting DIY Robotics Projects for Kids (Ages 8-12 Yrs)',
    excerpt: 'Fun, safe, screen-light electronics projects that introduce electric circuits, buzzer alarms, and obstacle-avoiding bots without complex code.',
    content: `
      <p>Getting kids excited about engineering doesn't require overwhelming them with complex math. Here are 5 hands-on projects kids can build using magnetic snap blocks and beginner rovers:</p>

      <ol>
        <li><strong>The Secret Intruder Bedroom Alarm:</strong> Uses a light LDR sensor to buzz when someone opens the door.</li>
        <li><strong>Self-Driving Line Follower Bot:</strong> Dual IR line sensors detect black tape tracks on paper maps.</li>
        <li><strong>Obstacle Avoiding Rover:</strong> Ultrasonic distance sensor swivels to find open paths around furniture.</li>
        <li><strong>Smart Plant Moisture Indicator:</strong> Measures soil water levels and blinks an LED when a plant needs watering.</li>
        <li><strong>Flying Saucer Propeller Launcher:</strong> Explores motor thrust dynamics and aerodynamic lift.</li>
      </ol>
    `,
    categories: ['Kids STEM'],
    author: {
      name: 'Priya Sundaram',
      role: 'STEM Curriculum Developer',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      isOfficial: true
    },
    publishedDate: 'Jul 20, 2026',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1000&q=80',
    tags: ['Kids Coding', 'Scratch Blocks', 'DIY Projects', 'STEM Starter'],
    status: 'published'
  },
  {
    id: 'esp32-vs-arduino-uno',
    title: 'ESP32 vs Arduino Uno: Which Microcontroller Should You Buy First?',
    excerpt: 'Detailed comparison of processing speed, Wi-Fi/Bluetooth capabilities, sensor pins, and price to help beginner makers choose the right dev board.',
    content: `
      <p>When starting your embedded electronics journey, choosing between Arduino Uno R3 and ESP32 is a crucial decision. Here is how they stack up:</p>

      <h3>Arduino Uno R3: The Beginner Gold Standard</h3>
      <p>With its bulletproof 5V logic, massive community tutorials, and forgiving design, the Arduino Uno is perfect for learning basic C++ programming, LED blinking, and simple sensor interfacing.</p>

      <h3>ESP32: The Wireless & IoT Powerhouse</h3>
      <p>Operating at 240MHz dual-core with built-in 802.11 b/g/n Wi-Fi and Bluetooth BLE, the ESP32 is vastly more powerful. It is ideal for cloud dashboards, smart home relays, and camera streaming.</p>
    `,
    categories: ['Hardware Guide'],
    author: {
      name: 'Aarav Sharma',
      role: 'Robotics Lead Maker',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      isOfficial: true
    },
    publishedDate: 'Jul 15, 2026',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    tags: ['Arduino', 'ESP32', 'Microcontrollers', 'IoT'],
    isFeatured: true,
    status: 'published'
  },
  {
    id: 'community-drone-build',
    title: 'How I Built My First Quadcopter Under ₹5000',
    excerpt: 'A student maker from Bangalore shares their journey of selecting motors, balancing props, and configuring the flight controller on a budget.',
    content: '<p>Building a drone is easier than you think...</p>',
    categories: ['Community Projects'],
    author: {
      name: 'Karthik N.',
      role: 'Community Maker',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      isOfficial: false
    },
    publishedDate: 'Aug 5, 2026',
    readTime: '10 min read',
    coverImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80',
    tags: ['Drones', 'DIY', 'Budget'],
    status: 'published'
  },
  {
    id: 'community-weather-station',
    title: 'My Smart IoT Weather Station Project',
    excerpt: 'Using the NavoYantra ESP32 kit to monitor soil moisture and temperature in my school garden.',
    content: '<p>This is my project submission...</p>',
    categories: ['Community Projects'],
    author: {
      name: 'Sneha P.',
      role: 'Student at DPS',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
      isOfficial: false
    },
    publishedDate: 'Pending',
    readTime: '3 min read',
    coverImage: 'https://images.unsplash.com/photo-1530982011887-3cc11cc85693?auto=format&fit=crop&w=1000&q=80',
    tags: ['IoT', 'School Project'],
    status: 'pending'
  }
];
