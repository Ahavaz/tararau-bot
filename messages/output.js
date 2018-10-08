const emoji = require('node-emoji')

const outputMsgs = {
  tararau: ['Tararau', 'TARARAU'],
  ayn: ['ayn', 'AYN'],
  laugh: ['ha', 'ah', 'kk', 'uhas', 'hue', 'ahu', 'hua'],
  top: [
    `Top ${emoji.find('ok_hand').emoji}`,
    'TOP',
    'triceráTOPs',
    'TOPázio',
    'TOPizza',
    'TOPeira',
    'TOPster',
    'TOPerson',
    'TOPzera',
    'TOPélio',
    'TOPorens',
    'TOPúlio',
    'TOPorie',
    'TOPucas',
    'TOPinga',
    'TOPleno',
    'TOProfano',
    'TOPrepotente',
    'TOPolido',
    'TOPada',
    'TOPografia',
    'TOPetada',
    'TOPologia',
    'TOPológico',
    'TOPa ou não TOPa?',
    'TOPuto',
    'orTOPedia',
    'cenTOPeia',
    'homoTOPia',
    'ciTOPlasma',
    'ecTOPlasma',
    'onomaTOPeia',
    'TOPovski',
    'uTÓPico',
    'disTÓPico',
    'isóTOPo'
  ],
  amor: ['Deus me free', 'Tô fora', 'Nem fodendo', 'God me livre!'],
  greeting: [
    'E ae cutetu',
    'E ae putetu',
    'E ae cuzudu',
    'E ae coroi',
    'E ae tararau',
    'Fala, cutetu',
    'Fala, putetu',
    'Fala, cuzudu',
    'Fala, coroi',
    'Fala, tararau',
    'Manda bala xuxu',
    'Oi nenê <3 '
  ],
  farewell: [
    'Vlw flw',
    'Vlw flws',
    'Vlw cuteto',
    'Vlws',
    'Flw putetu',
    'Flws',
    'Xau tararau',
    'Xaus',
    'Hasta la vista, tararau',
    'Até, cuzudu',
    'Falorens',
    'Falorinha',
    'Falélio',
    'Falúlio',
    'Falucas',
    'до свидания'
  ],
  swearings: [
    'Lava essa boca, tararau',
    'Mas que boca suja é essa?!',
    'É com essa boca que você beija sua mamai?',
    'Teu cu!',
    'TEU CU',
    `${emoji.find('point_up_2').emoji}${emoji.find('point_right').emoji}${
      emoji.find('ok_hand').emoji
    }`
  ],
  ow: [
    'Diga..',
    'Fale',
    'Vemk e me conta bb',
    `Lá vem ${emoji.find('face_with_rolling_eyes').emoji}`,
    `Vemk e fala no meu ouvidinho digital... ${emoji.find('smirk').emoji}`
  ],
  shit: ['Caguei!', 'CAGUEI', 'K-gay', `${emoji.find('poop').emoji}`],
  goodMorning: userName => [
    `Bom dia seus poha! ${emoji.find('angry').emoji}`,
    `Bom dia é o caralho ${emoji.find('middle_finger').emoji}`,
    'Bundinha seus troxa',
    `Boudia bbs ${emoji.find('high_brightness').emoji}`,
    `Bom dia nenês ${emoji.find('sunny').emoji}`,
    `Bom dia cutetu ${userName}`,
    `Bom dia putetu ${userName}`,
    `Bom dia ${userName} cuzudin`,
    `Bom dia ${userName} - tararau`,
    'Hello world seus pirocetudos!!!'
  ],
  goodNight: [
    'Boa noite cutetu',
    'Boa noite putetu',
    'Boa noite cuzudu',
    'Boa noite tararau',
    'Gudnait modafoca',
    'Sonhe com as lhamas',
    'Boa viagem astral',
    'Beijinhos meu nenê'
  ],
  miou: [
    'É UM POHA',
    'MAS É UM POHA',
    'É UM POHA MESMO',
    'MAS É UM POHA MESMO',
    'FoodaC',
    'Nobody yes door',
    'Se fodeu',
    'Tomou no meio',
    'A PRONTO!',
    'OLHA AÍ A MADAME!'
  ],
  love: [`${emoji.find('purple_heart').emoji}`, 'FooodaC', 'C-A-G-A-Y'],
  hate: [`${emoji.find('broken_heart').emoji}`, 'FooodaC', 'C-A-G-A-Y'],
  enfia: ['Enfia no teu!', 'Me obrigue!', 'Por favor, insira no seu boga!'],
  foda: userName => [
    'Não tá fácil pra ninguém',
    'Eu acredito em você e acredito em um mundo mais TARARAU!',
    'SEEEGUUUUUUUUUUUUURA PEÃO!',
    `Lembre-se de quem você é ${userName}, você já lutou tanto para chegar até aqui, tenho certeza que irá sobreviver!`,
    `${userName}, você é o resultado de bilhões de ano de evolução, aja como tal!`,
    'Respira e vai!',
    `Fica sussa, relaxa o esfíncter que dá tudo certo ${
      emoji.find('ok_hand').emoji
    }`
  ]
}

module.exports = { outputMsgs }
