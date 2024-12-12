import { FIND_MANY_OBJECT_METADATA_ITEMS } from '@/object-metadata/graphql/queries';
import { useApolloMetadataClient } from '@/object-metadata/hooks/useApolloMetadataClient';
import { objectMetadataItemsState } from '@/object-metadata/states/objectMetadataItemsState';
import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { mapPaginatedObjectMetadataItemsToObjectMetadataItems } from '@/object-metadata/utils/mapPaginatedObjectMetadataItemsToObjectMetadataItems';
import { useRecoilCallback } from 'recoil';
import { ObjectMetadataItemsQuery } from '~/generated-metadata/graphql';
import { isDeeplyEqual } from '~/utils/isDeeplyEqual';

export const useRefreshObjectMetadataItems = () => {
  const client = useApolloMetadataClient();

  const refreshObjectMetadataItems = async () => {
    const result = await client.query<ObjectMetadataItemsQuery>({
      query: FIND_MANY_OBJECT_METADATA_ITEMS,
      variables: {},
    });

    const objectMetadataItems =
      mapPaginatedObjectMetadataItemsToObjectMetadataItems({
        pagedObjectMetadataItems: result.data,
      });

    replaceObjectMetadataItemIfDifferent(objectMetadataItems);
  };

  const replaceObjectMetadataItemIfDifferent = useRecoilCallback(
    ({ set, snapshot }) =>
      (toSetObjectMetadataItems: ObjectMetadataItem[]) => {
        if (
          !isDeeplyEqual(
            snapshot.getLoadable(objectMetadataItemsState).getValue(),
            toSetObjectMetadataItems,
          )
        ) {
          set(objectMetadataItemsState, toSetObjectMetadataItems);
        }
      },
    [],
  );
  return {
    refreshObjectMetadataItems,
  };
};