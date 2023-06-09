import React from 'react';
import styled from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: LayoutProps) {
  return <Root>{children}</Root>;
}

const Root = styled.section`
  width: 43rem;
  min-height: 100vh;
  min-height: calc(var(--vh) * 100);
  margin: 0 auto;
  padding: 1rem 1.6rem 3.2rem;

  @media (max-width: 430px) {
    width: 100%;
  }
`;
