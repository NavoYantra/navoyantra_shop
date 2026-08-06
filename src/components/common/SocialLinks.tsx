import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ className = '', iconClassName = 'w-4 h-4' }) => {
  return (
    <div className={`flex items-center space-x-3 sm:space-x-4 ${className}`}>
      <a href="#" className="hover:text-red-500 transition-colors" title="YouTube"><Youtube className={iconClassName} /></a>
      <a href="#" className="hover:text-blue-500 transition-colors" title="Google">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={iconClassName} fill="currentColor">
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
        </svg>
      </a>
      <a href="#" className="hover:text-pink-500 transition-colors" title="Instagram"><Instagram className={iconClassName} /></a>
      <a href="#" className="hover:text-blue-600 transition-colors" title="LinkedIn"><Linkedin className={iconClassName} /></a>
      <a href="#" className="hover:text-blue-500 transition-colors" title="Facebook"><Facebook className={iconClassName} /></a>
      <a href="#" className="hover:text-slate-200 transition-colors" title="X (Twitter)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={iconClassName} fill="currentColor">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      </a>
      <a href="#" className="hover:text-red-600 transition-colors" title="Pinterest">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={iconClassName} fill="currentColor">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.366 18.622 0 12.017 0z" />
        </svg>
      </a>
    </div>
  );
};
