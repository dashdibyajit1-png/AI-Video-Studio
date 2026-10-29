import React, { useState } from 'react';
import { AspectRatio, Resolution, StoryboardScene, ProjectDocument } from '../types';
import {
  Sparkles,
  Video,
  Layers,
  Wand2,
  Sliders,
  Monitor,
  Smartphone,
  RefreshCw,
  Info,
  Check,
  FileText
} from 'lucide-react';

interface VideoStudioProps {
  document: ProjectDocument;
  selectedScene: StoryboardScene | null;
  onSceneChange: (scene: StoryboardScene) => void;
  onStartGeneration: (params: {
    prompt: string;
    aspectRatio: AspectRatio;
    resolution: Resolution;
    sceneTitle: string;
    sceneId?: string;
  }) => void;
  isGenerating: boolean;
}

const STYLE_PRESETS = [
  {
    id: 'documentary',
    label: 'Cinematic Documentary',
    snippet: 'National Geographic aesthetic, warm natural volumetric lighting, 8k documentary cinematography, organic realism',
  },
  {
    id: 'hightech-lab',
    label: 'High-Tech SUEZ Plast\'lab',
    snippet: 'State-of-the-art cleanroom research laboratory, pulsing laser beams, ultra-sharp macro focus, cool teal and white fluorescent illumination',
  },
  {
    id: 'ocean-ecology',
    label: 'Marine & Ocean Ecology',
    snippet: 'Pristine azure ocean waves, bright sunlight glistening on crystal water, cinematic drone perspective, serene ecological mood',
  },
  {
    id: 'industrial-circular',
    label: 'Industrial Circularity',
    snippet: 'Modern automated recycling facility, stainless steel machinery, glowing thermal heating elements, steam rising, steady tracking camera',
  },
  {
    id: 'minimal-product',
    label: 'Pure Product Commercial',
    snippet: 'Studio lighting, soft reflections on crystal-clear recycled PET, slow motion fluid dynamics, premium minimalist commercial aesthetic',
  },
];

const CAMERA_MOVEMENTS = [
  'Slow continuous push-in',
  'Low-angle tracking shot',
  'Macro panning across polymer surface',
  'Smooth orbital 360 rotation',
  'High-angle aerial drone flyover',
  'Gentle slow-motion dolly zoom',
];

const LIGHTING_STYLES = [
  'Volumetric golden hour sunbeams',
  'Cleanroom clinical daylight 5600K',
  'Vibrant neon laser refractive glow',
  'Moody industrial high contrast rim light',
  'Soft diffused softbox studio light',
];

export const VideoStudio: React.FC<VideoStudioProps> = ({
  document,
  selectedScene,
  onSceneChange,
  onStartGeneration,
  isGenerating,
}) => {
  const defaultScene = selectedScene || document.scenes[0];

  const [prompt, setPrompt] = useState<string>(defaultScene.suggestedPrompt);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(defaultScene.aspectRatio || '16:9');
  const [resolution, setResolution] = useState<Resolution>('720p');
  const [sceneTitle, setSceneTitle] = useState<string>(defaultScene.title);
  const [isEnhancingPrompt, setIsEnhancingPrompt] = useState<boolean>(false);
  const [visualNotes, setVisualNotes] = useState<string[]>([]);

  // When selected scene changes from parent
  React.useEffect(() => {
    if (selectedScene) {
      setPrompt(selectedScene.suggestedPrompt);
      setAspectRatio(selectedScene.aspectRatio);
      setSceneTitle(selectedScene.title);
    }
  }, [selectedScene]);

  const handleSelectScene = (scene: StoryboardScene) => {
    onSceneChange(scene);
    setPrompt(scene.suggestedPrompt);
    setAspectRatio(scene.aspectRatio);
    setSceneTitle(scene.title);
  };

  const handleApplyStyle = (styleSnippet: string) => {
    setPrompt((prev) => {
      // clean trailing punctuation
      const trimmed = prev.trim().replace(/[.,;]+$/, '');
      return `${trimmed}, ${styleSnippet}.`;
    });
  };

  const handleApplyModifier = (modifier: string) => {
    setPrompt((prev) => {
      const trimmed = prev.trim().replace(/[.,;]+$/, '');
      return `${trimmed}, ${modifier.toLowerCase()}.`;
    });
  };

  // AI Prompt Synthesizer with Gemini 3.8 Flash
  const handleEnhanceWithGemini = async () => {
    setIsEnhancingPrompt(true);
    try {
      const res = await fetch('/api/synthesize-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentExcerpt: `${sceneTitle}: ${prompt}`,
          aspectRatio,
          stylePreset: 'Cinematic Documentary',
          visualFocus: 'Veo 3 high realism and physical coherence',
        }),
      });
      const data = await res.json();
      if (data.prompt) {
        setPrompt(data.prompt);
      }
      if (data.sceneTitle && !sceneTitle) {
        setSceneTitle(data.sceneTitle);
      }
      if (data.visualNotes) {
        setVisualNotes(data.visualNotes);
      }
    } catch (err) {
      console.error('Error refining prompt:', err);
    } finally {
      setIsEnhancingPrompt(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    onStartGeneration({
      prompt: prompt.trim(),
      aspectRatio,
      resolution,
      sceneTitle,
      sceneId: defaultScene?.id,
    });
  };

  return (
    <div className="space-y-8">
      {/* Studio Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Veo 3 Video Generator</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Generate Video from Project Report
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Transforming "{document.title}" into cinematic motion with Veo 3 (<code className="text-emerald-400 font-mono">veo-3.1-fast-generate-preview</code>).
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
            <span className="text-slate-400">Target Ratios:</span>{' '}
            <strong className="text-white">16:9</strong> (Landscape) or <strong className="text-white">9:16</strong> (Portrait)
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Scene Selector from Project Document */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Project Scenes ({document.scenes.length})</span>
            </h2>
            <span className="text-xs text-slate-400">Select to load</span>
          </div>

          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
            {document.scenes.map((scene) => {
              const isSelected = selectedScene?.id === scene.id;
              return (
                <button
                  key={scene.id}
                  type="button"
                  id={`select-scene-${scene.id}`}
                  onClick={() => handleSelectScene(scene)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col space-y-2 ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500 shadow-md shadow-emerald-500/10'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-950 text-slate-300">
                      Pg. {scene.sourcePage}
                    </span>
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                        scene.aspectRatio === '9:16'
                          ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                          : 'bg-teal-950 text-teal-300 border border-teal-800'
                      }`}
                    >
                      {scene.aspectRatio}
                    </span>
                  </div>

                  <div>
                    <h3
                      className={`text-sm font-semibold line-clamp-1 ${
                        isSelected ? 'text-emerald-300' : 'text-white'
                      }`}
                    >
                      {scene.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
                      {scene.description}
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-400 flex flex-wrap gap-1">
                    {scene.tags.map((tag, idx) => (
                      <span key={idx} className="bg-slate-950/60 px-1.5 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Generation Controls & Prompt Builder */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            {/* Title & Page Context */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Scene Title & Reference
                </label>
                <span className="text-xs text-slate-400 flex items-center">
                  <FileText className="w-3.5 h-3.5 mr-1 text-teal-400" />
                  Linked to Page {defaultScene.sourcePage} of The Plastic Project
                </span>
              </div>
              <input
                id="input-scene-title"
                type="text"
                value={sceneTitle}
                onChange={(e) => setSceneTitle(e.target.value)}
                placeholder="Scene title..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            {/* Aspect Ratio & Resolution Controls (Strictly 16:9 or 9:16) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Aspect Ratio Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Aspect Ratio</span>
                  <span className="text-emerald-400 font-normal">Veo 3 Standard</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    id="btn-aspect-16-9"
                    onClick={() => setAspectRatio('16:9')}
                    className={`flex items-center justify-center space-x-2 py-3 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      aspectRatio === '16:9'
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                    <span>16:9 (Landscape)</span>
                  </button>

                  <button
                    type="button"
                    id="btn-aspect-9-16"
                    onClick={() => setAspectRatio('9:16')}
                    className={`flex items-center justify-center space-x-2 py-3 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      aspectRatio === '9:16'
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>9:16 (Portrait)</span>
                  </button>
                </div>
              </div>

              {/* Resolution Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Resolution</span>
                  <span className="text-slate-400 font-normal">Veo 3 Fast Preview</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    id="btn-res-720p"
                    onClick={() => setResolution('720p')}
                    className={`py-3 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      resolution === '720p'
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    720p HD (Optimal)
                  </button>

                  <button
                    type="button"
                    id="btn-res-1080p"
                    onClick={() => setResolution('1080p')}
                    className={`py-3 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      resolution === '1080p'
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    1080p Full HD
                  </button>
                </div>
              </div>
            </div>

            {/* Prompt Textarea & Gemini Synthesis */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Veo 3 Video Prompt
                </label>
                <button
                  type="button"
                  id="btn-gemini-enhance"
                  onClick={handleEnhanceWithGemini}
                  disabled={isEnhancingPrompt}
                  className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition cursor-pointer"
                >
                  <Wand2 className={`w-3.5 h-3.5 ${isEnhancingPrompt ? 'animate-spin' : ''}`} />
                  <span>{isEnhancingPrompt ? 'Refining with Gemini...' : 'Synthesize Prompt with Gemini'}</span>
                </button>
              </div>

              <div className="relative">
                <textarea
                  id="textarea-veo-prompt"
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your scene visually for Veo 3: camera movement, lighting, materials, and motion..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white font-mono leading-relaxed focus:outline-none focus:border-emerald-500 transition resize-y"
                />
              </div>

              {visualNotes.length > 0 && (
                <div className="p-3 bg-slate-950/80 border border-emerald-500/20 rounded-xl space-y-1">
                  <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Gemini Visual Direction Notes</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-0.5 list-disc list-inside">
                    {visualNotes.map((note, i) => (
                      <li key={i}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Style Presets */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Visual Style Presets (Click to append)
              </label>
              <div className="flex flex-wrap gap-2">
                {STYLE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleApplyStyle(preset.snippet)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800 text-slate-300 transition cursor-pointer"
                  >
                    + {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Camera & Lighting Quick Modifiers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Camera Motion
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {CAMERA_MOVEMENTS.map((cam, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyModifier(cam)}
                      className="text-[11px] px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition cursor-pointer"
                    >
                      + {cam}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Atmospheric Lighting
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {LIGHTING_STYLES.map((light, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyModifier(light)}
                      className="text-[11px] px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition cursor-pointer"
                    >
                      + {light}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 flex items-center space-x-1.5">
                <Info className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  Uses model <strong className="text-white font-mono">veo-3.1-fast-generate-preview</strong> with aspect ratio <strong className="text-emerald-300">{aspectRatio}</strong>.
                </span>
              </div>

              <button
                type="submit"
                id="btn-submit-generation"
                disabled={isGenerating || !prompt.trim()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Video className="w-4 h-4" />
                <span>Generate Video with Veo 3</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
