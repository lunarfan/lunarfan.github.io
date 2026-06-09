'use client';

import Image from 'next/image';
import type { Ref } from 'react';
import type { DemoPost, Locale } from './mockData';

type PostModalProps = {
  open: boolean;
  post: DemoPost;
  locale: Locale;
  modalRef?: Ref<HTMLDivElement>;
  clubButtonRef?: Ref<HTMLButtonElement>;
  reactionsRef?: Ref<HTMLDivElement>;
  onClose: () => void;
  onReact: (reactionId: string) => void;
  onOpenClub: () => void;
  reactionTitle: string;
};

export default function PostModal({
  open,
  post,
  locale,
  modalRef,
  clubButtonRef,
  reactionsRef,
  onClose,
  onReact,
  onOpenClub,
  reactionTitle
}: PostModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="modal-layer" role="dialog" aria-modal="true">
      <div ref={modalRef} className="modal-card post-modal-card">
        <button type="button" className="modal-close-button" onClick={onClose} aria-label="Close modal">
          ×
        </button>
        <button ref={clubButtonRef} type="button" className="post-modal-club-button" onClick={onOpenClub}>
          <Image src="/Luna-Avatar.png" alt="Luna avatar" width={56} height={56} className="post-modal-avatar" />
          <div>
            <div className="post-card-author">{post.author}</div>
            <div className="post-card-time">{post.clubName}</div>
          </div>
        </button>
        <h3>{post.title[locale]}</h3>
        <p className="post-card-body">{post.body[locale]}</p>
        <div className="post-modal-reaction-title">{reactionTitle}</div>
        <div ref={reactionsRef} className="post-reactions post-reactions-large">
          {post.reactions.map((reaction) => (
            <button key={reaction.id} type="button" className="reaction-chip reaction-chip-large" onClick={() => onReact(reaction.id)}>
              <span>{reaction.emoji}</span>
              <span>{reaction.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
