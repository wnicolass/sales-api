import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderTable1694817185860 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(
      new Table({
        name: 'order',
        columns: [
          {
            name: 'order_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid ()',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('order');
  }
}
