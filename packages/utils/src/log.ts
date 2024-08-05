import path, { join } from 'path'
import { generatorDate } from './dateHandler'
import { appendFileSync, ensureFileSync, writeFileSync } from 'fs-extra'

enum LogType {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
}
export class Log {
  private cacheFetching: Record<string, number> = {}
  private logFile: string
  // default options
  private options = {
    dir: join(process.cwd(), './logs'),
    timeout: 30,
    parseLog: (content: any) => {
      let ret: string = ''
      if (typeof content === 'string') ret = content
      else if (content instanceof Error) {
        ret = `${content.name} \n\t\t${content.message}\n`
      } else if (typeof content === 'object') {
        try {
          ret = JSON.stringify(content)
        } catch (e) {
          /* empty */
        }
      }
      if (!ret) {
        try {
          ret = content.toString()
        } catch (e) {
          /* empty */
        }
      }
      return ret
    },
  }
  constructor(module: string, options: { outputPath?: string; timeout?: number; parseLog?: (any) => string } = {}) {
    this.options = { ...this.options, ...options }
    this.logFile = join(this.options.dir, `${module}.log`)
    ensureFileSync(this.logFile)
  }

  private common(type: LogType, ...content) {
    appendFileSync(this.logFile, `${generatorDate(Date.now(), 'y-m-d h:i:s.e')}: [${type}] ${content.map(this.options.parseLog).join('\n\t\t')}\n`)
  }
  clear() {
    writeFileSync(this.logFile, '')
  }
  error(...args) {
    console.log(args)

    this.common(LogType.ERROR, ...args)
  }
  info(...args) {
    this.common(LogType.INFO, ...args)
  }
  warn(...args) {
    this.common(LogType.WARNING, ...args)
  }
  doing(key: string) {
    Reflect.set(
      this.cacheFetching,
      key,
      setTimeout(() => {
        Reflect.deleteProperty(this.cacheFetching, key)
      }, this.options.timeout * 1000),
    )
  }
  fail(key: string, ...content: any) {
    clearTimeout(Reflect.get(this.cacheFetching, key))
    Reflect.deleteProperty(this.cacheFetching, key)
    this.error(`[FAIL] ${key} `, ...content)
  }
  done(key: string) {
    clearTimeout(Reflect.get(this.cacheFetching, key))
    Reflect.deleteProperty(this.cacheFetching, key)
    this.info(`[OK] ${key} `)
  }
}
