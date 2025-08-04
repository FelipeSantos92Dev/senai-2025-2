import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Buscar unidade curricular específica com suas aulas
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    const unidadeCurricular = await prisma.unidadeCurricular.findUnique({
      where: { id },
      include: {
        turma: {
          select: {
            id: true,
            nome: true,
            semestre: true,
            ano: true
          }
        },
        aulas: {
          orderBy: [{ ordem: 'asc' }, { dataAula: 'asc' }]
        }
      }
    })

    if (!unidadeCurricular) {
      return NextResponse.json({ error: 'Unidade curricular não encontrada' }, { status: 404 })
    }

    return NextResponse.json(unidadeCurricular)
  } catch (error) {
    console.error('Erro ao buscar unidade curricular:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

// PUT - Atualizar unidade curricular
export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const { nome, codigo, descricao, cargaHoraria, professor, cor, ordem } = body

    const unidadeCurricular = await prisma.unidadeCurricular.update({
      where: { id },
      data: {
        nome,
        codigo,
        descricao,
        cargaHoraria: cargaHoraria ? parseInt(cargaHoraria) : undefined,
        professor,
        cor,
        ordem: ordem ? parseInt(ordem) : undefined
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

    return NextResponse.json(unidadeCurricular)
  } catch (error) {
    console.error('Erro ao atualizar unidade curricular:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

// DELETE - Deletar unidade curricular
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    await prisma.unidadeCurricular.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Unidade curricular deletada com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar unidade curricular:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
