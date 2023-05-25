/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logoIcon from '../../assets/logo.png';
import RegisterButton from './RegisterButton';
import { useSignupMtutation } from 'hooks/queries/useSignup';

const Register = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [registerInput, setRegisterInput] = useState({
    userName: '',
    email: '',
    password: '',
    nickname: '',
  });
  const handleRegister = useSignupMtutation(registerInput);

  useEffect(() => {
    const { userName, email, password, nickname } = registerInput;
    if (userName !== '' && email !== '' && password !== '' && nickname !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [registerInput]);

  return (
    <RegisterLayout>
      <LogoRow>
        <LogoImage src={logoIcon} alt="Logo" />
      </LogoRow>
      <RegisterForm>
        <Input
          type="text"
          name="username"
          placeholder="아이디를 입력해주세요"
          value={registerInput.userName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setRegisterInput((prev) => {
              return {
                ...prev,
                userName: event.target.value,
              };
            })
          }
        />
        <Input
          type="text"
          name="email"
          placeholder="이메일을 입력해주세요"
          value={registerInput.email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setRegisterInput((prev) => {
              return {
                ...prev,
                email: event.target.value,
              };
            })
          }
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={registerInput.password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setRegisterInput((prev) => {
              return {
                ...prev,
                password: event.target.value,
              };
            })
          }
        />
        <Input
          type="text"
          name="nickname"
          placeholder="닉네임을 입력해주세요"
          value={registerInput.nickname}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setRegisterInput((prev) => {
              return {
                ...prev,
                nickname: event.target.value,
              };
            })
          }
        />
      </RegisterForm>
      <RegisterButton label="회원가입" isActive={isActive} handleClickSave={() => handleRegister.mutate()} />
      <LoginLink>
        계정이 있으신가요? <StyledLink to="/login">로그인하기</StyledLink>
      </LoginLink>
    </RegisterLayout>
  );
};

const RegisterLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem; /* 위쪽 여백 조정 */
`;

const LogoRow = styled.div`
  margin-bottom: 5rem;
`;

const LogoImage = styled.img`
  width: 20rem;
`;

const RegisterForm = styled.form`
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 3rem;
  margin-bottom: 2rem;
  padding: 1.5rem 1rem;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  &:focus {
    border-color: ${({ theme }) => theme.colors.mainDark};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

const LoginLink = styled.div`
  margin-top: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray400};
  font: ${({ theme }) => theme.fonts.caption2};
`;

const StyledLink = styled(Link)`
  && {
    color: ${({ theme }) => theme.colors.gray500};
    font: ${({ theme }) => theme.fonts.caption1};
    text-decoration: none;
  }
`;

export default Register;
