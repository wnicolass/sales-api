import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCustomerTable1694723707543 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(
      new Table({
        name: 'customer',
        columns: [
          {
            name: 'customer_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid ()',
          },
          {
            name: 'username',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
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
    return await queryRunner.dropTable('customer');
  }
}
