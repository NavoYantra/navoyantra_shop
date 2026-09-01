import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useApp } from '../context/AppContext';
import { SEO } from '../components/SEO';
import { BookOpen, Play, ExternalLink, Filter, Search, Loader2 } from 'lucide-react';
import { Tutorial } from '../types';

export const TutorialsPage: React.FC = () => {
  const { showToast } = useApp();
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchTutorials = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('tutorials')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTutorials(data || []);
      } catch (err) {
        console.error('Error fetching tutorials:', err);
        showToast('Failed to load tutorials', 'warning');
      } finally {
        setLoading(false);
      }
    };

    fetchTutorials();
  }, []);

  const categories = ['All', ...Array.from(new Set(tutorials.map(t => t.category)))];

  const filteredTutorials = tutorials.filter(t => {
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (t.content && t.content.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F6F7F9] pb-24">
      <SEO 
        title="Learning Resources & Tutorials | NavoYantra"
        description="Master robotics and AI with our comprehensive tutorials, project guides, and video lessons."
        keywords="robotics tutorials, STEM projects, AI learning, NavoYantra education"
      />
      
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center space-x-2 bg-blue-50 px-4 py-2 rounded-full text-blue-600 font-bold mb-6">
            <BookOpen className="w-5 h-5" />
            <span>NavoYantra Learning Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 font-heading tracking-tight">
            Master the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Technology</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Step-by-step guides, project manuals, and video tutorials to help you build, program, and innovate.
          </p>

          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search tutorials..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-900"
              />
            </div>
            <div className="relative min-w-[200px]">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-900 appearance-none bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorials Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
          ) : filteredTutorials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTutorials.map(tutorial => (
                <Link
                  key={tutorial.id}
                  to={`/tutorial/${tutorial.id}`}
                  className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                      <img
                        src={tutorial.images?.[0] || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600'}
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
                      <span className="text-blue-600 font-bold">{tutorial.category}</span>
                      <span>{new Date(tutorial.created_at).toLocaleDateString()}</span>
                    </div>

                    <h3 className="text-sm font-bold font-heading text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {tutorial.title}
                    </h3>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
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
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">No tutorials found</h3>
              <p className="text-slate-500">We couldn't find any tutorials matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
