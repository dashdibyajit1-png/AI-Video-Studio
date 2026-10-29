export type AspectRatio = '16:9' | '9:16';
export type Resolution = '720p' | '1080p';

export interface ProjectPage {
  pageNumber: number;
  title: string;
  subtitle?: string;
  summary: string;
  keyFacts: string[];
  suggestedPrompt: string;
  visualTheme: string;
  ocrSnippet: string;
}

export interface ProjectDocument {
  id: string;
  title: string;
  author: string;
  institution: string;
  course: string;
  instructor: string;
  targetCompany: string;
  totalPages: number;
  executiveSummary: string;
  keyMetrics: {
    label: string;
    value: string;
    context: string;
  }[];
  scenes: StoryboardScene[];
  pages: ProjectPage[];
}

export interface StoryboardScene {
  id: string;
  title: string;
  description: string;
  sourcePage: number;
  suggestedPrompt: string;
  aspectRatio: AspectRatio;
  visualFocus: string;
  tags: string[];
  thumbnailGradient: string;
  previewSampleVideo?: string;
}

export interface GeneratedVideo {
  id: string;
  title: string;
  prompt: string;
  aspectRatio: AspectRatio;
  resolution: Resolution;
  operationName: string;
  status: 'generating' | 'completed' | 'failed';
  videoUrl?: string;
  createdAt: string;
  duration?: number;
  sourceSceneId?: string;
  error?: string;
  projectNote?: string;
}

export interface PromptSynthesisResult {
  prompt: string;
  sceneTitle: string;
  visualNotes: string[];
}
