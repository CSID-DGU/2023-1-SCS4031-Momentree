import { GET } from 'apis/api';

export const getHashtagPost = async (tagName: string) => {
  const { data } = await GET(`/search?hashtagName=${tagName}`);
  return data;
};
