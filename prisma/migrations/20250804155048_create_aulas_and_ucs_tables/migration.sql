-- CreateEnum
CREATE TYPE "public"."StatusAula" AS ENUM ('PLANEJADA', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA', 'ADIADA');

-- CreateTable
CREATE TABLE "public"."unidades_curriculares" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "codigo" TEXT,
    "descricao" TEXT,
    "cargaHoraria" INTEGER,
    "professor" TEXT,
    "cor" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "turmaId" TEXT NOT NULL,

    CONSTRAINT "unidades_curriculares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."aulas" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "resumo" TEXT,
    "dataAula" TIMESTAMP(3) NOT NULL,
    "status" "public"."StatusAula" NOT NULL DEFAULT 'PLANEJADA',
    "duracao" INTEGER,
    "assunto" TEXT NOT NULL,
    "objetivos" TEXT,
    "materialApoio" TEXT,
    "observacoes" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "slug" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "unidadeCurricularId" TEXT NOT NULL,

    CONSTRAINT "aulas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."unidades_curriculares" ADD CONSTRAINT "unidades_curriculares_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "public"."turmas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."aulas" ADD CONSTRAINT "aulas_unidadeCurricularId_fkey" FOREIGN KEY ("unidadeCurricularId") REFERENCES "public"."unidades_curriculares"("id") ON DELETE CASCADE ON UPDATE CASCADE;
