import { isGETMethod } from './get-sum.hook';
import { ActionRequest, ActionResponse, After, flat } from 'adminjs';

export const getSumForOrder = (): After<ActionResponse> => {
  return async (
    response: ActionResponse,
    request: ActionRequest,
  ): Promise<ActionResponse> => {
    if (!isGETMethod(request)) {
      return response;
    }

    if (response.records) {
      await Promise.all(
        response.records.map(async (record) => {
          const params = flat.unflatten(record.params);

          record.params = flat.flatten(params);
        }),
      );
    } else {
      const params = flat.unflatten(response.record.params);

      response.record.params = flat.flatten(params);
    }

    return response;
  };
};
