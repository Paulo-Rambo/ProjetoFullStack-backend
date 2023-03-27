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
  
  @Column()
  name: string;
  
  @Column()
  password: string;
  
  @Column()
  email: string;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
  this.password = hashSync(this.password, 10);
  }

  @ManyToOne(()=> Client, (clients) => clients.contact, {
    onDelete: "CASCADE",
    nullable: false,
  })
  clients: Client

  @Column()
  clientsId: string

}

export default Contact;