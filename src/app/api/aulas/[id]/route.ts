import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient, StatusAula } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Buscar aula específica
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    const aula = await prisma.aula.findUnique({
      where: { id },
      include: {
        unidadeCurricular: {
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
        }
      }
    })

    if (!aula) {
      return NextResponse.json({ error: 'Aula não encontrada' }, { status: 404 })
    }

    return NextResponse.json(aula)
  } catch (error) {
    console.error('Erro ao buscar aula:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

// PUT - Atualizar aula
export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const { titulo, resumo, dataAula, status, duracao, assunto, objetivos, materialApoio, observacoes, ordem, slug } =
      body

    const aula = await prisma.aula.update({
      where: { id },
      data: {
        titulo,
        resumo,
        dataAula: dataAula ? new Date(dataAula) : undefined,
        status: status as StatusAula,
        duracao: duracao ? parseInt(duracao) : undefined,
        assunto,
        objetivos,
        materialApoio,
        observacoes,
        ordem: ordem ? parseInt(ordem) : undefined,
        slug
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

    return NextResponse.json(aula)
  } catch (error) {
    console.error('Erro ao atualizar aula:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

// DELETE - Deletar aula
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    await prisma.aula.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Aula deletada com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar aula:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
