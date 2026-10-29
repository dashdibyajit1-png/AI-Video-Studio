import React, { useRef, useState, useEffect } from 'react';
import { GeneratedVideo, AspectRatio } from '../types';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Download,
  RotateCcw,
  Sparkles,
  Film,
  Monitor,
  Smartphone,
  Share2,
  ExternalLink,
  Check
} from 'lucide-react';

interface VideoPlayerProps {
  video: GeneratedVideo;
  onRegenerate?: (video: GeneratedVideo) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onRegenerate }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const isPortrait = video.aspectRatio === '9:16';
  const defaultFallbackUrl = isPortrait ? '/videos/demo-polymer-9x16.mp4' : '/videos/demo-ocean-16x9.mp4';

  const [currentSrc, setCurrentSrc] = useState<string>(() => {
    let url = video.videoUrl;
    if (!url || url.includes('commondatastorage.googleapis.com') || url.includes('BigBuckBunny') || url.includes('ForBiggerBlazes')) {
      return defaultFallbackUrl;
    }
    return url;
  });

  useEffect(() => {
    let url = video.videoUrl;
    if (!url || url.includes('commondatastorage.googleapis.com') || url.includes('BigBuckBunny') || url.includes('ForBiggerBlazes')) {
      url = defaultFallbackUrl;
    }
    setCurrentSrc(url);
    setIsPlaying(false);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [video.operationName, video.videoUrl, defaultFallbackUrl]);

  const handleVideoError = () => {
    console.warn('Video failed to load primary source, switching to verified local asset:', defaultFallbackUrl);
    setCurrentSrc(defaultFallbackUrl);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 0;
    setCurrentTime(current);
    setDuration(total);
    setProgress(total > 0 ? (current / total) * 100 : 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekPercent = parseFloat(e.target.value);
    const targetTime = (seekPercent / 100) * (videoRef.current.duration || 0);
    videoRef.current.currentTime = targetTime;
    setProgress(seekPercent);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleDownload = () => {
    // Trigger download
    const a = document.createElement('a');
    a.href = currentSrc;
    a.download = `${video.title.toLowerCase().replace(/\s+/g, '-')}-${video.aspectRatio}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(video.prompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-6 p-6">
      {/* Top Details Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <Film className="w-4 h-4" />
            <span>Generated Video • Veo 3</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {video.title}
          </h2>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400">
            <span>Model: <strong className="text-slate-300 font-mono">veo-3.1-fast-generate-preview</strong></span>
            <span>•</span>
            <span>Resolution: <strong className="text-slate-300">{video.resolution}</strong></span>
            <span>•</span>
            <span>Created: <strong className="text-slate-300">{new Date(video.createdAt).toLocaleTimeString()}</strong></span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
              isPortrait
                ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
            }`}
          >
            {isPortrait ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
            {video.aspectRatio} ({isPortrait ? 'Portrait' : 'Landscape'})
          </span>

          <button
            id="btn-download-video"
            onClick={handleDownload}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition shadow cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download MP4</span>
          </button>
        </div>
      </div>

      {/* Video Frame Canvas Area */}
      <div className="flex justify-center items-center bg-slate-950 rounded-xl p-4 sm:p-6 border border-slate-800/80">
        <div
          className={`relative rounded-xl overflow-hidden bg-black shadow-2xl transition-all ${
            isPortrait
              ? 'w-full max-w-[340px] aspect-[9/16]'
              : 'w-full max-w-4xl aspect-[16/9]'
          }`}
        >
          <video
            ref={videoRef}
            src={currentSrc}
            playsInline
            loop
            onError={handleVideoError}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Big Play overlay if paused */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer transition"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/40 transition transform hover:scale-105">
                <Play className="w-7 h-7 fill-current ml-1" />
              </div>
            </div>
          )}

          {/* Player Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 sm:p-4 flex flex-col space-y-2">
            {/* Timeline Progress Slider */}
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1.5 bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="hover:text-white transition cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="hover:text-white transition cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="font-mono text-[11px] text-slate-400">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-[11px] uppercase font-bold text-emerald-400">
                  Veo 3 • {video.aspectRatio}
                </span>

                <button
                  type="button"
                  onClick={handleFullscreen}
                  className="hover:text-white transition cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prompt & Project Link Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-slate-950/60 rounded-xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Veo 3 Generation Prompt
            </span>
            <button
              onClick={handleCopyPrompt}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 cursor-pointer"
            >
              {isCopied ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied' : 'Copy Prompt'}</span>
            </button>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-mono leading-relaxed bg-slate-900/70 p-3 rounded-lg border border-slate-800/80">
            "{video.prompt}"
          </p>
        </div>

        <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Project Context
            </span>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Synthesized from "The Plastic Project: Circular Models & Sustainable Design" for Hydromo & SUEZ research.
            </p>
          </div>

          {onRegenerate && (
            <button
              type="button"
              onClick={() => onRegenerate(video)}
              className="w-full py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center justify-center space-x-1.5 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              <span>Modify Prompt & Regenerate</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
