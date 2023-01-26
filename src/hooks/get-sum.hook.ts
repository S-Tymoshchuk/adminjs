import { ActionRequest, ActionResponse, After, flat } from 'adminjs';
import { UserEntities } from '../users/user-entity';
import { PostEntity } from '../post/post-entity';

export const isGETMethod = ({ method }: ActionRequest): boolean =>
  method.toLowerCase() === 'get';

export const getPosts =
  (): After<ActionResponse> =>
  async (response: ActionResponse, request: ActionRequest): Promise<any> => {
    if (!isGETMethod(request)) {
      return response;
    }

    const user = await UserEntities.findOne({
      where: { id: response.record.params.id },
      include: [
        {
          model: PostEntity,
          as: 'posts',
        },
      ],
    });

    const params = flat.unflatten(response.record.params);

    params.posts = user.posts?.map((post) => ({
      id: post.id,
      title: post.title,
    }));

    response.record.params = flat.flatten(params);
    return response;
  };
