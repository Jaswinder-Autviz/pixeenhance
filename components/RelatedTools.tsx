import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, FastForward } from 'lucide-react';
import { getTool, getRelatedTools, getNextStepTools, getCategory } from '@/lib/tools';

interface RelatedToolsProps {
  currentSlug: string;
  className?: string;
}

export function RelatedTools({ currentSlug, className = '' }: RelatedToolsProps) {
  const currentTool = getTool(currentSlug);
  if (!currentTool) return null;

  const related = getRelatedTools(currentSlug, 6);
  const nextSteps = getNextStepTools(currentSlug);

  if (related.length === 0 && nextSteps.length === 0) return null;

  return (
    <section className={`w-full space-y-8 my-10 ${className}`} aria-labelledby="related-tools-heading">
      {/* Next Recommended Workflow Step */}
      {nextSteps.length > 0 && (
        <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/70 via-purple-50/40 to-slate-50 dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-slate-900/50 p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
              <FastForward className="h-3.5 w-3.5" />
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              Recommended Next Step
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {nextSteps.map((step) => {
              const cat = getCategory(step.category);
              return (
                <Link
                  key={step.slug}
                  href={step.slug}
                  className="group relative flex items-center justify-between p-3.5 rounded-xl border border-indigo-100 dark:border-indigo-800/60 bg-white/90 dark:bg-slate-900/80 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all"
                >
                  <div className="min-w-0 pr-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                      {cat?.title || step.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {step.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-indigo-500 shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Contextual Related Tools Grid */}
      {related.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 id="related-tools-heading" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Related Free Image &amp; PDF Tools
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                More tools commonly used alongside {currentTool.title}:
              </p>
            </div>
            <Link
              href="/tools"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
            >
              <span>View All Tools</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((rel) => {
              const cat = getCategory(rel.category);
              return (
                <div
                  key={rel.slug}
                  className="group relative flex flex-col justify-between p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-lg transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                        {cat?.title || rel.category}
                      </span>
                      <Sparkles className="h-3.5 w-3.5 text-brand-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      <Link href={rel.slug} className="after:absolute after:inset-0">
                        {rel.title}
                      </Link>
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mt-1.5">
                      {rel.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-brand-600 dark:text-brand-400">
                    <span>Open Tool</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

export default RelatedTools;
