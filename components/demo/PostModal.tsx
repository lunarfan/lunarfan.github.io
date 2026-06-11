'use client';

import Image from 'next/image';
import type { Ref } from 'react';
import DemoIcon from './DemoIcon';
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
}: PostModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="ui-modal-backdrop" role="presentation">
      <button type="button" className="ui-modal-backdrop-close" aria-label="Close modal" onClick={onClose} />
      <section ref={modalRef} className="ui-modal fan-club-post-dialog theme-night-mode" role="dialog" aria-modal="true" aria-labelledby="demo-post-modal-title">
        <header className="ui-modal-header">
          <h3 id="demo-post-modal-title">{post.title[locale]}</h3>
          <button type="button" className="ui-modal-close" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </header>
        <div className="ui-modal-content">
          <button ref={clubButtonRef} type="button" className="post-modal-club-button" onClick={onOpenClub}>
            <Image src="/Luna-Avatar.png" alt="Luna avatar" width={56} height={56} className="post-modal-avatar" />
            <div className="fan-club-post-card-head-copy">
              <strong>{post.author}</strong>
              <span>{post.timeLabel[locale]}</span>
            </div>
          </button>
          <div className="fan-club-post-detail-modal">
            <div className="fan-club-post-detail-scroll">
              <p>{post.body[locale]}</p>
            </div>
            <div className="fan-club-post-detail-reactions">
              <footer ref={reactionsRef} className="fan-club-post-reactions">
                {post.reactions.map((reaction) => (
                  <span key={reaction.id} className="fan-club-post-reaction-item">
                    <button type="button" className="ui-icon-button ui-icon-button-sm" onClick={() => onReact(reaction.id)} aria-label={reaction.label[locale]}>
                      <DemoIcon name={reaction.icon} size={16} />
                    </button>
                    <span className="fan-club-post-reaction-count">{reaction.count}</span>
                  </span>
                ))}
              </footer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
