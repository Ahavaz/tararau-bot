const customKb = (msgId, customKeyboard) => ({
  reply_to_message_id: msgId,
  parse_mode: 'Markdown',
  reply_markup: {
    keyboard: customKeyboard,
    resize_keyboard: true,
    one_time_keyboard: true,
    force_reply: true,
    selective: true
  }
})

const defaultKb = (msgId, isReply = false) => ({
  reply_to_message_id: msgId,
  parse_mode: 'Markdown',
  reply_markup: {
    remove_keyboard: true,
    force_reply: isReply,
    selective: true
  }
})

const notification = () => ({
  parse_mode: 'Markdown',
  reply_markup: {
    remove_keyboard: true
  }
})

module.exports = {
  customKb,
  defaultKb,
  notification
}
