import { Column, DataType, Model, Table } from 'sequelize-typescript';
interface UserCreationAttrs {
  email: string;
  username: string;
  password: string;
}

@Table({ tableName: 'users', createdAt: false, updatedAt: false })
export class UserModel extends Model<UserModel, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string;
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  password: string;
}
