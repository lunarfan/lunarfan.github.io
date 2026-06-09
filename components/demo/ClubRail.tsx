'use client';

type ClubRailProps = {
  title: string;
  clubs: string[];
};

export default function ClubRail({ title, clubs }: ClubRailProps) {
  return (
    <>
      <div className="my-fan-clubs-header">
        <h2>{title}</h2>
        <div className="my-fan-clubs-create">
          <button type="button" className="rail-plus-button" aria-label="Create fan club">
            +
          </button>
        </div>
      </div>
      <div className="my-fan-clubs-list">
        {clubs.map((club, index) => (
          <div key={club} className="my-fan-clubs-item" title={club}>
            <div className="my-fan-clubs-avatar demo-avatar-frame">{index === 0 ? 'L' : club.slice(0, 1)}</div>
            <span className="my-fan-clubs-meta">
              <span className="my-fan-clubs-name" title={club}>{club}</span>
              <span className="my-fan-clubs-status">{index === 0 ? 'Owner' : 'Member'}</span>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
