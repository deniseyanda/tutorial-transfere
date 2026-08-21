# Direção de design — Tutorial Transfere

## Três abordagens possíveis

### 1. Caderno de Campo Institucional
**Very Brief Intro:** Uma interface de consulta inspirada em cadernos técnicos de projetos: serena, clara e orientada a procedimentos. O objetivo é transformar etapas burocráticas em uma sequência tranquila e verificável.
**Probability:** 0.07

### 2. Painel Operacional Modular
**Very Brief Intro:** Um painel de missão em que cada fase da contratação é um módulo operacional com status, busca e validações. O objetivo é reduzir a sensação de complexidade e apoiar a execução em tempo real.
**Probability:** 0.04

### 3. Arquivo Público Editorial
**Very Brief Intro:** Uma experiência editorial inspirada em dossiês e publicações de política pública, com hierarquia tipográfica forte e leitura contínua. O objetivo é comunicar confiança e profundidade sem parecer um sistema administrativo.
**Probability:** 0.09

## Abordagem escolhida — Caderno de Campo Institucional

### Design Movement
**Editorial utilitário contemporâneo**, com referências visuais de cadernos de campo, fichas de processo e sinalização de arquivo. A linguagem prioriza orientação, contexto e rastreabilidade — e não a estética genérica de dashboards corporativos.

### Core Principles
1. **Uma etapa por vez:** cada bloco deve permitir que a pessoa reconheça onde está no processo e qual é a próxima ação.
2. **Orientação antes de ornamentação:** a interface usa cor, numeração e contraste para apoiar a decisão de quem está preenchendo a plataforma.
3. **Consulta de baixo atrito:** busca, navegação lateral, cartões de atalho e checklist permitem encontrar instruções sem reler todo o material.
4. **Confiança serena:** o design evita urgência visual; usa ritmo, espaço em branco e linguagem objetiva para reduzir a ansiedade em tarefas formais.

### Color Philosophy
O fundo de papel quente transmite acolhimento e leitura prolongada. O verde profundo representa o avanço seguro e funciona como cor institucional principal; o terracota sinaliza atenção e pendências; o azul lavanda é usado como apoio para navegação e informação contextual. A cor não serve para decorar: ela diferencia ação, alerta e referência.

### Layout Paradigm
O site adota uma estrutura de **ficha de processo**: um trilho lateral persistente com as etapas e uma área principal de leitura modular. Em telas amplas, o conteúdo não fica centralizado como uma landing page; ele se organiza em colunas assimétricas, com uma faixa editorial e uma área de ações rápidas. Em celular, o trilho passa a ser um menu deslizante acessível.

### Signature Elements
1. **Marcadores sequenciais circulares**, inspirados em etiquetas de processo, identificando cada etapa.
2. **Faixa de situação**, uma pequena cápsula no topo dos cartões indicando “Prepare”, “Cadastre”, “Autorize” ou “Conclua”.
3. **Notas de campo**, caixas de alerta com borda lateral terracota para erros comuns e pontos de conferência.

### Interaction Philosophy
As interações funcionam como uma mesa de trabalho: a busca filtra o que é relevante; os atalhos levam diretamente ao passo; a checklist dá retorno imediato e mantém o progresso na sessão; os cartões expandem informações sem deslocar o usuário para outra página.

### Animation
As entradas são discretas, usando opacidade e deslocamento vertical curto, com cascata de 40–60 ms entre cartões. A navegação lateral e os accordions usam transições de até 220 ms com `cubic-bezier(0.23, 1, 0.32, 1)`. Botões têm resposta de pressão com escala de 0,97. Em `prefers-reduced-motion`, os movimentos não essenciais são desativados.

### Typography System
**DM Serif Display** é usada apenas em títulos editoriais e marcos da jornada, trazendo personalidade e legitimidade. **Manrope** é usada em textos, menus, campos e instruções, com alta legibilidade em telas pequenas. Títulos possuem peso 400–500 e texto operacional usa 500–700 para enfatizar ações, sem depender de letras em caixa alta.

### Brand Essence
**Um guia de campo para equipes que executam projetos e precisam contratar com clareza, segurança e autonomia.**

Personalidade: **clara, cuidadosa, capacitadora**.

### Brand Voice
A voz é acolhedora, objetiva e instrutiva. Os títulos convidam para uma ação concreta; os CTAs dizem exatamente o que acontece em seguida.

Exemplos: “Comece pela proposta correta, não pela tela de execução.”  
“Antes de salvar, confira o banco, o valor e o documento.”

### Wordmark & Logo
O logotipo combina um símbolo de **três cartões alinhados** — proposta, credor e documento — com a palavra “Transfere” desenhada em serifas suaves. O símbolo deve funcionar sozinho como avatar e favicon, sem texto, em verde profundo e fundo transparente.

### Signature Brand Color
**Verde Trama — #195B50.** Um verde profundo e sóbrio, usado nos pontos de ação, identidade e estados de conclusão.

## Style Decisions

- O trilho das oito etapas é obrigatório em telas largas e permanece visível como um índice de processo ao longo da consulta.
- Os números de etapa assumem a forma de **etiquetas circulares de processo** nos cartões, no trilho, na etapa em foco, nos indicadores e no checklist.
- A marca com o símbolo de três cartões e o wordmark serifado aparece já no primeiro viewport, com o Verde Trama como cor dominante.
- Busca, caminho da tela, checklist e próximo passo devem competir visualmente com os elementos editoriais para que o site seja percebido como ferramenta de trabalho, não apenas como artigo.
