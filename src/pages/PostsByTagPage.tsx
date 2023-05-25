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
