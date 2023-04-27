import styled from 'styled-components';
import { useLayoutEffect, useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import closeButton from '../assets/icons/close.svg';
import SaveButton from 'components/post/SaveButton';
import { useNavigate } from 'react-router-dom';

const moodTagsState = atom<string[]>({
  key: 'moodTagsState',
  default: [],
});
const activityTagsState = atom<string[]>({
  key: 'activityTagsState',
  default: [],
});
const customTagsState = atom<string[]>({
  key: 'customTagsState',
  default: [],
});
const SelectTags = () => {
  const navigate = useNavigate();
  const moodTagsData = ['편안한', '따뜻한', '로맨틱한', '맛있는', '신나는', '힐링', '조용한', '힙한'];
  const activityTagsData = ['영화', '맛집투어', '레저', '휴식', '산책', '운동', '게임', '체험'];

  const [moodTags, setMoodTags] = useRecoilState(moodTagsState);
  const [activityTags, setActivityTags] = useRecoilState(activityTagsState);
  const [customTags, setCustomTags] = useRecoilState(customTagsState);

  const [inputTag, setInputTag] = useState('');

  const [isSaveActive, setIsSaveActive] = useState(false);

  // recoil atom에 선택한 태그들을 저장해줍니다.
  const handleSelectTagMood = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedTagName = event.currentTarget.innerHTML;
    if (moodTags.includes(selectedTagName)) {
      setMoodTags(moodTags.filter((tag) => tag != selectedTagName));
    } else {
      setMoodTags([...moodTags, selectedTagName]);
    }
  };
  const handleSelectTagActivity = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedTagName = event.currentTarget.innerHTML;
    if (activityTags.includes(selectedTagName)) {
      setActivityTags(activityTags.filter((tag) => tag != selectedTagName));
    } else {
      setActivityTags([...activityTags, selectedTagName]);
    }
  };

  // 분위기태그, 활동태그 각각 한 개 이상을 선택해야 저장 버튼 활성화
  useLayoutEffect(() => {
    if (moodTags.length !== 0 && activityTags.length !== 0) {
      setIsSaveActive(true);
    } else {
      setIsSaveActive(false);
    }
  }, [moodTags, activityTags]);

  // input 입력 시 스페이스바를 누르면 태그 저장
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ' && inputTag !== '') {
      setCustomTags([...customTags, inputTag]);

      // 다음 태그 입력을 위해 input을 초기화해줍니다.
      setInputTag('');
    }
  };
  const handleInputTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // 스페이스 키를 입력하지 않는 동안만 state를 업데이트 해줍니다.
    if (value.substring(value.length - 1) !== ' ') {
      setInputTag(value);
    }
  };

  // 삭제 대상인 태그의 인덱스를 통해 삭제를 해줍니다.
  const handleDelete = (targetIndex: number) => {
    // const target = event.target as HTMLInputElement;
    const newMoodArray = [...customTags.slice(0, targetIndex), ...customTags.slice(targetIndex + 1)];
    setCustomTags(newMoodArray);
  };
  return (
    <>
      <SelectTagsLayout>
        <TitleBox>
          데이트의 <strong>분위기</strong>를<br />
          모두 선택해주세요!
        </TitleBox>
        <TagsRow>
          {moodTagsData.map((tag: string, index: number) => {
            return (
              <TagButton key={index} onClick={handleSelectTagMood} className={moodTags.includes(tag) ? 'selected' : ''}>
                {tag}
              </TagButton>
            );
          })}
        </TagsRow>
        <TitleBox>
          데이트가 <strong>어떤 활동</strong>으로 이루어져 있는지
          <br />
          모두 선택해주세요!
        </TitleBox>
        <TagsRow>
          {activityTagsData.map((tag: string, index: number) => {
            return (
              <TagButton
                key={index}
                onClick={handleSelectTagActivity}
                className={activityTags.includes(tag) ? 'selected' : ''}>
                {tag}
              </TagButton>
            );
          })}
        </TagsRow>
        <UserTagsRow>
          <CreateTagsRow>
            {customTags.map((tag: string, index: number) => {
              return (
                <CreatedTagBox key={index}>
                  <div>#</div>
                  <div>{tag}</div>
                  <button onClick={() => handleDelete(index)}>
                    <img src={closeButton} />
                  </button>
                </CreatedTagBox>
              );
            })}
            <CreateTagBox>
              <div>#</div>
              <input value={inputTag} placeholder="태그 입력" onChange={handleInputTag} onKeyDown={handleKeyDown} />
            </CreateTagBox>
          </CreateTagsRow>
        </UserTagsRow>
        <SaveButton label={'다음'} isActive={isSaveActive} handleClickSave={() => navigate(`/post`)} />
      </SelectTagsLayout>
    </>
  );
};

// 해시태그 버튼 선택
const SelectTagsLayout = styled.div`
  padding: 1.5rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const TitleBox = styled.div`
  ${({ theme }) => theme.fonts.suubtitle1};
  strong {
    color: ${({ theme }) => theme.colors.mainDark};
  }
`;
const TagsRow = styled.div`
  margin: 2rem -3px 4rem;
`;
const TagButton = styled.button`
  ${({ theme }) => theme.fonts.suubtitle2};
  border: 1.5px solid;
  border-radius: 99px;
  border-color: ${({ theme }) => theme.colors.gray200};
  background-color: ${({ theme }) => theme.colors.gray200};
  color: ${({ theme }) => theme.colors.gray700};
  display: inline-block;
  margin: 2px 3px;
  padding: 0.5rem 0.8rem;
  &.selected {
    color: ${({ theme }) => theme.colors.main900};
    border-color: ${({ theme }) => theme.colors.main900};
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;

// 해시태그 직접 입력
const UserTagsRow = styled.div`
  h1 {
    ${({ theme }) => theme.fonts.suubtitle1};
  }
`;
const CreateTagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const CreateTagBox = styled.div`
  display: flex;
  ${({ theme }) => theme.fonts.body2};
  input {
    ${({ theme }) => theme.fonts.body2};
    border: none;
  }
`;
const CreatedTagBox = styled.div`
  display: flex;
  ${({ theme }) => theme.fonts.body2};
  img {
    width: 1rem;
  }
`;
export default SelectTags;
