import { MigrationInterface, QueryRunner } from "typeorm";

export class ActivityNameUpdate1711796379872 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "activity_log"
            DROP CONSTRAINT "activity_log_action_type_key";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "activity_log"
            ADD CONSTRAINT "activity_log_action_type_key" UNIQUE ("action_type");
        `);
    }

}
