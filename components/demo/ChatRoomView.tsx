'use client';

import type { RefObject } from 'react';
import type { ChatMessage, Locale } from './mockData';

type ChatRoomViewProps = {
  locale: Locale;
  rooms: string[];
  messages: ChatMessage[];
  autoTranslate: boolean;
  autoTranslateLabel: string;
  selectedRoomName: string;
  inputValue: string;
  inputPlaceholder: string;
  sendLabel: string;
  translateToggleRef?: RefObject<HTMLButtonElement>;
  composerRef?: RefObject<HTMLDivElement>;
  onToggleAutoTranslate: () => void;
  onInputChange: (value: string) => void;
  onSend: () => void;
};

export default function ChatRoomView({
  locale,
  rooms,
  messages,
  autoTranslate,
  autoTranslateLabel,
  selectedRoomName,
  inputValue,
  inputPlaceholder,
  sendLabel,
  translateToggleRef,
  composerRef,
  onToggleAutoTranslate,
  onInputChange,
  onSend
}: ChatRoomViewProps) {
  return (
    <section className="chat-demo-shell">
      <aside className="chat-room-sidebar">
        {rooms.map((room, index) => (
          <div key={room} className={`chat-room-list-item${index === 0 ? ' active' : ''}`}>
            <div className="chat-room-dot" />
            <div>
              <div className="chat-room-list-name">{room}</div>
              <div className="chat-room-list-subtitle">{index === 0 ? 'Luna fan chat' : 'Mock room'}</div>
            </div>
          </div>
        ))}
      </aside>
      <div className="chat-room-main">
        <div className="chat-room-header">
          <div>
            <p className="section-kicker">Live chat</p>
            <h2>{selectedRoomName}</h2>
          </div>
          <button ref={translateToggleRef} type="button" className={`translate-toggle${autoTranslate ? ' active' : ''}`} onClick={onToggleAutoTranslate}>
            <span>{autoTranslateLabel}</span>
            <span className="translate-toggle-knob" />
          </button>
        </div>
        <div className="chat-message-list">
          {messages.map((message) => (
            <div key={message.id} className={`chat-message${message.senderId === 'current-user' ? ' mine' : ''}`}>
              <div className="chat-message-meta">
                <span>{message.senderName}</span>
                <span>{message.language}</span>
              </div>
              <div className="chat-message-bubble">
                {autoTranslate ? message.translatedTextByLocale[locale] : message.originalText}
              </div>
            </div>
          ))}
        </div>
        <div ref={composerRef} className="chat-composer">
          <input value={inputValue} onChange={(event) => onInputChange(event.target.value)} placeholder={inputPlaceholder} />
          <button type="button" className="primary-button" onClick={onSend}>
            {sendLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
