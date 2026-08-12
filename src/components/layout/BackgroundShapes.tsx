import React from 'react';

export const BackgroundShapes: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none w-full h-full">
      {/* Top Left Blob */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-blue-300/30 mix-blend-multiply filter blur-[80px] sm:blur-[120px] opacity-70 animate-blob"></div>
      
      {/* Top Right Blob */}
      <div className="absolute top-[5%] right-[-10%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full bg-purple-300/30 mix-blend-multiply filter blur-[80px] sm:blur-[120px] opacity-70 animate-blob animation-delay-2000"></div>
      
      {/* Bottom Left Blob */}
      <div className="absolute bottom-[-10%] left-[15%] w-[45vw] h-[45vw] max-w-[700px] max-h-[700px] rounded-full bg-pink-300/30 mix-blend-multiply filter blur-[80px] sm:blur-[120px] opacity-70 animate-blob animation-delay-4000"></div>

      {/* Center Right Blob */}
      <div className="absolute top-[40%] right-[10%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full bg-yellow-200/30 mix-blend-multiply filter blur-[80px] sm:blur-[100px] opacity-60 animate-blob animation-delay-2000"></div>

      {/* Additional subtle blob for extra coverage */}
      <div className="absolute bottom-[20%] right-[25%] w-[25vw] h-[25vw] max-w-[350px] max-h-[350px] rounded-full bg-cyan-200/30 mix-blend-multiply filter blur-[80px] sm:blur-[100px] opacity-60 animate-blob"></div>
    </div>
  );
};
