import { useMutation } from '@tanstack/react-query';
import { editPostMain } from 'apis/editPost';
import { editPostPlaceContent } from 'apis/editPost';
import { editPostPlaceOrder } from 'apis/editPost';
import { editPostDeletePlace } from 'apis/editPost';
import { editPostAddPlace } from 'apis/editPost';
import { IEditMainPost } from 'types/editPost';
import { IEditPlaceOrder } from 'types/editPost';
import { IEditPlaceContent } from 'types/editPost';
import { IRecordedPlace } from 'types/post';

export const useEditMainMutation = (
  postId: number,
  newMain: IEditMainPost,
  token: string,
  successCallBack: () => void
) => {
  return useMutation(() => editPostMain(postId, newMain, token), {
    onSuccess: successCallBack,
  });
};

export const useEditPlaceContentMutation = (postId: number, newPlaceContent: IEditPlaceContent[], token: string) => {
  return useMutation(() => editPostPlaceContent(postId, newPlaceContent, token));
};

export const useEditPlaceOrderMutation = (postId: number, newOrder: IEditPlaceOrder[], token: string) => {
  return useMutation(() => editPostPlaceOrder(postId, newOrder, token));
};

export const useEditAddPlaceMutation = (
  postId: number,
  newPlace: IRecordedPlace,
  token: string,
  successCallBack: () => void
) => {
  return useMutation(() => editPostAddPlace(postId, newPlace, token), {
    onSuccess: successCallBack,
  });
};

export const useEditDeletePlaceMutation = (postId: number, token: string, successCallBack: () => void) => {
  return useMutation(() => editPostDeletePlace(postId, token), {
    onSuccess: successCallBack,
  });
};
