# Estratégia de Design Híbrido: CONFRADAC Dashboard

## Síntese das Abordagens Combinadas

Este dashboard combina o melhor de cada abordagem para criar uma interface que é **profissional, acolhedora e visualmente sofisticada**.

---

## Design Final

### Paleta de Cores (Combinada)
- **Primária:** Azul profundo (#1e3a8a) - confiança e profissionalismo
- **Secundária:** Roxo suave (#8b5cf6) - espiritualidade e comunidade
- **Acentos:** Verde (#10b981) para sucesso, Laranja (#f97316) para atenção, Coral (#ff6b6b) para energia
- **Neutros:** Creme (#fef3c7) para fundos acolhedores, Cinza (#f3f4f6) para separações
- **Destaque:** Azul elétrico (#0ea5e9) para elementos interativos

### Layout Paradigm (Híbrido)
- **Sidebar fixa esquerda** (Corporativo) com navegação hierárquica e ícones
- **Cards em grid assimétrico** (Técnico) para visualizar diferentes níveis
- **Imagens/Avatares** (Humanizado) em cards de igrejas e grupos
- **Breadcrumb + Navegação horizontal** para orientação clara
- **Visualizações de rede** (Técnico) mostrando conexões entre igrejas

### Signature Elements
1. **Cards hierárquicos** com ícones grandes, números destacados e badges de status
2. **Árvore interativa** (expandível/colapsável) mostrando Federação > ENOADs > Regionais > Igrejas > Grupos
3. **Avatares/Ícones customizados** para cada nível hierárquico
4. **Indicadores visuais** (barras de progresso, gráficos de pizza) mostrando saúde da federação
5. **Timeline visual** de eventos importantes

### Interaction Philosophy
- Cliques em cards expandem detalhes
- Hover em elementos revela informações adicionais
- Transições suaves entre estados
- Animações que sugerem movimento e vida (não robóticas)

### Animation Guidelines
- **Fade-in:** Ao carregar dados (duração: 0.3s)
- **Slide-in:** Para modais e painéis laterais (duração: 0.4s)
- **Pulse suave:** Em números que mudam (duração: 0.6s)
- **Morph:** Entre ícones ao expandir/colapsar (duração: 0.3s)
- **Bounce leve:** Ao interagir com botões (duração: 0.2s)

### Typography System
- **Display:** Poppins Bold (títulos principais, h1/h2)
- **Heading:** Poppins SemiBold (subtítulos, h3/h4)
- **Body:** Inter Regular (conteúdo, parágrafos)
- **Números/Dados:** Roboto Mono Regular (estatísticas, métricas)
- **Ações:** Poppins Medium (botões, chamadas de ação)

### Visual Assets
- **Hero/Background:** Gradiente suave de azul profundo para roxo (com ruído sutil)
- **Ícones:** Lucide React (já incluído no projeto)
- **Ilustrações:** Customizadas para cada nível hierárquico (Federação, ENOADS, Regionais, Igrejas, Grupos)

---

## Estrutura de Dados Mock

A aplicação usará dados estáticos para demonstrar a hierarquia:

```typescript
interface Grupo {
  id: string;
  nome: string;
  descricao: string;
  membros: number;
}

interface Igreja {
  id: string;
  nome: string;
  localidade: string;
  grupos: Grupo[];
  membros: number;
}

interface Regional {
  id: string;
  nome: string;
  igrejas: Igreja[];
  totalMembros: number;
}

interface ENOADS {
  id: string;
  nome: string;
  regionais: Regional[];
  totalMembros: number;
}

interface Federacao {
  nome: string;
  enoads: ENOADS[];
  totalMembros: number;
  totalIgrejas: number;
  totalGrupos: number;
}
```

---

## Componentes Principais

1. **DashboardLayout:** Layout principal com sidebar e conteúdo
2. **HierarchyTree:** Árvore interativa mostrando a hierarquia
3. **StatCard:** Card de estatísticas com ícone e número
4. **EntityCard:** Card para exibir igrejas/grupos com avatar
5. **BreadcrumbNav:** Navegação por breadcrumb
6. **ExpandableList:** Lista expandível para hierarquias

---

## Páginas Principais

1. **Dashboard Home:** Visão geral com KPIs e árvore hierárquica
2. **ENOADS View:** Detalhes de um ENOADS específico
3. **Regional View:** Detalhes de uma Regional específica
4. **Igreja View:** Detalhes de uma Igreja específica
5. **Grupo View:** Detalhes de um Grupo específico

---

## Próximos Passos

1. Criar estrutura de pastas e tipos TypeScript
2. Gerar dados mock realistas
3. Implementar componentes de UI
4. Montar o layout principal
5. Criar páginas de visualização hierárquica
