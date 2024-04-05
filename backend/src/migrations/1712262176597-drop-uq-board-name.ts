import { MigrationInterface, QueryRunner } from "typeorm";

export class DropUqBoardName1712262176597 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "board"
            DROP CONSTRAINT "board_name_key";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "board"
            ADD CONSTRAINT "board_name_key" UNIQUE ("name");
        `);
    }

}
