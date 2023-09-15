import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddOrderIdToOrderProductTable1694819530266
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'order_product',
      new TableColumn({
        name: 'order_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'order_product',
      new TableForeignKey({
        name: 'fk_orderproduct_order',
        columnNames: ['order_id'],
        referencedTableName: 'order',
        referencedColumnNames: ['order_id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('order_product', 'fk_orderproduct_order');
    await queryRunner.dropColumn('order_product', 'order_id');
  }
}
