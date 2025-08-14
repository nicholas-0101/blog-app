import * as React from 'react';

export interface IAuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout ({children}: IAuthLayoutProps) {
  return (
    <section>{children}</section>
  );
}
