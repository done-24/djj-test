import { printErrorLog } from "@djj/utils"

process.on('uncaughtException', e => printErrorLog(e, 'error'))

process.on('unhandledRejection', e => printErrorLog(e, 'promise'))
