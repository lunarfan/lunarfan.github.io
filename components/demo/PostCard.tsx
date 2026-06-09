'use client';

import Image from 'next/image';
import type { Ref } from 'react';
import type { DemoPost, Locale } from './mockData';

type PostCardProps = {
  post: DemoPost;
  locale: Locale;
  openSurfaceRef?: Ref<HTMLButtonElement>;
  reactionAreaRef?: Ref<HTMLDivElement>;
  onOpen?: () => void;
  onReact?: (reactionId: string) => void;
  interactiveReactions?: boolean;
  openPostLabel: string;
};

export default function PostCard({ post, locale, openSurfaceRef, reactionAreaRef, onOpen, onReact, interactiveReactions, openPostLabel }: PostCardProps) {
  return (
    <article className="fan-club-post-card">
      <header className="fan-club-post-card-head">
        <Image src="/Luna-Avatar.png" alt="Luna avatar" width={40} height={40} className="demo-post-avatar" />
        <div className="fan-club-post-card-head-copy">
          <strong>{post.author}</strong>
          <span>{post.timeLabel[locale]}</span>
        </div>
      </header>

      <button ref={openSurfaceRef} type="button" className="fan-club-post-card-content-trigger" onClick={onOpen}>
        <h2>{post.title[locale]}</h2>
        <div className="fan-club-post-card-preview">
          <p>{post.body[locale]}</p>
        </div>
        <span className="fan-club-post-card-more">{openPostLabel}</span>
      </button>

      <footer ref={reactionAreaRef} className="fan-club-post-reactions">
        {post.reactions.map((reaction) => (
          <span key={reaction.id} className="fan-club-post-reaction-item">
            <button type="button" className="reaction-chip" onClick={() => onReact?.(reaction.id)} disabled={!interactiveReactions}>
              <span>{reaction.emoji}</span>
            </button>
            <span className="fan-club-post-reaction-count">{reaction.count}</span>
          </span>
        ))}
      </footer>
    </article>
  );
}
