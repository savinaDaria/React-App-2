import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBoardRelation1712240285048 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "board" (
          board_id SERIAL PRIMARY KEY,
          name VARCHAR UNIQUE NOT NULL,
          date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        INSERT INTO board (name) VALUES ('Default Board');
      `);

    const defaultBoardIdQuery = `
        SELECT board_id FROM board WHERE name = 'Default Board';
    `;
    const defaultBoardIdResult = await queryRunner.query(defaultBoardIdQuery);
    const defaultBoardId = defaultBoardIdResult[0]?.board_id;

    if (!defaultBoardId) {
      throw new Error('Default Board not found');
    }

    await queryRunner.query(`
        ALTER TABLE task_list ADD COLUMN board_id INTEGER 
        REFERENCES "board"(board_id) NOT NULL DEFAULT ${defaultBoardId}`);

    await queryRunner.query(`
      ALTER TABLE task_list ADD CONSTRAINT "board_id_fkey" FOREIGN KEY (board_id) 
      REFERENCES board(board_id) ON DELETE CASCADE;
      `);


    await queryRunner.query(`    
        ALTER TABLE "task"
        DROP CONSTRAINT IF EXISTS "task_list_id_fkey";
        ALTER TABLE "task"
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
    await queryRunner.query(`
        ALTER TABLE task_list DROP CONSTRAINT IF EXISTS "board_id_fkey";
        ALTER TABLE task_list DROP COLUMN IF EXISTS board_id;
    `);

    await queryRunner.query('DROP TABLE IF EXISTS "board";');
  }

}
