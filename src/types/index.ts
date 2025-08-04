import { Turma, UnidadeCurricular, Aula, StatusAula } from '@prisma/client'

// Tipos básicos do Prisma
export type { StatusAula }

// Tipos estendidos com relacionamentos
export type TurmaComUCs = Turma & {
  unidadesCurriculares: (UnidadeCurricular & {
    _count: {
      aulas: number
    }
  })[]
}

export type TurmaCompleta = Turma & {
  unidadesCurriculares: (UnidadeCurricular & {
    aulas: Pick<Aula, 'id' | 'titulo' | 'status' | 'dataAula' | 'assunto'>[]
  })[]
}

export type UnidadeCurricularComTurma = UnidadeCurricular & {
  turma: Pick<Turma, 'id' | 'nome' | 'semestre' | 'ano'>
  _count?: {
    aulas: number
  }
}

export type UnidadeCurricularCompleta = UnidadeCurricular & {
  turma: Pick<Turma, 'id' | 'nome' | 'semestre' | 'ano'>
  aulas: Aula[]
}

export type AulaComUC = Aula & {
  unidadeCurricular: UnidadeCurricular & {
    turma: Pick<Turma, 'id' | 'nome' | 'semestre' | 'ano'>
  }
}

export type AulaCompleta = Aula & {
  unidadeCurricular: UnidadeCurricularComTurma
}

// Tipos para formulários e APIs
export type CreateTurmaData = {
  nome: string
  semestre: string
  ano: number
  descricao?: string
  cor?: string
}

export type UpdateTurmaData = Partial<CreateTurmaData>

export type CreateUnidadeCurricularData = {
  nome: string
  codigo?: string
  descricao?: string
  cargaHoraria?: number
  professor?: string
  cor?: string
  ordem?: number
  turmaId: string
}

export type UpdateUnidadeCurricularData = Partial<Omit<CreateUnidadeCurricularData, 'turmaId'>>

export type CreateAulaData = {
  titulo: string
  resumo?: string
  dataAula: Date | string
  status?: StatusAula
  duracao?: number
  assunto: string
  objetivos?: string
  materialApoio?: string
  observacoes?: string
  ordem?: number
  slug?: string
  unidadeCurricularId: string
}

export type UpdateAulaData = Partial<Omit<CreateAulaData, 'unidadeCurricularId'>>

// Tipos para cards de status
export type StatusInfo = {
  label: string
  color: string
  bgColor: string
  textColor: string
}

export const STATUS_INFO: Record<StatusAula, StatusInfo> = {
  PLANEJADA: {
    label: 'Planejada',
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800'
  },
  EM_ANDAMENTO: {
    label: 'Em Andamento',
    color: 'yellow',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800'
  },
  CONCLUIDA: {
    label: 'Concluída',
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800'
  },
  CANCELADA: {
    label: 'Cancelada',
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800'
  },
  ADIADA: {
    label: 'Adiada',
    color: 'orange',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-800'
  }
}
