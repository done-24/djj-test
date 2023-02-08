import log from 'npmlog'

if(process.argv.includes('--debug') || process.argv.includes('-d')) {
    log.level = 'verbose'
} else {
    log.level = 'info'
}

log.heading = 'djj'

log.addLevel('success', 2000, {fg: 'green', bold: true})

export default log