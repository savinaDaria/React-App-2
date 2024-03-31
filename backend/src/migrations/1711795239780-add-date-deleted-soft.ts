import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDateDeletedSoft1711795239780 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'task', 
            new TableColumn({
                name: 'date_deleted',
                type: 'timestamp',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('task', 'date_deleted');
    }

}
