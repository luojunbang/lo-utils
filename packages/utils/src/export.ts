import ExcelJS from 'exceljs'
import { outputJsonSync, existsSync, readJSONSync } from 'fs-extra'
import { join, resolve } from 'path'

export async function exportExcel(
  fileName,
  ...data: {
    name: string
    sheet?: any[][] | null
  }[]
) {
  const workbook = new ExcelJS.Workbook()
  data.forEach((workSheet) => {
    const sheet = workbook.addWorksheet(workSheet.name)
    sheet.addRows(workSheet.sheet ?? [])
  })
  await workbook.xlsx.writeFile(fileName)
}

const encoding = 'utf-8'

export class Export {
  private path: string
  private options = {
    dir: join(resolve(__dirname).split('node_modules')[0], 'output'),
  }
  constructor(
    module: string,
    options: {
      outputPath?: string
    } = {},
  ) {
    this.options = { ...this.options, ...options }
    this.path = join(this.options.dir, module)
  }
  private pr(key) {
    return join(this.path, `./${key}.json`)
  }
  set(key, data: any) {
    outputJsonSync(this.pr(key), data, { encoding })
  }

  get(key): any[] | Record<string, any> | null {
    if (!existsSync(this.pr(key))) return null
    return readJSONSync(this.pr(key), { encoding })
  }

  update(key, ...data) {
    if (!existsSync(this.pr(key))) {
      this.set(key, [...data])
      return
    }
    const ret = this.get(key)
    if (Array.isArray(ret)) {
      ret.push(...data)
      this.set(key, ret)
    } else {
      throw new Error('Your outoput JSON file is not an array, Please check. ')
    }
  }
}
