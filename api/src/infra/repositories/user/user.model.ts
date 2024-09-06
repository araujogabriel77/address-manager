import { Exclude } from 'class-transformer';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AddressModel } from '../address/address.model';

@Entity({ name: 'users' })
export class UserModel extends EntityHelper {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: String })
  name: string;

  @Column({ type: String, unique: true })
  email: string;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany(() => AddressModel, (address) => address.user)
  addresses: AddressModel[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
