import React from 'react';
import styled from 'styled-components';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const CardBase = styled.div`
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid #e5e7eb;
  backdrop-filter: blur(8px);
  overflow: hidden;
  transition: all 300ms;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

export function Card({
  children,
  className = '',
  ...props
}: CardProps) {
  return (
    <CardBase className={className} {...props}>
      {children}
    </CardBase>
  );
} 