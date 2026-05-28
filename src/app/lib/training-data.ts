/**
 * Few-Shot 训练数据：注入系统提示词，引导 AI 输出风格与 Desmos 语法。
 * 不会在 AI 回复生成后强制改写内容。
 */

export interface TrainingExample {
  id: string;
  question: string;
  answer: string;
}

const STORAGE_KEY = 'desmos_training_data';

/** 内置示范（始终作为参考，不写入 localStorage） */
export const BUILTIN_TRAINING_EXAMPLES: TrainingExample[] = [
  {
    id: 'builtin-parametric-circle',
    question: '用参数方程画单位圆',
    answer:
      'Desmos 参数方程只接受 t，写法：\n<DESMOS>(\\cos(t), \\sin(t))</DESMOS>\n不要写 (cos(u), sin(u)) 或 (t(u), t(u))。',
  },
  {
    id: 'builtin-negative-integral',
    question: '画 -x^2 在 0 到 1 的定积分阴影',
    answer:
      '负函数阴影用 f(x)\\le y\\le 0：\n<DESMOS>f(x)=-x^2</DESMOS><DESMOS>f(x)\\le y\\le 0\\left\\{0\\le x\\le 1\\right\\}</DESMOS><DESMOS>\\int_{0}^{1} (-x^2) dx</DESMOS>',
  },
  {
    id: 'builtin-polar-rose',
    question: '画极坐标玫瑰线',
    answer:
      '极坐标曲线用 r=f(\\theta)，不要用参数 u：\n<DESMOS>r=\\cos(3\\theta)</DESMOS>',
  },
];

export function loadTrainingData(): TrainingExample[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is TrainingExample =>
          item != null &&
          typeof item === 'object' &&
          typeof (item as TrainingExample).id === 'string' &&
          typeof (item as TrainingExample).question === 'string' &&
          typeof (item as TrainingExample).answer === 'string',
      )
      .map(item => ({
        id: item.id,
        question: item.question.trim(),
        answer: item.answer.trim(),
      }))
      .filter(item => item.question && item.answer);
  } catch {
    return [];
  }
}

export function saveTrainingData(examples: TrainingExample[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(examples));
}

export function formatTrainingForPrompt(lang: 'zh' | 'en', userExamples: TrainingExample[] = loadTrainingData()): string {
  const examples = [...BUILTIN_TRAINING_EXAMPLES, ...userExamples];
  if (examples.length === 0) return '';

  const header =
    lang === 'zh'
      ? [
          '',
          '**参考示范（请模仿其 Desmos 语法与回答结构；系统不会事后改写你的 <DESMOS> 输出，务必一次写对）：**',
        ]
      : [
          '',
          '**Reference examples (match this Desmos syntax and structure; your <DESMOS> output is NOT rewritten afterward — get it right the first time):**',
        ];

  const blocks = examples.map((ex, i) => {
    const label = lang === 'zh' ? `示范 ${i + 1}` : `Example ${i + 1}`;
    return `${label}:\n用户: ${ex.question}\n标准回答:\n${ex.answer}`;
  });

  return [...header, ...blocks].join('\n');
}
