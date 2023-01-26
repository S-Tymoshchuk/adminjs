import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { PostEntity } from './post-entity';
import { UserEntities } from '../users/user-entity';
import { CategoryEntity } from './category-entity';

@Table({
  tableName: 'comment_schema',
})
export class CommentEntity extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column
  title: string;

  @ForeignKey(() => PostEntity)
  @Column({ type: DataType.UUID })
  postId: string;

  @ForeignKey(() => UserEntities)
  @Column({ type: DataType.UUID })
  userId: string;

  @ForeignKey(() => CategoryEntity)
  @Column({ type: DataType.UUID })
  categoryId: string;

  @BelongsTo(() => PostEntity, 'postId')
  post: PostEntity;

  @BelongsTo(() => UserEntities, 'userId')
  user: UserEntities;

  @BelongsTo(() => CategoryEntity, 'categoryId')
  category: CategoryEntity;
}
