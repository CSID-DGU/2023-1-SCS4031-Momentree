import { GET } from 'apis/api';

export const getCommunity = async (page: number, size: number, token?: string) => {
  if (token) {
    const { data } = await GET(`/community/login?page=${page}&size=${size}`, token);
    return data;
  } else {
    const { data } = await GET(`/community?page=${page}&size=${size}`);
    return data;
  }
};

export const getRecommendList = async (token?: string) => {
  const { data } = await GET('/community/recommend', token);
  return data;
  //if문 나눠서 요청보내기
};
