/**
 * Design: Caderno de Campo Institucional — editorial utilitário em verde profundo,
 * papel quente, marcadores sequenciais e notas de campo para orientar cada decisão.
 */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  ClipboardCheck,
  FileCheck2,
  FileText,
  FolderCheck,
  ListChecks,
  Menu,
  PackageCheck,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const assets = {
  logo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028717197/NPbAhoX4sscVjvRMf8AFZg/transfere-logo-mark-Ng8BdzRU3tEMzPwTN5Mepo.webp",
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028717197/NPbAhoX4sscVjvRMf8AFZg/transfere-hero-desk-GMYyWZM4soctt2ba5489gs.webp",
  preparation: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028717197/NPbAhoX4sscVjvRMf8AFZg/transfere-preparar-cards-bdDJcrjMCfwXSfWz4PAYUf.webp",
  flow: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028717197/NPbAhoX4sscVjvRMf8AFZg/transfere-fluxo-fichas-aTsUgamkpvodRimmhFMHWe.webp",
  documents: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028717197/NPbAhoX4sscVjvRMf8AFZg/transfere-documentos-kit-dzuHHM3d3sVeojbPuvSg3a.webp",
};

const steps = [
  {
    number: "01",
    eyebrow: "Prepare",
    title: "Reúna os dados antes de abrir a plataforma",
    shortTitle: "Preparar",
    icon: FolderCheck,
    description:
      "Deixe proposta, fornecedor, dados bancários e documentos em uma mesma pasta de trabalho.",
    path: "Plano de trabalho + documentos do fornecedor",
    actions: [
      "Separe proposta, item, valor, quantidade, unidade e datas.",
      "Confirme CNPJ ou CPF, razão social, contato e nome fantasia.",
      "Tenha banco, agência, conta e dígito confirmados por escrito.",
    ],
    note: "Não digite números bancários ou documentos apenas de memória. A conferência escrita evita retrabalho.",
    color: "sage",
  },
  {
    number: "02",
    eyebrow: "Acesse",
    title: "Entre pela proposta correta",
    shortTitle: "Acessar proposta",
    icon: Search,
    description:
      "Use o caminho que abre os dados da proposta antes de entrar em Execução.",
    path: "Propostas → Consultar proposta → clicar no número → Execução",
    actions: [
      "Acesse Propostas e clique em Consultar proposta.",
      "Informe o número completo e clique sobre o resultado encontrado.",
      "Somente depois abra o menu Execução.",
    ],
    note: "Se a tela voltar para o início ou entrar em loop, retome o caminho pela consulta da proposta; não entre direto em Cadastrar credor.",
    color: "lavender",
  },
  {
    number: "03",
    eyebrow: "Cadastre",
    title: "Inclua o fornecedor como credor",
    shortTitle: "Cadastrar credor",
    icon: BadgeCheck,
    description:
      "Identifique o fornecedor pelo CNPJ ou CPF e complete o cadastro antes de iniciar a compra.",
    path: "Execução → Cadastrar credor de transferência voluntária → Novo credor",
    actions: [
      "Pesquise o fornecedor pelo CNPJ ou CPF.",
      "Confirme se o nome retornado pertence à pessoa ou empresa contratada.",
      "Complete dados como telefone, bairro, complemento e nome fantasia quando necessário.",
    ],
    note: "Se a opção Novo credor não aparecer, confira o perfil de acesso. Algumas pessoas acompanham; outras cadastram ou autorizam.",
    color: "terracotta",
  },
  {
    number: "04",
    eyebrow: "Confirme",
    title: "Cadastre o domicílio bancário",
    shortTitle: "Conta bancária",
    icon: Banknote,
    description:
      "Verifique se o fornecedor já tem conta correta e, se preciso, envie um novo domicílio bancário.",
    path: "Credor → Domicílios bancários → Consultar ou Enviar",
    actions: [
      "Primeiro consulte: a conta já existe e está correta?",
      "Se não, use Enviar/Incluir para informar banco, tipo de conta, agência, conta e dígito.",
      "Revise e salve em definitivo antes de sair da tela.",
    ],
    note: "Consultar um domicílio e enviar um novo domicílio são ações diferentes. Se o campo não permite edição, procure a opção de envio.",
    color: "olive",
  },
  {
    number: "05",
    eyebrow: "Autorize",
    title: "Aguarde e obtenha a autorização",
    shortTitle: "Autorizar",
    icon: ShieldCheck,
    description:
      "O cadastro bancário precisa ser analisado pelo ordenador de despesa quando a plataforma solicitar.",
    path: "Execução → Cadastrar credor → Autorizar → Aprovar solicitação",
    actions: [
      "O ordenador abre a solicitação pendente do fornecedor.",
      "Confere dados cadastrais e bancários antes de selecionar Autorizar.",
      "Conclui com Aprovar solicitação e registra o resultado exibido.",
    ],
    note: "Um cadastro digitado não é necessariamente um cadastro liberado. Confirme a mensagem de aprovação e aguarde a atualização do status.",
    color: "sage",
  },
  {
    number: "06",
    eyebrow: "Contrate",
    title: "Abra o processo de compra",
    shortTitle: "Processo de compra",
    icon: ClipboardCheck,
    description:
      "Registre a contratação, a forma de cotação, o objeto, as datas e o valor dentro da proposta.",
    path: "Execução → Incluir processo de execução → Processo de compras",
    actions: [
      "Escolha o tipo de cotação correspondente ao procedimento realizado.",
      "Defina material, serviço ou material e serviço de forma coerente com o objeto.",
      "Preencha número sequencial, descrição, datas, valor global e código do município.",
    ],
    note: "Não aumente o valor no sistema para fazer o processo avançar. Se ultrapassar o plano, avalie o ajuste formal antes de concluir.",
    color: "lavender",
  },
  {
    number: "07",
    eyebrow: "Vincule",
    title: "Inclua fornecedor e item contratado",
    shortTitle: "Fornecedor e item",
    icon: PackageCheck,
    description:
      "Diga à plataforma o que será contratado e quem executará cada item do processo.",
    path: "Processo de compra → Incluir fornecedor → Incluir item",
    actions: [
      "Inclua o fornecedor correto pelo CNPJ ou CPF.",
      "Cadastre descrição, unidade, quantidade e valores do item.",
      "Confira se a soma por fornecedor coincide com o valor global do processo.",
    ],
    note: "Quando há dois prestadores, cadastre cada um separadamente com sua própria quantidade e valor, mesmo que o item seja semelhante.",
    color: "terracotta",
  },
  {
    number: "08",
    eyebrow: "Documente",
    title: "Anexe os arquivos e conclua",
    shortTitle: "Documentar e concluir",
    icon: FileCheck2,
    description:
      "Envie a documentação exigida, descreva cada arquivo e finalize somente após uma revisão completa.",
    path: "Processo de compra → Arquivos/Documentos → Concluir",
    actions: [
      "Envie um arquivo por vez e confirme sua presença na lista.",
      "Use descrições claras, como “CNPJ – Fornecedor [nome]”.",
      "Revise fornecedor, banco, valor, item e documentos antes de concluir.",
    ],
    note: "A mensagem de conclusão confirma o processo, não necessariamente o pagamento. Nota fiscal e autorização financeira ainda podem ser etapas posteriores.",
    color: "olive",
  },
];

const checklistItems = [
  "A proposta correta foi consultada.",
  "O acesso foi feito pelo caminho Propostas → Consultar proposta → Execução.",
  "O CNPJ ou CPF do credor foi conferido.",
  "Nome, contato e dados complementares do fornecedor foram revisados.",
  "Banco, agência, conta, dígito e tipo de conta foram confirmados.",
  "O domicílio bancário foi salvo em definitivo.",
  "O ordenador de despesa autorizou quando necessário.",
  "O tipo de processo e a natureza da contratação estão corretos.",
  "Valor, quantidade, unidade e datas conferem com o plano de trabalho.",
  "O fornecedor foi incluído e vinculado ao item.",
  "Os documentos exigidos foram enviados e descritos.",
  "A mensagem de conclusão e o número do processo foram registrados.",
];

const doubts = [
  {
    question: "A tela de cadastro do credor fica voltando para o início. O que fazer?",
    answer:
      "Volte ao caminho base: Propostas → Consultar proposta → clique no número do resultado → Execução. A aula mostrou que entrar diretamente no cadastro pode gerar um loop ou não carregar o contexto da proposta.",
  },
  {
    question: "Por que a opção “Novo credor” não aparece para mim?",
    answer:
      "Confira se você está na proposta correta e se o seu perfil tem permissão para cadastrar. Em algumas situações, a pessoa possui perfil de acompanhamento ou autorização, mas não de inclusão de credor.",
  },
  {
    question: "Já cadastrei o banco. Posso abrir o processo de compra?",
    answer:
      "Sim, mas antes confirme se o domicílio bancário foi salvo e se a autorização do ordenador de despesa foi concluída quando exigida. Cadastro digitado e cadastro liberado não são a mesma coisa.",
  },
  {
    question: "O valor que preciso é maior que o valor do plano. Posso alterar na plataforma?",
    answer:
      "Não altere o valor apenas para fazer a tela avançar. Avalie primeiro se há saldo aplicável, necessidade de ajuste de plano de trabalho ou outra providência autorizada para o instrumento.",
  },
  {
    question: "O processo foi concluído. Isso significa que a nota será paga?",
    answer:
      "Não necessariamente. A conclusão registra o processo de compra. Nota fiscal, conferência, autorização de pagamento e horários operacionais podem depender de etapas posteriores.",
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [query, setQuery] = useState("");
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("transfere-checklist");
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch {
        window.localStorage.removeItem("transfere-checklist");
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("transfere-checklist", JSON.stringify(checkedItems));
  }, [checkedItems]);

  const filteredSteps = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    if (!normalized) return steps;
    return steps.filter((step) =>
      [step.title, step.shortTitle, step.description, step.path, step.actions.join(" "), step.note]
        .join(" ")
        .toLocaleLowerCase("pt-BR")
        .includes(normalized),
    );
  }, [query]);

  const progress = Math.round((checkedItems.length / checklistItems.length) * 100);

  function openStep(index: number) {
    setActiveStep(index);
    setMobileMenuOpen(false);
    window.setTimeout(() => scrollToId(`etapa-${index + 1}`), 60);
  }

  function toggleChecklist(index: number) {
    setCheckedItems((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );
  }

  const active = steps[activeStep];
  const ActiveIcon = active.icon;

  return (
    <div className="app-shell">
      <aside className={`side-rail ${mobileMenuOpen ? "side-rail--open" : ""}`} aria-label="Navegação do tutorial">
        <div className="rail-top">
          <div className="brand-lockup">
            <img className="brand-mark" src={assets.logo} alt="Marca gráfica do Tutorial Transfere" />
            <div>
              <p className="brand-name">Transfere</p>
              <p className="brand-subtitle">Guia de contratação</p>
            </div>
          </div>
          <button className="mobile-close" type="button" onClick={() => setMobileMenuOpen(false)} aria-label="Fechar menu">
            <X size={18} />
          </button>
        </div>

        <div className="rail-heading">
          <span>Roteiro de execução</span>
          <strong>8 etapas</strong>
        </div>
        <nav className="step-nav">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <button
                className={`nav-step ${activeStep === index ? "nav-step--active" : ""}`}
                type="button"
                key={step.number}
                onClick={() => openStep(index)}
              >
                <span className="nav-step-number">{step.number}</span>
                <span className="nav-step-label"><Icon size={15} /> {step.shortTitle}</span>
              </button>
            );
          })}
        </nav>

        <div className="rail-bottom">
          <div className="progress-heading"><span>Seu checklist</span><strong>{progress}%</strong></div>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
          <button type="button" className="rail-link" onClick={() => scrollToId("checklist")}>Abrir conferência <ArrowRight size={14} /></button>
        </div>
      </aside>

      {mobileMenuOpen && <button className="backdrop" aria-label="Fechar menu" onClick={() => setMobileMenuOpen(false)} />}

      <main className="content-stage">
        <header className="mobile-topbar">
          <div className="brand-lockup">
            <img className="brand-mark" src={assets.logo} alt="" />
            <div><p className="brand-name">Transfere</p><p className="brand-subtitle">Guia de contratação</p></div>
          </div>
          <button className="menu-button" type="button" onClick={() => setMobileMenuOpen(true)} aria-label="Abrir etapas"><Menu size={19} /></button>
        </header>

        <section className="hero-section" id="inicio" style={{ backgroundImage: `url(${assets.hero})` }}>
          <div className="hero-copy">
            <div className="hero-brandplate">
              <img src={assets.logo} alt="" />
              <div><strong>Transfere</strong><span>Guia de processo</span></div>
            </div>
            <div className="section-kicker"><span /> Tutorial de campo</div>
            <h1>Contratar com clareza.<br /><em>Executar</em> com segurança.</h1>
            <p>Um roteiro de consulta rápida para cadastrar credor, conta bancária, processo de compra e documentação na plataforma Transfere.</p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={() => openStep(0)}>Começar pelo preparo <ArrowDown size={16} /></button>
              <button className="ghost-button" type="button" onClick={() => scrollToId("checklist")}>Ver checklist final <ListChecks size={16} /></button>
            </div>
          </div>
          <div className="hero-meta" aria-label="Resumo do conteúdo">
            <div><strong className="process-disc process-disc--hero">8</strong><span>etapas operacionais</span></div>
            <div><strong className="process-disc process-disc--hero">25</strong><span>ações orientadas</span></div>
            <div><strong className="process-disc process-disc--hero">1</strong><span>checklist de conferência</span></div>
          </div>
        </section>

        <section className="intro-grid section-wrap" aria-label="Como usar este guia">
          <div className="intro-title">
            <p className="mini-label">Por onde começar</p>
            <h2>Não é só preencher campos.<br />É seguir um fluxo.</h2>
          </div>
          <div className="intro-rule">
            <span className="rule-icon"><CheckCircle2 size={20} /></span>
            <div>
              <p className="mini-label">Regra de ouro da aula</p>
              <p>Primeiro, cadastre o credor e o domicílio bancário. Depois, abra o processo de compra e vincule o fornecedor ao item.</p>
            </div>
          </div>
          <div className="intro-note"><CircleAlert size={18} /><p>Os nomes dos menus e as validações podem mudar. Confira sempre a tela vigente, o plano de trabalho e os documentos originais.</p></div>
        </section>

        <section className="quick-search section-wrap" id="etapas">
          <div className="search-copy">
            <p className="mini-label">Consulta rápida</p>
            <h2>Encontre o passo que você precisa agora.</h2>
          </div>
          <label className="search-box">
            <Search size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex.: conta bancária, CNPJ, autorização, documento..." aria-label="Buscar no tutorial" />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="Limpar busca"><X size={16} /></button>}
          </label>
        </section>

        <section className="step-board section-wrap" aria-label="Etapas do tutorial">
          {filteredSteps.length ? filteredSteps.map((step) => {
            const originalIndex = steps.findIndex((item) => item.number === step.number);
            const Icon = step.icon;
            const isActive = activeStep === originalIndex;
            return (
              <article className={`step-card step-card--${step.color} ${isActive ? "step-card--active" : ""}`} id={`etapa-${originalIndex + 1}`} key={step.number}>
                <div className="step-card-top">
                  <span className="step-pill">{step.eyebrow}</span>
                  <span className="step-index">{step.number}</span>
                </div>
                <div className="step-card-heading">
                  <span className="step-icon"><Icon size={22} /></span>
                  <div><h3>{step.title}</h3><p>{step.description}</p></div>
                </div>
                <div className="path-chip"><ChevronRight size={14} /> {step.path}</div>
                <ol className="action-list">
                  {step.actions.map((action) => <li key={action}>{action}</li>)}
                </ol>
                <div className="field-note"><CircleAlert size={16} /><p>{step.note}</p></div>
                <button className="focus-step" type="button" onClick={() => setActiveStep(originalIndex)}>
                  {isActive ? "Etapa em foco" : "Focar nesta etapa"} <ArrowRight size={16} />
                </button>
              </article>
            );
          }) : (
            <div className="empty-state"><Search size={24} /><h3>Nenhuma etapa encontrada</h3><p>Tente buscar por uma ação, como “autorizar”, “cotação”, “CNPJ” ou “arquivo”.</p></div>
          )}
        </section>

        <section className="focus-panel section-wrap" aria-label="Etapa selecionada">
          <div className="focus-art"><img src={assets.flow} alt="Cartões de processo conectados por uma linha verde" /></div>
          <div className="focus-copy">
            <p className="mini-label">Etapa em foco <span className="inline-process-disc">{active.number}</span></p>
            <div className="focus-title"><span><ActiveIcon size={22} /></span><h2>{active.shortTitle}</h2></div>
            <p>{active.description}</p>
            <div className="focus-path"><span>Caminho da tela</span><strong>{active.path}</strong></div>
            <button className="text-button" type="button" onClick={() => scrollToId(`etapa-${activeStep + 1}`)}>Ir para instruções completas <ArrowRight size={16} /></button>
          </div>
        </section>

        <section className="content-pair section-wrap" aria-label="Exemplos e documentação">
          <article className="image-note image-note--preparation">
            <img src={assets.preparation} alt="Cartões de papel, calculadora e marcador de conferência sobre uma mesa clara" />
            <div><p className="mini-label">Antes de começar</p><h3>Organize uma pasta de trabalho.</h3><p>Use quatro blocos: proposta, fornecedor, dados bancários e processo de compra.</p></div>
          </article>
          <article className="image-note image-note--documents">
            <img src={assets.documents} alt="Conjunto de documentos amarrados por uma fita verde" />
            <div><p className="mini-label">No encerramento</p><h3>Arquivos também são parte do processo.</h3><p>Envie um por vez, descreva com clareza e confirme se apareceram na lista.</p></div>
          </article>
        </section>

        <section className="checklist-section section-wrap" id="checklist">
          <div className="checklist-heading">
            <div><p className="mini-label">Conferência final</p><h2>Checklist de quem vai concluir.</h2><p>O seu progresso fica salvo neste navegador para a próxima consulta.</p></div>
            <div className="check-score"><strong className="process-disc">{checkedItems.length}</strong><span>de {checklistItems.length}<br />itens conferidos</span></div>
          </div>
          <div className="check-grid">
            {checklistItems.map((item, index) => {
              const checked = checkedItems.includes(index);
              return (
                <button key={item} type="button" className={`check-row ${checked ? "check-row--done" : ""}`} onClick={() => toggleChecklist(index)}>
                  <span className="checkbox-visual">{checked && <Check size={15} />}</span><span>{item}</span>
                </button>
              );
            })}
          </div>
          <div className="check-footer"><FileText size={17} /><p>Ao concluir, registre o número do processo e guarde o comprovante em uma pasta interna do projeto.</p></div>
        </section>

        <section className="faq-section section-wrap" id="duvidas">
          <div className="faq-heading"><p className="mini-label">Quando a plataforma não ajuda</p><h2>Dúvidas comuns, caminhos práticos.</h2></div>
          <Accordion type="single" collapsible className="faq-list">
            {doubts.map((doubt, index) => (
              <AccordionItem value={`duvida-${index}`} key={doubt.question}>
                <AccordionTrigger>{doubt.question}</AccordionTrigger>
                <AccordionContent>{doubt.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <footer className="page-footer">
          <div className="footer-brand"><img src={assets.logo} alt="" /><div><strong>Transfere</strong><span>Guia de contratação de fornecedor</span></div></div>
          <p>Material de apoio organizado a partir de aula prática. Sempre valide os dados na proposta, no plano de trabalho e na tela vigente da plataforma.</p>
          <button type="button" onClick={() => scrollToId("inicio")}>Voltar ao início <ArrowDown size={15} /></button>
        </footer>
      </main>
    </div>
  );
}
