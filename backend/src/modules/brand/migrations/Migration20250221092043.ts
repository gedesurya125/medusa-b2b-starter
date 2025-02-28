import { Migration } from '@mikro-orm/migrations';

export class Migration20250221092043 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "brand" add column if not exists "documentUrl" text not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "brand" drop column if exists "documentUrl";`);
  }

}
