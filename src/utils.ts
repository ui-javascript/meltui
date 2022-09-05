export function _warn(...message: any) {
  console.warn('[🔊melt-crud]: ', ...message)
}

export const safeEval = (code: string) => {
  debugger
  return Function(`"use strict"; ${code}`)();
}

export const getEval = (string: string, record: {}, column: {}, rowIndex: number) => {
  return safeEval(`
    const rowIndex = ${rowIndex};
    const column = ${JSON.stringify(column)};
    const record = ${JSON.stringify(record)};
    return (${string})
  `);  
}

export const justEval = (string: string, record: {}, column: {}, rowIndex: number) => {
  
  safeEval(`
    const rowIndex = ${rowIndex};
    const column = ${JSON.stringify(column)};
    const record = ${JSON.stringify(record)};
    return (${string})
  `);  
}
 

// export const evaluateString5 = (string: string, record: {}) =>
//   safeEval(`
//   const record = ${JSON.stringify(record)};
//   return (${string})
//   `);

// export const evaluateString2 = (string: string, tableData: [], record: {}) =>
//   safeEval(`
//   const tableData = ${JSON.stringify(tableData)};
//   const record = ${JSON.stringify(record)};
//   return (${string})
// `);  

// export const evaluateString3 = (string: string, record: {}) =>
//   safeEval(`
//   const record = ${JSON.stringify(record)};
//   return (${string})
// `);  


// export const evaluateString4 = (string: string, record: {}, rowIndex: number) =>
//   safeEval(`
//   const rowIndex = ${rowIndex};
//   const record = ${JSON.stringify(record)};
//   return (${string})
// `);  

