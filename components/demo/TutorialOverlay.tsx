'use client';

import Image from 'next/image';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import type { Locale } from './mockData';

export type TutorialListenerType = 'click-target' | 'reaction-selected' | 'toggle-on' | 'message-sent' | 'custom';

export type TutorialOverlayProps = {
  open: boolean;
  message: string;
  locale: Locale;
  targetElement?: HTMLElement | null;
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'auto';
  showNextButton?: boolean;
  nextLabel?: string;
  showBackToHomeButton?: boolean;
  backToHomeLabel?: string;
  showOpenFormButton?: boolean;
  openFormLabel?: string;
  onNext?: () => void;
  onBackToHome?: () => void;
  onOpenForm?: () => void;
};

type Rect = { top: number; left: number; width: number; height: number };

const margin = 16;

export default function TutorialOverlay({
  open,
  message,
  locale,
  targetElement,
  placement = 'auto',
  showNextButton,
  nextLabel,
  showBackToHomeButton,
  backToHomeLabel,
  showOpenFormButton,
  openFormLabel,
  onNext,
  onBackToHome,
  onOpenForm
}: TutorialOverlayProps) {
  const [targetRect, setTargetRect] = useState<Rect | null>(null);

  useLayoutEffect(() => {
    if (!open || !targetElement) {
      setTargetRect(null);
      return;
    }

    const updateRect = () => {
      const rect = targetElement.getBoundingClientRect();
      setTargetRect({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);
    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [open, targetElement]);

  useEffect(() => {
    if (!open || !targetElement) {
      return;
    }
    targetElement.setAttribute('data-tutorial-active', 'true');
    return () => targetElement.removeAttribute('data-tutorial-active');
  }, [open, targetElement]);

  const bubbleStyle = useMemo(() => {
    if (!targetRect) {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: 'min(90vw, 420px)'
      } as const;
    }

    const resolvedPlacement = placement === 'auto' ? 'bottom' : placement;
    if (resolvedPlacement === 'top') {
      return {
        top: Math.max(24, targetRect.top - 220),
        left: Math.min(window.innerWidth - 420, Math.max(24, targetRect.left)),
        maxWidth: 'min(90vw, 420px)'
      };
    }
    if (resolvedPlacement === 'left') {
      return {
        top: Math.max(24, targetRect.top),
        left: Math.max(24, targetRect.left - 420 - margin),
        maxWidth: 'min(90vw, 420px)'
      };
    }
    if (resolvedPlacement === 'right') {
      return {
        top: Math.max(24, targetRect.top),
        left: Math.min(window.innerWidth - 420, targetRect.left + targetRect.width + margin),
        maxWidth: 'min(90vw, 420px)'
      };
    }
    return {
      top: Math.min(window.innerHeight - 260, targetRect.top + targetRect.height + margin),
      left: Math.min(window.innerWidth - 420, Math.max(24, targetRect.left)),
      maxWidth: 'min(90vw, 420px)'
    };
  }, [placement, targetRect]);

  if (!open) {
    return null;
  }

  return (
    <div className="tutorial-layer" aria-live="polite">
      {targetRect ? (
        <>
          <div className="tutorial-mask tutorial-mask-top" style={{ height: Math.max(0, targetRect.top - margin) }} />
          <div
            className="tutorial-mask tutorial-mask-left"
            style={{ top: Math.max(0, targetRect.top - margin), width: Math.max(0, targetRect.left - margin), height: targetRect.height + margin * 2 }}
          />
          <div
            className="tutorial-mask tutorial-mask-right"
            style={{
              top: Math.max(0, targetRect.top - margin),
              left: targetRect.left + targetRect.width + margin,
              right: 0,
              height: targetRect.height + margin * 2
            }}
          />
          <div
            className="tutorial-mask tutorial-mask-bottom"
            style={{ top: targetRect.top + targetRect.height + margin, bottom: 0 }}
          />
          <div
            className="tutorial-focus-ring"
            style={{ top: targetRect.top - 8, left: targetRect.left - 8, width: targetRect.width + 16, height: targetRect.height + 16 }}
          />
        </>
      ) : (
        <div className="tutorial-mask tutorial-mask-full" />
      )}

      <aside className="tutorial-bubble" style={bubbleStyle}>
        <div className="tutorial-bubble-header">
          <Image src="/Luna-Avatar.png" alt="Luna avatar" width={56} height={56} className="tutorial-luna-avatar" priority />
          <div>
            <div className="tutorial-bubble-kicker">Luna</div>
            <div className="tutorial-bubble-locale">{locale}</div>
          </div>
        </div>
        <p className="tutorial-bubble-message">{message}</p>
        <div className="tutorial-bubble-actions">
          {showBackToHomeButton ? (
            <button type="button" className="tutorial-secondary-button" onClick={onBackToHome}>
              {backToHomeLabel}
            </button>
          ) : null}
          {showOpenFormButton ? (
            <button type="button" className="tutorial-primary-button" onClick={onOpenForm}>
              {openFormLabel}
            </button>
          ) : null}
          {showNextButton ? (
            <button type="button" className="tutorial-primary-button" onClick={onNext}>
              {nextLabel}
            </button>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
