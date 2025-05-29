import React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'lg' | 'icon';
  children: React.ReactNode;
  className?: string;
}

const ButtonBase = styled.button<{ 
  $variant: string; 
  $size: string;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 300ms;
  position: relative;
  overflow: hidden;
  
  /* Size variants */
  ${props => props.$size === 'default' && `
    font-size: 0.875rem;
    height: 2.5rem;
    padding: 0 1rem;
  `}
  
  ${props => props.$size === 'lg' && `
    font-size: 1rem;
    height: 2.75rem;
    padding: 0 1.5rem;
  `}
  
  ${props => props.$size === 'icon' && `
    font-size: 0.875rem;
    height: 2.5rem;
    width: 2.5rem;
    padding: 0;
  `}
  
  /* Variant styles */
  ${props => props.$variant === 'default' && `
    background-color: #111827;
    color: white;
    border: none;
    
    &:hover {
      background-color: #1f2937;
    }
  `}
  
  ${props => props.$variant === 'outline' && `
    background-color: transparent;
    color: #4b5563;
    border: 1px solid #d1d5db;
    
    &:hover {
      background-color: #f9fafb;
      color: #111827;
    }
  `}
  
  ${props => props.$variant === 'ghost' && `
    background-color: transparent;
    color: #4b5563;
    border: none;
    
    &:hover {
      background-color: #f3f4f6;
      color: #111827;
    }
  `}
`;

export function Button({ 
  variant = 'default', 
  size = 'default',
  children,
  className = '',
  ...props 
}: ButtonProps) {
  return (
    <ButtonBase
      $variant={variant}
      $size={size}
      className={className}
      {...props}
    >
      {children}
    </ButtonBase>
  );
} 