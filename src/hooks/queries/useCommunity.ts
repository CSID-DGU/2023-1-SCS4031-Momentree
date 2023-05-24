import { useQuery } from '@tanstack/react-query';
import { getCommunity } from 'apis/main';
import { getHashtagPost } from 'apis/hashtagPost';

export const useCommunityQuery = (page: number, size: number, token?: string) => {
  const data = useQuery(['getCommunity', page], () => getCommunity(page, size, token));
  return data;
};

export const useHashtagPostQuery = (tagName: string) => {
  const data = useQuery(['getHashtagPost', tagName], () => getHashtagPost(tagName), { enabled: !!tagName });
  return data;
};
