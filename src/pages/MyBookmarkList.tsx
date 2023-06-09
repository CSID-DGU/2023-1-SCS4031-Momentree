import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import leftIcon from '../assets/icons/left.svg';
import PostItem from 'components/common/PostMainItem';
import { useMyBookMarkListQuery } from 'hooks/queries/useMyPage';
import Loader from 'components/common/Loader';
import { useCookies } from 'react-cookie';
import { CommunityData } from 'types/communityData';
import Blank from '../components/common/Blank';
import Bar from '../components/common/Bar';

const MyBookmarkList = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['user']);
  const target = useRef<HTMLDivElement>(null);
  const SIZE = 4;
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const { data } = useMyBookMarkListQuery(page, SIZE, cookies.user.userToken);
  const [communityDataList, setCommunityDataLists] = useState<CommunityData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const result = data?.result.content;
    if (result) {
      setCommunityDataLists([...communityDataList, ...result]);
    }
    setIsLoaded(false);
    setIsLoading(false);
  }, [data]);

  const onIntersect = ([entry]: any, observer: { unobserve: (arg0: any) => void; observe: (arg0: any) => void }) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target); // 관찰요소 리셋
      if (page < data?.result.totalPages - 1) {
        setIsLoaded(true);
        setPage((page) => page + 1);
      }
      observer.observe(entry.target); // 다시 관찰요소 지정
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target.current) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.2,
      });
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [onIntersect]);

  return (
    <MyBookmarkListContainer>
      <MyBookmarkListHeader>
        <Icon
          src={leftIcon}
          alt="뒤로가기 아이콘"
          onClick={() => {
            navigate(-1);
          }}
        />
        <h1>나의 북마크</h1>
      </MyBookmarkListHeader>
      <Bar />
      <section ref={target} className="Target-Element">
        {!isLoading && communityDataList.length === 0 ? (
          <Blank message1="북마크한 게시글이 없어요." message2="관심있는 게시글에 북마크를 눌러보세요!" />
        ) : (
          <>
            {communityDataList.map((data: CommunityData, index: number) => (
              <div
                key={index}
                onClick={() => {
                  navigate(`/post/${data.recordedId}`);
                  window.location.reload();
                }}>
                <PostItem
                  title={data.title}
                  bookMarkStatus={data.bookMarkStatus}
                  likeCnt={data.likeCnt}
                  bookmarkCnt={data.bookMarkCnt}
                  vibeTag={data.vibeTags}
                  activityTag={data.activityTags}
                  place={data.recordedPlaces}
                  recordedId={data.recordedId}
                />
              </div>
            ))}
            {isLoaded && <Loader />}
          </>
        )}
      </section>
    </MyBookmarkListContainer>
  );
};

export default MyBookmarkList;

const MyBookmarkListContainer = styled.section`
  h1 {
    color: ${({ theme }) => theme.colors.gray900};
    ${({ theme }) => theme.fonts.heading2};
  }
`;

const MyBookmarkListHeader = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2.2rem;
`;

const Icon = styled.img`
  width: 19.67px;
  height: 16.67px;
  cursor: pointer;
`;
