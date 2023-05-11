/*
  Warnings:

  - A unique constraint covering the columns `[senha]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Usuario_senha_key` ON `Usuario`(`senha`);
