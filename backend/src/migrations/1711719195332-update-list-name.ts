import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateListName1711719195332 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "task_list"
            DROP CONSTRAINT "task_list_name_key";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "task_list"
            ADD CONSTRAINT "task_list_name_key" UNIQUE ("name");
        `);
    }

}
