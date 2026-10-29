import React from 'react';
import { Film, Video, Sparkles, FileText, Upload, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'studio' | 'document' | 'gallery';
  onTabChange: (tab: 'studio' | 'document' | 'gallery') => void;
  onOpenUpload: () => void;
  videoCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenUpload,
  videoCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Film className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-base tracking-tight text-white">
                Project Video Studio
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-3 h-3 mr-1" /> Veo 3
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden md:block">
              Model: <code className="text-emerald-300 font-mono">veo-3.1-fast-generate-preview</code>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          <button
            id="tab-studio"
            onClick={() => onTabChange('studio')}
            className={`flex items-center px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'studio'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Video className="w-4 h-4 mr-1.5" />
            <span>Generate Video</span>
          </button>

          <button
            id="tab-document"
            onClick={() => onTabChange('document')}
            className={`flex items-center px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'document'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-4 h-4 mr-1.5" />
            <span className="hidden sm:inline">Project File:</span>
            <span>Plastic Project</span>
          </button>

          <button
            id="tab-gallery"
            onClick={() => onTabChange('gallery')}
            className={`flex items-center px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'gallery'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Film className="w-4 h-4 mr-1.5" />
            <span>Gallery</span>
            {videoCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-xs bg-slate-700 text-slate-200">
                {videoCount}
              </span>
            )}
          </button>
        </nav>

        {/* Upload Action */}
        <div className="flex items-center space-x-2">
          <button
            id="btn-upload-project"
            onClick={onOpenUpload}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="Upload or change project document"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Upload File</span>
          </button>

          <div className="flex items-center space-x-1 text-xs px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden lg:inline">Veo 3 Engine Active</span>
          </div>
        </div>
      </div>
    </header>
  );
};
