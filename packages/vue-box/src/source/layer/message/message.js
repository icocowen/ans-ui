import { LIB_NAME, ANIMATION_PREFIX } from '../../../../../../src/util'
import BoxManager from '../../base/index'

const prefixCls = `${LIB_NAME}-message`
const prefixKey = `${LIB_NAME}_message_key_`

let messageInstance
let name = 1

let defaultConfig = {
  // 设置全局的自动关闭时间，为0时不自动消失
  duration: 1.5,
  // 设置出现的位置在浏览器顶部的距离
  top: 60,
  transitionName: `${ANIMATION_PREFIX}move-in`,
  fixed: true,
  i18n: null
}

const iconTypes = {
  info: 'ans-icon-notice-solid',
  success: 'ans-icon-success-solid',
  warning: 'ans-icon-warn-solid',
  error: 'ans-icon-fail-solid',
  loading: 'ans-icon-spinner'
}

function getMessageInstance (i18n) {
  messageInstance = messageInstance || BoxManager.newInstance({
    prefixCls: prefixCls,
    styles: {
      top: defaultConfig.top + 'px',
      left: '50%'
    },
    className: defaultConfig.fixed ? `${prefixCls}-fixed` : '',
    i18n
  })
  return messageInstance
}

function notice (
  content = '',
  duration = defaultConfig.duration,
  type,
  onClose = function () {},
  closable = false,
  i18n = defaultConfig.i18n
) {
  const instance = getMessageInstance(i18n)

  instance.notice({
    name: `${prefixKey}${name}`,
    duration: duration,
    transitionName: defaultConfig.transitionName,
    styles: {},
    content:
      `
        <i class="${iconTypes[type]} ${type}"></i><span>${content}</span>
      `,
    onClose: onClose,
    closable: closable,
    type: 'message'
  })

  name++
}

function formatOptions (options) {
  const type = typeof options
  if (type === 'string') {
    options = {
      content: options
    }
  }
  return options
}

export default {
  name: 'Message',
  info (options) {
    options = formatOptions(options)
    return notice(options.content, options.duration, 'info', options.onClose, options.closable, options.i18n)
  },
  success (options) {
    options = formatOptions(options)
    return notice(options.content, options.duration, 'success', options.onClose, options.closable, options.i18n)
  },
  warning (options) {
    options = formatOptions(options)
    return notice(options.content, options.duration, 'warning', options.onClose, options.closable, options.i18n)
  },
  error (options) {
    options = formatOptions(options)
    return notice(options.content, options.duration, 'error', options.onClose, options.closable, options.i18n)
  },
  loading (options) {
    options = formatOptions(options)
    return notice(options.content, options.duration, 'loading', options.onClose, options.closable, options.i18n)
  },
  config (cfg = {}) {
    defaultConfig = Object.assign(defaultConfig, cfg)
  },
  destroy () {
    const instance = getMessageInstance()
    messageInstance = null
    instance.destroy(prefixCls)
  }
}
