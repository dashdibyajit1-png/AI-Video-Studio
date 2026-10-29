import React, { useState, useRef } from 'react';
import { ProjectDocument } from '../types';
import { initialProjectDocument } from '../data/plasticProjectData';
import { Upload, X, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadProject: (doc: ProjectDocument) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onLoadProject }) => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectText, setProjectText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setProjectTitle(file.name.replace(/\.[^/.]+$/, ''));

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setProjectText(content || '');
    };
    reader.onerror = () => {
      setError('Could not read file. Please ensure it is a text or valid document file.');
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (!projectText.trim()) {
      setError('Please provide document content or select a file.');
      return;
    }

    setIsProcessing(true);
    try {
      const customDoc: ProjectDocument = {
        id: `custom-project-${Date.now()}`,
        title: projectTitle.trim() || 'Uploaded Research Document',
        author: 'Project Author',
        institution: 'Uploaded Project File',
        course: 'Custom Project',
        instructor: 'Lead Investigator',
        targetCompany: 'Hydromo & Partner Industry',
        totalPages: 5,
        executiveSummary: projectText.slice(0, 300) + '...',
        keyMetrics: [
          {
            label: 'Document Length',
            value: `${projectText.split(/\s+/).length} Words`,
            context: 'Imported for video narrative synthesis.',
          },
          {
            label: 'Veo 3 Compatibility',
            value: '100% Ready',
            context: 'Standard 16:9 and 9:16 aspect ratio generation.',
          },
        ],
        scenes: [
          {
            id: `scene-custom-1`,
            title: `${projectTitle || 'Project'} Scene 1: Visual Overview`,
            description: 'Introductory visual representation of the uploaded project file.',
            sourcePage: 1,
            aspectRatio: '16:9',
            visualFocus: 'Cinematic visual sequence representing core findings',
            suggestedPrompt: `Cinematic 8k wide shot representing ${projectTitle || 'the sustainability study'}, modern architectural research facility, pristine natural lighting, slow camera pan, photorealistic.`,
            tags: ['Custom File', 'Overview'],
            thumbnailGradient: 'from-emerald-600 via-teal-600 to-cyan-700',
          },
          {
            id: `scene-custom-2`,
            title: `${projectTitle || 'Project'} Scene 2: Vertical Highlight`,
            description: 'Vertical format video designed for presentation and mobile showcase.',
            sourcePage: 2,
            aspectRatio: '9:16',
            visualFocus: 'Macro vertical shot of sustainable materials',
            suggestedPrompt: `Vertical 9:16 cinematic macro shot of crystalline materials resting on a sleek dark surface, gleaming reflection, golden hour sunlight, slow vertical tracking movement.`,
            tags: ['Portrait', '9:16', 'Detail'],
            thumbnailGradient: 'from-indigo-600 via-purple-600 to-pink-600',
          },
        ],
        pages: [
          {
            pageNumber: 1,
            title: 'Section 1: Core Document Text',
            summary: projectText.slice(0, 250),
            keyFacts: ['Parsed from uploaded user document'],
            suggestedPrompt: `Cinematic photorealistic documentary footage depicting ${projectTitle || 'the subject'}, high-definition clarity.`,
            visualTheme: 'Document Analysis',
            ocrSnippet: projectText.slice(0, 300),
          },
        ],
      };

      onLoadProject(customDoc);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to process document.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetToPlasticProject = () => {
    onLoadProject(initialProjectDocument);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <Upload className="w-4 h-4" />
            <span>Upload or Change Project File</span>
          </div>
          <h3 className="text-xl font-bold text-white">Project File Loader</h3>
          <p className="text-xs text-slate-400 mt-1">
            Upload another project document, paste text, or reset back to "The Plastic Project".
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Drag & Drop / File select */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-700 hover:border-emerald-500/70 rounded-xl p-6 text-center bg-slate-950/60 hover:bg-slate-950 transition cursor-pointer space-y-2"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt,.md,.json"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center mx-auto">
            <Upload className="w-5 h-5" />
          </div>
          <div className="text-sm font-semibold text-white">Click or drag & drop to upload</div>
          <p className="text-xs text-slate-400">Supports .txt, .pdf, .md, .json</p>
        </div>

        {/* Optional Title input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Project Title</label>
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="e.g. Sustainable Materials Project"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Text paste area */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Project Excerpt or Summary</label>
          <textarea
            rows={4}
            value={projectText}
            onChange={(e) => setProjectText(e.target.value)}
            placeholder="Paste your project findings, research abstract, or chapter text here..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={handleResetToPlasticProject}
            className="text-xs text-slate-400 hover:text-emerald-400 underline cursor-pointer"
          >
            Reset to "The Plastic Project"
          </button>

          <div className="flex space-x-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleImport}
              disabled={isProcessing || !projectText.trim()}
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition shadow cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? 'Importing...' : 'Load & Generate Videos'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
