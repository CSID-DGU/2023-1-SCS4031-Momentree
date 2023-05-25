// signup.ts
import { POST } from 'apis/api';

interface IBody {
  userName: string;
  email: string;
  password: string;
  nickname: string;
}

export const postSignup = async (body: IBody) => {
  const { data } = await POST('/join', body);
  return data;
};
