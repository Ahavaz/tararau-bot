const { inputMsgs } = require('./messages/input')
const { outputMsgs } = require('./messages/output')
const { filterMsg, randomMsg, getRandomInt, buildMsg } = require('./utils')

const msgMatches = (chatId, msgId, userMsg, userName, bot) => {
  const greetingMatches = filterMsg(userMsg, inputMsgs.greeting)
  const farewellMatches = filterMsg(userMsg, inputMsgs.farewell)
  const swearingsMatches = inputMsgs.swearings.filter(message =>
    userMsg.includes(message)
  )
  const owMatches = inputMsgs.ow.filter(message => userMsg === message)
  const shitMatches = inputMsgs.shit.filter(message =>
    userMsg.includes(message)
  )
  const goodMorningMatches = inputMsgs.goodMorning.filter(message =>
    userMsg.startsWith(message)
  )
  const goodNightMatches = inputMsgs.goodNight.filter(message =>
    userMsg.startsWith(message)
  )
  const loveMatches = inputMsgs.love.filter(message =>
    userMsg.includes(message)
  )
  const hateMatches = inputMsgs.hate.filter(message =>
    userMsg.includes(message)
  )
  const enfiaMatches = inputMsgs.enfia.filter(message =>
    userMsg.includes(message)
  )
  const fodaMatches = inputMsgs.foda.filter(message =>
    userMsg.includes(message)
  )

  if (swearingsMatches.length !== 0) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.swearings), {
      reply_to_message_id: msgId
    })
  } else if (enfiaMatches.length !== 0) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.enfia), {
      reply_to_message_id: msgId
    })
  } else if (fodaMatches.length !== 0) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.foda(userName)), {
      reply_to_message_id: msgId
    })
  } else if (inputMsgs.miou.test(userMsg)) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.miou), {
      reply_to_message_id: msgId
    })
  } else if (goodMorningMatches.length !== 0) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.goodMorning(userName)), {
      reply_to_message_id: msgId
    })
  } else if (goodNightMatches.length !== 0) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.goodNight), {
      reply_to_message_id: msgId
    })
  } else if (loveMatches.length !== 0) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.love), {
      reply_to_message_id: msgId
    })
  } else if (hateMatches.length !== 0) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.hate), {
      reply_to_message_id: msgId
    })
  } else if (inputMsgs.amor.test(userMsg)) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.amor), {
      reply_to_message_id: msgId
    })
  } else if (inputMsgs.top.test(userMsg)) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.top), {
      reply_to_message_id: msgId
    })
  } else if (owMatches.length !== 0) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.ow), {
      reply_to_message_id: msgId
    })
  } else if (greetingMatches.length !== 0) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.greeting), {
      reply_to_message_id: msgId
    })
  } else if (farewellMatches.length !== 0) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.farewell), {
      reply_to_message_id: msgId
    })
  } else if (shitMatches.length !== 0) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.shit), {
      reply_to_message_id: msgId
    })
  } else if (inputMsgs.tararau.test(userMsg)) {
    bot.sendMessage(chatId, buildMsg(outputMsgs.tararau))
  } else if (inputMsgs.ayn.test(userMsg) && getRandomInt(1, 2) === 1) {
    bot.sendMessage(chatId, buildMsg(outputMsgs.ayn))
  } else if (inputMsgs.laugh.test(userMsg) && getRandomInt(1, 3) === 1) {
    bot.sendMessage(chatId, buildMsg(outputMsgs.laugh))
  }
}

module.exports = {
  msgMatches
}
