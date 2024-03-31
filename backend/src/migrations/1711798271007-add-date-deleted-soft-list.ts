import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDateDeletedSoftList1711798271007 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'task_list', 
            new TableColumn({
                name: 'date_deleted',
                type: 'timestamp',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('task_list', 'date_deleted');
    }

}
