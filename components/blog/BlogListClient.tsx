'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  BookOpen,
  Clock,
  ArrowRight,
  Search,
  CheckCircle2,
  Calendar,
  Layers,
  Wrench,
} from 'lucide-react';
import { BlogPost } from '@/lib/blog';

interface BlogListClientProps {
  posts: BlogPost[];
  categories: readonly string[];
}

export function BlogListClient({ posts, categories }: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q) ||
      post.targetKeyword.toLowerCase().includes(q) ||
      post.secondaryKeywords.some((k) => k.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return posts.length;
    return posts.filter((p) => p.category === cat).length;
  };

  return (
    <div className="space-y-10">
      {/* Category Pills & Search Filter Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xs backdrop-blur-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Real-time Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides by keyword, portal, or format..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 font-mono font-medium self-end md:self-auto">
            Showing <strong className="text-slate-900 dark:text-white">{filteredPosts.length}</strong> of {posts.length} articles
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 flex items-center gap-1.5 ${
              selectedCategory === 'All'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <span>All Articles</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                selectedCategory === 'All'
                  ? 'bg-white/20 text-current'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
              }`}
            >
              {getCategoryCount('All')}
            </span>
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = getCategoryCount(cat);
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-current'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-xs">
          <BookOpen className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
            No articles found matching &quot;{searchQuery}&quot;
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Try adjusting your search terms or selecting a different category.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-xs hover:bg-indigo-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          {/* Featured Post Card (Hero Spotlight) */}
          {featuredPost && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                  {selectedCategory === 'All' ? 'Featured Article' : `${selectedCategory} Spotlight`}
                </span>
              </div>

              <div className="relative rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden p-6 sm:p-8 backdrop-blur-sm group">
                {/* Top Glowing Gradient Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start justify-between">
                  <div className="space-y-3.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-xl text-xs font-bold font-mono bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/70">
                        {featuredPost.category}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredPost.readTime}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        {featuredPost.updatedAt}
                      </span>
                    </div>

                    <Link href={`/blog/${featuredPost.slug}`}>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                        {featuredPost.title}
                      </h2>
                    </Link>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {featuredPost.excerpt}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all hover:scale-105"
                      >
                        <span>Read Full Guide</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      {/* Direct Tool Shortcut */}
                      <Link
                        href={featuredPost.featuredTool.slug}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:border-indigo-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                      >
                        <Wrench className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Launch Tool: {featuredPost.featuredTool.name}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Remaining Guides Grid */}
          {remainingPosts.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                  {selectedCategory === 'All' ? 'All Practical Guides' : `More in ${selectedCategory}`}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {remainingPosts.length} {remainingPosts.length === 1 ? 'article' : 'articles'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {remainingPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="group relative rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-5 flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2.5 py-0.5 rounded-md font-mono font-bold text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                          {post.category}
                        </span>
                        <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <Link href={`/blog/${post.slug}`} className="block">
                        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 font-normal">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-1.5"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <Link
                        href={post.featuredTool.slug}
                        className="text-[11px] font-mono font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                        title={`Open ${post.featuredTool.name}`}
                      >
                        <span>{post.featuredTool.badge} &rarr;</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
