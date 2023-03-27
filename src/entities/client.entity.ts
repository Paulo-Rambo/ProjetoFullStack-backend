import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    OneToMany
  } from "typeorm";
import { hashSync } from "bcryptjs";
import Contact from "./contact.entity";
  
@Entity("clients")
class Client {
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

  @OneToMany(() => Contact, contact => contact.clients)
  contact: Contact[]

}

export default Client;