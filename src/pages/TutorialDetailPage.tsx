import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Tutorial } from '../types';
import { SEO } from '../components/SEO';
import { 
  BookOpen, Clock, Download, Video, Image as ImageIcon, FileText, ChevronRight
} from 'lucide-react';

export const TutorialDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'content' | 'video' | 'pdf'>('content');

  useEffect(() => {
    fetchTutorial();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchTutorial = async () => {
    try {
      setIsLoading(true);
      // Fetch by ID or Slug
      const { data, error } = await supabase
        .from('tutorials')
        .select('*')
        .or(`id.eq.${id},slug.eq.${id}`)
        .single();

      if (error) throw error;
      setTutorial(data);
      
      // Auto-switch tab if no content but video exists
      if (!data.content && data.video_url) {
        setActiveTab('video');
      } else if (!data.content && !data.video_url && data.pdfs?.length > 0) {
        setActiveTab('pdf');
      }
    } catch (err) {
      console.error('Error fetching tutorial:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <BookOpen className="w-16 h-16 text-slate-300" />
        <h2 className="text-2xl font-bold text-slate-800">Tutorial not found</h2>
        <p className="text-slate-500">The learning resource you're looking for doesn't exist.</p>
        <Link to="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F6F7F9] min-h-screen pb-20">
      <SEO 
        title={`${tutorial.title} | NavoYantra Tutorials`}
        description={`Learn about ${tutorial.title} in this free tutorial by NavoYantra.`}
        keywords={`${tutorial.category}, tutorial, learn robotics, DIY guide, STEM`}
        image={tutorial.images?.[0] || '/favicon.png'}
      />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-xs font-medium text-slate-500 space-x-2">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-400">Tutorials</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-400">{tutorial.category}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 font-bold truncate max-w-[200px]">{tutorial.title}</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider">
              {tutorial.category}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              tutorial.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300' :
              tutorial.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
              'bg-red-500/20 text-red-300'
            }`}>
              {tutorial.difficulty}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading leading-tight">
            {tutorial.title}
          </h1>

          <div className="flex items-center justify-center space-x-6 text-sm text-slate-400 font-medium">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{new Date(tutorial.published_date || tutorial.created_at || '').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto">
            {tutorial.content && (
              <button 
                onClick={() => setActiveTab('content')}
                className={`flex-1 py-4 px-6 text-sm font-bold flex items-center justify-center space-x-2 transition-colors whitespace-nowrap ${
                  activeTab === 'content' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Read Guide</span>
              </button>
            )}
            {tutorial.video_url && (
              <button 
                onClick={() => setActiveTab('video')}
                className={`flex-1 py-4 px-6 text-sm font-bold flex items-center justify-center space-x-2 transition-colors whitespace-nowrap ${
                  activeTab === 'video' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Watch Video</span>
              </button>
            )}
            {tutorial.pdfs && tutorial.pdfs.length > 0 && (
              <button 
                onClick={() => setActiveTab('pdf')}
                className={`flex-1 py-4 px-6 text-sm font-bold flex items-center justify-center space-x-2 transition-colors whitespace-nowrap ${
                  activeTab === 'pdf' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>PDF Manuals</span>
              </button>
            )}
          </div>

          <div className="p-6 sm:p-10">
            {/* Content Tab */}
            {activeTab === 'content' && (
              <div className="space-y-8">
                {tutorial.images && tutorial.images.length > 0 && (
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100">
                    <img src={tutorial.images[0]} alt={tutorial.title} className="w-full h-full object-cover" />
                  </div>
                )}
                
                <div 
                  className="prose prose-slate prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-700"
                  dangerouslySetInnerHTML={{ __html: tutorial.content.replace(/\n/g, '<br/>') }}
                />
                
                {tutorial.images && tutorial.images.length > 1 && (
                  <div className="pt-8 border-t border-slate-100">
                    <h3 className="text-xl font-bold mb-4 flex items-center space-x-2"><ImageIcon className="w-5 h-5 text-blue-500" /> <span>Gallery</span></h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {tutorial.images.slice(1).map((img, i) => (
                        <div key={i} className="aspect-square rounded-xl overflow-hidden bg-slate-100">
                          <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Video Tab */}
            {activeTab === 'video' && tutorial.video_url && (
              <div className="space-y-6">
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-lg">
                  {getEmbedUrl(tutorial.video_url) ? (
                    <iframe
                      src={getEmbedUrl(tutorial.video_url)!}
                      title="YouTube video player"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white">
                      <Video className="w-12 h-12 mb-4 opacity-50" />
                      <p>Invalid Video URL provided.</p>
                      <a href={tutorial.video_url} target="_blank" rel="noreferrer" className="mt-4 px-4 py-2 bg-blue-600 rounded-lg">Open Link Directly</a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PDF Tab */}
            {activeTab === 'pdf' && tutorial.pdfs && tutorial.pdfs.length > 0 && (
              <div className="space-y-8">
                {tutorial.pdfs.map((pdf, i) => (
                  <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                      <h3 className="font-bold text-slate-900 flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-red-500" />
                        <span>{pdf.name}</span>
                      </h3>
                      <a 
                        href={pdf.url} 
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Download PDF</span>
                      </a>
                    </div>
                    <div className="w-full h-[600px] bg-slate-100 relative">
                      <iframe 
                        src={`${pdf.url}#view=FitH`}
                        className="w-full h-full border-0"
                        title={pdf.name}
                      ></iframe>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
