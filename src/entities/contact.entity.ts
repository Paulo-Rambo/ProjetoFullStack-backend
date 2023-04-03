import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    ManyToOne,
  } from "typeorm";
import { hashSync } from "bcryptjs";
import Client from "./client.entity";
  
@Entity("contact")
class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column({type:"varchar", unique:true, length:50})
  name: string;
  
  @Column()
  password: string;
  
  @Column({type:"varchar", unique:true, length:50})
  email: string;
  
  @Column({type:"varchar", length:11})
  telephone: string;

  @CreateDateColumn()
  createdAt: Date;
  
  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
  this.password = hashSync(this.password, 10);
  }

  @ManyToOne(()=> Client, (clients) => clients.contact, {
    onDelete: "CASCADE",
    nullable: true,
  })
  clients: Client

  @Column({nullable: true})
  clientsId: string

}

export default Contact;