const operatorPlaceholders = [
  'Nom ou raison sociale: [A COMPLETER]',
  'Forme juridique: [A COMPLETER]',
  'Capital social: [A COMPLETER SI SOCIETE]',
  'Adresse du siege ou domicile: [A COMPLETER]',
  'E-mail de contact: [A COMPLETER]',
  'Telephone: [A COMPLETER]',
  'RCS / RNE / SIREN / SIRET: [A COMPLETER SI APPLICABLE]',
  'Directeur ou directrice de la publication: [A COMPLETER]',
  'Hebergeur: [A COMPLETER]',
  'Contact donnees personnelles / DPO: [A COMPLETER SI APPLICABLE]',
]

const operatorPlaceholdersEn = [
  'Company or operator name: [TO COMPLETE]',
  'Legal form: [TO COMPLETE]',
  'Share capital: [TO COMPLETE IF APPLICABLE]',
  'Registered address: [TO COMPLETE]',
  'Contact email: [TO COMPLETE]',
  'Phone number: [TO COMPLETE]',
  'Company registration identifiers: [TO COMPLETE IF APPLICABLE]',
  'Publication director: [TO COMPLETE]',
  'Hosting provider: [TO COMPLETE]',
  'Data protection contact / DPO: [TO COMPLETE IF APPLICABLE]',
]

export const legalPages = {
  'mentions-legales': {
    slug: 'mentions-legales',
    contentType: 'Legal',
    language: 'FR',
    title: 'Mentions legales',
    lastUpdated: 'April 18, 2026',
    alternateLanguagePath: '/legal/legal-notice',
    intro:
      'Cette page constitue un modele de conformite pour un site editorial oriente France. Elle doit etre relue et completee avant toute mise en ligne en production.',
    sections: [
      {
        id: 'identification-editeur',
        heading: 'Identification de l’editeur',
        items: operatorPlaceholders,
      },
      {
        id: 'objet-du-site',
        heading: 'Objet du site',
        paragraphs: [
          'HotPepperz est presente comme un site editorial et informatif consacre a la culture des piments, aux associations culinaires, aux restaurants et a la creation de sauces. Il ne constitue pas un site de vente en ligne dans sa version actuelle.',
          'Les contenus ont une vocation d’information generale, de reference culinaire et d’inspiration editoriale.',
        ],
      },
      {
        id: 'propriete-intellectuelle',
        heading: 'Propriete intellectuelle',
        paragraphs: [
          'Sauf mention contraire, les textes, compositions graphiques, illustrations, images, marques, noms et elements de design du site sont proteges par les droits de propriete intellectuelle applicables.',
          'Toute reproduction, representation, adaptation ou exploitation, totale ou partielle, sans autorisation prealable ecrite, est interdite sauf exception legale.',
        ],
      },
      {
        id: 'responsabilite',
        heading: 'Responsabilite',
        paragraphs: [
          'L’editeur s’efforce de fournir des informations exactes et a jour, mais ne garantit pas l’exhaustivite ni l’absence d’erreurs ou d’omissions.',
          'Les informations relatives aux piments, aux restaurants, aux pratiques culinaires et aux obligations juridiques sont fournies a titre informatif et doivent etre verifiees avant usage professionnel, commercial ou juridique.',
        ],
      },
    ],
    references: [
      {
        label: 'economie.gouv.fr - mentions obligatoires sur un site internet',
        href: 'https://www.economie.gouv.fr/entreprises/developper-son-entreprise/innover-et-numeriser-son-entreprise/mentions-sur-votre-site-internet-les-obligations-respecter',
      },
      {
        label: 'Service-Public.fr - mentions obligatoires sur le site internet d’une societe',
        href: 'https://entreprendre.service-public.fr/vosdroits/F37351',
      },
    ],
  },
  'legal-notice': {
    slug: 'legal-notice',
    contentType: 'Legal',
    language: 'EN',
    title: 'Legal Notice',
    lastUpdated: 'April 18, 2026',
    alternateLanguagePath: '/legal/mentions-legales',
    intro:
      'This page is a France-oriented compliance draft for an editorial website. Review and complete it before publishing the site in production.',
    sections: [
      {
        id: 'publisher-identification',
        heading: 'Publisher identification',
        items: operatorPlaceholdersEn,
      },
      {
        id: 'website-purpose',
        heading: 'Website purpose',
        paragraphs: [
          'HotPepperz is presented as an editorial and informational website about peppers, culinary pairings, restaurants, and sauce culture. In its current form it is not an e-commerce website.',
          'The content is intended for general information, culinary reference, and editorial inspiration.',
        ],
      },
      {
        id: 'intellectual-property',
        heading: 'Intellectual property',
        paragraphs: [
          'Unless otherwise stated, texts, graphics, illustrations, images, trademarks, names, and design elements on the website are protected by applicable intellectual property rights.',
          'Any reproduction, adaptation, republication, or use, in whole or in part, without prior written permission is prohibited except where required by law.',
        ],
      },
      {
        id: 'liability',
        heading: 'Liability',
        paragraphs: [
          'The publisher seeks to provide accurate and up-to-date information but does not guarantee completeness or the absence of errors or omissions.',
          'Information concerning peppers, restaurants, culinary practices, and legal obligations is provided for general information only and should be verified before professional, commercial, or legal use.',
        ],
      },
    ],
    references: [
      {
        label: 'French Ministry of the Economy - mandatory website notices',
        href: 'https://www.economie.gouv.fr/entreprises/developper-son-entreprise/innover-et-numeriser-son-entreprise/mentions-sur-votre-site-internet-les-obligations-respecter',
      },
      {
        label: 'Service-Public.fr - mandatory company website information',
        href: 'https://entreprendre.service-public.fr/vosdroits/F37351',
      },
    ],
  },
  'conditions-utilisation': {
    slug: 'conditions-utilisation',
    contentType: 'Legal',
    language: 'FR',
    title: 'Conditions d’utilisation',
    lastUpdated: 'April 18, 2026',
    alternateLanguagePath: '/legal/terms-of-use',
    intro:
      'Les presentes conditions encadrent l’usage d’un site editorial statique. Elles doivent etre adaptees si des services transactionnels, des comptes utilisateurs ou une collecte etendue de donnees sont ajoutes.',
    sections: [
      {
        id: 'acceptation-et-acces',
        heading: 'Acceptation et acces',
        paragraphs: [
          'L’acces et l’utilisation du site impliquent l’acceptation des presentes conditions d’utilisation.',
          'Le site peut etre modifie, suspendu ou interrompu a tout moment, sans garantie de disponibilite continue.',
        ],
      },
      {
        id: 'usage-autorise',
        heading: 'Usage autorise',
        paragraphs: [
          'L’utilisateur s’engage a utiliser le site dans le respect des lois applicables et a ne pas perturber son fonctionnement.',
          'Les contenus ne doivent pas etre utilises pour presenter des conseils juridiques, medicaux ou professionnels comme s’ils emanent de l’editeur.',
        ],
      },
      {
        id: 'contenus-tiers-et-liens',
        heading: 'Contenus tiers et liens',
        paragraphs: [
          'Le site peut renvoyer vers des sources externes, notamment des restaurants, guides ou services tiers. L’editeur n’exerce aucun controle sur ces services et decline toute responsabilite quant a leur contenu ou leurs politiques.',
        ],
      },
    ],
    references: [
      {
        label: 'economie.gouv.fr - obligations d’information sur un site',
        href: 'https://www.economie.gouv.fr/entreprises/developper-son-entreprise/innover-et-numeriser-son-entreprise/mentions-sur-votre-site-internet-les-obligations-respecter',
      },
    ],
  },
  'terms-of-use': {
    slug: 'terms-of-use',
    contentType: 'Legal',
    language: 'EN',
    title: 'Terms of Use',
    lastUpdated: 'April 18, 2026',
    alternateLanguagePath: '/legal/conditions-utilisation',
    intro:
      'These terms are drafted for a static editorial website. They should be updated if accounts, commerce, or broader data processing are added later.',
    sections: [
      {
        id: 'acceptance-and-access',
        heading: 'Acceptance and access',
        paragraphs: [
          'By accessing or using the website, users accept these Terms of Use.',
          'The website may be changed, suspended, or discontinued at any time without any guarantee of uninterrupted availability.',
        ],
      },
      {
        id: 'permitted-use',
        heading: 'Permitted use',
        paragraphs: [
          'Users agree to use the website in compliance with applicable law and not to interfere with its operation.',
          'Website content may not be represented as legal, medical, or professional advice from the publisher.',
        ],
      },
      {
        id: 'third-party-links-and-services',
        heading: 'Third-party links and services',
        paragraphs: [
          'The website may contain links to external sources, including restaurants, guides, and third-party services. The publisher does not control those services and is not responsible for their content or policies.',
        ],
      },
    ],
    references: [
      {
        label: 'French Ministry of the Economy - mandatory website notices',
        href: 'https://www.economie.gouv.fr/entreprises/developper-son-entreprise/innover-et-numeriser-son-entreprise/mentions-sur-votre-site-internet-les-obligations-respecter',
      },
    ],
  },
  'politique-confidentialite': {
    slug: 'politique-confidentialite',
    contentType: 'Legal',
    language: 'FR',
    title: 'Politique de confidentialite',
    lastUpdated: 'April 18, 2026',
    alternateLanguagePath: '/legal/privacy-policy',
    intro:
      'Cette politique doit etre adaptee aux traitements effectivement realises en production. Dans l’etat actuel du projet, elle couvre un site editorial avec eventuels appels vers des services tiers de generation de texte ou d’images depuis le navigateur.',
    sections: [
      {
        id: 'donnees-potentiellement-traitees',
        heading: 'Donnees potentiellement traitees',
        paragraphs: [
          'Selon les fonctionnalites actives, le site peut traiter des donnees techniques de navigation, des journaux d’hebergement, des donnees saisies volontairement dans l’atelier de sauces, ainsi que des informations transmises a des services tiers lorsqu’une fonctionnalite de generation assistee est utilisee.',
          'Aucune categorie de donnees ne doit etre mentionnee ici si elle n’est pas reellement traitee en production.',
        ],
      },
      {
        id: 'finalites',
        heading: 'Finalites',
        paragraphs: [
          'Les finalites peuvent inclure le fonctionnement technique du site, la securite, la maintenance, la mesure d’audience si elle existe, et l’execution de fonctionnalites optionnelles de generation de contenu.',
        ],
      },
      {
        id: 'droits-des-personnes',
        heading: 'Droits des personnes',
        paragraphs: [
          'Les personnes disposent, selon la reglementation applicable, de droits d’acces, de rectification, d’effacement, de limitation, d’opposition et, le cas echeant, de retrait du consentement.',
          'Une reclamation peut etre adressee a la CNIL si la personne estime que ses droits ne sont pas respectes.',
        ],
      },
      {
        id: 'transferts-et-sous-traitants',
        heading: 'Transferts et sous-traitants',
        paragraphs: [
          'Si des prestataires d’IA, d’hebergement ou d’analytics sont utilises, ils doivent etre identifies ici avec une description claire de leur role et, si necessaire, des transferts hors Union europeenne.',
        ],
      },
    ],
    references: [
      {
        label: 'CNIL - obligations d’information des personnes',
        href: 'https://www.cnil.fr/',
      },
      {
        label: 'Service-Public.fr - donnees personnelles et securite',
        href: 'https://www.service-public.fr/P10154',
      },
    ],
  },
  'privacy-policy': {
    slug: 'privacy-policy',
    contentType: 'Legal',
    language: 'EN',
    title: 'Privacy Policy',
    lastUpdated: 'April 18, 2026',
    alternateLanguagePath: '/legal/politique-confidentialite',
    intro:
      'This policy must be adjusted to match the actual production setup. In the current project shape, it covers an editorial site that may send user-entered text to optional third-party image or text generation services from the browser.',
    sections: [
      {
        id: 'potentially-processed-data',
        heading: 'Potentially processed data',
        paragraphs: [
          'Depending on enabled features, the website may process technical browsing data, hosting logs, user-entered text in the sauce studio, and information sent to third-party providers when optional generation features are used.',
          'No category of data should appear here unless it is genuinely processed in production.',
        ],
      },
      {
        id: 'purposes',
        heading: 'Purposes',
        paragraphs: [
          'Purposes may include website operation, security, maintenance, optional analytics if implemented, and the execution of optional content-generation features.',
        ],
      },
      {
        id: 'user-rights',
        heading: 'User rights',
        paragraphs: [
          'Under applicable law, users may have rights of access, rectification, erasure, restriction, objection, and where relevant withdrawal of consent.',
          'Users may also lodge a complaint with the CNIL if they believe their rights are not being respected.',
        ],
      },
      {
        id: 'processors-and-transfers',
        heading: 'Processors and transfers',
        paragraphs: [
          'If hosting, AI, or analytics providers are used, they should be listed here together with a clear description of their role and any necessary international transfer information.',
        ],
      },
    ],
    references: [
      {
        label: 'CNIL',
        href: 'https://www.cnil.fr/',
      },
      {
        label: 'Service-Public.fr - personal data and security',
        href: 'https://www.service-public.fr/P10154',
      },
    ],
  },
}
