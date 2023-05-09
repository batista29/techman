-- DropIndex
DROP INDEX `Usuario_senha_key` ON `usuario`;

-- AlterTable
ALTER TABLE `usuario` MODIFY `senha` VARCHAR(191) NOT NULL;
