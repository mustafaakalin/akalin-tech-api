import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRolesArray1739437976559 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Önce eski role kolonunu yedekleyelim
        // await queryRunner.query(`ALTER TABLE "user" ADD COLUMN "roles" text[]`);
        // Mevcut role değerlerini yeni roles array'ine taşıyalım
        // await queryRunner.query(`UPDATE "user" SET "roles" = ARRAY[role]`);
        // Eski role kolonunu silelim
        // await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Geri alma işlemi için
        // await queryRunner.query(`ALTER TABLE "user" ADD COLUMN "role" varchar`);
        // await queryRunner.query(`UPDATE "user" SET "role" = roles[1]`);
        // await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roles"`);
    }

}
