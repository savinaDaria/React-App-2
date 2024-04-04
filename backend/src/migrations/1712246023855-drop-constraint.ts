import { MigrationInterface, QueryRunner } from "typeorm";

export class DropConstraint1712246023855 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`    
        ALTER TABLE "task_list"
        DROP CONSTRAINT IF EXISTS "task_list_board_id_fkey";
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        ALTER TABLE "task_list"
        ADD CONSTRAINT "task_list_board_id_fkey" FOREIGN KEY ("board_id")
        REFERENCES "board"("board_id");
    `);
    }

}
