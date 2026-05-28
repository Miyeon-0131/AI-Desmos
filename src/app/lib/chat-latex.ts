/**
 * 聊天消息 LaTeX 规范化、分隔符切分与渲染
 */

export type LatexSegment =
  | { type: 'text'; data: string }
  | { type: 'math'; data: string; display: boolean };

/** 修正常见 LLM LaTeX 笔误（聊天 KaTeX 渲染前） */
export function fixChatLatexMathBody(latex: string): string {
  let s = latex.trim();

  // s_C、n_N → s_{C}、n_{N}
  s = s.replace(/([A-Za-z])_([A-Za-z]{1,4})(?![A-Za-z{])/g, '$1_{$2}');

  // \sqrt{\frac{digits}} 缺分母时，尝试拆成 \frac{前3}{后2}（如 58658 → 586/58）
  s = s.replace(
    /\\sqrt\s*\{\s*\\frac\s*\{(\d{4,})\}\s*\}/g,
    (_m, digits: string) => {
      const splitAt = digits.length - 2;
      if (splitAt <= 0) return _m;
      return `\\sqrt{\\frac{${digits.slice(0, splitAt)}}{${digits.slice(splitAt)}}}`;
    },
  );

  return s;
}

/** 修正并统一 LaTeX 分隔符，确保 \[ \] 等块级公式可被识别 */
export function normalizeChatLatexText(text: string): string {
  let s = text;

  // LLM / JSON 里常见的双反斜杠分隔符
  s = s.replace(/\\\\\[/g, '\\[');
  s = s.replace(/\\\\\]/g, '\\]');
  s = s.replace(/\\\\\(/g, '\\(');
  s = s.replace(/\\\\\)/g, '\\)');

  // 分隔符两侧多余空白
  s = s.replace(/\\\[\s+/g, '\\[');
  s = s.replace(/\s+\\\]/g, '\\]');

  // 将 \[ ... \] 统一为 $$ ... $$（最稳妥的块级分隔）
  s = s.replace(/\\\[\s*([\s\S]*?)\s*\\\]/g, (_m, body) =>
    `\n$$${fixChatLatexMathBody(String(body).trim())}$$\n`);

  // \( ... \) → $ ... $
  s = s.replace(/\\\(\s*([\s\S]*?)\s*\\\)/g, (_m, body) => `$${fixChatLatexMathBody(String(body))}$`);

  // 修正 $...$ 与 $$...$$ 内的常见笔误
  s = s.replace(/\$\$([\s\S]*?)\$\$/g, (_m, body) => `$$${fixChatLatexMathBody(String(body))}$$`);
  s = s.replace(/(^|[^\\$])\$([^$\n]+?)\$(?!\$)/g, (_m, prefix, body) =>
    `${prefix}$${fixChatLatexMathBody(String(body))}$`);

  return s;
}

/** 顺序重要：先匹配 $$，再匹配行内 $ */
export const CHAT_LATEX_DELIMITERS = [
  { left: '$$', right: '$$', display: true },
  { left: '$', right: '$', display: false },
];

const escapeRegex = (s: string) => s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

const findEndOfMath = (delimiter: string, text: string, start: number): number => {
  let index = start;
  let braceLevel = 0;
  const len = delimiter.length;
  while (index < text.length) {
    if (braceLevel <= 0 && text.slice(index, index + len) === delimiter) {
      return index;
    }
    const ch = text[index];
    if (ch === '\\') {
      index += 2;
      continue;
    }
    if (ch === '{') braceLevel += 1;
    else if (ch === '}') braceLevel -= 1;
    index += 1;
  }
  return -1;
};

/** 按 LaTeX 分隔符切分 */
export function splitChatLatexSegments(text: string): LatexSegment[] {
  const delimiters = CHAT_LATEX_DELIMITERS;
  let rest = text;
  const data: LatexSegment[] = [];
  const regexLeft = new RegExp(
    `(${delimiters.map(d => escapeRegex(d.left)).join('|')})`,
  );

  while (true) {
    const match = rest.search(regexLeft);
    if (match === -1) break;

    if (match > 0) {
      data.push({ type: 'text', data: rest.slice(0, match) });
      rest = rest.slice(match);
    }

    const di = delimiters.findIndex(d => rest.startsWith(d.left));
    if (di === -1) break;

    const end = findEndOfMath(delimiters[di].right, rest, delimiters[di].left.length);
    if (end === -1) break;

    const math = rest.slice(delimiters[di].left.length, end).trim();
    data.push({ type: 'math', data: math, display: delimiters[di].display });
    rest = rest.slice(end + delimiters[di].right.length);
  }

  if (rest !== '') {
    data.push({ type: 'text', data: rest });
  }

  return data;
}
