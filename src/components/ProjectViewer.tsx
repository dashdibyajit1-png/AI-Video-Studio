import React, { useState } from 'react';
import { ProjectDocument, StoryboardScene, ProjectPage } from '../types';
import {
  FileText,
  Sparkles,
  TrendingUp,
  Droplets,
  Layers,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Video,
  Eye,
  CheckCircle,
  Building2,
  GraduationCap
} from 'lucide-react';

interface ProjectViewerProps {
  document: ProjectDocument;
  onSelectSceneForGeneration: (scene: StoryboardScene) => void;
  onSelectPageForGeneration: (page: ProjectPage) => void;
}

export const ProjectViewer: React.FC<ProjectViewerProps> = ({
  document,
  onSelectSceneForGeneration,
  onSelectPageForGeneration,
}) => {
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const activePage = document.pages[activePageIndex];

  return (
    <div className="space-y-8">
      {/* Hero Overview Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center">
                <FileText className="w-3.5 h-3.5 mr-1" /> Active Project File
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 flex items-center">
                <GraduationCap className="w-3.5 h-3.5 mr-1 text-teal-400" /> {document.institution}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 flex items-center">
                <Building2 className="w-3.5 h-3.5 mr-1 text-cyan-400" /> Organization: {document.targetCompany}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {document.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {document.executiveSummary}
            </p>

            <div className="text-xs text-slate-400 pt-1 flex flex-wrap gap-x-4 gap-y-1">
              <span><strong>Course:</strong> {document.course}</span>
              <span><strong>Instructor:</strong> {document.instructor}</span>
              <span><strong>Author:</strong> {document.author}</span>
              <span><strong>Pages:</strong> {document.totalPages}</span>
            </div>
          </div>

          <div className="flex-shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
            <button
              id="btn-generate-hero"
              onClick={() => onSelectSceneForGeneration(document.scenes[0])}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-semibold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <Video className="w-4 h-4" />
              <span>Generate Intro Video</span>
            </button>
            <div className="text-center text-xs text-slate-400">
              Powered by Veo 3 (<span className="font-mono text-emerald-400">veo-3.1-fast-generate-preview</span>)
            </div>
          </div>
        </div>
      </div>

      {/* Key Project Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {document.keyMetrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition"
          >
            <div className="text-xs text-slate-400 font-medium mb-1">{metric.label}</div>
            <div className="text-2xl font-bold text-white tracking-tight flex items-baseline gap-2">
              <span className="text-emerald-400">{metric.value}</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">{metric.context}</p>
          </div>
        ))}
      </div>

      {/* Recommended Veo 3 Video Scenes Extracted From Project */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>Curated Video Storyboards from Project</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Select any scene synthesized directly from the research report to generate with Veo 3 in 16:9 or 9:16.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {document.scenes.map((scene) => (
            <div
              key={scene.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition group flex flex-col"
            >
              {/* Card visual banner */}
              <div
                className={`h-24 bg-gradient-to-r ${scene.thumbnailGradient} p-4 flex flex-col justify-between relative overflow-hidden`}
              >
                <div className="flex items-center justify-between z-10">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-950/70 text-white backdrop-blur-sm">
                    Page {scene.sourcePage}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-950/70 text-emerald-300 backdrop-blur-sm">
                    {scene.aspectRatio}
                  </span>
                </div>
                <div className="text-xs text-white/90 font-medium line-clamp-1 z-10 drop-shadow">
                  {scene.tags.join(' • ')}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-semibold text-white text-base group-hover:text-emerald-300 transition">
                    {scene.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {scene.description}
                  </p>
                </div>

                <div className="bg-slate-800/60 rounded-lg p-2.5 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Veo 3 Prompt</span>
                    <span className="text-emerald-400 font-normal lowercase">aspect: {scene.aspectRatio}</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-3 italic font-mono">
                    "{scene.suggestedPrompt}"
                  </p>
                </div>

                <button
                  id={`btn-scene-${scene.id}`}
                  onClick={() => onSelectSceneForGeneration(scene)}
                  className="w-full py-2.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs flex items-center justify-center space-x-1.5 shadow transition cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Configure & Generate with Veo 3</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document Page-by-Page Browser */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-400" />
              <span>Document Page Browser ({document.pages.length} Pages)</span>
            </h2>
            <p className="text-xs text-slate-400">
              Read exact findings from "The Plastic Project" and generate custom video prompts for any specific page.
            </p>
          </div>

          {/* Page Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {document.pages.map((p, idx) => (
              <button
                key={p.pageNumber}
                onClick={() => setActivePageIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap cursor-pointer ${
                  activePageIndex === idx
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Pg. {p.pageNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Active Page View */}
        {activePage && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                  <span>Page {activePage.pageNumber} of {document.pages.length}</span>
                  <span>•</span>
                  <span>{activePage.visualTheme}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{activePage.title}</h3>
                {activePage.subtitle && (
                  <h4 className="text-sm text-slate-400">{activePage.subtitle}</h4>
                )}
              </div>

              <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl space-y-2">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Page Summary
                </h5>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activePage.summary}
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Key Document Facts & Metrics
                </h5>
                <ul className="space-y-1.5">
                  {activePage.keyFacts.map((fact, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-slate-300 flex items-start space-x-2"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg">
                <div className="text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Report Excerpt (OCR text)
                </div>
                <p className="text-xs text-slate-400 italic leading-relaxed">
                  "{activePage.ocrSnippet}"
                </p>
              </div>
            </div>

            {/* Video Generation Trigger for This Page */}
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-5 space-y-4">
              <div className="flex items-center space-x-2 text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Page Video Prompt
                </span>
              </div>

              <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-700/50">
                <p className="text-xs text-slate-300 font-mono italic leading-relaxed">
                  "{activePage.suggestedPrompt}"
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Engine:</span>
                  <span className="text-white font-mono">Veo 3</span>
                </div>
                <div className="flex justify-between">
                  <span>Model:</span>
                  <span className="text-emerald-400 font-mono">veo-3.1-fast-generate-preview</span>
                </div>
                <div className="flex justify-between">
                  <span>Supported Ratios:</span>
                  <span className="text-white">16:9 (Landscape) or 9:16 (Portrait)</span>
                </div>
              </div>

              <button
                id={`btn-page-${activePage.pageNumber}-generate`}
                onClick={() => onSelectPageForGeneration(activePage)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-semibold text-xs flex items-center justify-center space-x-2 shadow-md shadow-emerald-500/20 transition cursor-pointer"
              >
                <Video className="w-4 h-4" />
                <span>Generate Video from Page {activePage.pageNumber}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
