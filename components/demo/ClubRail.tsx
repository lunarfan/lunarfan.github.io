'use client';

import Image from 'next/image';
import DemoIcon from './DemoIcon';

type ClubRailProps = {
  title: string;
  clubs: string[];
  onOpenClub?: () => void;
};

export default function ClubRail({ title, clubs, onOpenClub }: ClubRailProps) {
  return (
    <>
      <div className="my-fan-clubs-header">
        <h2>{title}</h2>
        <div className="my-fan-clubs-create">
          <button type="button" className="ui-icon-button ui-icon-button-sm" aria-label="Create fan club">
            <DemoIcon name="plus" size={16} />
          </button>
        </div>
      </div>
      <div className="my-fan-clubs-list">
        {clubs.map((club, index) => (
          <button key={club} type="button" className="my-fan-clubs-item" title={club}>
            <span className="ui-avatar ui-avatar-sm my-fan-clubs-avatar" aria-label={club} role="img">
              {index === 0 ? (
                <Image src="/Luna-Avatar.png" alt={club} width={64} height={64} className="ui-avatar-media" />
              ) : (
                <span className="ui-avatar-fallback ui-avatar-media">
                  <DemoIcon name="accountGroup" size={32} className="ui-avatar-icon" />
                </span>
              )}
            </span>
            <span className="my-fan-clubs-meta">
              <span className="my-fan-clubs-name" title={club}>{club}</span>
              <span className="my-fan-clubs-status">Member</span>
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
