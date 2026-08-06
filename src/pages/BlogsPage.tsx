import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogs';
import { BlogPost } from '../types';
import { 
  BookOpen, Sparkles, Clock, ArrowRight, User, Tag, X, Calendar 
} from 'lucide-react';

export const BlogsPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const featuredPost = BLOG_POSTS.find(p => p.isFeatured) || BLOG_POSTS[0];

  const filteredPosts = selectedTag
    ? BLOG_POSTS.filter(p => p.tags.includes(selectedTag))
    : BLOG_POSTS;

  const allTags = Array.from(new Set(BLOG_POSTS.flatMap(p => p.tags)));

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
        </div>

        {/* Featured Hero Blog Article Card */}
        {featuredPost && (
          <div 
            onClick={() => setSelectedPost(featuredPost)}
            className="rounded-3xl bg-white border border-slate-200/80 shadow-xl overflow-hidden cursor-pointer group hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-7 relative aspect-16/10 lg:aspect-auto overflow-hidden bg-slate-900">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-extrabold text-xs shadow-md">
                  FEATURED ARTICLE
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-xs text-slate-400 font-semibold">
                  <span className="text-purple-600 font-bold">{featuredPost.category}</span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredPost.readTime}</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-blue-500"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{featuredPost.author.name}</h4>
                    <p className="text-[10px] text-slate-400">{featuredPost.author.role}</p>
                  </div>
                </div>

                <span className="text-xs font-bold text-blue-600 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Post</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
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
                  <img src={post.author.avatar} alt={post.author.name} className="w-7 h-7 rounded-full object-cover" />
                  <span className="text-xs font-bold text-slate-700">{post.author.name}</span>
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
                  <img src={selectedPost.author.avatar} alt="Author" className="w-8 h-8 rounded-full" />
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

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {selectedPost.tags.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                      #{t}
                    </span>
                  ))}
                </div>
                <button onClick={() => setSelectedPost(null)} className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs">
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
