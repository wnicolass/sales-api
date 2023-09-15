import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddForeignKeyCustomerOrder1694817410407
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'order',
      new TableColumn({
        name: 'customer_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'order',
      new TableForeignKey({
        name: 'fk_order_customer',
        columnNames: ['customer_id'],
        referencedTableName: 'customer',
        referencedColumnNames: ['customer_id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('order', 'fk_order_customer');
    await queryRunner.dropColumn('order', 'customer_id');
  }
}
