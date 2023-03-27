import { MigrationInterface, QueryRunner } from "typeorm";

export class nullableFalse1679930571735 implements MigrationInterface {
    name = 'nullableFalse1679930571735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_6152f2b852a0341b8a04721f88a"`);
        await queryRunner.query(`ALTER TABLE "contact" ALTER COLUMN "clientsId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_6152f2b852a0341b8a04721f88a" FOREIGN KEY ("clientsId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_6152f2b852a0341b8a04721f88a"`);
        await queryRunner.query(`ALTER TABLE "contact" ALTER COLUMN "clientsId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_6152f2b852a0341b8a04721f88a" FOREIGN KEY ("clientsId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
