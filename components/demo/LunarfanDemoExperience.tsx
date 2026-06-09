'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ClubRail from './ClubRail';
import ChatRoomView from './ChatRoomView';
import HeaderActions from './HeaderActions';
import { buildChatMessages, buildPosts, clubNames, roomNames, supportedLocales, tutorialSteps, tutorialText, type Locale, type ScreenState, type TutorialStepId, uiText } from './mockData';
import PostCard from './PostCard';
import PostModal from './PostModal';
import TutorialOverlay from './TutorialOverlay';

type TargetKey =
  | 'header-register'
  | 'header-login'
  | 'register-email'
  | 'register-password'
  | 'register-retype-password'
  | 'register-submit'
  | 'my-fan-clubs'
  | 'first-post'
  | 'post-modal'
  | 'post-modal-club'
  | 'dinner-post'
  | 'chat-open'
  | 'chat-panel'
  | 'translate-toggle'
  | 'chat-composer';

const FINAL_FORM_URL = 'https://forms.gle/1CuJjpjai38GtfHW6';

export default function LunarfanDemoExperience() {
  const [locale, setLocale] = useState<Locale>('zh-TW');
  const [screen, setScreen] = useState<ScreenState>('landing');
  const [tutorialActive, setTutorialActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [concertPost, setConcertPost] = useState(() => buildPosts().concertPost);
  const [dinnerPost, setDinnerPost] = useState(() => buildPosts().dinnerPost);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [registerForm, setRegisterForm] = useState({ email: '', password: '', retypePassword: '' });
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [chatMessages, setChatMessages] = useState(() => buildChatMessages().slice(0, 30));
  const [chatQueue] = useState(() => buildChatMessages().slice(30));
  const [chatInput, setChatInput] = useState('');

  const targetsRef = useRef<Partial<Record<TargetKey, HTMLElement | null>>>({});
  const queueTimerRef = useRef<number | null>(null);
  const translateToggleRef = useRef<HTMLButtonElement | null>(null);
  const composerRef = useRef<HTMLDivElement | null>(null);

  const currentStep = tutorialSteps[stepIndex] as TutorialStepId | undefined;
  const isLoggedIn = screen !== 'landing' && screen !== 'register-demo';

  const t = useCallback((textMap: Record<Locale, string>) => textMap[locale], [locale]);

  const registerTarget = useCallback(
    (key: TargetKey) => (element: HTMLElement | null) => {
      targetsRef.current[key] = element;
    },
    []
  );


  const targetElement = useMemo(() => {
    switch (currentStep) {
      case 'click-register':
        return targetsRef.current['header-register'];
      case 'register-email':
        return targetsRef.current['register-email'];
      case 'register-password':
        return targetsRef.current['register-password'];
      case 'register-retype-password':
        return targetsRef.current['register-retype-password'];
      case 'register-submit':
        return targetsRef.current['register-submit'];
      case 'my-fan-clubs':
        return targetsRef.current['my-fan-clubs'];
      case 'open-first-post':
        return targetsRef.current['first-post'];
      case 'react-concert-post':
        return targetsRef.current['post-modal'];
      case 'open-fan-club':
        return targetsRef.current['post-modal-club'];
      case 'react-dinner-post':
        return targetsRef.current['dinner-post'];
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
  }, [currentStep]);

  const nextStep = useCallback(() => {
    setStepIndex((index) => Math.min(index + 1, tutorialSteps.length - 1));
  }, []);

  const resetDemo = useCallback(() => {
    setScreen('landing');
    setTutorialActive(false);
    setStepIndex(0);
    setPostModalOpen(false);
    setAutoTranslate(false);
    setChatInput('');
    setConcertPost(buildPosts().concertPost);
    setDinnerPost(buildPosts().dinnerPost);
    setChatMessages(buildChatMessages().slice(0, 30));
    setRegisterForm({ email: '', password: '', retypePassword: '' });
  }, []);

  const startTutorial = () => {
    resetDemo();
    setTutorialActive(true);
    setStepIndex(0);
    setScreen('landing');
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

  const handleHeaderRegister = () => {
    setScreen('register-demo');
    if (tutorialActive && currentStep === 'click-register') {
      nextStep();
    }
  };

  const handleHeaderLogin = () => {
    setScreen('home-demo');
  };

  const handleCompleteRegister = () => {
    setScreen('home-demo');
    if (tutorialActive && currentStep === 'register-submit') {
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
    if (tutorialActive && currentStep === 'react-dinner-post') {
      nextStep();
    }
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
    setAutoTranslate(true);
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
    if (currentStep === 'welcome' || currentStep === 'register-email' || currentStep === 'register-password' || currentStep === 'register-retype-password' || currentStep === 'my-fan-clubs' || currentStep === 'chat-overview' || currentStep === 'chat-translated') {
      nextStep();
    }
  };

  const tutorialMessage = useMemo(() => {
    switch (currentStep) {
      case 'welcome':
        return t(tutorialText.welcome);
      case 'click-register':
        return t(tutorialText.clickRegister);
      case 'register-email':
        return t(tutorialText.registerEmail);
      case 'register-password':
        return t(tutorialText.registerPassword);
      case 'register-retype-password':
        return t(tutorialText.registerRetype);
      case 'register-submit':
        return t(tutorialText.completeRegister);
      case 'my-fan-clubs':
        return t(tutorialText.myFanClubs);
      case 'open-first-post':
        return t(tutorialText.openFirstPost);
      case 'react-concert-post':
        return t(tutorialText.reactConcertPost);
      case 'open-fan-club':
        return t(tutorialText.openFanClub);
      case 'react-dinner-post':
        return t(tutorialText.reactDinnerPost);
      case 'open-chat':
        return t(tutorialText.openChat);
      case 'chat-overview':
        return t(tutorialText.chatOverview);
      case 'toggle-auto-translate':
        return t(tutorialText.toggleAutoTranslate);
      case 'chat-translated':
        return t(tutorialText.chatTranslated);
      case 'send-message':
        return t(tutorialText.sendMessage);
      case 'final-cta':
        return t(tutorialText.finalCta);
      default:
        return '';
    }
  }, [currentStep, t]);

  const showNextButton = tutorialActive && ['welcome', 'register-email', 'register-password', 'register-retype-password', 'my-fan-clubs', 'chat-overview', 'chat-translated'].includes(currentStep ?? '');

  return (
    <main className="demo-root">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="LunarFan home">
          <Image className="header-logo" src="/logo.png" alt="LunarFan logo" width={912} height={507} priority />
        </a>
        <div className="header-side">
          <label className="locale-picker">
            <span>{t(uiText.localeLabel)}</span>
            <select value={locale} onChange={(event) => setLocale(event.target.value as Locale)}>
              {supportedLocales.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <HeaderActions
            loggedIn={isLoggedIn}
            registerLabel={t(uiText.register)}
            loginLabel={t(uiText.login)}
            registerRef={registerTarget('header-register')}
            loginRef={registerTarget('header-login')}
            onRegister={handleHeaderRegister}
            onLogin={handleHeaderLogin}
          />
        </div>
      </header>

      {screen === 'landing' ? (
        <>
          <section id="top" className="panel hero-panel" aria-label="Hero section">
            <div className="hero-inner">
              <h1>{t(uiText.appTitle)}</h1>
              <p>{t(uiText.heroSubtitle)}</p>
              <button type="button" className="primary-button hero-demo-button" onClick={startTutorial}>
                {t(uiText.tryNow)}
              </button>
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
              </div>
              <div className="illustration-wrap">
                <Image src="/home_page_illustration.png" alt="LunarFan community illustration" width={620} height={620} priority />
              </div>
            </div>
            <footer className="site-footer">
              <span>聯絡我們: </span>
              <a className="contact-link" href="mailto:contact.us@lunar.fan">
                contact.us@lunar.fan
              </a>
            </footer>
          </section>
        </>
      ) : null}

      {screen === 'register-demo' ? (
        <section className="panel demo-panel centered-panel">
          <div className="demo-card register-card">
            <div>
              <p className="section-kicker">Demo register</p>
              <h2>{t(uiText.registrationTitle)}</h2>
              <p className="support-copy">{t(uiText.registrationDesc)}</p>
            </div>
            <div className="demo-form-grid">
              <label className="demo-field" ref={registerTarget('register-email')}>
                <span>Email</span>
                <input value={registerForm.email} onChange={(event) => setRegisterForm((prev) => ({ ...prev, email: event.target.value }))} />
              </label>
              <label className="demo-field" ref={registerTarget('register-password')}>
                <span>Password</span>
                <input type="password" value={registerForm.password} onChange={(event) => setRegisterForm((prev) => ({ ...prev, password: event.target.value }))} />
              </label>
              <label className="demo-field" ref={registerTarget('register-retype-password')}>
                <span>Retype password</span>
                <input type="password" value={registerForm.retypePassword} onChange={(event) => setRegisterForm((prev) => ({ ...prev, retypePassword: event.target.value }))} />
              </label>
            </div>
            <div ref={registerTarget('register-submit')}>
              <button type="button" className="primary-button register-submit-button" onClick={handleCompleteRegister}>
                {t(uiText.completeRegister)}
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {screen === 'home-demo' ? (
        <section className="panel demo-panel home-demo-panel">
          <div className="demo-home-layout">
            <div ref={registerTarget('my-fan-clubs')}>
              <ClubRail title={t(uiText.myFanClubs)} clubs={clubNames} />
            </div>
            <section className="demo-post-feed">
              <div className="section-heading-row">
                <div>
                  <p className="section-kicker">Creator update</p>
                  <h2>{t(uiText.posts)}</h2>
                </div>
              </div>
              <div ref={registerTarget('first-post')}>
                <PostCard
                  post={concertPost}
                  locale={locale}
                  onOpen={handleOpenPost}
                  openPostLabel={t(uiText.viewPost)}
                />
              </div>
            </section>
          </div>
        </section>
      ) : null}

      {screen === 'fan-club-demo' ? (
        <section className="panel demo-panel fan-club-panel" style={{ backgroundImage: 'linear-gradient(rgba(10, 35, 62, 0.85), rgba(10, 35, 62, 0.9)), url(/Luna-Background.png)' }}>
          <div className="fan-club-hero">
            <Image src="/Luna-Avatar.png" alt="Luna avatar" width={96} height={96} className="fan-club-hero-avatar" />
            <div>
              <p className="section-kicker">Fan club</p>
              <h2>Luna</h2>
              <p>{t(uiText.fanClubHint)}</p>
            </div>
            <div className="fan-club-actions">
              <button type="button" className="joined-pill">
                {t(uiText.alreadyJoined)}
              </button>
              <button type="button" className="icon-circle-button" ref={registerTarget('chat-open')} onClick={handleOpenChat} aria-label={t(uiText.chat)}>
                💬
              </button>
            </div>
          </div>
          <div className="fan-club-post-stack">
            <PostCard post={concertPost} locale={locale} onReact={handleConcertReaction} interactiveReactions={false} openPostLabel={t(uiText.viewPost)} />
            <div ref={registerTarget('dinner-post')}>
              <PostCard post={dinnerPost} locale={locale} onReact={handleDinnerReaction} interactiveReactions openPostLabel={t(uiText.viewPost)} />
            </div>
          </div>
        </section>
      ) : null}

      {screen === 'chat-demo' ? (
        <section className="panel demo-panel chat-demo-panel">
          <div ref={registerTarget('chat-panel')}>
            <ChatRoomView
              locale={locale}
              rooms={roomNames}
              messages={chatMessages}
              autoTranslate={autoTranslate}
              autoTranslateLabel={t(uiText.autoTranslate)}
              selectedRoomName={roomNames[0]}
              inputValue={chatInput}
              inputPlaceholder={t(uiText.chatInputPlaceholder)}
              sendLabel={t(uiText.send)}
              translateToggleRef={translateToggleRef}
              composerRef={composerRef}
              onToggleAutoTranslate={handleToggleAutoTranslate}
              onInputChange={setChatInput}
              onSend={handleSendMessage}
            />
          </div>
        </section>
      ) : null}

      <PostModal
        open={postModalOpen}
        post={concertPost}
        locale={locale}
        onClose={() => setPostModalOpen(false)}
        onReact={handleConcertReaction}
        onOpenClub={handleOpenClub}
        reactionTitle={t(uiText.postModalReactionTitle)}
      />

      <TutorialOverlay
        open={tutorialActive}
        locale={locale}
        message={tutorialMessage}
        targetElement={targetElement ?? undefined}
        showNextButton={showNextButton}
        nextLabel={t(uiText.next)}
        onNext={handleTutorialNext}
        showBackToHomeButton={currentStep === 'final-cta'}
        backToHomeLabel={t(uiText.backHome)}
        onBackToHome={resetDemo}
        showOpenFormButton={currentStep === 'final-cta'}
        openFormLabel={t(uiText.openForm)}
        onOpenForm={() => window.open(FINAL_FORM_URL, '_blank', 'noopener,noreferrer')}
      />
    </main>
  );
}
