import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { StatusAula } from '@prisma/client'

// Função para combinar classes CSS (já existe no shadcn/ui)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formatação de datas
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  return dateObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...options
  })
}

export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  return dateObj.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function formatDateShort(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  return dateObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short'
  })
}

// Formatação de duração em minutos para horas
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}min`
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (remainingMinutes === 0) {
    return `${hours}h`
  }

  return `${hours}h ${remainingMinutes}min`
}

// Obter cor baseada no status da aula
export function getStatusColor(status: StatusAula): {
  bg: string
  text: string
  border: string
} {
  const colors = {
    PLANEJADA: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200'
    },
    EM_ANDAMENTO: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      border: 'border-yellow-200'
    },
    CONCLUIDA: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200'
    },
    CANCELADA: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200'
    },
    ADIADA: {
      bg: 'bg-orange-50',
      text: 'text-orange-700',
      border: 'border-orange-200'
    }
  }

  return colors[status]
}

// Obter label do status em português
export function getStatusLabel(status: StatusAula): string {
  const labels = {
    PLANEJADA: 'Planejada',
    EM_ANDAMENTO: 'Em Andamento',
    CONCLUIDA: 'Concluída',
    CANCELADA: 'Cancelada',
    ADIADA: 'Adiada'
  }

  return labels[status]
}

// Calcular progresso de uma UC baseado no status das aulas
export function calcularProgresso(aulas: { status: StatusAula }[]): {
  total: number
  concluidas: number
  emAndamento: number
  percentual: number
} {
  const total = aulas.length
  const concluidas = aulas.filter(aula => aula.status === 'CONCLUIDA').length
  const emAndamento = aulas.filter(aula => aula.status === 'EM_ANDAMENTO').length
  const percentual = total > 0 ? Math.round((concluidas / total) * 100) : 0

  return {
    total,
    concluidas,
    emAndamento,
    percentual
  }
}

// Agrupar aulas por status
export function agruparAulasPorStatus(aulas: { status: StatusAula }[]) {
  return aulas.reduce((acc, aula) => {
    acc[aula.status] = (acc[aula.status] || 0) + 1
    return acc
  }, {} as Record<StatusAula, number>)
}

// Validação de email simples
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Gerar slug a partir de string
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/^-+|-+$/g, '') // Remove hífens do início e fim
}

// Truncar texto
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

// Obter iniciais do nome
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

// Verificar se uma data está no passado
export function isPastDate(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  dateObj.setHours(0, 0, 0, 0)

  return dateObj < today
}

// Verificar se uma data é hoje
export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const today = new Date()

  return dateObj.toDateString() === today.toDateString()
}

// Obter próximas aulas (próximos 7 dias)
export function getUpcomingClasses<T extends { dataAula: Date | string }>(aulas: T[], days: number = 7): T[] {
  const today = new Date()
  const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000)

  return aulas.filter(aula => {
    const aulaDate = typeof aula.dataAula === 'string' ? new Date(aula.dataAula) : aula.dataAula
    return aulaDate >= today && aulaDate <= futureDate
  })
}
