import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Buscar turma específica com suas unidades curriculares
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    const turma = await prisma.turma.findUnique({
      where: { id },
      include: {
        unidadesCurriculares: {
          include: {
            aulas: {
              select: {
                id: true,
                titulo: true,
                status: true,
                dataAula: true,
                assunto: true
              },
              orderBy: { ordem: 'asc' }
            }
          },
          orderBy: { ordem: 'asc' }
        }
      }
    })

    if (!turma) {
      return NextResponse.json({ error: 'Turma não encontrada' }, { status: 404 })
    }

    return NextResponse.json(turma)
  } catch (error) {
    console.error('Erro ao buscar turma:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

// PUT - Atualizar turma
export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const { nome, semestre, ano, descricao, cor } = body

    const turma = await prisma.turma.update({
      where: { id },
      data: {
        nome,
        semestre,
        ano: ano ? parseInt(ano) : undefined,
        descricao,
        cor
      }
    })

    return NextResponse.json(turma)
  } catch (error) {
    console.error('Erro ao atualizar turma:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

// DELETE - Deletar turma
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    await prisma.turma.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Turma deletada com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar turma:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
