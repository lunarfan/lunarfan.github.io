'use client';

import type { Ref } from 'react';

type HeaderActionsProps = {
  loggedIn: boolean;
  registerLabel: string;
  loginLabel: string;
  registerRef?: Ref<HTMLButtonElement>;
  loginRef?: Ref<HTMLButtonElement>;
  onRegister: () => void;
  onLogin: () => void;
};

export default function HeaderActions({ loggedIn, registerLabel, loginLabel, registerRef, loginRef, onRegister, onLogin }: HeaderActionsProps) {
  if (loggedIn) {
    return (
      <div className="auth-actions">
        <button type="button" className="avatar-button" aria-label="User avatar">
          LF
        </button>
      </div>
    );
  }

  return (
    <div className="auth-actions">
      <button ref={registerRef} type="button" className="action-link action-button" onClick={onRegister}>
        {registerLabel}
      </button>
      <button ref={loginRef} type="button" className="action-link action-button" onClick={onLogin}>
        {loginLabel}
      </button>
    </div>
  );
}
