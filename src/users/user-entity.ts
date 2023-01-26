import {
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { PostEntity } from '../post/post-entity';

@Table({
  tableName: 'users_schema',
})
export class UserEntities extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({ unique: true })
  login: string;

  @Column
  name: string;

  @Default(null)
  @Column
  phone: string;

  @HasMany(() => PostEntity, { sourceKey: 'id' })
  posts: PostEntity[];
}
