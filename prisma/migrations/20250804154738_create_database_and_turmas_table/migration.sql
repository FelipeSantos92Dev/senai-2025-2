-- CreateTable
CREATE TABLE "public"."turmas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "semestre" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "descricao" TEXT,
    "cor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "turmas_pkey" PRIMARY KEY ("id")
);
