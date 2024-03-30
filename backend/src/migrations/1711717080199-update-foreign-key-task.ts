import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateForeignKeyTask1711717080199 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "task"
            DROP CONSTRAINT "task_list_id_fkey",
            ADD CONSTRAINT "task_list_id_fkey" FOREIGN KEY ("list_id")
            REFERENCES "task_list"("list_id") ON DELETE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "task"
        DROP CONSTRAINT "task_list_id_fkey",
        ADD CONSTRAINT "task_list_id_fkey" FOREIGN KEY ("list_id")
        REFERENCES "task_list"("list_id");
    `);
    }

}
