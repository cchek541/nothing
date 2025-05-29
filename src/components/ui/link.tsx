import React from 'react';
import styled from 'styled-components';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const StyledLink = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

export function Link({ href, children, className = '', onClick }: LinkProps) {
  return (
    <StyledLink 
      href={href} 
      className={className}
      onClick={onClick}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </StyledLink>
  );
} 