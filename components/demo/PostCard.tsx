'use client';

import Image from 'next/image';
import type { Ref } from 'react';
import DemoIcon from './DemoIcon';
import type { DemoPost, Locale } from './mockData';

type PostCardProps = {
  post: DemoPost;
  locale: Locale;
  openSurfaceRef?: Ref<HTMLButtonElement>;
  reactionAreaRef?: Ref<HTMLDivElement>;
  onOpen?: () => void;
  onOpenClub?: () => void;
  onReact?: (reactionId: string) => void;
  interactiveReactions?: boolean;
};

export default function PostCard({ post, locale, openSurfaceRef, reactionAreaRef, onOpen, onOpenClub, onReact, interactiveReactions }: PostCardProps) {
  return (
    <article className="fan-club-post-card">
      <header className="fan-club-post-card-head">
        <button type="button" className="demo-post-author-link" onClick={onOpenClub} aria-label={`Open ${post.clubName}`}>
          <Image src="/Luna-Avatar.png" alt="Luna avatar" width={40} height={40} className="demo-post-avatar" />
        </button>
        <button type="button" className="fan-club-post-card-head-copy demo-post-author-copy" onClick={onOpenClub}>
          <strong>{post.author}</strong>
          <span>{post.timeLabel[locale]}</span>
        </button>
      </header>

      <button ref={openSurfaceRef} type="button" className="fan-club-post-card-content-trigger" onClick={onOpen}>
        <h2>{post.title[locale]}</h2>
        <div className="fan-club-post-card-preview">
          <p>{post.body[locale]}</p>
        </div>
      </button>

      <footer ref={reactionAreaRef} className="fan-club-post-reactions">
        {post.reactions.map((reaction) => (
          <span key={reaction.id} className="fan-club-post-reaction-item">
            <button type="button" className="ui-icon-button ui-icon-button-sm" onClick={() => onReact?.(reaction.id)} disabled={!interactiveReactions} aria-label={reaction.label[locale]}>
              <DemoIcon name={reaction.icon} size={16} />
            </button>
            <span className="fan-club-post-reaction-count">{reaction.count}</span>
          </span>
        ))}
      </footer>
    </article>
  );
}
