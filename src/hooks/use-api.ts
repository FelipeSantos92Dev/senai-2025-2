import { useState, useEffect } from 'react'
import { TurmaComUCs, TurmaCompleta, UnidadeCurricularCompleta, AulaCompleta, StatusAula } from '@/types'

// Hook genérico para fetch de dados
function useApi<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers
        },
        ...options
      })

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  const refetch = () => fetchData()

  return { data, loading, error, refetch }
}

// Hook para buscar todas as turmas
export function useTurmas() {
  return useApi<TurmaComUCs[]>('/api/turmas')
}

// Hook para buscar uma turma específica
export function useTurma(id: string) {
  return useApi<TurmaCompleta>(`/api/turmas/${id}`)
}

// Hook para buscar unidade curricular específica
export function useUnidadeCurricular(id: string) {
  return useApi<UnidadeCurricularCompleta>(`/api/unidades-curriculares/${id}`)
}

// Hook para buscar aula específica
export function useAula(id: string) {
  return useApi<AulaCompleta>(`/api/aulas/${id}`)
}

// Hook para buscar aulas por unidade curricular
export function useAulasPorUC(unidadeCurricularId: string) {
  return useApi<AulaCompleta[]>(`/api/aulas?unidadeCurricularId=${unidadeCurricularId}`)
}

// Hook para buscar aulas por status
export function useAulasPorStatus(status: StatusAula) {
  return useApi<AulaCompleta[]>(`/api/aulas?status=${status}`)
}

// Hook personalizado para mutações (POST, PUT, DELETE)
export function useMutation<TData = unknown, TVariables = unknown>() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<TData | null>(null)

  const mutate = async (url: string, options: RequestInit & { variables?: TVariables }) => {
    try {
      setLoading(true)
      setError(null)

      const { variables, ...fetchOptions } = options

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers
        },
        body: variables ? JSON.stringify(variables) : fetchOptions.body,
        ...fetchOptions
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Erro ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      setData(result)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setData(null)
    setError(null)
    setLoading(false)
  }

  return { mutate, loading, error, data, reset }
}

// Hooks específicos para mutações
export function useCreateTurma() {
  const mutation = useMutation()

  const createTurma = async (data: {
    nome: string
    semestre: string
    ano: number
    descricao?: string
    cor?: string
  }) => {
    return mutation.mutate('/api/turmas', {
      method: 'POST',
      variables: data
    })
  }

  return {
    createTurma,
    loading: mutation.loading,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset
  }
}

export function useUpdateTurma() {
  const mutation = useMutation()

  const updateTurma = async (
    id: string,
    data: {
      nome?: string
      semestre?: string
      ano?: number
      descricao?: string
      cor?: string
    }
  ) => {
    return mutation.mutate(`/api/turmas/${id}`, {
      method: 'PUT',
      variables: data
    })
  }

  return {
    updateTurma,
    loading: mutation.loading,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset
  }
}

export function useDeleteTurma() {
  const mutation = useMutation()

  const deleteTurma = async (id: string) => {
    return mutation.mutate(`/api/turmas/${id}`, {
      method: 'DELETE'
    })
  }

  return {
    deleteTurma,
    loading: mutation.loading,
    error: mutation.error,
    reset: mutation.reset
  }
}

export function useCreateUnidadeCurricular() {
  const mutation = useMutation()

  const createUnidadeCurricular = async (data: {
    nome: string
    codigo?: string
    descricao?: string
    cargaHoraria?: number
    professor?: string
    cor?: string
    ordem?: number
    turmaId: string
  }) => {
    return mutation.mutate('/api/unidades-curriculares', {
      method: 'POST',
      variables: data
    })
  }

  return {
    createUnidadeCurricular,
    loading: mutation.loading,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset
  }
}

export function useCreateAula() {
  const mutation = useMutation()

  const createAula = async (data: {
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
  }) => {
    return mutation.mutate('/api/aulas', {
      method: 'POST',
      variables: data
    })
  }

  return {
    createAula,
    loading: mutation.loading,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset
  }
}

export function useUpdateAula() {
  const mutation = useMutation()

  const updateAula = async (
    id: string,
    data: {
      titulo?: string
      resumo?: string
      dataAula?: Date | string
      status?: StatusAula
      duracao?: number
      assunto?: string
      objetivos?: string
      materialApoio?: string
      observacoes?: string
      ordem?: number
      slug?: string
    }
  ) => {
    return mutation.mutate(`/api/aulas/${id}`, {
      method: 'PUT',
      variables: data
    })
  }

  return {
    updateAula,
    loading: mutation.loading,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset
  }
}
