"use client";

import { useEffect, useState } from "react";

const PROFILE_CODE_STRING = `const profile = {
    name: 'Md Rashedul Haque Rasel',
    title: 'Frontend-Focused Full Stack Developer',
    skills: [
        'React', 'NextJS', 'TypeScript', 'Tailwind CSS',
        'NodeJS', 'Express', 'MongoDB', 'Zustand'
    ],
    hardWorker: true,
    quickLearner: true,
    problemSolver: true
};`;

export default function CodeTerminalPreview() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(PROFILE_CODE_STRING.slice(0, index));
      if (index >= PROFILE_CODE_STRING.length) {
        clearInterval(interval);
        setIsTypingComplete(true);
      }
    }, 18);

    return () => clearInterval(interval);
  }, []);

  // Dynamic token-based syntax highlighter matching the screenshot palette exactly
  const renderLine = (line: string) => {
    if (!line) return <br />;

    const tokenRegex = /(\s+|'(?:\\.|[^'\\])*'?|const\b|true\b|false\b|[a-zA-Z_][a-zA-Z0-9_]*|[:=,[\]{};])/g;
    const tokens: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = tokenRegex.exec(line)) !== null) {
      tokens.push(match[0]);
    }

    if (tokens.length === 0) {
      return <span>{line}</span>;
    }

    const PROPERTY_KEYS = new Set([
      "name",
      "title",
      "skills",
      "hardWorker",
      "quickLearner",
      "problemSolver",
    ]);

    return (
      <span>
        {tokens.map((token, idx) => {
          // Whitespace
          if (/^\s+$/.test(token)) {
            return <span key={idx}>{token}</span>;
          }

          // String literals (complete or in-progress)
          if (token.startsWith("'")) {
            return (
              <span key={idx} className="text-[#a5d6ff]">
                {token}
              </span>
            );
          }

          // Keyword `const`
          if (token === "const") {
            return (
              <span key={idx} className="text-[#ff79c6] font-medium">
                {token}
              </span>
            );
          }

          // Booleans `true` / `false`
          if (token === "true" || token === "false") {
            return (
              <span key={idx} className="text-[#ff79c6]">
                {token}
              </span>
            );
          }

          // Property Keys: name, title, skills, hardWorker, etc.
          if (PROPERTY_KEYS.has(token)) {
            return (
              <span key={idx} className="text-[#f8c555]">
                {token}
              </span>
            );
          }

          // Variable identifier: profile
          if (token === "profile") {
            return (
              <span key={idx} className="text-[#e2e8f0]">
                {token}
              </span>
            );
          }

          // Curly braces `{` and `}`
          if (token === "{" || token === "}") {
            return (
              <span key={idx} className="text-[#ff79c6]">
                {token}
              </span>
            );
          }

          // Operators & punctuation: =, :, ,, [, ], ;
          return (
            <span key={idx} className="text-[#cccccc]">
              {token}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div className="relative w-full max-w-[560px] min-h-[460px] sm:min-h-[480px] flex flex-col justify-between overflow-hidden rounded-2xl border border-bone/15 bg-white/[0.015] backdrop-blur-[1px] transition-all duration-300">
      {/* Top Bar matching screenshot with light transparent glass */}
      <div className="flex h-12 items-center border-b border-bone/10 bg-white/[0.01] px-5 shrink-0">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#ef4444]/90 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
          <span className="size-3 rounded-full bg-[#eab308]/90 shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
          <span className="size-3 rounded-full bg-[#22c55e]/90 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
        </div>
        <div className="ml-6 font-mono text-xs text-bone/60 tracking-wide">developer.js</div>
      </div>

      {/* Code Editor Body */}
      <div className="p-6 md:p-8 font-mono text-[13px] md:text-[14px] leading-[1.9] select-text flex-1 flex flex-col justify-between">
        <div className="min-h-[295px] sm:min-h-[315px]">
          <pre className="font-mono text-bone overflow-x-auto whitespace-pre">
            <code>
              {displayedText.split("\n").map((line, i) => (
                <div key={i} className="min-h-[1.9em]">
                  {renderLine(line)}
                </div>
              ))}
            </code>
          </pre>

          {/* Blinking cursor while typing */}
          {!isTypingComplete && (
            <span className="inline-block h-4 w-2 animate-pulse bg-accent align-middle ml-1" />
          )}
        </div>

        {/* Subtle footer status once finished typing (reserved in layout to prevent height shifts) */}
        <div
          className={`mt-5 pt-3.5 border-t border-bone/10 flex items-center justify-between text-xs text-bone/55 font-mono transition-opacity duration-500 ${
            isTypingComplete ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <span className="text-[#34d399] flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-[#34d399] shadow-[0_0_8px_#34d399] animate-pulse" />
            <span>Available for Hire • Open to Remote</span>
          </span>
          <span className="text-bone/45">Dhaka, Bangladesh</span>
        </div>
      </div>
    </div>
  );
}
