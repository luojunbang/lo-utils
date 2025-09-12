import * as XLSX from 'xlsx'

export type Row = Record<string, unknown>

/** 导出对象数组为 Excel 文件（返回 ArrayBuffer） */
export function toExcel<T extends Row>(
  rows: T[],
  opts?: {
    sheetName?: string
  },
): ArrayBuffer {
  if (!rows?.length) return new ArrayBuffer(0)
  const ws = XLSX.utils.json_to_sheet(rows)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, opts?.sheetName ?? 'Sheet1')
  return XLSX.write(wb, { type: 'array', bookType: 'xlsx' })
}

/** 从 Excel 文件解析为对象数组，并支持字段->表头映射 */
export async function parseExcel<T extends Row = Row>(
  file: File,
  mapping?: Record<keyof T & string, string>, // 对象属性 -> Excel表头
): Promise<T[]> {
  const buf = await file.arrayBuffer()
  const wb = XLSX.read(buf, { type: 'array' })
  const sheet = wb.Sheets[wb.SheetNames[0]]

  // 原始数据：Excel表头作为key
  const rows = XLSX.utils.sheet_to_json<Row>(sheet, {
    defval: '',
  })

  if (!mapping) {
    return rows as T[]
  }

  // 反转映射: { Excel表头 -> 对象属性 }
  const reverseMap: Record<string, string> = {}
  for (const key in mapping) {
    reverseMap[mapping[key]] = key
  }

  // 转换成目标对象
  return rows.map((row) => {
    const newRow: Row = {}
    for (const excelKey in row) {
      const newKey = reverseMap[excelKey] ?? excelKey // 映射不到则保留
      newRow[newKey] = row[excelKey]
    }
    return newRow as T
  })
}
