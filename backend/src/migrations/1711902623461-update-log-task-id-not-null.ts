import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateLogTaskIdNotNull1711902623461 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "activity_log"
            ALTER COLUMN "task_id" SET NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "activity_log"
            ALTER COLUMN "task_id" DROP NOT NULL
        `);
    }

}
