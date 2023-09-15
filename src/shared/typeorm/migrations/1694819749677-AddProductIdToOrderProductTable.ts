import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddProductIdToOrderProductTable1694819749677
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'order_product',
      new TableColumn({
        name: 'product_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'order_product',
      new TableForeignKey({
        name: 'fk_orderproduct_product',
        columnNames: ['product_id'],
        referencedTableName: 'product',
        referencedColumnNames: ['product_id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'order_product',
      'fk_orderproduct_product',
    );
    await queryRunner.dropColumn('order_product', 'product_id');
  }
}
