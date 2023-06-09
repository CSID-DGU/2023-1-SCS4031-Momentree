import { PlaceInformation } from './placeInformation';
export interface PostItemProps {
  recordedId: number;
  title: string;
  bookMarkStatus: boolean;
  likeCnt: number;
  bookmarkCnt: number;
  place?: Array<PlaceInformation>;
  vibeTag: Tag[];
  activityTag: Tag[];
}

interface Tag {
  tagName: string;
}
