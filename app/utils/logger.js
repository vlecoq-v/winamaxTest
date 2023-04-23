import simpleNodeLogger from 'simple-node-logger'

const opts = {
  timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
}

const logLevel = process.env.LOG_LEVEL || 'info'

export const log = simpleNodeLogger.createSimpleLogger(opts)

log.setLevel(logLevel)
