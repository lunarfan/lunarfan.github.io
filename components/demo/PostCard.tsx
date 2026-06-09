'use client';

import type { Ref } from 'react';
import type { DemoPost, Locale } from './mockData';

type PostCardProps = {
  post: DemoPost;
  locale: Locale;
  openSurfaceRef?: Ref<HTMLButtonElement>;
  onOpen?: () => void;
  onReact?: (reactionId: string) => void;
  interactiveReactions?: boolean;
  openPostLabel: string;
};

export default function PostCard({ post, locale, openSurfaceRef, onOpen, onReact, interactiveReactions, openPostLabel }: PostCardProps) {
  return (
    <article className="post-card">
      <div className="post-card-header">
        <div>
          <p className="post-card-author">{post.author}</p>
          <p className="post-card-time">{post.timeLabel[locale]}</p>
        </div>
      </div>
      <button ref={openSurfaceRef} type="button" className="post-card-open-surface" onClick={onOpen}>
        <h3>{post.title[locale]}</h3>
        <p className="post-card-body">{post.body[locale]}</p>
        <span className="ghost-action post-card-open-hint">{openPostLabel}</span>
      </button>
      <div className="post-card-footer">
        <div className="post-reactions">
          {post.reactions.map((reaction) => (
            <button
              key={reaction.id}
              type="button"
              className="reaction-chip"
              onClick={() => onReact?.(reaction.id)}
              disabled={!interactiveReactions}
            >
              <span>{reaction.emoji}</span>
              <span>{reaction.count}</span>
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}
