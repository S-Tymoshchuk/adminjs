import { Module } from '@nestjs/common';
import * as AdminJSSequelize from '@adminjs/sequelize';
import AdminJS, { ComponentLoader } from 'adminjs';
import { AdminModule } from '@adminjs/nestjs';
import { UserEntities } from '../users/user-entity';
import { PostEntity } from '../post/post-entity';
import { CommentEntity } from '../post/comment-entity';
import { CategoryEntity } from '../post/category-entity';
import { getPosts } from '../hooks/get-sum.hook';

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const usersNavigation = {
  name: 'Users',
  icon: 'User',
};

const postsNavigation = {
  name: 'Posts',
  icon: 'Post',
};
const commentsNavigation = {
  name: 'Comments',
  icon: 'Comment',
};

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const componentLoader = new ComponentLoader();

const Components = {
  MyPosts: componentLoader.add('PostsList', './components/product-list'),
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};
@Module({
  imports: [
    AdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [
            {
              resource: UserEntities,
              options: {
                actions: {
                  show: {
                    after: [getPosts()],
                  },
                },
                properties: {
                  postList: {
                    type: 'string',
                    components: {
                      show: Components.MyPosts,
                    },
                    position: 99999,
                  },
                },
              },
            },
            {
              resource: PostEntity,
            },
            {
              resource: CommentEntity,
              options: {
                navigation: commentsNavigation,
              },
            },
            {
              resource: CategoryEntity,
            },
          ],
          componentLoader,
          locale: {
            language: 'en',
            translations: {
              resources: {
                Users: {
                  messages: {
                    noRecordsInResource: 'There are no users to display',
                  },
                },
                Post: {
                  properties: {
                    userId: 'UserEntities',
                  },
                },
              },
            },
          },
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret',
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret',
        },
      }),
    }),
  ],
})
export class AdminJsImportsModule {}
