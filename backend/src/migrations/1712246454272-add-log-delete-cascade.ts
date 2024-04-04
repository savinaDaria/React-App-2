import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLogDeleteCascade1712246454272 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`    
        ALTER TABLE "activity_log"
        DROP CONSTRAINT IF EXISTS "activity_log_task_id_fkey";
        ALTER TABLE "activity_log"
        ADD CONSTRAINT "activity_log_task_id_fkey" FOREIGN KEY ("task_id")
        REFERENCES "task"("task_id") ON DELETE CASCADE;
    `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "activity_log"
        DROP CONSTRAINT "activity_log_task_id_fkey",
        ADD CONSTRAINT "activity_log_task_id_fkey" FOREIGN KEY ("task_id")
        REFERENCES "task"("task_id");
    `);
    }

}
