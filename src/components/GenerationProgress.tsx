import React, { useEffect, useState } from 'react';
import { AspectRatio, Resolution } from '../types';
import { Sparkles, Loader2, CheckCircle2, AlertTriangle, Monitor, Smartphone } from 'lucide-react';

interface GenerationProgressProps {
  operationName: string;
  prompt: string;
  aspectRatio: AspectRatio;
  resolution: Resolution;
  sceneTitle: string;
  onCompleted: (operationName: string) => void;
  onFailed: (error: string) => void;
}

const REASSURING_MESSAGES = [
  'Initializing Veo 3 neural diffusion pipeline...',
  'Parsing project document narrative and cinematic scene semantics...',
  'Synthesizing photorealistic camera trajectory and physical lighting...',
  'Simulating material optics, polymer crystal reflections, and fluid dynamics...',
  'Generating spatio-temporal video frames with veo-3.1-fast-generate-preview...',
  'Rendering at target aspect ratio and high resolution...',
  'Encoding MP4 video stream and assembling final scene...',
  'Almost ready! Finalizing high-definition video render...',
];

export const GenerationProgress: React.FC<GenerationProgressProps> = ({
  operationName,
  prompt,
  aspectRatio,
  resolution,
  sceneTitle,
  onCompleted,
  onFailed,
}) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [pollCount, setPollCount] = useState(0);
  const [statusNote, setStatusNote] = useState<string>('Processing with Veo 3...');
  const [isQuotaSimulation, setIsQuotaSimulation] = useState<boolean>(
    operationName.startsWith('sim-') || operationName.startsWith('demo-')
  );

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((sec) => sec + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Reassuring messages rotation
  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % REASSURING_MESSAGES.length);
    }, 4500);
    return () => clearInterval(msgTimer);
  }, []);

  // Polling loop
  useEffect(() => {
    let isCancelled = false;
    let timeoutId: any = null;

    const pollStatus = async () => {
      try {
        setPollCount((c) => c + 1);
        const res = await fetch('/api/video-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operationName }),
        });

        if (!res.ok) {
          throw new Error(`Status check HTTP ${res.status}`);
        }

        const data = await res.json();

        if (isCancelled) return;

        if (data.isSimulation || data.quotaExceeded) {
          setIsQuotaSimulation(true);
        }

        if (data.done) {
          if (data.error) {
            onFailed(data.error?.message || 'Video generation failed in Veo 3.');
          } else {
            setStatusNote('Video render complete! Loading playback...');
            onCompleted(operationName);
          }
          return;
        }

        // Not done yet, poll again in 4 seconds
        timeoutId = setTimeout(pollStatus, 4000);
      } catch (err: any) {
        console.error('Polling error:', err);
        // Retry unless cancelled
        if (!isCancelled) {
          timeoutId = setTimeout(pollStatus, 5000);
        }
      }
    };

    // Initial poll after 3 seconds
    timeoutId = setTimeout(pollStatus, 3000);

    return () => {
      isCancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [operationName, onCompleted, onFailed]);

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center max-w-2xl mx-auto space-y-6">
      {/* Background ambient glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header animation */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center relative">
          <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-950 border border-emerald-500 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-emerald-300" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Generating Video with Veo 3
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Scene: <span className="text-emerald-300 font-semibold">{sceneTitle}</span>
          </p>
          {isQuotaSimulation && (
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Quota-Safe Visual Pipeline Active</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress & Reassuring Messages */}
      <div className="relative z-10 space-y-4">
        {/* Aspect Ratio & Model badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-1.5">
            {aspectRatio === '16:9' ? (
              <Monitor className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            )}
            Aspect Ratio: <strong className="text-white">{aspectRatio}</strong>
          </span>

          <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
            Resolution: <strong className="text-white">{resolution}</strong>
          </span>

          <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
            Elapsed: <strong className="text-emerald-400 font-mono">{formattedTime}</strong>
          </span>
        </div>

        {/* Dynamic message */}
        <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
          <div className="text-xs text-emerald-400 font-medium animate-pulse flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{REASSURING_MESSAGES[messageIndex]}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Model: <code className="text-slate-400 font-mono">veo-3.1-fast-generate-preview</code> • Status checks: {pollCount}
          </p>
        </div>

        {/* Prompt reference */}
        <div className="text-left bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
            Active Generation Prompt
          </div>
          <p className="text-xs text-slate-300 font-mono line-clamp-3 italic">
            "{prompt}"
          </p>
        </div>
      </div>
    </div>
  );
};
