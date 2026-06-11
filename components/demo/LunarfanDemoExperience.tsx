'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ClubRail from './ClubRail';
import ChatRoomView from './ChatRoomView';
import DemoIcon from './DemoIcon';
import HeaderActions from './HeaderActions';
import {
  buildChatMessages,
  buildPosts,
  clubNames,
  roomName,
  supportedLocales,
  tutorialSteps,
  tutorialText,
  type Locale,
  type ScreenState,
  type TutorialStepId,
  uiText
} from './mockData';
import PostCard from './PostCard';
import PostModal from './PostModal';
import TutorialOverlay from './TutorialOverlay';

type TargetKey =
  | 'header-login'
  | 'my-fan-clubs'
  | 'first-post'
  | 'post-modal-reactions'
  | 'post-modal-club'
  | 'chat-open'
  | 'chat-panel'
  | 'translate-toggle'
  | 'chat-composer';

const FINAL_FORM_URL = 'https://forms.gle/1CuJjpjai38GtfHW6';

const stepPlacement: Partial<Record<TutorialStepId, 'top' | 'right' | 'bottom' | 'left' | 'auto'>> = {
  'click-login': 'bottom',
  'my-fan-clubs': 'right',
  'open-first-post': 'right',
  'react-concert-post': 'top',
  'open-fan-club': 'bottom',
  'open-chat': 'left',
  'chat-overview': 'top',
  'toggle-auto-translate': 'left',
  'chat-translated': 'top',
  'send-message': 'top',
  'final-cta': 'top'
};

export default function LunarfanDemoExperience() {
  const [locale, setLocale] = useState<Locale>('zh-TW');
  const [screen, setScreen] = useState<ScreenState>('landing');
  const [tutorialActive, setTutorialActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [concertPost, setConcertPost] = useState(() => buildPosts().concertPost);
  const [dinnerPost, setDinnerPost] = useState(() => buildPosts().dinnerPost);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [chatMessages, setChatMessages] = useState(() => buildChatMessages().slice(0, 30));
  const [chatQueue] = useState(() => buildChatMessages().slice(30));
  const [chatInput, setChatInput] = useState('');
  const [targetVersion, setTargetVersion] = useState(0);

  const targetsRef = useRef<Partial<Record<TargetKey, HTMLElement | null>>>({});
  const queueTimerRef = useRef<number | null>(null);
  const translateToggleRef = useRef<HTMLButtonElement | null>(null);
  const composerRef = useRef<HTMLDivElement | null>(null);

  const currentStep = tutorialSteps[stepIndex] as TutorialStepId | undefined;
  const t = useCallback((textMap: Record<Locale, string>) => textMap[locale], [locale]);
  const setTargetRef = useCallback(
    (key: TargetKey) => (element: HTMLElement | null) => {
      targetsRef.current[key] = element;
    },
    []
  );

  const targetElement = useMemo(() => {
    switch (currentStep) {
      case 'click-login':
        return targetsRef.current['header-login'];
      case 'my-fan-clubs':
        return targetsRef.current['my-fan-clubs'];
      case 'open-first-post':
        return targetsRef.current['first-post'];
      case 'react-concert-post':
        return targetsRef.current['post-modal-reactions'];
      case 'open-fan-club':
        return targetsRef.current['post-modal-club'];
      case 'open-chat':
        return targetsRef.current['chat-open'];
      case 'chat-overview':
      case 'chat-translated':
      case 'final-cta':
        return targetsRef.current['chat-panel'];
      case 'toggle-auto-translate':
        return translateToggleRef.current;
      case 'send-message':
        return composerRef.current;
      default:
        return null;
    }
  }, [currentStep, targetVersion]);

  const nextStep = useCallback(() => {
    setStepIndex((index) => Math.min(index + 1, tutorialSteps.length - 1));
  }, []);

  useEffect(() => {
    if (!tutorialActive) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setTargetVersion((version) => version + 1);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [currentStep, postModalOpen, screen, tutorialActive]);

  const resetDemo = useCallback(() => {
    setScreen('landing');
    setTutorialActive(false);
    setStepIndex(0);
    setPostModalOpen(false);
    setAutoTranslate(false);
    setChatInput('');
    setDinnerPost(buildPosts().dinnerPost);
    setConcertPost(buildPosts().concertPost);
    setChatMessages(buildChatMessages().slice(0, 30));
  }, []);

  const startTutorial = () => {
    resetDemo();
    setTutorialActive(true);
    setStepIndex(0);
  };

  useEffect(() => {
    if (screen !== 'chat-demo') {
      if (queueTimerRef.current) {
        window.clearTimeout(queueTimerRef.current);
        queueTimerRef.current = null;
      }
      return;
    }

    const scheduleNext = (queueIndex: number) => {
      if (queueIndex >= chatQueue.length) {
        return;
      }
      const delay = 3000 + Math.floor(Math.random() * 4000);
      queueTimerRef.current = window.setTimeout(() => {
        setChatMessages((prev) => [...prev, chatQueue[queueIndex]]);
        scheduleNext(queueIndex + 1);
      }, delay);
    };

    scheduleNext(0);

    return () => {
      if (queueTimerRef.current) {
        window.clearTimeout(queueTimerRef.current);
      }
    };
  }, [chatQueue, screen]);

  const handleHeaderLogin = () => {
    setScreen('home-demo');
    if (tutorialActive && currentStep === 'click-login') {
      nextStep();
    }
  };

  const handleConcertReaction = (reactionId: string) => {
    setConcertPost((prev) => ({
      ...prev,
      reactions: prev.reactions.map((reaction) =>
        reaction.id === reactionId ? { ...reaction, count: reaction.count + 1 } : reaction
      )
    }));
    if (tutorialActive && currentStep === 'react-concert-post') {
      nextStep();
    }
  };

  const handleDinnerReaction = (reactionId: string) => {
    setDinnerPost((prev) => ({
      ...prev,
      reactions: prev.reactions.map((reaction) =>
        reaction.id === reactionId ? { ...reaction, count: reaction.count + 1 } : reaction
      )
    }));
  };

  const handleOpenPost = () => {
    setPostModalOpen(true);
    if (tutorialActive && currentStep === 'open-first-post') {
      setTimeout(() => nextStep(), 0);
    }
  };

  const handleOpenClub = () => {
    setPostModalOpen(false);
    setScreen('fan-club-demo');
    if (tutorialActive && currentStep === 'open-fan-club') {
      nextStep();
    }
  };

  const handleOpenChat = () => {
    setScreen('chat-demo');
    if (tutorialActive && currentStep === 'open-chat') {
      nextStep();
    }
  };

  const handleToggleAutoTranslate = () => {
    setAutoTranslate(!autoTranslate);
    if (tutorialActive && currentStep === 'toggle-auto-translate') {
      nextStep();
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) {
      return;
    }
    setChatMessages((prev) => [
      ...prev,
      {
        id: `message-current-${Date.now()}`,
        senderId: 'current-user',
        senderName: 'You',
        language: locale,
        originalText: chatInput.trim(),
        translatedTextByLocale: {
          'zh-TW': chatInput.trim(),
          en: chatInput.trim(),
          ja: chatInput.trim(),
          ko: chatInput.trim()
        },
        sentAt: new Date().toISOString()
      }
    ]);
    setChatInput('');
    if (tutorialActive && currentStep === 'send-message') {
      nextStep();
    }
  };

  const handleTutorialNext = () => {
    if (
      currentStep === 'welcome' ||
      currentStep === 'my-fan-clubs' ||
      currentStep === 'chat-overview' ||
      currentStep === 'chat-translated'
    ) {
      nextStep();
    }
  };

  const tutorialMessage = useMemo(() => {
    switch (currentStep) {
      case 'welcome': return t(tutorialText.welcome);
      case 'click-login': return t(tutorialText.clickLogin);
      case 'my-fan-clubs': return t(tutorialText.myFanClubs);
      case 'open-first-post': return t(tutorialText.openFirstPost);
      case 'react-concert-post': return t(tutorialText.reactConcertPost);
      case 'open-fan-club': return t(tutorialText.openFanClub);
      case 'open-chat': return t(tutorialText.openChat);
      case 'chat-overview': return t(tutorialText.chatOverview);
      case 'toggle-auto-translate': return t(tutorialText.toggleAutoTranslate);
      case 'chat-translated': return t(tutorialText.chatTranslated);
      case 'send-message': return t(tutorialText.sendMessage);
      case 'final-cta': return t(tutorialText.finalCta);
      default: return '';
    }
  }, [currentStep, t]);

  const refresh = () => {
    // refresh the whole page, navigate to /
    window.location.href = '/';
  }

  const openfillForm = () => {
    window.open(FINAL_FORM_URL, '_blank', 'noopener,noreferrer')
  }

  const showNextButton = tutorialActive && ['welcome', 'my-fan-clubs', 'chat-overview', 'chat-translated'].includes(currentStep ?? '');

  const appShell = (mainContent: React.ReactNode, assistantContent?: React.ReactNode) => (
    <div className="app-shell app-shell-expand-content theme-night-mode">
      <aside className="app-shell-sidebar" aria-label="app sidebar">
        <a className="app-shell-sidebar-logo" href="#top" aria-label="LunarFan home" onClick={refresh}>
          <Image className="app-shell-sidebar-logo-main" src="/logo_square_dark.png" alt="LunarFan logo" width={507} height={507} />
          <span className="app-shell-sidebar-logo-label">LunarFan</span>
        </a>

        <div className="app-shell-sidebar-nav-rail">
          <nav className="app-shell-sidebar-nav">
            <button type="button" className="app-shell-nav-item active">
              <span className="app-shell-nav-item-icon" aria-hidden="true"><DemoIcon name="home" /></span>
              <span className="app-shell-nav-item-label">{t(uiText.home)}</span>
            </button>
            <button type="button" className="app-shell-nav-item">
              <span className="app-shell-nav-item-icon" aria-hidden="true"><DemoIcon name="compassOutline" /></span>
              <span className="app-shell-nav-item-label">{t(uiText.explore)}</span>
            </button>
            <button type="button" className="app-shell-nav-item">
              <span className="app-shell-nav-item-icon" aria-hidden="true"><DemoIcon name="magnify" /></span>
              <span className="app-shell-nav-item-label">{t(uiText.search)}</span>
            </button>
            <button type="button" className="app-shell-nav-item">
              <span className="app-shell-nav-item-icon" aria-hidden="true"><DemoIcon name="pencilOutline" /></span>
              <span className="app-shell-nav-item-label">{t(uiText.post_nav)}</span>
            </button>
            <button type="button" className="app-shell-nav-item">
              <span className="app-shell-nav-item-icon" aria-hidden="true"><DemoIcon name="chatOutline" /></span>
              <span className="app-shell-nav-item-label">{t(uiText.chat)}</span>
            </button>
            <button type="button" className="app-shell-nav-item" onClick={refresh}>
              <span className="app-shell-nav-item-icon" aria-hidden="true"><DemoIcon name="logout" /></span>
              <span className="app-shell-nav-item-label">{t(uiText.logout)}</span>
            </button>
          </nav>
        </div>
      </aside>

      <section className="app-shell-content">
        <div className={`app-shell-body${assistantContent ? '' : ' merged'}`}>
          {mainContent}
          {assistantContent}
        </div>
      </section>
    </div>
  );

  return (
    <main className="demo-root theme-night-mode">
      {screen === 'landing' ? (
        <header className="site-header">
          <a className="brand" href="#top" aria-label="LunarFan home">
            <Image className="header-logo" src="/logo_square_dark.png" alt="LunarFan logo" width={912} height={507} priority />
          </a>
          <div className="header-side">
            <label className="locale-picker">
              <span>{t(uiText.localeLabel)}</span>
              <select value={locale} onChange={(event) => setLocale(event.target.value as Locale)}>
                {supportedLocales.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>
            <HeaderActions
              loginLabel={t(uiText.login)}
              loginRef={setTargetRef('header-login')}
              onLogin={handleHeaderLogin}
            />
          </div>
        </header>
      ) : null}

      {screen === 'landing' ? (
        <>
          <section id="top" className="panel hero-panel" aria-label="Hero section">
            <div className="hero-inner">
              <h1>{t(uiText.appTitle)}</h1>
              <p>{t(uiText.heroSubtitle)}</p>
              <span style={{ display: 'inline-flex', gap: '1rem' }}>
                <button type="button" className="primary-button hero-demo-button" onClick={startTutorial}>{t(uiText.tryNow)}</button>
                <button type="button" className="primary-button fill-form-button" onClick={openfillForm}>{t(uiText.fillform)}</button>
              </span>
            </div>
          </section>
          <section className="panel reasons-panel" aria-label="Why LunarFan section">
            <div className="reasons-layout">
              <div className="reasons-copy">
                <h2>為什麼選擇 LunarFan?</h2>
                <ul>
                  <li><strong>對創作者：</strong>用最低的門檻建立後援會，操作起來就像一般社群媒體一樣順暢。</li>
                  <li><strong>對資深粉絲：</strong>可以建立私人後援會，與志同道合的夥伴盡情討論分享。</li>
                  <li><strong>對一般粉絲：</strong>即時掌握創作者的第一手消息，還有不定時的直播與專屬聊天室。</li>
                </ul>
              </div>
              <div className="illustration-wrap">
                <Image src="/home_page_illustration.png" alt="LunarFan community illustration" width={620} height={620} priority />
              </div>
            </div>
            <footer className="site-footer"><span>聯絡我們: </span><a className="contact-link" href="mailto:contact.us@lunar.fan">contact.us@lunar.fan</a></footer>
          </section>
        </>
      ) : null}

      {screen === 'home-demo' ? appShell(
        <section className="app-shell-main-panel">
          <div className="fan-club-home-page">
            <section className="fan-club-home-posts">
              <PostCard post={concertPost} locale={locale} openSurfaceRef={setTargetRef('first-post')} onOpen={handleOpenPost} onOpenClub={handleOpenClub} />
            </section>
          </div>
        </section>,
        <aside ref={setTargetRef('my-fan-clubs')} className="app-shell-assistant-panel"><ClubRail title={t(uiText.myFanClubs)} clubs={clubNames} onOpenClub={handleOpenClub} /></aside>
      ) : null}

      {screen === 'fan-club-demo' ? appShell(
        <section className="app-shell-main-panel">
          <div className="fan-club-home-page">
            <div className="fan-club-home-banner-stack">
              <div className="fan-club-banner-card" style={{ backgroundImage: 'linear-gradient(rgba(10, 35, 62, 0.76), rgba(10, 35, 62, 0.9)), url(/Luna-Background.png)' }}>
                <div className="fan-club-home-header">
                  <Image src="/Luna-Avatar.png" alt="Luna avatar" width={96} height={96} className="fan-club-hero-avatar" />
                  <div className="fan-club-home-header-copy">
                    <div className="fan-club-home-header-topline">
                      <h1>Luna</h1>
                      <div className="fan-club-home-header-membership">
                        <div className="fan-club-membership-bar">
                          <button type="button" className="fan-club-membership-preview">
                            <span className="fan-club-membership-preview-avatar demo-avatar-frame">L</span>
                          </button>
                          <div className="fan-club-membership-action">
                            <button type="button" className="joined-pill">{t(uiText.alreadyJoined)}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="fan-club-home-header-subline">{t(uiText.fanClubHint)}</p>
                    <div className="fan-club-home-header-actions">
                      <button ref={setTargetRef('chat-open')} type="button" className="ui-icon-button ui-icon-button-md" onClick={handleOpenChat} aria-label={t(uiText.chat)}>
                        <DemoIcon name="chat" size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section className="fan-club-home-posts">
              <PostCard post={dinnerPost} locale={locale} onOpenClub={handleOpenClub} onReact={handleDinnerReaction} interactiveReactions />
              <PostCard post={concertPost} locale={locale} onOpenClub={handleOpenClub} onReact={handleConcertReaction} interactiveReactions />
            </section>
          </div>
        </section>
      ) : null}

      {screen === 'chat-demo' ? appShell(
        <section ref={setTargetRef('chat-panel')} className="app-shell-main-panel chat-demo-panel">
          <ChatRoomView
            locale={locale}
            room={roomName[locale]}
            messages={chatMessages}
            autoTranslate={autoTranslate}
            autoTranslateLabel={t(uiText.autoTranslate)}
            selectedRoomName={roomName[locale]}
            inputValue={chatInput}
            inputPlaceholder={t(uiText.chatInputPlaceholder)}
            sendLabel={t(uiText.send)}
            translateToggleRef={translateToggleRef}
            composerRef={composerRef}
            onToggleAutoTranslate={handleToggleAutoTranslate}
            onInputChange={setChatInput}
            onSend={handleSendMessage}
          />
        </section>
      ) : null}

      <PostModal
        open={postModalOpen}
        post={concertPost}
        locale={locale}
        clubButtonRef={setTargetRef('post-modal-club')}
        reactionsRef={setTargetRef('post-modal-reactions')}
        onClose={() => setPostModalOpen(false)}
        onReact={handleConcertReaction}
        onOpenClub={handleOpenClub}
      />

      <TutorialOverlay
        open={tutorialActive}
        locale={locale}
        message={tutorialMessage}
        targetElement={targetElement ?? undefined}
        placement={currentStep ? stepPlacement[currentStep] ?? 'auto' : 'auto'}
        showNextButton={showNextButton}
        nextLabel={t(uiText.next)}
        onNext={handleTutorialNext}
        showBackToHomeButton={currentStep === 'final-cta'}
        backToHomeLabel={t(uiText.backHome)}
        onBackToHome={resetDemo}
        showOpenFormButton={currentStep === 'final-cta'}
        openFormLabel={t(uiText.openForm)}
        onOpenForm={() => window.open(FINAL_FORM_URL, '_blank', 'noopener,noreferrer')}
        onLocaleChange={setLocale}
      />
    </main>
  );
}
