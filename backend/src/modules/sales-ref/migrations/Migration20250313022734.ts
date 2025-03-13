import { Migration } from '@mikro-orm/migrations';

export class Migration20250313022734 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "sales_ref" drop constraint if exists "sales_ref_name_unique";`);
    this.addSql(`create table if not exists "sales_ref" ("id" text not null, "name" text not null, "username" text not null, "password" text not null, "bc_sales_code" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "sales_ref_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_sales_ref_name_unique" ON "sales_ref" (name) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_sales_ref_deleted_at" ON "sales_ref" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "sales_ref" cascade;`);
  }

}
