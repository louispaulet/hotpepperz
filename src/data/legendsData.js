export const legends = [
  {
    slug: 'pepper-routes',
    contentType: 'Legend',
    cardAction: 'Open story',
    title: 'The Pepper Routes',
    subtitle: 'How American chiles crossed oceans and became local in kitchens far from their botanical birthplace',
    summary:
      'Hot peppers are native to the Americas, yet many of the world’s best-known chili traditions developed after peppers travelled through trade, empire, migration, and local adaptation.',
    sections: [
      {
        title: 'A New World fruit with a global second life',
        body:
          'Capsicum species originated in the Americas. After the Columbian Exchange, peppers spread rapidly because they were easy to cultivate, dramatic in flavor, and adaptable to climates from tropical coasts to mountain valleys.',
      },
      {
        title: 'Why the story matters',
        body:
          'Once peppers arrived in Africa, Asia, and Europe, cooks made them local very quickly. That is why there is no single “authentic” pepper story. There are many: Thai, Mexican, Peruvian, Korean, Sichuan, Caribbean, Surinamese, and more.',
      },
      {
        title: 'The modern lesson',
        body:
          'The most interesting pepper encyclopedias do not treat chilies as static trophies. They treat them as migrants, agricultural citizens, and flavor tools shaped by specific tables and landscapes.',
      },
    ],
    relatedPepperSlugs: [
      'birds-eye-chili',
      'piri-piri',
      'rocoto',
      'chile-de-arbol',
      'madame-jeanette',
      'datil',
      'cheongyang',
      'fatalii',
    ],
    relatedRecipeSlugs: ['sambal-birdseye', 'salsa-macha-arbol'],
    sources: [
      { label: 'Britannica on the Columbian Exchange', href: 'https://www.britannica.com/event/Columbian-exchange' },
      { label: 'Britannica on chili peppers', href: 'https://www.britannica.com/plant/chili-pepper' },
    ],
  },
]

export const legendMap = Object.fromEntries(legends.map((legend) => [legend.slug, legend]))
