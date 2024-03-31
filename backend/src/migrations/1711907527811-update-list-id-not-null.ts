import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateListIdNotNull1711907527811 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "task"
            ALTER COLUMN "list_id" SET NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "task"
            ALTER COLUMN "list_id" DROP NOT NULL
        `);
    }

}
