import { Migration } from '@mikro-orm/migrations';

export class Migration20250228083642 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "bc_product_info" drop constraint if exists "bc_product_info_bc_product_id_unique";`);
    this.addSql(`create table if not exists "bc_product_info" ("id" text not null, "bc_product_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "bc_product_info_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_bc_product_info_bc_product_id_unique" ON "bc_product_info" (bc_product_id) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_bc_product_info_deleted_at" ON "bc_product_info" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "bc_product_info" cascade;`);
  }

}
