declare const module: any
declare const MessageChannel: any

let enqueueTask: (callback: () => void) => void
try {
  // read require off the module object to get around the bundlers.
  // we don't want them to detect a require and bundle a Node polyfill.
  const requireString = `require${Math.random()}`.slice(0, 7)
  const nodeRequire = module && module[requireString]
  // assuming we're in node, let's try to get node's
  // version of setImmediate, bypassing fake timers if any.
  enqueueTask = nodeRequire('timers').setImmediate
} catch (_err) {
  // we're in a browser
  // we can't use regular timers because they may still be faked
  // so we try MessageChannel+postMessage instead
  enqueueTask = callback => {
    const supportsMessageChannel = typeof MessageChannel === 'function'
    if (supportsMessageChannel) {
      const channel = new MessageChannel()
      channel.port1.onmessage = callback
      channel.port2.postMessage(undefined)
    } else {
      throw Error('Cannot flush without the global MessageChannel class')
    }
  }
}

export const flushMicroTasks = () =>
  ({
    then(resolve: () => void) {
      enqueueTask(resolve)
    },
  })
