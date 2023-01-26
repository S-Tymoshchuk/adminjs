import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { UserEntities } from '../users/user-entity';
import { CommentEntity } from './comment-entity';

@Table({
  tableName: 'posts_schema',
})
export class PostEntity extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column
  title: string;

  @ForeignKey(() => UserEntities)
  @Column({ type: DataType.UUID })
  userId: string;

  @HasMany(() => CommentEntity)
  comments: CommentEntity[];
}
