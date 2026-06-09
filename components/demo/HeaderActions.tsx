'use client';

type HeaderActionsProps = {
  loggedIn: boolean;
  registerLabel: string;
  loginLabel: string;
  onRegister: () => void;
  onLogin: () => void;
};

export default function HeaderActions({ loggedIn, registerLabel, loginLabel, onRegister, onLogin }: HeaderActionsProps) {
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
      <button type="button" className="action-link action-button" onClick={onRegister}>
        {registerLabel}
      </button>
      <button type="button" className="action-link action-button" onClick={onLogin}>
        {loginLabel}
      </button>
    </div>
  );
}
