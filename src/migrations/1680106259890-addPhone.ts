import { MigrationInterface, QueryRunner } from "typeorm";

export class addPhone1680106259890 implements MigrationInterface {
    name = 'addPhone1680106259890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "password" character varying(25) NOT NULL, "email" character varying(50) NOT NULL, "telephone" character varying(11) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "clientsId" uuid, CONSTRAINT "UQ_8c17e6f04bd3fdd6053f3e7ebea" UNIQUE ("name"), CONSTRAINT "UQ_eff09bb429f175523787f46003b" UNIQUE ("email"), CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "password" character varying(25) NOT NULL, "email" character varying(50) NOT NULL, "telephone" character varying(11) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_99e921caf21faa2aab020476e44" UNIQUE ("name"), CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_6152f2b852a0341b8a04721f88a" FOREIGN KEY ("clientsId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_6152f2b852a0341b8a04721f88a"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "contact"`);
    }

}
