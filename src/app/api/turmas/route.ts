import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Listar todas as turmas
export async function GET() {
  try {
    const turmas = await prisma.turma.findMany({
      include: {
        unidadesCurriculares: {
          include: {
            _count: {
              select: { aulas: true }
            }
          }
        }
      },
      orderBy: [{ ano: 'desc' }, { semestre: 'desc' }, { nome: 'asc' }]
    })

    return NextResponse.json(turmas)
  } catch (error) {
    console.error('Erro ao buscar turmas:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

// POST - Criar nova turma
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nome, semestre, ano, descricao, cor } = body

    if (!nome || !semestre || !ano) {
      return NextResponse.json({ error: 'Nome, semestre e ano são obrigatórios' }, { status: 400 })
    }

    const turma = await prisma.turma.create({
      data: {
        nome,
        semestre,
        ano: parseInt(ano),
        descricao,
        cor
      }
    })

    return NextResponse.json(turma, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar turma:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
