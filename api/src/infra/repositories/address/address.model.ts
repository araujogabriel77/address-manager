import { EntityHelper } from "src/utils/entity-helper";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserModel } from "../user/user.model";

@Entity({ name: 'addresses' })
export class AddressModel extends EntityHelper {
  @PrimaryGeneratedColumn({ type: 'int'})
  id: number;

  @Column({ name: 'zip_code', type: String })
  zipCode: string;

  @Column({ type: String})
  street: string;

  @Column({ type: String, nullable: true })
  complement?: string;

  @Column({ type: String})
  neighborhood: string;

  @Column({ type: String})
  number: string;

  @Column({ type: String})
  city: string;

  @Column({ type: String})
  uf: string;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @ManyToOne(() => UserModel, (user) => user.addresses)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
