import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Tutorial } from '../types';
import { SEO } from '../components/SEO';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, Clock, Download, Video, Image as ImageIcon, FileText, ChevronRight, Star, MessageSquare, Share2
} from 'lucide-react';

export const TutorialDetailPage: React.FC<{ previewTutorial?: Tutorial }> = ({ previewTutorial }) => {
  const { id } = useParams<{ id: string }>();
  const { user, showToast } = useApp();
  const [tutorial, setTutorial] = useState<Tutorial | null>(previewTutorial || null);
  const [isLoading, setIsLoading] = useState(!previewTutorial);
  const [activeTab, setActiveTab] = useState<'content' | 'video' | 'pdf'>('content');
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReviewName, setNewReviewName] = useState(user?.name || '');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setNewReviewName(user.name);
    }
  }, [user]);

  useEffect(() => {
    if (previewTutorial) {
      setTutorial(previewTutorial);
      setIsLoading(false);
      // Auto-switch tab for preview as well
      if (!previewTutorial.content && previewTutorial.video_url) {
        setActiveTab('video');
      } else if (!previewTutorial.content && !previewTutorial.video_url && previewTutorial.pdfs?.length > 0) {
        setActiveTab('pdf');
      }
      return;
    }
    
    if (id) {
      fetchTutorial();
    }
    window.scrollTo(0, 0);
  }, [id, previewTutorial]);

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
      
      // Fetch reviews
      if (data.id) {
        const { data: reviewsData } = await supabase
          .from('tutorial_reviews')
          .select('*')
          .eq('tutorial_id', data.id)
          .eq('status', 'approved')
          .order('created_at', { ascending: false });
        
        if (reviewsData) setReviews(reviewsData);
      }
    } catch (err) {
      console.error('Error fetching tutorial:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast('Please log in to submit a review', 'warning');
      return;
    }
    
    if (!tutorial || !newReviewName || !newReviewText) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('tutorial_reviews').insert([{
        tutorial_id: tutorial.id,
        author_name: user.name, // Force user's actual name
        comment: newReviewText,
        rating: newReviewRating,
        status: 'pending'
      }]);
      
      if (error) throw error;
      
      showToast('Review submitted successfully! It will appear once approved by admin.', 'success');
      setNewReviewText('');
      setNewReviewRating(5);
    } catch (err: any) {
      if (err.message?.includes('Could not find the table')) {
        showToast('Review submitted successfully (Local Dev Mode)', 'success');
        setReviews(prev => [{
          author_name: user.name,
          comment: newReviewText,
          rating: newReviewRating,
          created_at: new Date().toISOString(),
          status: 'approved'
        }, ...prev]);
        setNewReviewText('');
        setNewReviewRating(5);
      } else {
        console.error('Error submitting review:', err);
        showToast('Failed to submit review', 'warning');
      }
    } finally {
      setIsSubmitting(false);
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
            <button 
              type="button" 
              onClick={async () => {
                const url = window.location.href;
                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: tutorial.title,
                      text: `Check out this tutorial: ${tutorial.title} on NavoYantra!`,
                      url: url,
                    });
                  } catch (err) {
                    console.error('Error sharing:', err);
                  }
                } else {
                  navigator.clipboard.writeText(url);
                  showToast('Link copied to clipboard', 'success');
                }
              }}
              className="p-1.5 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full ml-2 flex items-center justify-center"
              title="Share Tutorial"
            >
              <Share2 className="w-4 h-4" />
            </button>
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
            
            {/* Reviews Section */}
            {!previewTutorial && (
              <div className="mt-16 pt-12 border-t border-slate-200">
                <div className="flex items-center space-x-3 mb-8">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-slate-900">Tutorial Reviews & Feedback</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-6">
                    {reviews.length === 0 ? (
                      <div className="p-8 text-center bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <Star className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500 font-medium">No reviews yet. Be the first to share your experience!</p>
                      </div>
                    ) : (
                      reviews.map((review) => (
                        <div key={review.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                                {review.author_name.charAt(0)}
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-900">{review.author_name}</h4>
                                <p className="text-xs text-slate-500">{new Date(review.created_at).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div className="flex text-amber-500">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-slate-300'}`} />
                              ))}
                            </div>
                          </div>
                          <p className="text-slate-600 leading-relaxed">{review.comment}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
                    <h4 className="font-bold text-slate-900 mb-6 text-lg">Write a Review</h4>
                    {!user ? (
                      <div className="text-center py-6 bg-slate-50 rounded-xl border border-slate-200">
                        <p className="text-slate-600 mb-4 text-sm">You must be logged in to write a review.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmitReview} className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Rating</label>
                          <div className="flex space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setNewReviewRating(star)}
                                className="focus:outline-none transition-transform hover:scale-110"
                              >
                                <Star className={`w-8 h-8 ${star <= newReviewRating ? 'fill-amber-500 text-amber-500' : 'text-slate-200'}`} />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name</label>
                          <input 
                            type="text" 
                            disabled
                            value={user.name}
                            className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-slate-100 text-slate-500 outline-none cursor-not-allowed"
                            title="Your name is fixed to your account profile."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Your Review</label>
                          <textarea 
                            required
                            rows={4}
                            value={newReviewText}
                            onChange={(e) => setNewReviewText(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
                            placeholder="What did you learn from this tutorial?"
                          ></textarea>
                        </div>
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
