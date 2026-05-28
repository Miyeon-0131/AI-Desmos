import React from 'react';
import katex from 'katex';
import { FunctionSquare } from 'lucide-react';
import {
  normalizeChatLatexText,
  splitChatLatexSegments,
} from '../lib/chat-latex';
import {
  desmosLatexToKatexDisplay,
  prepareChatMessageDisplay,
} from '../lib/desmos-display';

type ChatMessageContentProps = {
  text: string;
};

const renderBoldText = (text: string, keyPrefix: string) =>
  text.split(/(\*\*[^*\n]+\*\*)/g).map((part, i) => {
    const bold = part.match(/^\*\*([^*\n]+)\*\*$/);
    if (bold) {
      return (
        <strong key={`${keyPrefix}-b-${i}`} className="font-semibold text-gray-900">
          {bold[1]}
        </strong>
      );
    }
    if (!part) return null;
    return <React.Fragment key={`${keyPrefix}-t-${i}`}>{part}</React.Fragment>;
  });

const renderKatexHtml = (latex: string, display: boolean) => {
  try {
    return katex.renderToString(latex, {
      displayMode: display,
      throwOnError: false,
      strict: 'ignore',
      trust: true,
    });
  } catch {
    return latex.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
};

const ChatLatexBlock: React.FC<{ text: string }> = ({ text }) => {
  const normalized = normalizeChatLatexText(text);
  const segments = splitChatLatexSegments(normalized);

  return (
    <>
      {segments.map((seg, i) => {
        if (seg.type === 'text') {
          if (!seg.data.trim()) return null;
          return (
            <span key={i} className="whitespace-pre-wrap">
              {renderBoldText(seg.data, String(i))}
            </span>
          );
        }

        if (seg.display) {
          return (
            <div
              key={i}
              className="chat-katex-display my-2 overflow-x-auto"
              dangerouslySetInnerHTML={{
                __html: renderKatexHtml(seg.data, true),
              }}
            />
          );
        }

        return (
          <span
            key={i}
            className="chat-katex-inline"
            dangerouslySetInnerHTML={{
              __html: renderKatexHtml(seg.data, false),
            }}
          />
        );
      })}
    </>
  );
};

/**
 * 渲染聊天正文：Desmos 公式块 + LaTeX（\[ \]、\boxed{}）+ Markdown 粗体
 */
const trimTextBesideFormula = (part: string, index: number, parts: string[]): string => {
  const prevIsFormula = index > 0 && /^<<FORMULA>>/.test(parts[index - 1]);
  const nextIsFormula = index < parts.length - 1 && /^<<FORMULA>>/.test(parts[index + 1]);
  let s = part;
  if (nextIsFormula) s = s.replace(/\n+\s*$/g, '');
  if (prevIsFormula) s = s.replace(/^\s*\n+/g, '');
  return s;
};

export const ChatMessageContent: React.FC<ChatMessageContentProps> = ({ text }) => {
  const parts = prepareChatMessageDisplay(text).split(/(<<FORMULA>>[\s\S]*?<<\/FORMULA>>)/g);

  return (
    <div className="chat-message-content text-sm text-gray-700 leading-relaxed space-y-1">
      {parts.map((part, pi) => {
        const formulaMatch = part.match(/^<<FORMULA>>([\s\S]*?)<<\/FORMULA>>$/);
        if (formulaMatch) {
          const latex = desmosLatexToKatexDisplay(formulaMatch[1]);
          return (
            <div
              key={pi}
              className="my-1 px-3 py-2 bg-blue-50/80 border border-blue-100 rounded-xl flex items-start gap-2.5 overflow-x-auto"
            >
              <FunctionSquare size={15} className="text-blue-500 shrink-0 mt-0.5" />
              <div
                className="min-w-0 text-sm text-blue-900 chat-katex-inline whitespace-nowrap"
                dangerouslySetInnerHTML={{
                  __html: renderKatexHtml(latex, false),
                }}
              />
            </div>
          );
        }

        if (!part) return null;

        const trimmed = trimTextBesideFormula(part, pi, parts).trim();
        if (!trimmed) return null;

        return (
          <div key={pi} className="chat-latex-body">
            <ChatLatexBlock text={trimmed} />
          </div>
        );
      })}
    </div>
  );
};
