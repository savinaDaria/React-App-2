import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveOnDeleteCascade1711797359396 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "task"
            DROP CONSTRAINT "task_list_id_fkey";
        `);

        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "task_list_id_fkey" FOREIGN KEY ("list_id")
            REFERENCES "task_list"("list_id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "task"
            DROP CONSTRAINT "task_list_id_fkey";
        `);

        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "task_list_id_fkey" FOREIGN KEY ("list_id")
            REFERENCES "task_list"("list_id") ON DELETE CASCADE;
        `);
    }

}
