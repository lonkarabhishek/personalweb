import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Github, Copy, Check, Terminal,
  Wifi, Inbox, Trash2, ScanLine, FileText,
  Clipboard, Camera, ArrowRight, Download,
} from 'lucide-react';
import { FadeIn } from '../components/ui/Layout';

const barkitTools = [
  {
    name: 'WiFiMon',
    tagline: 'Wi-Fi Speed & Ping Monitor',
    description: 'Real-time ping and signal strength right in your menu bar. Run on-demand speed tests without opening a browser.',
    icon: Wifi,
  },
  {
    name: 'DropShelf',
    tagline: 'Drag & Drop Shelf',
    description: 'A temporary shelf for files, images, and text mid-drag. Like having an extra hand when moving things between apps.',
    icon: Inbox,
  },
  {
    name: 'CleanDock',
    tagline: 'Downloads Cleaner',
    description: 'View and organize recent downloads from your menu bar. Auto-cleans files older than 30 days.',
    icon: Trash2,
  },
  {
    name: 'TextGrab',
    tagline: 'Screen OCR',
    description: 'Draw a box around any text on screen and extract it instantly. Works on images, videos, and non-selectable websites.',
    icon: ScanLine,
  },
  {
    name: 'QuickScrap',
    tagline: 'Instant Scratchpad',
    description: 'A lightweight notepad one click away in your menu bar. Perfect for phone numbers, tracking IDs, and quick thoughts.',
    icon: FileText,
  },
  {
    name: 'KleepMe',
    tagline: 'Clipboard History',
    description: 'Stores your last 20 clipboard items — text, images, and links. Pin favorites and search through history.',
    icon: Clipboard,
  },
  {
    name: 'Snapdeck',
    tagline: 'Screenshot Manager',
    description: 'Recent screenshots accessible from your menu bar with floating thumbnails on capture. One-click copy and drag-and-drop.',
    icon: Camera,
  },
];

const installAllCmd = 'curl -sL https://raw.githubusercontent.com/lonkarabhishek/Snapdeck/main/get.sh | bash -s all';
const githubUrl = 'https://github.com/lonkarabhishek/Snapdeck';

const CopyableCommand: React.FC<{ command: string; label?: string; compact?: boolean }> = ({ command, label, compact }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = command;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {label && (
        <p className="text-xs text-[#5a6a7a] mb-2 uppercase tracking-wider font-medium">{label}</p>
      )}
      <button
        onClick={handleCopy}
        className={`inline-flex items-center bg-[#1a2029] border border-[#2a3441] rounded-xl hover:border-[#7c3aed]/30 transition-all cursor-pointer w-full ${compact ? 'px-3 py-2.5' : 'px-4 py-3'}`}
        title="Click to copy"
      >
        <Terminal size={compact ? 12 : 14} className="text-[#7c3aed] mr-3 flex-shrink-0" />
        <code className={`${compact ? 'text-xs' : 'text-sm'} text-[#8b9cad] font-mono truncate mr-3 text-left flex-1`}>
          {compact ? `bash -s ${command.split(' ').pop()}` : command}
        </code>
        {copied ? (
          <Check size={compact ? 12 : 14} className="text-emerald-400 flex-shrink-0" />
        ) : (
          <Copy size={compact ? 12 : 14} className="text-[#6b7a8a] flex-shrink-0" />
        )}
      </button>
    </div>
  );
};

const ToolCard: React.FC<{ tool: typeof barkitTools[0]; index: number }> = ({ tool, index }) => {
  const Icon = tool.icon;
  const installCmd = `curl -sL https://raw.githubusercontent.com/lonkarabhishek/Snapdeck/main/get.sh | bash -s ${tool.name}`;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group bg-[#1a2029] border border-[#2a3441] rounded-2xl p-6 md:p-8 hover:border-[#7c3aed]/30 hover:shadow-xl transition-all relative overflow-hidden h-full flex flex-col"
    >
      {/* Hover gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.03) 0%, rgba(8, 145, 178, 0.03) 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Number + Icon row */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(8, 145, 178, 0.15))' }}
          >
            <Icon size={24} className="text-[#7c3aed]" />
          </div>
          <span className="text-sm font-mono text-[#3a4a5a]">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Name and tagline */}
        <h3 className="text-xl font-bold text-[#e2e8f0] mb-1 tracking-tight">{tool.name}</h3>
        <p
          className="text-sm font-medium mb-3"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {tool.tagline}
        </p>

        {/* Description */}
        <p className="text-[#8b9cad] text-sm leading-relaxed mb-6 flex-grow">
          {tool.description}
        </p>

        {/* Install command */}
        <div className="mt-auto">
          <CopyableCommand command={installCmd} compact />
        </div>
      </div>
    </motion.div>
  );
};

export const BarkitPage: React.FC = () => {
  useEffect(() => {
    document.title = 'BarKit — 7 Lightweight macOS Menu Bar Utilities | Abhishek Lonkar';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'BarKit is a suite of 7 free, open-source macOS menu bar utilities built with Swift. WiFiMon, DropShelf, CleanDock, TextGrab, QuickScrap, KleepMe, and Snapdeck.');
    }
    return () => {
      document.title = 'Abhishek Lonkar | Trust & Delivery';
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', 'I help brands and teams ship work they can trust. From ecommerce storefronts to business dashboards.');
      }
    };
  }, []);

  return (
    <article className="bg-[#0f1419] min-h-screen">
      {/* Back button */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a2029]/80 backdrop-blur-sm border border-[#2a3441] text-[#9ba8b8] hover:border-[#7c3aed]/30 hover:text-white transition-all shadow-sm"
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </div>

      {/* ===== HERO ===== */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-6 pt-24 pb-16">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)' }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #0891b2)' }}
            >
              <Terminal size={32} className="text-white" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
              <span className="text-[#e2e8f0]">Bar</span>
              <span
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Kit
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl text-[#8b9cad] mb-2 font-light">
              7 lightweight macOS menu bar utilities.
            </p>
            <p className="text-lg text-[#5a6a7a] mb-10">
              Built with Swift. Free and open source. No Xcode required.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="max-w-2xl mx-auto">
              <CopyableCommand command={installAllCmd} label="Install all 7 tools with one command" />
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex items-center justify-center gap-4 mt-8">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-full border border-[#2a3441] text-[#9ba8b8] hover:border-[#7c3aed]/30 hover:text-white transition-all"
              >
                <Github size={18} className="mr-2" />
                View on GitHub
              </a>
              <a
                href={`${githubUrl}/releases/latest`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-full text-white text-sm font-medium shadow-lg"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #0891b2)' }}
              >
                <Download size={18} className="mr-2" />
                Download
              </a>
            </div>
          </FadeIn>

          {/* Stats row */}
          <FadeIn delay={0.5}>
            <div className="flex items-center justify-center gap-8 md:gap-12 mt-12 text-center">
              <div>
                <div className="text-2xl font-bold text-[#e2e8f0]">7</div>
                <div className="text-xs text-[#5a6a7a] uppercase tracking-wider">Tools</div>
              </div>
              <div className="w-px h-8 bg-[#2a3441]" />
              <div>
                <div className="text-2xl font-bold text-[#e2e8f0]">Swift</div>
                <div className="text-xs text-[#5a6a7a] uppercase tracking-wider">Native</div>
              </div>
              <div className="w-px h-8 bg-[#2a3441]" />
              <div>
                <div className="text-2xl font-bold text-[#e2e8f0]">MIT</div>
                <div className="text-xs text-[#5a6a7a] uppercase tracking-wider">License</div>
              </div>
              <div className="w-px h-8 bg-[#2a3441]" />
              <div>
                <div className="text-2xl font-bold text-[#e2e8f0]">macOS 13+</div>
                <div className="text-xs text-[#5a6a7a] uppercase tracking-wider">Required</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== TOOLS GRID ===== */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 border-t border-[#1a2029]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <span
              className="font-medium tracking-widest text-xs uppercase mb-4 block"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              The Suite
            </span>
            <h2 className="font-sans text-3xl md:text-4xl text-[#8b9cad] mb-4 font-bold tracking-tight">
              7 tools, <span className="italic text-[#e2e8f0]">one install</span>
            </h2>
            <p className="text-[#5a6a7a] text-lg mb-16 max-w-2xl">
              Each tool lives quietly in your menu bar. No dock icons, no bloat, no subscriptions. Click the install command on any card to copy it.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {barkitTools.map((tool, i) => (
              <FadeIn key={tool.name} delay={i * 0.08}>
                <ToolCard tool={tool} index={i} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW TO INSTALL ===== */}
      <section className="py-20 px-6 md:px-12 lg:px-24 border-t border-[#1a2029]">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <span
              className="font-medium tracking-widest text-xs uppercase mb-4 block"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Getting Started
            </span>
            <h2 className="font-sans text-3xl md:text-4xl text-[#8b9cad] mb-12 font-bold tracking-tight">
              Install in <span className="italic text-[#e2e8f0]">seconds</span>
            </h2>
          </FadeIn>

          <div className="space-y-8">
            <FadeIn delay={0.1}>
              <div className="bg-[#1a2029] border border-[#2a3441] rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#7c3aed]/10 text-[#7c3aed] font-bold text-sm">1</div>
                  <h3 className="text-lg font-semibold text-[#e2e8f0]">Install all tools</h3>
                </div>
                <p className="text-[#8b9cad] text-sm mb-4">Run this single command in Terminal to install all 7 utilities:</p>
                <CopyableCommand command={installAllCmd} />
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-[#1a2029] border border-[#2a3441] rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#0891b2]/10 text-[#0891b2] font-bold text-sm">2</div>
                  <h3 className="text-lg font-semibold text-[#e2e8f0]">First launch</h3>
                </div>
                <p className="text-[#8b9cad] text-sm">
                  On first launch, right-click the app and select <span className="text-[#e2e8f0] font-medium">Open</span> (required for unsigned apps). After that, they launch normally from your menu bar.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-[#1a2029] border border-[#2a3441] rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-500/10 text-emerald-400 font-bold text-sm">3</div>
                  <h3 className="text-lg font-semibold text-[#e2e8f0]">Update anytime</h3>
                </div>
                <p className="text-[#8b9cad] text-sm">
                  Run the same install command again — it replaces the old version with the latest release automatically.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-20 px-6 text-center border-t border-[#1a2029]">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="font-sans text-2xl md:text-3xl text-[#8b9cad] mb-3 font-bold tracking-tight">
              Tiny tools, <span className="italic text-[#e2e8f0]">big difference</span>
            </h2>
            <p className="text-[#5a6a7a] mb-8">
              Built for developers and power users who want things to just work.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-full text-white text-sm font-medium shadow-lg"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #0891b2)' }}
              >
                <Github size={16} className="mr-2" />
                Star on GitHub
              </a>
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium text-[#9ba8b8] border border-[#2a3441] hover:border-[#7c3aed]/30 transition-all"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Portfolio
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </article>
  );
};
