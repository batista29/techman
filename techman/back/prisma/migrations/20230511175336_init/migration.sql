-- DropForeignKey
ALTER TABLE `comentarios` DROP FOREIGN KEY `Comentarios_equipamento_fkey`;

-- AddForeignKey
ALTER TABLE `Comentarios` ADD CONSTRAINT `Comentarios_equipamento_fkey` FOREIGN KEY (`equipamento`) REFERENCES `Equipamentos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
