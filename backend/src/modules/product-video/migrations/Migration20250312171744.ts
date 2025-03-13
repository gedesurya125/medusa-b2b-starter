import { Migration } from '@mikro-orm/migrations';

export class Migration20250312171744 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "product_video" drop constraint if exists "product_video_video_url_unique";`);
    this.addSql(`create table if not exists "product_video" ("id" text not null, "video_url" text not null, "alt" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_video_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_product_video_video_url_unique" ON "product_video" (video_url) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_product_video_deleted_at" ON "product_video" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "product_video" cascade;`);
  }

}
