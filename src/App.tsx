/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  Rocket, 
  Lightbulb, 
  ShieldAlert, 
  Telescope, 
  Mail, 
  ChevronRight, 
  Database, 
  Cpu, 
  Compass,
  ArrowRight,
  X,
  Loader2,
  Copy,
  Check
} from 'lucide-react';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const BriefingModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [briefing, setBriefing] = useState('');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    focus: 'Classroom Efficiency'
  });

  const generateBriefing = async () => {
    setLoading(true);
    try {
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a highly professional, "Space Mission Control" themed mission briefing email for an educator. 
        Tone: Technical, punchy, authoritative yet deeply encouraging.
        Context: The recipient is ${formData.name}, a ${formData.role} focused on ${formData.focus}.
        Structure:
        - Subject Line: [MISSION CRITICAL] Briefing for ${formData.name}
        - Identification of "The Friction" (the problem they are facing in education today)
        - The "Vega Protocol" (how AI will solve it)
        - Call to Action: Secure your flight manual.
        Must sound like a commander speaking to an elite astronaut. Use terms like "Ground Truth", "Alignment", "Payload", "Insertion", and "Accelerated Excellence".`,
      });
      setBriefing(response.text || 'Error generating briefing.');
    } catch (error) {
      console.error(error);
      setBriefing('Systems failure. Could not connect to Mission Control. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(briefing);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-2xl bg-slate-900 border border-blue-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-blue-500/5">
              <div className="flex items-center gap-2">
                <Rocket className="text-amber-400" size={18} />
                <h3 className="text-sm font-black uppercase tracking-widest text-white">Mission Briefing Initialization</h3>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white transition">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto">
              {!briefing ? (
                <div className="space-y-6">
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Input Mission Parameters</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-blue-400 tracking-tighter">Educator Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g. Commander Smith"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-blue-400 tracking-tighter">Current Designation (Role)</label>
                      <input 
                        type="text" 
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        placeholder="e.g. 9th Grade Bio Lead"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-blue-400 tracking-tighter">Primary Deployment Focus</label>
                    <select 
                      value={formData.focus}
                      onChange={(e) => setFormData({...formData, focus: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition appearance-none text-white"
                    >
                      <option className="bg-slate-900" value="Classroom Efficiency">Classroom Efficiency</option>
                      <option className="bg-slate-900" value="Differentiated Instruction">Differentiated Instruction</option>
                      <option className="bg-slate-900" value="AI Literacy & Ethics">AI Literacy & Ethics</option>
                      <option className="bg-slate-900" value="Advanced Lab Design">Advanced Lab Design</option>
                    </select>
                  </div>
                  <button 
                    disabled={loading || !formData.name}
                    onClick={generateBriefing}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs transition flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Syncing with Mission Control...
                      </>
                    ) : (
                      <>
                        <Cpu size={16} />
                        Start Generation Sequence
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="bg-black/40 p-6 rounded-2xl border border-blue-500/20 font-mono text-xs leading-relaxed text-blue-100 whitespace-pre-wrap">
                    {briefing}
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setBriefing('')}
                      className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition text-white"
                    >
                      Re-Initialize
                    </button>
                    <button 
                      onClick={copyToClipboard}
                      className="flex-1 bg-blue-600 hover:bg-blue-500 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition flex items-center justify-center gap-2 text-white"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? 'Copied' : 'Transfer Intel'}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Nav = ({ onOpenBriefing }: { onOpenBriefing: () => void }) => (
  <nav className="mb-6 flex justify-between items-center bg-white/5 border border-white/10 rounded-2xl p-4">
    <div className="flex flex-col">
      <div className="text-xl md:text-2xl font-black tracking-tighter leading-none text-white glow">
        VEGA<span className="text-blue-500">.</span>
      </div>
      <div className="text-[7px] uppercase tracking-[0.4em] font-bold text-blue-400 leading-none mt-1">
        Educational Associates
      </div>
    </div>
    <div className="hidden lg:flex gap-6 text-[9px] uppercase tracking-[0.2em] font-bold text-slate-400">
      <a href="#manifest" className="hover:text-blue-400 transition">Manifest</a>
    </div>
    <button 
      onClick={onOpenBriefing}
      className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-[9px] font-bold tracking-widest uppercase transition flex items-center gap-2 text-white"
    >
      <Mail size={12} />
      Mission Briefing
    </button>
  </nav>
);

const HeroTile = () => (
  <div className="col-span-full xl:col-span-2 xl:row-span-2 bento-card flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-blue-900/20 to-indigo-900/10 border-blue-500/30">
    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
      <Rocket className="text-amber-400" size={200} />
    </div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10"
    >
      <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-4 uppercase">
        Accelerating<br/><span className="text-blue-500">Excellence</span>
      </h1>
      <p className="text-blue-400/80 text-[10px] uppercase tracking-[0.4em] mb-8 font-bold">One Prompt At A Time</p>
    </motion.div>
  </div>
);

const GroundTruthTile = () => (
  <div className="col-span-full lg:col-span-2 bento-card bg-blue-600 border-blue-400 flex flex-col justify-between shadow-2xl shadow-blue-900/30 group min-h-[300px]">
    <div>
      <span className="bg-white/20 px-2 py-1 rounded text-[8px] font-bold uppercase mb-4 inline-block tracking-widest">Expert Specialization</span>
      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none text-white">
        Ground Truth<br/>Evaluation Hub
      </h3>
      <p className="text-xs text-blue-100/80 mt-4 max-w-sm leading-relaxed">
        Developing frameworks for mitigating hallucinations in Science LLMs through expert-led pedagogical intervention and data synthesis.
      </p>
    </div>
    <div className="flex justify-between items-center mt-8">
      <span className="text-[9px] font-bold tracking-widest uppercase text-blue-200">Deep Space Lab v2.0</span>
      <a href="#" className="bg-white text-blue-600 px-6 py-2 rounded-full text-[9px] font-bold uppercase hover:bg-blue-50 transition-colors flex items-center gap-2">
        Enter Hub <ArrowRight size={12} />
      </a>
    </div>
  </div>
);

const ExperienceTile = () => (
  <div className="col-span-full lg:col-span-2 bento-card flex flex-col justify-between group min-h-[300px]">
    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
      <Telescope size={150} />
    </div>
    <div>
      <span className="text-blue-500 text-[8px] font-bold uppercase mb-4 inline-block tracking-[0.3em]">Interactive Mission</span>
      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none text-white">
        AI Ascension<br/>Experience
      </h3>
      <p className="text-xs text-slate-400 mt-4 max-w-sm leading-relaxed italic">
        "The Search for Intelligent Life" — An immersive journey through the frontiers of educational synthetic intelligence.
      </p>
    </div>
    <div className="flex justify-between items-center mt-8">
      <span className="text-[9px] font-bold tracking-widest uppercase text-slate-500">Voyager Protocol v1.0</span>
      <a 
        href="https://vega-e-a.github.io/Vega-Ed/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-blue-600 px-6 py-2 rounded-full text-[9px] font-bold uppercase text-white shadow-lg hover:bg-blue-500 transition-colors flex items-center gap-2"
      >
        Launch Experience <ArrowRight size={12} />
      </a>
    </div>
  </div>
);

const RevolutionTile = () => (
  <div className="col-span-full lg:col-span-2 bento-card flex flex-col justify-between group min-h-[300px] border-white/10">
    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
      <Compass size={150} />
    </div>
    <div>
      <span className="text-blue-500 text-[8px] font-bold uppercase mb-4 inline-block tracking-[0.3em]">Demo Showcase</span>
      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none text-white">
        Mr. Breslow's<br/>Website Revolution
      </h3>
      <p className="text-xs text-slate-400 mt-4 max-w-sm leading-relaxed">
        Pioneering the next generation of educational digital presence. Experience the revolution in pedagogical interface design.
      </p>
    </div>
    <div className="flex justify-between items-center mt-8">
      <span className="text-[9px] font-bold tracking-widest uppercase text-slate-500">Revolution Protocol v3.0</span>
      <a 
        href="https://vega-e-a.github.io/Breslow-Demo-Site/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-white text-blue-600 px-6 py-2 rounded-full text-[9px] font-bold uppercase shadow-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
      >
        Explore Site <ArrowRight size={12} />
      </a>
    </div>
  </div>
);

const Footer = () => (
  <footer className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] text-slate-500 uppercase tracking-widest bg-white/5 p-6 rounded-2xl border border-white/10">
    <div className="font-bold">© 2026 Michael A. Breslow | Vega Educational Associates</div>
    <div className="max-w-md md:text-right opacity-60 leading-relaxed text-center md:text-left">
      Synthetic Intelligence Disclosure: Architected through Human-in-the-Loop (HITL) Framework 2026 leveraging LLMs for instruction.
    </div>
  </footer>
);

export default function App() {
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-6">
      <Nav onOpenBriefing={() => setIsBriefingOpen(true)} />
      <main className="grid grid-cols-4 gap-6">
        <HeroTile />
        <ExperienceTile />
        <GroundTruthTile />
        <RevolutionTile />
      </main>
      <Footer />
      <BriefingModal isOpen={isBriefingOpen} onClose={() => setIsBriefingOpen(false)} />
    </div>
  );
}
