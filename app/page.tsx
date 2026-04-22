import Image from 'next/image';
import HeaderActions from '../components/HeaderActions';

export default function HomePage() {
  return (
    <main className="page-root">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="LunarFan home">
          <Image src="/logo.png" alt="LunarFan logo" width={132} height={40} priority />
        </a>
        <HeaderActions />
      </header>

      <section id="top" className="panel hero-panel" aria-label="Hero section">
        <div className="hero-inner">
          <Image className="hero-logo" src="/logo.png" alt="LunarFan logo mark" width={360} height={108} priority />
          <h1>LunarFan</h1>
          <p>遇見你最想追隨的創作者。</p>
        </div>
      </section>

      <section className="panel reasons-panel" aria-label="Why LunarFan section">
        <div className="reasons-layout">
          <div className="reasons-copy">
            <h2>為什麼選擇 LunarFan?</h2>
            <ul>
              <li>
                <strong>對創作者：</strong>
                用最低的門檻建立後援會，操作起來就像一般社群媒體一樣順暢。
              </li>
              <li>
                <strong>對資深粉絲：</strong>
                可以建立私人後援會，與志同道合的夥伴盡情討論分享。
              </li>
              <li>
                <strong>對一般粉絲：</strong>
                即時掌握創作者的第一手消息，還有不定時的直播與專屬聊天室。
              </li>
            </ul>
            <a className="cta-link" href="#">
              現在就加入 Go!
            </a>
          </div>
          <div className="illustration-wrap">
            <Image
              src="/home_page_illustration.png"
              alt="LunarFan community illustration"
              width={620}
              height={620}
              priority
            />
          </div>
        </div>

        <footer className="site-footer">
          <span>contact.us@lunar.fan</span>
        </footer>
      </section>
    </main>
  );
}
