import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import bcrypt from "bcryptjs";


export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { length: 255, unique: true })
  email!: string;

  @Column("varchar", { length: 30 })
  name!: string;

  @Column("varchar", { length: 255 })
  password!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

