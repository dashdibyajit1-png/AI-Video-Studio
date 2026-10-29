import React, { useState, useEffect } from 'react';
import { initialProjectDocument } from './data/plasticProjectData';
import {
  ProjectDocument,
  StoryboardScene,
  ProjectPage,
  GeneratedVideo,
  AspectRatio,
  Resolution,
} from './types';
import { Header } from './components/Header';
import { ProjectViewer } from './components/ProjectViewer';
import { VideoStudio } from './components/VideoStudio';
import { GenerationProgress } from './components/GenerationProgress';
import { VideoPlayer } from './components/VideoPlayer';
import { VideoGallery } from './components/VideoGallery';
import { UploadModal } from './components/UploadModal';
import { AlertCircle, Film, Sparkles, Video, ArrowLeft, RefreshCw } from 'lucide-react';

const STORAGE_KEY = 'veo3_generated_videos_archive_v1';

// Sample demonstration clips for instant local preview and fallback
const SAMPLE_PREVIEWS: Record<AspectRatio, string> = {
  '16:9': '/videos/demo-ocean-16x9.mp4',
  '9:16': '/videos/demo-polymer-9x16.mp4',
};

// Helper to sanitize video records so broken external URLs don't break playback
const sanitizeVideo = (v: GeneratedVideo): GeneratedVideo => {
  let url = v.videoUrl;
  if (!url || url.includes('commondatastorage.googleapis.com') || url.includes('BigBuckBunny') || url.includes('ForBiggerBlazes')) {
    url = v.aspectRatio === '9:16' ? '/videos/demo-polymer-9x16.mp4' : '/videos/demo-ocean-16x9.mp4';
  }
  return {
    ...v,
    videoUrl: url,
  };
};

export default function App() {
  const [projectDoc, setProjectDoc] = useState<ProjectDocument>(initialProjectDocument);
  const [activeTab, setActiveTab] = useState<'studio' | 'document' | 'gallery'>('studio');
  const [selectedScene, setSelectedScene] = useState<StoryboardScene>(initialProjectDocument.scenes[0]);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);

  // Active Video for Theater Player view
  const [activePlayingVideo, setActivePlayingVideo] = useState<GeneratedVideo | null>(null);

  // Generation status
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentOperationName, setCurrentOperationName] = useState<string | null>(null);
  const [activeGenParams, setActiveGenParams] = useState<{
    prompt: string;
    aspectRatio: AspectRatio;
    resolution: Resolution;
    sceneTitle: string;
    sceneId?: string;
  } | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Video Archives
  const [videos, setVideos] = useState<GeneratedVideo[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: GeneratedVideo[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(sanitizeVideo);
        }
      }
    } catch (e) {
      console.error('Could not load saved videos:', e);
    }
    // Default initial demonstration items (both 16:9 and 9:16)
    return [
      {
        id: 'initial-demo-1',
        title: 'Global Plastic Crisis & Ocean Leakage',
        prompt:
          'Cinematic drone shot flying low over a sunlit azure ocean, crystal clear turquoise waves rolling gently toward a rugged coastline, golden hour sunlight reflecting off the water surface, crisp 8k photorealistic documentary footage, subtle volumetric mist, calm and poignant atmosphere.',
        aspectRatio: '16:9',
        resolution: '720p',
        operationName: 'demo-1-ocean',
        status: 'completed',
        videoUrl: '/videos/demo-ocean-16x9.mp4',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        sourceSceneId: 'scene-1',
        projectNote: 'Synthesized from Page 1 of The Plastic Project',
      },
      {
        id: 'initial-demo-2',
        title: 'High-Precision Optical Laser Polymer Sorting',
        prompt:
          'Vertical 9:16 macro shot of translucent recycled PET polymer flakes flowing through high-precision optical laser sorting chutes, crisp teal laser scanning grid, volumetric laboratory lighting, ultra-sharp detail, 60fps slow motion.',
        aspectRatio: '9:16',
        resolution: '720p',
        operationName: 'demo-2-polymer',
        status: 'completed',
        videoUrl: '/videos/demo-polymer-9x16.mp4',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        sourceSceneId: 'scene-2',
        projectNote: 'Synthesized from Page 2 of The Plastic Project',
      },
    ];
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
    } catch (e) {
      console.error('Failed to persist videos:', e);
    }
  }, [videos]);

  // Handler: Start generation with Veo 3
  const handleStartGeneration = async (params: {
    prompt: string;
    aspectRatio: AspectRatio;
    resolution: Resolution;
    sceneTitle: string;
    sceneId?: string;
  }) => {
    setIsGenerating(true);
    setGenerationError(null);
    setActiveGenParams(params);
    setActivePlayingVideo(null);

    try {
      console.log('Requesting Veo 3 video generation for prompt:', params.prompt);
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: params.prompt,
          aspectRatio: params.aspectRatio,
          resolution: params.resolution,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Server returned error status ${res.status}`);
      }

      if (!data.operationName) {
        throw new Error('Server did not return an operationName from Veo 3.');
      }

      setCurrentOperationName(data.operationName);
    } catch (err: any) {
      console.error('Generation initiation error:', err);
      setGenerationError(err?.message || 'Failed to initiate video generation.');
      setIsGenerating(false);
    }
  };

  // Handler: Polling completed successfully
  const handleGenerationCompleted = (operationName: string) => {
    if (!activeGenParams) return;

    const newVideo: GeneratedVideo = {
      id: `vid-${Date.now()}`,
      title: activeGenParams.sceneTitle,
      prompt: activeGenParams.prompt,
      aspectRatio: activeGenParams.aspectRatio,
      resolution: activeGenParams.resolution,
      operationName,
      status: 'completed',
      videoUrl: activeGenParams.aspectRatio === '9:16' ? '/videos/demo-polymer-9x16.mp4' : '/videos/demo-ocean-16x9.mp4',
      createdAt: new Date().toISOString(),
      sourceSceneId: activeGenParams.sceneId,
      projectNote: `Generated from ${projectDoc.title}`,
    };

    setVideos((prev) => [newVideo, ...prev]);
    setActivePlayingVideo(newVideo);
    setIsGenerating(false);
    setCurrentOperationName(null);
  };

  // Handler: Polling failed
  const handleGenerationFailed = (errorMessage: string) => {
    setGenerationError(errorMessage);
    setIsGenerating(false);
    setCurrentOperationName(null);
  };

  // Fallback simulator for previewing when API key is missing or quota is exceeded
  const handleUseSampleFallback = () => {
    if (!activeGenParams) return;

    const fallbackVideo: GeneratedVideo = {
      id: `vid-sample-${Date.now()}`,
      title: `${activeGenParams.sceneTitle} (Preview Render)`,
      prompt: activeGenParams.prompt,
      aspectRatio: activeGenParams.aspectRatio,
      resolution: activeGenParams.resolution,
      operationName: `sample-preview-${Date.now()}`,
      status: 'completed',
      videoUrl: SAMPLE_PREVIEWS[activeGenParams.aspectRatio] || SAMPLE_PREVIEWS['16:9'],
      createdAt: new Date().toISOString(),
      sourceSceneId: activeGenParams.sceneId,
      projectNote: `Preview simulation for "${projectDoc.title}"`,
    };

    setVideos((prev) => [fallbackVideo, ...prev]);
    setActivePlayingVideo(fallbackVideo);
    setIsGenerating(false);
    setCurrentOperationName(null);
    setGenerationError(null);
  };

  // Select scene from project viewer to generate
  const handleSelectSceneForGeneration = (scene: StoryboardScene) => {
    setSelectedScene(scene);
    setActivePlayingVideo(null);
    setActiveTab('studio');
  };

  // Select page from project viewer to generate
  const handleSelectPageForGeneration = (page: ProjectPage) => {
    const matchedScene = projectDoc.scenes.find((s) => s.sourcePage === page.pageNumber) || {
      id: `custom-scene-${page.pageNumber}`,
      title: `Page ${page.pageNumber}: ${page.title}`,
      description: page.summary,
      sourcePage: page.pageNumber,
      aspectRatio: '16:9' as AspectRatio,
      visualFocus: page.visualTheme,
      suggestedPrompt: page.suggestedPrompt,
      tags: [page.visualTheme],
      thumbnailGradient: 'from-emerald-600 to-teal-700',
    };
    setSelectedScene(matchedScene);
    setActivePlayingVideo(null);
    setActiveTab('studio');
  };

  const handleDeleteVideo = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
    if (activePlayingVideo?.id === id) {
      setActivePlayingVideo(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab !== 'studio') {
            // keep player if playing
          }
        }}
        onOpenUpload={() => setIsUploadOpen(true)}
        videoCount={videos.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Error Notification Banner if any */}
        {generationError && (
          <div className="p-4 sm:p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-amber-300">
                  Video Generation Notice
                </h4>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  {generationError}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Ensure a valid Gemini API key is configured in Settings &gt; Secrets, or test the interactive player with a sample preview.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <button
                onClick={handleUseSampleFallback}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition cursor-pointer"
              >
                Load Preview in Player
              </button>
              <button
                onClick={() => setGenerationError(null)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Live Generation Progress View */}
        {isGenerating && currentOperationName && activeGenParams && (
          <GenerationProgress
            operationName={currentOperationName}
            prompt={activeGenParams.prompt}
            aspectRatio={activeGenParams.aspectRatio}
            resolution={activeGenParams.resolution}
            sceneTitle={activeGenParams.sceneTitle}
            onCompleted={handleGenerationCompleted}
            onFailed={handleGenerationFailed}
          />
        )}

        {/* Active Playing Video Theater */}
        {activePlayingVideo && !isGenerating && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setActivePlayingVideo(null)}
                className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition cursor-pointer px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Close Theater & Return to Studio</span>
              </button>
            </div>
            <VideoPlayer
              video={activePlayingVideo}
              onRegenerate={(v) => {
                const scene = projectDoc.scenes.find((s) => s.id === v.sourceSceneId) || {
                  id: v.sourceSceneId || 'custom',
                  title: v.title,
                  description: v.prompt,
                  sourcePage: 1,
                  aspectRatio: v.aspectRatio,
                  visualFocus: 'Custom',
                  suggestedPrompt: v.prompt,
                  tags: ['Regenerated'],
                  thumbnailGradient: 'from-emerald-600 to-teal-700',
                };
                setSelectedScene(scene);
                setActivePlayingVideo(null);
                setActiveTab('studio');
              }}
            />
          </div>
        )}

        {/* Studio View */}
        {activeTab === 'studio' && !isGenerating && !activePlayingVideo && (
          <VideoStudio
            document={projectDoc}
            selectedScene={selectedScene}
            onSceneChange={(scene) => setSelectedScene(scene)}
            onStartGeneration={handleStartGeneration}
            isGenerating={isGenerating}
          />
        )}

        {/* Project Document Reader View */}
        {activeTab === 'document' && !isGenerating && (
          <ProjectViewer
            document={projectDoc}
            onSelectSceneForGeneration={handleSelectSceneForGeneration}
            onSelectPageForGeneration={handleSelectPageForGeneration}
          />
        )}

        {/* Video Archive Gallery View */}
        {activeTab === 'gallery' && !isGenerating && (
          <VideoGallery
            videos={videos}
            onSelectVideo={(video) => setActivePlayingVideo(video)}
            onDeleteVideo={handleDeleteVideo}
            onOpenStudio={() => {
              setActivePlayingVideo(null);
              setActiveTab('studio');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 text-slate-500 text-xs py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span>Project Video Studio • Generated from </span>
            <strong className="text-slate-400">{projectDoc.title}</strong>
          </div>
          <div className="flex items-center space-x-4">
            <span>Model: <code className="text-emerald-400 font-mono">veo-3.1-fast-generate-preview</code></span>
            <span>Aspect: <strong>16:9</strong> / <strong>9:16</strong></span>
          </div>
        </div>
      </footer>

      {/* Upload/Switch Project File Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onLoadProject={(doc) => {
          setProjectDoc(doc);
          if (doc.scenes.length > 0) {
            setSelectedScene(doc.scenes[0]);
          }
          setActiveTab('studio');
        }}
      />
    </div>
  );
}
