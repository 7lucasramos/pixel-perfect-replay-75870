// Institutional copy supplied by the brand. Applications remain subject to brand validation.
export const HERO_HEADLINE = "Engenharia que transforma o som.";
export const HERO_EYEBROW = "Sistemas profissionais de sonorização";
export const CONTACT = { email: "", whatsapp: "", phone: "", address: "", instagram: "", linkedin: "" };
export const NAV = [
 { to: "/", label: "Início" }, { to: "/sobre", label: "Sobre a Bonzai" },
 { to: "/tecnologia", label: "Tecnologia" }, { to: "/produtos", label: "Produtos" },
 { to: "/solucoes", label: "Soluções" }, { to: "/casos-de-sucesso", label: "Casos de sucesso" }, { to: "/contato", label: "Contato" },
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
      "Metamorfose e progresso",
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
      "Raízes e independência",
      "Somos uma empresa com bases sólidas e verdadeiramente independente, algo cada vez mais raro na nossa indústria. Com total autonomia, tomamos nossas próprias decisões e cuidamos de cada detalhe, sempre focados no que sabemos fazer melhor: criar som com identidade.",
      "Devemos tudo às nossas pessoas — colaboradores, distribuidores e usuários — que tornam possível que o som da Bonzai System esteja presente em todo o mundo. Temos orgulho do que fazemos e da forma como fazemos, e esse mesmo orgulho é compartilhado por todos que fazem parte da nossa história."
    ],
    "visual": "roots"
  },
  {
    "number": "04",
    "title": "Proximidade e compromisso com cada cliente",
    "paragraphs": [
      "Proximidade e compromisso com cada cliente",
      "Mas não fabricamos apenas sistemas de som: criamos relações. Para nós, o serviço ao cliente vai muito além da venda.",
      "Acompanhamos quem confia em nós, apoiamos e respondemos rapidamente quando você precisa. A proximidade e o compromisso fazem parte da nossa identidade."
    ],
    "visual": "waves"
  }
] as const;
export const SOLUTIONS_STATUS = "a validar com a marca";
export const SOLUTIONS = [
  {
    "title": "Eventos e grandes produções",
    "description": "Sistemas pensados para projetos de grande porte."
  },
  {
    "title": "Sonorização profissional",
    "description": "Soluções para empresas de locação, integradores e produtores."
  },
  {
    "title": "Instalações permanentes",
    "description": "Projetos feitos para operar no dia a dia."
  },
  {
    "title": "Projetos personalizados",
    "description": "Configurações adaptadas à necessidade de cada cliente."
  },
  {
    "title": "Aplicações corporativas e espaços de apresentação",
    "description": "Clareza sonora para ambientes de comunicação."
  }
] as const;
export const PROFILES = ["Empresa de locação de áudio", "Integrador", "Produtor de eventos", "Responsável por projeto de sonorização", "Profissional de áudio", "Outro"] as const;
export const PROJECT_TYPES = ["Evento ou produção", "Instalação permanente", "Sistema de sonorização", "Projeto personalizado", "Outro"] as const;
export type CaseStudy = { id: string; photo: string; local: string; application: string; system: string; description: string; authorizedResult: string };
export const cases: CaseStudy[] = [];
export const COPY = {
 photo: "Foto institucional (a enviar)", solutionPhoto: "Foto a enviar", productPhoto: "Foto do produto (a enviar)",
 storyEyebrow: "Sobre a Bonzai", aboutTitle: "Som com identidade, construído com proximidade",
 techEyebrow: "Tecnologia e engenharia acústica", techTitle: "Som projetado, não improvisado.",
 techText: "Visualize como um sistema distribui o som sobre uma área. Uma experiência interativa está chegando.",
 conceptual: "Visualização conceitual", techButton: "Conhecer a tecnologia",
 solutionsTitle: "Soluções para cada tipo de projeto", solutionsPageTitle: "Aplicações dos sistemas Bonzai", solutionsButton: "Ver todas as soluções",
 productsTitle: "Sistemas profissionais Bonzai", product: "Bonzai Mini", productText: "Um dos sistemas da linha Bonzai.", productsButton: "Conhecer os produtos",
 casesTitle: "Projetos e aplicações reais", casesSoon: "Em breve: casos de sucesso Bonzai.", casesButton: "Ver casos",
 casesModel: "Exemplo de estrutura (não é um caso real)", casesFuture: "Os casos reais serão publicados aqui.",
 ctaTitle: "Vamos projetar o som do seu próximo projeto?", ctaText: "Converse com nossa equipe e descubra a solução Bonzai ideal para o seu projeto.",
 request: "Solicitar projeto", talk: "Falar com a equipe",
 contactTitle: "Solicite seu projeto", contactText: "Conte um pouco sobre o seu projeto e nossa equipe retorna com a melhor solução.",
 consent: "Concordo em ser contatado(a) pela Bonzai System sobre este pedido.",
 success: "Recebemos seu pedido. Nossa equipe entrará em contato.",
 submit: "Enviar pedido", sending: "Enviando pedido…", error: "Não foi possível enviar seu pedido. Tente novamente.",
} as const;
export const SEO = {
 about: { title: "Sobre a Bonzai System", description: "Conheça a história, as raízes e o compromisso da Bonzai System com o som e suas pessoas." },
 solutions: { title: "Soluções Bonzai System", description: "Conheça as aplicações dos sistemas Bonzai para diferentes tipos de projeto." },
 cases: { title: "Casos de sucesso | Bonzai System", description: "Projetos e aplicações Bonzai. Os casos reais serão publicados aqui." },
 contact: { title: "Contato | Bonzai System", description: "Converse com a equipe Bonzai System sobre o seu projeto de sonorização." },
};
export function visibleChannels(contact: typeof CONTACT = CONTACT) {
 return Object.entries(contact).filter(([, value]) => value.trim().length > 0);
}
