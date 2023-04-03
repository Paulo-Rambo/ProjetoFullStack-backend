import { MigrationInterface, QueryRunner } from "typeorm";

export class fixPassword1680106537269 implements MigrationInterface {
    name = 'fixPassword1680106537269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "contact" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "password" character varying(25) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "contact" ADD "password" character varying(25) NOT NULL`);
    }

}
