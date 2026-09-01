import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { 
  Play, ExternalLink, Sparkles 
} from 'lucide-react';
import { Tutorial } from '../../types';

export const LearningResourcesSection: React.FC = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      const { data, error } = await supabase
        .from('tutorials')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) throw error;
      setTutorials(data || []);
    } catch (err) {
      console.error('Error fetching tutorials:', err);
    }
  };

  return (
    <section id="resources" className="py-20 bg-[#F6F7F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Open Source Knowledge Hub</span>
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
              Free Learning Resources & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Tutorials</span>
            </h2>
          </div>
          
          <div className="flex flex-col gap-5 max-w-md md:shrink-0">
            <p className="text-base text-slate-600 leading-relaxed">
              Access our free step-by-step video guides, PDF experiment manuals, Scratch block plugins, and C++/Python GitHub repositories.
            </p>
            <a 
              href="https://edu.navoyantra.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-600/20 transition-all duration-300 w-fit"
            >
              <span>Visit edu.navoyantra.com</span>
              <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutorials.map(tutorial => (
            <Link
              to={`/tutorial/${tutorial.id}`}
              key={tutorial.id}
              className="rounded-2xl bg-white  border border-slate-200/80  p-5 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-4 bg-slate-100 ">
                  <img
                    src={tutorial.images?.[0] || 'https://via.placeholder.com/400x250'}
                    alt={tutorial.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 transition-colors" />
                  
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase shadow-md">
                    {tutorial.video_url ? 'Video Tutorial' : (tutorial.pdfs?.length > 0 ? 'Project PDF' : 'Article')}
                  </span>

                  {tutorial.video_url && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 text-blue-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-blue-600 ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-2">
                  <span className="text-blue-600  font-bold">{tutorial.category}</span>
                  <span>Live</span>
                </div>

                <h3 className="text-sm font-bold font-heading text-slate-900  line-clamp-2 group-hover:text-blue-600 :text-blue-400 transition-colors">
                  {tutorial.title}
                </h3>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100  flex items-center justify-between">
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded text-slate-600 ${
                  tutorial.difficulty === 'Beginner' ? 'bg-green-100' :
                  tutorial.difficulty === 'Intermediate' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  {tutorial.difficulty}
                </span>

                <div className="text-xs font-bold text-blue-600 flex items-center space-x-1 group-hover:underline">
                  <span>View Resource</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
