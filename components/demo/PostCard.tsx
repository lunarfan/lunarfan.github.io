'use client';

import type { DemoPost, Locale } from './mockData';

type PostCardProps = {
  post: DemoPost;
  locale: Locale;
  onOpen?: () => void;
  onReact?: (reactionId: string) => void;
  interactiveReactions?: boolean;
  openPostLabel: string;
};

export default function PostCard({ post, locale, onOpen, onReact, interactiveReactions, openPostLabel }: PostCardProps) {
  return (
    <article className="post-card">
      <div className="post-card-header">
        <div>
          <p className="post-card-author">{post.author}</p>
          <p className="post-card-time">{post.timeLabel[locale]}</p>
        </div>
      </div>
      <h3>{post.title[locale]}</h3>
      <p className="post-card-body">{post.body[locale]}</p>
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
        {onOpen ? (
          <button type="button" className="ghost-action" onClick={onOpen}>
            {openPostLabel}
          </button>
        ) : null}
      </div>
    </article>
  );
}
