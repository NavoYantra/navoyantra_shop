import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { Star, Share2, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useApp } from '../context/AppContext';
import { SEO } from '../components/SEO';
import { slugify } from '../lib/utils';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { showToast, user } = useApp();
  
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [dbReviews, setDbReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [newCommentName, setNewCommentName] = useState(user?.name || '');
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentRating, setNewCommentRating] = useState(5);

  useEffect(() => {
    if (user?.name) {
      setNewCommentName(user.name);
    }
  }, [user]);

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        
        const formattedBlogs: BlogPost[] = (data || []).map((b: any) => ({
          id: b.id,
          title: b.title,
          excerpt: b.excerpt || '',
          content: b.content || '',
          categories: b.categories || (b.category ? [b.category] : ['Uncategorized']),
          author: {
            name: b.author_name || 'Admin',
            role: b.author_role || 'Editor',
            avatar: b.author_avatar || '',
            isOfficial: true
          },
          publishedDate: new Date(b.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          readTime: b.read_time || '5 min read',
          coverImage: b.cover_image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=200',
          tags: b.tags || [],
          isFeatured: b.is_featured,
          status: b.status
        }));
        
        const post = formattedBlogs.find(p => slugify(p.title) === slug || p.id === slug);
        setSelectedPost(post || null);
      } catch (err) {
        console.error('Error fetching blog:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBlog();
  }, [slug]);

  useEffect(() => {
    if (selectedPost) {
      const fetchReviews = async () => {
        const { data } = await supabase.from('blog_reviews').select('*').eq('blog_id', selectedPost.id).eq('status', 'approved').order('created_at', { ascending: false });
        if (data) setDbReviews(data);
      };
      fetchReviews();
      window.scrollTo(0, 0);
    }
  }, [selectedPost]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !newCommentName || !newCommentText) return;
    
    try {
      const { error } = await supabase.from('blog_reviews').insert([{
        blog_id: selectedPost.id,
        author_name: newCommentName,
        comment: newCommentText,
        rating: newCommentRating,
        status: 'pending'
      }]);
      
      if (error) throw error;
      showToast('Review submitted successfully and is pending approval!', 'success');
      setNewCommentName(user?.name || '');
      setNewCommentText('');
      setNewCommentRating(5);
    } catch (err: any) {
      showToast(`Error submitting review: ${err.message}`, 'warning');
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-[#F6F7F9] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  if (!selectedPost) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 bg-[#F6F7F9]">
        <h2 className="text-2xl font-bold text-slate-800">Blog post not found.</h2>
        <button 
          onClick={() => navigate('/blogs')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
        >
          Return to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7F9] py-12 px-4 sm:px-6">
      <SEO 
        title={`${selectedPost.title} | NavoYantra Blog`}
        description={selectedPost.excerpt}
        image={selectedPost.coverImage}
      />
      
      <div className="max-w-4xl mx-auto mb-6">
        <Link to="/blogs" className="inline-flex items-center space-x-2 text-slate-500 hover:text-blue-600 font-semibold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blogs</span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {(selectedPost.categories || []).map((cat: string) => (
              <span key={cat} className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-purple-100 text-purple-700 text-[11px] font-bold uppercase tracking-wider">
                {cat}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <button 
              type="button" 
              onClick={async () => {
                const url = window.location.href;
                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: selectedPost.title,
                      text: `Check out this blog: ${selectedPost.title} on NavoYantra!`,
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
              className="p-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              title="Share Blog"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
            {selectedPost.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 py-3 text-xs text-slate-500 border-y border-slate-100">
            <div className="flex items-center space-x-2">
              {selectedPost.author.avatar ? (
                <img src={selectedPost.author.avatar} alt="Author" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-blue-700 bg-blue-100">
                  {selectedPost.author.name ? selectedPost.author.name[0].toUpperCase() : 'A'}
                </div>
              )}
              <span className="font-bold text-slate-900">{selectedPost.author.name}</span>
            </div>
            <span>•</span>
            <span>{selectedPost.publishedDate}</span>
            <span>•</span>
            <span>{selectedPost.readTime}</span>
          </div>

          <div className="aspect-16/9 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
            <img src={selectedPost.coverImage} alt="Cover" className="w-full h-full object-cover" />
          </div>

          <div 
            className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: selectedPost.content }}
          />

          <div className="pt-8 mt-8 border-t border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Comments & Reviews</h3>
            
            <div className="space-y-6 mb-8">
              {dbReviews.length > 0 ? (
                dbReviews.map((review, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-bold text-slate-900 text-sm mr-2">{review.author_name}</span>
                        <span className="text-[10px] text-slate-400">{new Date(review.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex text-amber-500">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400 italic">No comments yet. Be the first to review!</p>
              )}
            </div>

            <form onSubmit={handleAddComment} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="text-sm font-bold text-slate-900">Leave a Comment</h4>
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  required
                  value={newCommentName}
                  onChange={e => setNewCommentName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-semibold text-slate-700">Rating:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewCommentRating(star)}
                      className={`p-1 ${newCommentRating >= star ? 'text-amber-500' : 'text-slate-300'} hover:text-amber-400 transition-colors`}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <textarea 
                  placeholder="Write your review or comment..." 
                  rows={3}
                  required
                  value={newCommentText}
                  onChange={e => setNewCommentText(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 transition-colors">
                Post Comment
              </button>
            </form>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {selectedPost.tags.map((t, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
