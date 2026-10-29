import React, { useState } from 'react';
import { GeneratedVideo, AspectRatio } from '../types';
import { Film, Play, Download, Trash2, Monitor, Smartphone, Sparkles, Filter } from 'lucide-react';

interface VideoGalleryProps {
  videos: GeneratedVideo[];
  onSelectVideo: (video: GeneratedVideo) => void;
  onDeleteVideo: (id: string) => void;
  onOpenStudio: () => void;
}

export const VideoGallery: React.FC<VideoGalleryProps> = ({
  videos,
  onSelectVideo,
  onDeleteVideo,
  onOpenStudio,
}) => {
  const [filterRatio, setFilterRatio] = useState<string>('all');

  const filteredVideos = videos.filter((v) => {
    if (filterRatio === '16:9') return v.aspectRatio === '16:9';
    if (filterRatio === '9:16') return v.aspectRatio === '9:16';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <Film className="w-4 h-4" />
            <span>Generated Video Library</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Project Video Archives
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            All renders generated with Veo 3 (<code className="text-emerald-400 font-mono">veo-3.1-fast-generate-preview</code>).
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilterRatio('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                filterRatio === 'all' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({videos.length})
            </button>
            <button
              onClick={() => setFilterRatio('16:9')}
              className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1 ${
                filterRatio === '16:9' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3 h-3" /> 16:9
            </button>
            <button
              onClick={() => setFilterRatio('9:16')}
              className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1 ${
                filterRatio === '9:16' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3 h-3" /> 9:16
            </button>
          </div>
        </div>
      </div>

      {filteredVideos.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Film className="w-7 h-7 text-emerald-400" />
          </div>
          <h3 className="text-base font-bold text-white">No videos found</h3>
          <p className="text-xs text-slate-400">
            Generate your first video from "The Plastic Project" report using Veo 3 fast preview.
          </p>
          <button
            onClick={onOpenStudio}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow transition cursor-pointer"
          >
            Start Generating Video
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((item) => {
            const isPortrait = item.aspectRatio === '9:16';
            const defaultClip = isPortrait ? '/videos/demo-polymer-9x16.mp4' : '/videos/demo-ocean-16x9.mp4';
            let videoSrc = item.videoUrl;
            if (!videoSrc || videoSrc.includes('commondatastorage.googleapis.com') || videoSrc.includes('BigBuckBunny') || videoSrc.includes('ForBiggerBlazes')) {
              videoSrc = defaultClip;
            }
            return (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition flex flex-col group shadow-lg"
              >
                {/* Thumbnail / Video Preview Frame */}
                <div
                  onClick={() => onSelectVideo(item)}
                  className={`bg-black relative overflow-hidden flex items-center justify-center cursor-pointer ${
                    isPortrait ? 'aspect-[9/12]' : 'aspect-video'
                  }`}
                >
                  <video
                    src={videoSrc}
                    playsInline
                    muted
                    preload="metadata"
                    onError={(e) => {
                      (e.currentTarget as HTMLVideoElement).src = defaultClip;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />

                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 transform group-hover:scale-110 transition">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex justify-between items-center pointer-events-none">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 text-white backdrop-blur-sm">
                      {item.resolution}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold backdrop-blur-sm ${
                        isPortrait
                          ? 'bg-indigo-950/90 text-indigo-300 border border-indigo-700'
                          : 'bg-emerald-950/90 text-emerald-300 border border-emerald-700'
                      }`}
                    >
                      {item.aspectRatio}
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-mono italic">
                      "{item.prompt}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => onSelectVideo(item)}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
                        title="Play in Theater Player"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteVideo(item.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition cursor-pointer"
                        title="Delete from Library"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
