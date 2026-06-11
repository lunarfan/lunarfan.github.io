'use client';

import type { Ref } from 'react';

type HeaderActionsProps = {
  loginLabel: string;
  loginRef?: Ref<HTMLButtonElement>;
  onLogin: () => void;
};

export default function HeaderActions({ loginLabel, loginRef, onLogin }: HeaderActionsProps) {
  return (
    <div className="auth-actions">
      <button ref={loginRef} type="button" className="action-link action-button" onClick={onLogin}>
        {loginLabel}
      </button>
    </div>
  );
}
