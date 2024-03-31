import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPropertyColumnActivityLog1711793712210 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'activity_log', 
            new TableColumn({
                name: 'property',
                type: 'varchar', 
                length: '255', 
                isNullable: true, 
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('activity_log', 'property');
    }

}
