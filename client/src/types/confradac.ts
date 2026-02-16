/**
 * Tipos para a estrutura hierárquica da CONFRADAC
 * Federação > ENOADs > Regionais > Igrejas > Grupos
 */

export interface Grupo {
  id: string;
  nome: string;
  descricao: string;
  membros: number;
  lider: string;
  dataFundacao: string;
}

export interface Igreja {
  id: string;
  nome: string;
  localidade: string;
  endereco: string;
  pastor: string;
  grupos: Grupo[];
  membros: number;
  dataFundacao: string;
  ativa: boolean;
}

export interface Regional {
  id: string;
  nome: string;
  coordenador: string;
  igrejas: Igreja[];
  totalMembros: number;
  totalGrupos: number;
  dataFundacao: string;
}

export interface ENOADS {
  id: string;
  nome: string;
  presidente: string;
  regionais: Regional[];
  totalMembros: number;
  totalIgrejas: number;
  totalGrupos: number;
  dataFundacao: string;
}

export interface Federacao {
  nome: string;
  presidente: string;
  enoads: ENOADS[];
  totalMembros: number;
  totalIgrejas: number;
  totalGrupos: number;
  totalENOADS: number;
  totalRegionais: number;
}

/**
 * Tipos para navegação e estado
 */

export type HierarchyLevel = 'federacao' | 'enoads' | 'regional' | 'igreja' | 'grupo';

export interface BreadcrumbItem {
  label: string;
  level: HierarchyLevel;
  id?: string;
}

export interface HierarchyNode {
  id: string;
  nome: string;
  level: HierarchyLevel;
  membros: number;
  children?: HierarchyNode[];
  expanded?: boolean;
}
