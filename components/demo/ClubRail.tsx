'use client';

type ClubRailProps = {
  title: string;
  clubs: string[];
};

export default function ClubRail({ title, clubs }: ClubRailProps) {
  return (
    <section className="mock-club-rail">
      <div className="section-heading-row">
        <div>
          <p className="section-kicker">Community</p>
          <h2>{title}</h2>
        </div>
        <button type="button" className="rail-plus-button" aria-label="Create fan club">
          +
        </button>
      </div>
      <div className="club-pill-list">
        {clubs.map((club) => (
          <div key={club} className="club-pill">
            {club}
          </div>
        ))}
      </div>
    </section>
  );
}
