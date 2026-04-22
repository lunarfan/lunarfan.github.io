'use client';

import { useState } from 'react';

export default function HeaderActions() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (loggedIn) {
    return (
      <div className="auth-actions">
        <button
          type="button"
          className="avatar-button"
          aria-label="User avatar"
          title="點擊登出（展示用）"
          onClick={() => setLoggedIn(false)}
        >
          LF
        </button>
      </div>
    );
  }

  return (
    <div className="auth-actions">
      <a href="#" className="action-link">
        註冊
      </a>
      <button type="button" className="action-link action-button" onClick={() => setLoggedIn(true)}>
        登入
      </button>
    </div>
  );
}
