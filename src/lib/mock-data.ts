/**
 * Dados mock realistas para a CONFRADAC
 * Estrutura: Federação > ENOADs > Regionais > Igrejas > Grupos
 */

import {
  Federacao,
  ENOADS,
  Regional,
  Igreja,
  Grupo,
} from "@/shared/types/confradac";

// Grupos de exemplo
const gruposIgreja1: Grupo[] = [
  {
    id: "g1",
    nome: "Grupo de Oração Matinal",
    descricao: "Reuniões de oração às 6h da manhã",
    membros: 15,
    lider: "Maria Silva",
    dataFundacao: "2020-01-15",
  },
  {
    id: "g2",
    nome: "Grupo de Jovens",
    descricao: "Atividades e estudos para jovens",
    membros: 32,
    lider: "João Santos",
    dataFundacao: "2019-06-20",
  },
  {
    id: "g3",
    nome: "Grupo de Mulheres",
    descricao: "Encontros e estudos bíblicos para mulheres",
    membros: 28,
    lider: "Ana Costa",
    dataFundacao: "2018-03-10",
  },
];

const gruposIgreja2: Grupo[] = [
  {
    id: "g4",
    nome: "Grupo de Louvor",
    descricao: "Ensaios e apresentações de louvor",
    membros: 22,
    lider: "Pedro Oliveira",
    dataFundacao: "2021-02-14",
  },
  {
    id: "g5",
    nome: "Grupo de Crianças",
    descricao: "Atividades educativas para crianças",
    membros: 45,
    lider: "Carla Mendes",
    dataFundacao: "2017-09-01",
  },
];

// Igrejas de exemplo
const igrejasRegional1: Igreja[] = [
  {
    id: "i1",
    nome: "Igreja Central de São Paulo",
    localidade: "São Paulo, SP",
    endereco: "Rua das Flores, 123",
    pastor: "Rev. Paulo Ferreira",
    grupos: gruposIgreja1,
    membros: 250,
    dataFundacao: "1995-05-20",
    ativa: true,
  },
  {
    id: "i2",
    nome: "Igreja do Bom Pastor",
    localidade: "Guarulhos, SP",
    endereco: "Av. Principal, 456",
    pastor: "Rev. Lucas Martins",
    grupos: gruposIgreja2,
    membros: 180,
    dataFundacao: "2005-08-15",
    ativa: true,
  },
  {
    id: "i3",
    nome: "Igreja Esperança",
    localidade: "Osasco, SP",
    endereco: "Rua da Paz, 789",
    pastor: "Rev. Marcos Alves",
    grupos: [],
    membros: 120,
    dataFundacao: "2010-03-22",
    ativa: true,
  },
];

const igrejasRegional2: Igreja[] = [
  {
    id: "i4",
    nome: "Igreja da Graça",
    localidade: "Campinas, SP",
    endereco: "Rua Central, 321",
    pastor: "Rev. André Silva",
    grupos: [],
    membros: 200,
    dataFundacao: "2000-11-10",
    ativa: true,
  },
  {
    id: "i5",
    nome: "Igreja Pentecostal",
    localidade: "Piracicaba, SP",
    endereco: "Av. Independência, 654",
    pastor: "Rev. Roberto Costa",
    grupos: [],
    membros: 160,
    dataFundacao: "2008-07-05",
    ativa: true,
  },
];

// Regionais de exemplo
const regionaisENOADS1: Regional[] = [
  {
    id: "r1",
    nome: "Regional Grande São Paulo",
    coordenador: "Pr. Antônio Souza",
    igrejas: igrejasRegional1,
    totalMembros: 550,
    totalGrupos: 5,
    dataFundacao: "1998-04-12",
  },
  {
    id: "r2",
    nome: "Regional Interior",
    coordenador: "Pr. Gilberto Lima",
    igrejas: igrejasRegional2,
    totalMembros: 360,
    totalGrupos: 2,
    dataFundacao: "2003-09-18",
  },
];

const regionaisENOADS2: Regional[] = [
  {
    id: "r3",
    nome: "Regional Litoral",
    coordenador: "Pr. Fabio Rocha",
    igrejas: [],
    totalMembros: 280,
    totalGrupos: 3,
    dataFundacao: "2006-02-28",
  },
];

// ENOADs de exemplo
const enoadsData: ENOADS[] = [
  {
    id: "e1",
    nome: "ENOADS São Paulo",
    presidente: "Bispo Josué Pereira",
    regionais: regionaisENOADS1,
    totalMembros: 910,
    totalIgrejas: 5,
    totalGrupos: 7,
    dataFundacao: "1996-01-20",
  },
  {
    id: "e2",
    nome: "ENOADS Litoral",
    presidente: "Bispo Manoel Santos",
    regionais: regionaisENOADS2,
    totalMembros: 280,
    totalIgrejas: 2,
    totalGrupos: 3,
    dataFundacao: "2004-06-15",
  },
];

// Federação
export const federacaoData: Federacao = {
  nome: "CONFRADAC - Confederação de Igrejas",
  presidente: "Apóstolo Davi Ferreira",
  enoads: enoadsData,
  totalMembros: 1190,
  totalIgrejas: 7,
  totalGrupos: 10,
  totalENOADS: 2,
  totalRegionais: 3,
};

/**
 * Função auxiliar para calcular totais de forma recursiva
 */
export function calcularTotaisRegional(regional: Regional) {
  let totalMembros = 0;
  let totalGrupos = 0;

  regional.igrejas.forEach(igreja => {
    totalMembros += igreja.membros;
    totalGrupos += igreja.grupos.length;
  });

  return { totalMembros, totalGrupos };
}

export function calcularTotaisENOADS(enoads: ENOADS) {
  let totalMembros = 0;
  let totalIgrejas = 0;
  let totalGrupos = 0;

  enoads.regionais.forEach(regional => {
    totalMembros += regional.totalMembros;
    totalIgrejas += regional.igrejas.length;
    totalGrupos += regional.totalGrupos;
  });

  return { totalMembros, totalIgrejas, totalGrupos };
}
