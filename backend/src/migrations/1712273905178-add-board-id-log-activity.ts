import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBoardIdLogActivity1712273905178 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO board (name) VALUES ('Default Board');
      `);

        const defaultBoardIdQuery = `SELECT board_id FROM board WHERE name = 'Default Board';`;
        const defaultBoardIdResult = await queryRunner.query(defaultBoardIdQuery);
        const defaultBoardId = defaultBoardIdResult[0]?.board_id;

        if (!defaultBoardId) {
            throw new Error('Default Board not found');
        }

        await queryRunner.query(`
        ALTER TABLE activity_log ADD COLUMN board_id INTEGER 
        REFERENCES "board"(board_id) ON DELETE CASCADE NOT NULL DEFAULT ${defaultBoardId}`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE activity_log DROP COLUMN IF EXISTS board_id;
    `);
    }

}
