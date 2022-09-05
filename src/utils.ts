export function _warn(...message: any) {
  console.warn('[🔊melt-crud]: ', ...message)
}

export const safeEval = (code: string) => {
  return Function(`"use strict"; ${code}`)();
}

// 解析函数字符串值
export const evaluateString = (string: string, formData: {}, rootValue: {}) =>
  safeEval(`
  const rootValue =${JSON.stringify(rootValue)};
  const formData = ${JSON.stringify(formData)};
  return (${string})
  `);

// 解析函数字符串值(用于validator，入参只有value)
export const evaluateString2 = (string: string, value: {}, formData: {}) =>
  safeEval(`
  const value =${JSON.stringify(value)};
  const formData = ${JSON.stringify(formData)};
  return (${string})
  `);