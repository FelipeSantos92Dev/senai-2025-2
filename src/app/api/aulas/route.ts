import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient, StatusAula, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Listar aulas (com filtro opcional por unidade curricular)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const unidadeCurricularId = searchParams.get('unidadeCurricularId')
    const status = searchParams.get('status') as StatusAula | null

    const where: Prisma.AulaWhereInput = {}
    if (unidadeCurricularId) where.unidadeCurricularId = unidadeCurricularId
    if (status) where.status = status

    const aulas = await prisma.aula.findMany({
      where,
      include: {
        unidadeCurricular: {
          select: {
            id: true,
            nome: true,
            codigo: true,
            turma: {
              select: {
                id: true,
                nome: true,
                semestre: true,
                ano: true
              }
            }
          }
        }
      },
      orderBy: [{ ordem: 'asc' }, { dataAula: 'asc' }]
    })

    return NextResponse.json(aulas)
  } catch (error) {
    console.error('Erro ao buscar aulas:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

// POST - Criar nova aula
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      titulo,
      resumo,
      dataAula,
      status,
      duracao,
      assunto,
      objetivos,
      materialApoio,
      observacoes,
      ordem,
      slug,
      unidadeCurricularId
    } = body

    if (!titulo || !dataAula || !assunto || !unidadeCurricularId) {
      return NextResponse.json(
        { error: 'Título, data da aula, assunto e unidadeCurricularId são obrigatórios' },
        { status: 400 }
      )
    }

    const aula = await prisma.aula.create({
      data: {
        titulo,
        resumo,
        dataAula: new Date(dataAula),
        status: status || 'PLANEJADA',
        duracao: duracao ? parseInt(duracao) : null,
        assunto,
        objetivos,
        materialApoio,
        observacoes,
        ordem: ordem ? parseInt(ordem) : 0,
        slug,
        unidadeCurricularId
      },
      include: {
        unidadeCurricular: {
          select: {
            id: true,
            nome: true,
            codigo: true
          }
        }
      }
    })

    return NextResponse.json(aula, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar aula:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
