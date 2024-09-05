import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialStructure1706664681010 implements MigrationInterface {
  private readonly initialStructure = `
  CREATE TABLE "users" (
  "id" int PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "created_at" timestamp DEFAULT 'now',
  "updated_at" timestamp DEFAULT 'now',
  "deleted_at" timestamp
);

CREATE TABLE "addresses" (
  "id" smallint PRIMARY KEY NOT NULL,
  "cep" varchar(8) NOT NULL,
  "logradouro" varchar NOT NULL,
  "complemento" varchar,
  "bairro" varchar NOT NULL,
  "cidade" varchar NOT NULL,
  "uf" varchar(2) NOT NULL,
  "numero" varchar NOT NULL,
  "user_id" int NOT NULL,
  "created_at" timestamp DEFAULT 'now',
  "updated_at" timestamp DEFAULT 'now',
  "deleted_at" timestamp
);

CREATE UNIQUE INDEX "users_id_idx" ON "users" ("id");

CREATE UNIQUE INDEX "users_email_idx" ON "users" ("email");

CREATE UNIQUE INDEX "addresses_id_idx" ON "addresses" ("id");

ALTER TABLE "addresses" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
`;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(this.initialStructure);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX addresses_id_idx;
      DROP INDEX users_email_idx;

      DROP TABLE addresses;
      DROP TABLE users;
    `);
  }
}
