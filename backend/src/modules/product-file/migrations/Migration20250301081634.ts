import { Migration } from '@mikro-orm/migrations';

export class Migration20250301081634 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "product_file_upload" drop constraint if exists "product_file_upload_file_url_unique";`);
    this.addSql(`create table if not exists "product_file_upload" ("id" text not null, "file_url" text not null, "alt" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_file_upload_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_product_file_upload_file_url_unique" ON "product_file_upload" (file_url) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_product_file_upload_deleted_at" ON "product_file_upload" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "product_file_upload" cascade;`);
  }

}
