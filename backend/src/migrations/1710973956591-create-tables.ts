import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1710973956591 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.query(`
        CREATE TABLE "task_list" (
          list_id SERIAL PRIMARY KEY,
          name VARCHAR UNIQUE NOT NULL,
          date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      await queryRunner.query(`
        CREATE TABLE "task" (
          task_id SERIAL PRIMARY KEY,
          name VARCHAR UNIQUE NOT NULL,
          list_id INTEGER REFERENCES "task_list"(list_id),
          description VARCHAR,
          priority VARCHAR,
          dueDate TIMESTAMP,
          date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      await queryRunner.query(`
      CREATE TABLE "activity_log" (
        log_id SERIAL PRIMARY KEY,
        action_type VARCHAR UNIQUE NOT NULL,
        task_id INTEGER REFERENCES "task"(task_id),
        old_value VARCHAR,
        new_value VARCHAR,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await queryRunner.query(`
    CREATE INDEX idx_task_id ON activity_log (task_id);
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "idx_task_id";`);
        await queryRunner.query('DROP TABLE "task_list";');
        await queryRunner.query('DROP TABLE "task";');
        await queryRunner.query('DROP TABLE "activity_log";');
    }

}
