// Institutional copy supplied by the brand. Applications remain subject to brand validation.
export const HERO_HEADLINE = "Engenharia que transforma o som.";
export const HERO_EYEBROW = "Sistemas profissionais de sonorização";
export const CONTACT = {
  whatsapp: "244931519081",
  whatsappDisplay: "+244 931 519 081",
  whatsappMessage: "Olá, quero saber mais sobre o sistema Bonzai",
  email: "bonzaisystem@gmail.com",
} as const;
export const waLink = (message: string = CONTACT.whatsappMessage) => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
export const mailLink = (subject = "Contato pelo site Bonzai System") => `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;
export const NAV = [
 { to: "/", label: "Início" }, { to: "/sobre", label: "Sobre" },
 { to: "/tecnologia", label: "Tecnologia" }, { to: "/produtos/bonzai-mini", label: "Sistema" },
 { to: "/solucoes", label: "Soluções" }, { to: "/contato", label: "Contato" },
] as const;
export const STORY = [
  {
    "number": "01",
    "title": "A origem de um legado",
    "paragraphs": [
      "Em 1970, Juan Alberola criou um sistema de som para que a orquestra de seu pai pudesse ouvir discos de artistas estrangeiros e, assim, adquirir novos conhecimentos.",
      "Esse modelo, sem nome nem logotipo, nasceu com um único objetivo: ajudar seu pai nos projetos dele.",
      "Dali nasceu a paixão de Juan pelo mundo do som. Com o tempo, essa vocação deu origem a uma empresa que segue fiel às suas raízes: próxima, apaixonada e dedicada ao som."
    ],
    "visual": "origin"
  },
  {
    "number": "02",
    "title": "Metamorfose e progresso",
    "paragraphs": [
      "A mudança e a transformação sempre foram o nosso caminho. Se você acha que conhece a Bonzai System, talvez já não nos conheça.",
      "Evoluímos constantemente, nos reinventando para continuar crescendo. Crescemos, adquirimos novos conhecimentos e aplicamos tecnologia para melhorar o desempenho dos nossos sistemas de som.",
      "O que começou em uma pequena oficina é hoje uma empresa global que oferece soluções para todos os tipos de projetos e necessidades. Porque o som é universal e, na Bonzai System, criamos ferramentas para todos, independentemente do tamanho do projeto."
    ],
    "visual": "metamorphosis"
  },
  {
    "number": "03",
    "title": "Raízes e independência",
    "paragraphs": [
      "Somos uma empresa com bases sólidas e verdadeiramente independente, algo cada vez mais raro na nossa indústria. Com total autonomia, tomamos nossas próprias decisões e cuidamos de cada detalhe, sempre focados no que sabemos fazer melhor: criar som com identidade.",
      "Devemos tudo às nossas pessoas — colaboradores, distribuidores e usuários — que tornam possível que o som da Bonzai System esteja presente em todo o mundo. Temos orgulho do que fazemos e da forma como fazemos, e esse mesmo orgulho é compartilhado por todos que fazem parte da nossa história."
    ],
    "visual": "roots"
  },
  {
    "number": "04",
    "title": "Proximidade e compromisso com cada cliente",
    "paragraphs": [
      "Mas não fabricamos apenas sistemas de som: criamos relações. Para nós, o serviço ao cliente vai muito além da venda.",
      "Acompanhamos quem confia em nós, apoiamos e respondemos rapidamente quando você precisa. A proximidade e o compromisso fazem parte da nossa identidade."
    ],
    "visual": "waves"
  }
] as const;
export const SOLUTIONS = [
  { title: "Eventos e grandes produções", description: "Sistemas pensados para projetos de grande porte." },
  { title: "Sonorização profissional", description: "Soluções para empresas de locação, integradores e produtores." },
  { title: "Instalações permanentes", description: "Projetos feitos para operar no dia a dia." },
  { title: "Projetos personalizados", description: "Configurações adaptadas à necessidade de cada cliente." },
  { title: "Aplicações corporativas e espaços de apresentação", description: "Clareza sonora para ambientes de comunicação." },
] as const;
export const COPY = {
 storyEyebrow: "Sobre a Bonzai", aboutTitle: "Som com identidade, construído com proximidade",
 techEyebrow: "Tecnologia e engenharia acústica", techTitle: "Som projetado, não improvisado.",
 techText: "Veja como o sistema Bonzai Mini distribui o som sobre uma área de 30 × 30 m, com os níveis de pressão sonora em cada distância.",
 techButton: "Conhecer a tecnologia",
 solutionsTitle: "Soluções para cada tipo de projeto", solutionsPageTitle: "Aplicações dos sistemas Bonzai", solutionsButton: "Ver todas as soluções",
 systemEyebrow: "Sistema", systemTitle: "Bonzai Mini", systemText: "Line array de 8 módulos e 1 subgrave por lado, 450 W por lado. Dados completos do manual do produto.", systemButton: "Ver o sistema completo",
 ctaTitle: "Vamos projetar o som do seu próximo projeto?", ctaText: "Fale direto com a equipe Bonzai e descubra a solução ideal para o seu projeto.",
 whatsappCta: "Falar no WhatsApp", emailCta: "Enviar e-mail",
 contactTitle: "Fale com a equipe Bonzai", contactText: "Escolha o canal que preferir. Respondemos direto pelo WhatsApp ou por e-mail.",
} as const;
export const SEO = {
 about: { title: "Sobre | Bonzai System", description: "Conheça a história, as raízes e o compromisso da Bonzai System com o som e suas pessoas." },
 solutions: { title: "Soluções | Bonzai System", description: "Conheça as aplicações dos sistemas Bonzai para diferentes tipos de projeto." },
 contact: { title: "Contato | Bonzai System", description: "Fale com a equipe Bonzai System pelo WhatsApp ou e-mail sobre o seu projeto de sonorização." },
 tech: { title: "Tecnologia | Bonzai System", description: "Simulação de cobertura e níveis de pressão sonora do sistema Bonzai Mini em uma área de 30 × 30 m." },
 system: { title: "Bonzai Mini | Bonzai System", description: "Sistema Bonzai Mini: line array de 8 módulos, 450 W por lado, subgraves ativos BZ18B e dados do manual." },
};
