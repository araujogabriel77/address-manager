import { Exclude } from "class-transformer";
import { EntityHelper } from "src/utils/entity-helper";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { genSalt , hash, compare } from 'bcryptjs';


@Entity({ name: 'users' })
export class UserModel{
  @PrimaryGeneratedColumn({ type: 'int'})
  id: number;

  @Column({ type: String, nullable: true })
  name: string;

  @Column({ type: String, unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
