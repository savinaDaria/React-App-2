import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNameNotUnique1711754875207 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "task"
            DROP CONSTRAINT "task_name_key";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "task_name_key" UNIQUE ("name");
        `);
    }


}
