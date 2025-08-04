import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes
  await prisma.aula.deleteMany()
  await prisma.unidadeCurricular.deleteMany()
  await prisma.turma.deleteMany()

  // Criar turmas
  const turma1 = await prisma.turma.create({
    data: {
      nome: 'Desenvolvimento Web Full Stack',
      semestre: '2025.1',
      ano: 2025,
      descricao: 'Turma focada no desenvolvimento completo de aplicações web modernas',
      cor: '#3B82F6'
    }
  })

  const turma2 = await prisma.turma.create({
    data: {
      nome: 'Análise e Desenvolvimento de Sistemas',
      semestre: '2025.1',
      ano: 2025,
      descricao: 'Curso técnico em desenvolvimento de sistemas',
      cor: '#10B981'
    }
  })

  // Criar unidades curriculares para turma 1
  const uc1 = await prisma.unidadeCurricular.create({
    data: {
      nome: 'Programação Front-End',
      codigo: 'FRONT001',
      descricao: 'Desenvolvimento de interfaces modernas com React e Next.js',
      cargaHoraria: 80,
      professor: 'Prof. Maria Silva',
      cor: '#8B5CF6',
      ordem: 1,
      turmaId: turma1.id
    }
  })

  const uc2 = await prisma.unidadeCurricular.create({
    data: {
      nome: 'Programação Back-End',
      codigo: 'BACK001',
      descricao: 'Desenvolvimento de APIs e serviços com Node.js',
      cargaHoraria: 100,
      professor: 'Prof. João Santos',
      cor: '#F59E0B',
      ordem: 2,
      turmaId: turma1.id
    }
  })

  const uc3 = await prisma.unidadeCurricular.create({
    data: {
      nome: 'Banco de Dados',
      codigo: 'BD001',
      descricao: 'Modelagem e administração de bancos de dados relacionais',
      cargaHoraria: 60,
      professor: 'Prof. Ana Costa',
      cor: '#EF4444',
      ordem: 3,
      turmaId: turma1.id
    }
  })

  // Criar unidades curriculares para turma 2
  const uc4 = await prisma.unidadeCurricular.create({
    data: {
      nome: 'Lógica de Programação',
      codigo: 'LOG001',
      descricao: 'Fundamentos da programação e algoritmos',
      cargaHoraria: 80,
      professor: 'Prof. Carlos Lima',
      cor: '#06B6D4',
      ordem: 1,
      turmaId: turma2.id
    }
  })

  // Criar aulas para Front-End
  const aulasFrontEnd = [
    {
      titulo: 'Introdução ao React',
      assunto: 'Fundamentos do React e JSX',
      resumo: 'Primeira aula sobre React, conceitos básicos e estrutura de componentes',
      dataAula: new Date('2025-02-03'),
      status: 'CONCLUIDA' as const,
      duracao: 120,
      objetivos: 'Compreender os conceitos básicos do React e criar o primeiro componente',
      ordem: 1
    },
    {
      titulo: 'Componentes e Props',
      assunto: 'Como criar e usar componentes com propriedades',
      resumo: 'Aprofundamento em componentes React e passagem de dados via props',
      dataAula: new Date('2025-02-05'),
      status: 'CONCLUIDA' as const,
      duracao: 120,
      objetivos: 'Dominar a criação de componentes reutilizáveis',
      ordem: 2
    },
    {
      titulo: 'Estado e Hooks',
      assunto: 'useState e useEffect',
      resumo: 'Gerenciamento de estado em componentes funcionais',
      dataAula: new Date('2025-02-07'),
      status: 'EM_ANDAMENTO' as const,
      duracao: 150,
      objetivos: 'Implementar estado local e efeitos colaterais',
      ordem: 3
    },
    {
      titulo: 'Roteamento com Next.js',
      assunto: 'App Router e navegação',
      resumo: 'Sistema de rotas do Next.js 15',
      dataAula: new Date('2025-02-10'),
      status: 'PLANEJADA' as const,
      duracao: 120,
      objetivos: 'Configurar navegação entre páginas',
      ordem: 4
    },
    {
      titulo: 'Styling com TailwindCSS',
      assunto: 'Utility-first CSS framework',
      resumo: 'Estilização moderna com classes utilitárias',
      dataAula: new Date('2025-02-12'),
      status: 'PLANEJADA' as const,
      duracao: 120,
      objetivos: 'Criar interfaces responsivas com Tailwind',
      ordem: 5
    }
  ]

  for (const aula of aulasFrontEnd) {
    await prisma.aula.create({
      data: {
        ...aula,
        unidadeCurricularId: uc1.id
      }
    })
  }

  // Criar aulas para Back-End
  const aulasBackEnd = [
    {
      titulo: 'Introdução ao Node.js',
      assunto: 'Runtime JavaScript no servidor',
      resumo: 'Configuração do ambiente e primeiros scripts',
      dataAula: new Date('2025-02-04'),
      status: 'CONCLUIDA' as const,
      duracao: 120,
      objetivos: 'Configurar ambiente Node.js e entender o runtime',
      ordem: 1
    },
    {
      titulo: 'Express.js Básico',
      assunto: 'Framework web para Node.js',
      resumo: 'Criando servidor HTTP e definindo rotas',
      dataAula: new Date('2025-02-06'),
      status: 'CONCLUIDA' as const,
      duracao: 150,
      objetivos: 'Criar API REST básica com Express',
      ordem: 2
    },
    {
      titulo: 'Middleware e Validação',
      assunto: 'Interceptadores de requisições',
      resumo: 'Implementando validação de dados e autenticação',
      dataAula: new Date('2025-02-11'),
      status: 'PLANEJADA' as const,
      duracao: 120,
      objetivos: 'Implementar validação robusta de APIs',
      ordem: 3
    }
  ]

  for (const aula of aulasBackEnd) {
    await prisma.aula.create({
      data: {
        ...aula,
        unidadeCurricularId: uc2.id
      }
    })
  }

  // Criar aulas para Banco de Dados
  const aulasBD = [
    {
      titulo: 'Modelagem Conceitual',
      assunto: 'Diagrama ER e normalização',
      resumo: 'Princípios de modelagem de dados relacionais',
      dataAula: new Date('2025-02-08'),
      status: 'PLANEJADA' as const,
      duracao: 120,
      objetivos: 'Criar modelos de dados eficientes',
      ordem: 1
    },
    {
      titulo: 'SQL Básico',
      assunto: 'Consultas e manipulação de dados',
      resumo: 'SELECT, INSERT, UPDATE e DELETE',
      dataAula: new Date('2025-02-13'),
      status: 'PLANEJADA' as const,
      duracao: 150,
      objetivos: 'Dominar comandos SQL essenciais',
      ordem: 2
    }
  ]

  for (const aula of aulasBD) {
    await prisma.aula.create({
      data: {
        ...aula,
        unidadeCurricularId: uc3.id
      }
    })
  }

  // Criar aulas para Lógica de Programação
  const aulasLogica = [
    {
      titulo: 'Algoritmos Básicos',
      assunto: 'Estruturas sequenciais',
      resumo: 'Entrada, processamento e saída de dados',
      dataAula: new Date('2025-02-05'),
      status: 'CONCLUIDA' as const,
      duracao: 120,
      objetivos: 'Compreender a lógica sequencial',
      ordem: 1
    },
    {
      titulo: 'Estruturas Condicionais',
      assunto: 'If, else e switch case',
      resumo: 'Tomada de decisões em algoritmos',
      dataAula: new Date('2025-02-07'),
      status: 'EM_ANDAMENTO' as const,
      duracao: 120,
      objetivos: 'Implementar lógica condicional',
      ordem: 2
    },
    {
      titulo: 'Estruturas de Repetição',
      assunto: 'Loops: for, while e do-while',
      resumo: 'Automatização de tarefas repetitivas',
      dataAula: new Date('2025-02-12'),
      status: 'PLANEJADA' as const,
      duracao: 150,
      objetivos: 'Dominar estruturas de repetição',
      ordem: 3
    }
  ]

  for (const aula of aulasLogica) {
    await prisma.aula.create({
      data: {
        ...aula,
        unidadeCurricularId: uc4.id
      }
    })
  }

  console.log('✅ Seed concluído com sucesso!')
  console.log(`📊 Dados criados:`)
  console.log(`   - ${2} turmas`)
  console.log(`   - ${4} unidades curriculares`)
  console.log(`   - ${13} aulas`)
}

main()
  .catch(e => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
