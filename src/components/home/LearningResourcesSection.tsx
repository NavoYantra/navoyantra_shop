import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LEARNING_RESOURCES } from '../../data/learningResources';
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-extrabold text-blue-600  uppercase tracking-widest flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OPEN SOURCE KNOWLEDGE HUB</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900  mt-1 tracking-tight">
              Free Learning Resources & Tutorials
            </h2>
          </div>
          <p className="text-sm text-slate-600  mt-2 md:mt-0 max-w-md">
            Access our free step-by-step video guides, PDF experiment manuals, Scratch block plugins, and C++/Python GitHub repositories.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutorials.map(tutorial => (
            <Link
              to={`/tutorial/${tutorial.id}`}
              key={tutorial.id}
              className="rounded-3xl bg-white  border border-slate-200/80  p-5 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
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
          
          {/* Fallback to static resources if needed */}
          {tutorials.length < 4 && LEARNING_RESOURCES.slice(0, 4 - tutorials.length).map(resource => (
            <div
              key={resource.id}
              className="rounded-3xl bg-white  border border-slate-200/80  p-5 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-4 bg-slate-100 ">
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 transition-colors" />
                  
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase shadow-md">
                    {resource.type}
                  </span>

                  {resource.type === 'Video Tutorial' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 text-blue-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-blue-600 ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-2">
                  <span className="text-blue-600  font-bold">{resource.category}</span>
                  <span>{resource.duration || `${resource.downloads} downloads`}</span>
                </div>

                <h3 className="text-sm font-bold font-heading text-slate-900  line-clamp-2 group-hover:text-blue-600 :text-blue-400 transition-colors">
                  {resource.title}
                </h3>

                <p className="text-xs text-slate-500  mt-2 line-clamp-2 leading-relaxed">
                  {resource.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100  flex items-center justify-between">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-100  text-slate-600 ">
                  {resource.difficulty}
                </span>

                <button 
                  onClick={() => alert(`Static resource: ${resource.title}. Please add it through Admin Panel.`)}
                  className="text-xs font-bold text-blue-600  flex items-center space-x-1 group-hover:underline"
                >
                  <span>{resource.type === 'Video Tutorial' ? 'Watch Video' : 'Download PDF'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
