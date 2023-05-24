// import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import leftIcon from '../assets/icons/left.svg';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CommunityData } from '../types/communityData';
import PostItem from 'components/common/PostMainItem';
import styled from 'styled-components';
import { useHashtagPostQuery } from 'hooks/queries/useCommunity';

const PostsByTagPage = () => {
  const navigate = useNavigate();
  const { tag = '' } = useParams(); // tag가 undefined일 때 빈 문자열을 기본값으로 할당
  const { data } = useHashtagPostQuery(tag);

  // const [posts, setPosts] = useState<CommunityData[]>([]);
  // if (!tag) {
  //   return <div></div>;
  // }
  // const { data } = useHashtagPostQuery(tag?.toString());

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     if (!tag) {
  //       return; // tag이 undefined일 경우 요청을 보내지 않음
  //     }
  //     try {
  //       const response = await axios.get(`http://3.39.153.141/search?hashtagName=${tag}`);
  //       setPosts(response?.data?.result?.content);
  //       console.log('Posts: ', response.data); // posts 확인
  //     } catch (error) {
  //       console.error('Failed to fetch posts:', error);
  //     }
  //   };
  //   fetchPosts();
  // }, [tag]);

  return (
    <div>
      <PostByPageContainer>
        <PostByPageHeader>
          <Icon
            src={leftIcon}
            alt="뒤로가기 아이콘"
            onClick={() => {
              navigate('/');
              window.location.reload();
            }}
          />
          <h1>{tag} 해시태그가 포함된 게시물</h1>
        </PostByPageHeader>
        {data?.result?.content.map((data: CommunityData) => (
          <PostItem
            recordedId={data?.recordedId}
            title={data?.title}
            bookMarkStatus={data?.bookMarkStatus}
            likeCnt={data?.likeCnt}
            bookmarkCnt={data?.bookMarkCnt}
            vibeTag={data?.vibeTags}
            activityTag={data?.activityTags}
            place={data?.recordedPlaces}
            key={data?.recordedId}></PostItem>
        ))}
      </PostByPageContainer>
    </div>
  );
};

const PostByPageContainer = styled.section`
  h1 {
    color: ${({ theme }) => theme.colors.gray900};
    ${({ theme }) => theme.fonts.heading2};
  }
`;

const PostByPageHeader = styled.article`
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

export default PostsByTagPage;
