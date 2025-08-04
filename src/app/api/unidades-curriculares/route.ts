import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Listar unidades curriculares (com filtro opcional por turma)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const turmaId = searchParams.get('turmaId')

    const where = turmaId ? { turmaId } : {}

    const unidadesCurriculares = await prisma.unidadeCurricular.findMany({
      where,
      include: {
        turma: {
          select: {
            id: true,
            nome: true,
            semestre: true,
            ano: true
          }
        },
        _count: {
          select: { aulas: true }
        }
      },
      orderBy: { ordem: 'asc' }
    })

    return NextResponse.json(unidadesCurriculares)
  } catch (error) {
    console.error('Erro ao buscar unidades curriculares:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

// POST - Criar nova unidade curricular
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nome, codigo, descricao, cargaHoraria, professor, cor, ordem, turmaId } = body

    if (!nome || !turmaId) {
      return NextResponse.json({ error: 'Nome e turmaId são obrigatórios' }, { status: 400 })
    }

    const unidadeCurricular = await prisma.unidadeCurricular.create({
      data: {
        nome,
        codigo,
        descricao,
        cargaHoraria: cargaHoraria ? parseInt(cargaHoraria) : null,
        professor,
        cor,
        ordem: ordem ? parseInt(ordem) : 0,
        turmaId
      },
      include: {
        turma: {
          select: {
            id: true,
            nome: true,
            semestre: true,
            ano: true
          }
        }
      }
    })

    return NextResponse.json(unidadeCurricular, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar unidade curricular:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
