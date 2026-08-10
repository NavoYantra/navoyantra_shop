import React, { useState, useEffect } from 'react';
import { BLOG_POSTS } from '../data/blogs';
import { BlogPost } from '../types';
import { 
  Sparkles, Clock, ArrowRight, X, Calendar, ShieldCheck 
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export const BlogsPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isAdminModalOpen] = useState(false);
  
  const [postComments, setPostComments] = useState<Record<string, {name: string, text: string, date: string}[]>>({});
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  useEffect(() => {
    if (selectedPost || isSubmitModalOpen || isAdminModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPost, isSubmitModalOpen, isAdminModalOpen]);

  const [dbBlogs, setDbBlogs] = useState<BlogPost[]>([]);
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        
        const formattedBlogs: BlogPost[] = (data || []).map((b: any) => ({
          id: b.id,
          title: b.title,
          excerpt: b.excerpt || '',
          content: b.content || '',
          category: b.category || 'Uncategorized',
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
        
        setDbBlogs(formattedBlogs);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };
    
    fetchBlogs();
  }, []);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !newCommentName || !newCommentText) return;
    const newComment = { name: newCommentName, text: newCommentText, date: new Date().toLocaleDateString() };
    setPostComments(prev => ({
      ...prev,
      [selectedPost.id]: [...(prev[selectedPost.id] || []), newComment]
    }));
    setNewCommentName('');
    setNewCommentText('');
  };

  const allBlogs = [...dbBlogs, ...BLOG_POSTS];

  const featuredPosts = allBlogs.filter(p => p.isFeatured && p.status === 'published');
  const publishedPosts = allBlogs.filter(p => p.status === 'published' || p.status === undefined);

  const filteredPosts = selectedTag
    ? publishedPosts.filter(p => p.tags.includes(selectedTag))
    : publishedPosts;

  const allTags = Array.from(new Set(publishedPosts.flatMap(p => p.tags)));

  return (
    <div className="py-12 bg-[#F6F7F9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NAVOYANTRA KNOWLEDGE & ROBOTICS HUB</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-slate-900 tracking-tight">
            STEM & Robotics Education Blog
          </h1>

          <p className="text-base text-slate-600">
            Insights, step-by-step tutorial guides, AI vision breakdowns, and school Atal Tinkering Lab setup articles written by STEM educators.
          </p>

          <div className="pt-4 flex justify-center space-x-4">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg transition-transform hover:scale-105"
            >
              Submit Your Tutorial
            </button>
          </div>
        </div>

        {/* Featured Hero Blog Article Slider */}
        {featuredPosts.length > 0 && (
          <div className="relative w-full overflow-hidden flex space-x-6 py-4">
            <div className="flex space-x-6 animate-marquee hover:pause-animation min-w-full group">
              {[...featuredPosts, ...featuredPosts].map((post, idx) => (
                <div 
                  key={`${post.id}-${idx}`}
                  onClick={() => setSelectedPost(post)}
                  className="rounded-3xl bg-white border border-slate-200/80 shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300 flex-none w-[85vw] sm:w-[600px] lg:w-[800px] grid grid-cols-1 sm:grid-cols-2 group/card"
                >
                  <div className="relative aspect-16/10 sm:aspect-auto overflow-hidden bg-slate-900">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-extrabold text-xs shadow-md">
                        FEATURED ARTICLE
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 text-xs text-slate-400 font-semibold">
                        <span className="text-purple-600 font-bold">{post.category}</span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{post.readTime}</span>
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 group-hover/card:text-blue-600 transition-colors leading-tight line-clamp-3">
                        {post.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {post.author.avatar ? (
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className={`w-10 h-10 rounded-full object-cover border ${post.author.isOfficial ? 'border-blue-500' : 'border-slate-200'}`}
                          />
                        ) : (
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-blue-700 bg-blue-100 border ${post.author.isOfficial ? 'border-blue-500' : 'border-slate-200'}`}>
                            {post.author.name ? post.author.name[0].toUpperCase() : 'A'}
                          </div>
                        )}
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 flex items-center space-x-1">
                            <span>{post.author.name}</span>
                            {post.author.isOfficial && <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />}
                          </h4>
                          <p className="text-[10px] text-slate-400">{post.author.role}</p>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-blue-600 flex items-center space-x-1 transition-transform group-hover/card:translate-x-1">
                        <span>Read</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tag Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 text-xs">
          <span className="font-bold text-slate-400 whitespace-nowrap">Filter Tags:</span>
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
              selectedTag === null ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            All Posts
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                selectedTag === tag ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="rounded-3xl bg-white border border-slate-200/80 shadow-lg hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-16/10 overflow-hidden relative bg-slate-900">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 text-white text-[10px] font-extrabold uppercase backdrop-blur-md">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    <span>{post.publishedDate}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-2">
                    {post.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {post.author.avatar ? (
                    <img src={post.author.avatar} alt={post.author.name} className={`w-7 h-7 rounded-full object-cover border ${post.author.isOfficial ? 'border-blue-500' : 'border-slate-200'}`} />
                  ) : (
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-blue-700 bg-blue-100 border ${post.author.isOfficial ? 'border-blue-500' : 'border-slate-200'} text-[10px]`}>
                      {post.author.name ? post.author.name[0].toUpperCase() : 'A'}
                    </div>
                  )}
                  <span className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                    <span>{post.author.name}</span>
                    {post.author.isOfficial && <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />}
                  </span>
                </div>
                <span className="text-xs font-bold text-blue-600 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full Article Reading Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200 my-8">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">
                {selectedPost.category}
              </span>
              <button onClick={() => setSelectedPost(null)} className="p-2 rounded-xl text-slate-400 hover:bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 max-h-[80vh] overflow-y-auto space-y-6">
              <h1 className="text-3xl font-extrabold font-heading text-slate-900">
                {selectedPost.title}
              </h1>

              <div className="flex items-center space-x-4 border-y border-slate-100 py-3 text-xs text-slate-500">
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

              <div className="aspect-16/9 rounded-2xl overflow-hidden">
                <img src={selectedPost.coverImage} alt="Cover" className="w-full h-full object-cover" />
              </div>

              <div 
                className="prose text-slate-700 text-sm leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />

              <div className="pt-8 mt-8 border-t border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Comments & Reviews</h3>
                
                <div className="space-y-6 mb-8">
                  {(postComments[selectedPost.id] || []).length > 0 ? (
                    (postComments[selectedPost.id] || []).map((comment, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-slate-900 text-sm">{comment.name}</span>
                          <span className="text-[10px] text-slate-400">{comment.date}</span>
                        </div>
                        <p className="text-sm text-slate-600">{comment.text}</p>
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
                <button onClick={() => setSelectedPost(null)} className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800">
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Blog Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 w-full max-w-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-heading text-slate-900">Submit a Tutorial</h2>
              <button onClick={() => setIsSubmitModalOpen(false)} className="text-slate-400 hover:text-slate-900"><X className="w-5 h-5"/></button>
            </div>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Blog submitted for admin approval!'); setIsSubmitModalOpen(false); }}>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Title</label>
                <input type="text" required className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="My Awesome Project" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                  <select className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Community Projects</option>
                    <option>Robotics</option>
                    <option>IoT</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Author Name</label>
                  <input type="text" required className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Content</label>
                <textarea required rows={5} className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Write your tutorial here..."></textarea>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors">Submit for Review</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
