'use client';

import Image from 'next/image';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import type { Locale } from './mockData';

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
const bubbleWidth = 420;
const bubbleHeight = 210;

function resolvePlacement(targetRect: Rect, desired: TutorialOverlayProps['placement']) {
  const available = {
    top: targetRect.top,
    bottom: window.innerHeight - (targetRect.top + targetRect.height),
    left: targetRect.left,
    right: window.innerWidth - (targetRect.left + targetRect.width)
  };

  const fallbackOrder: Array<'bottom' | 'top' | 'right' | 'left'> = ['bottom', 'top', 'right', 'left'];
  const requested = desired === 'auto' ? null : desired;
  const needsVertical = bubbleHeight + margin;
  const needsHorizontal = bubbleWidth + margin;

  if (requested === 'top' && available.top > needsVertical) return 'top';
  if (requested === 'bottom' && available.bottom > needsVertical) return 'bottom';
  if (requested === 'left' && available.left > needsHorizontal) return 'left';
  if (requested === 'right' && available.right > needsHorizontal) return 'right';

  for (const option of fallbackOrder) {
    if ((option === 'top' || option === 'bottom') && available[option] > needsVertical) return option;
    if ((option === 'left' || option === 'right') && available[option] > needsHorizontal) return option;
  }

  return 'bottom';
}

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

    const resolved = resolvePlacement(targetRect, placement);
    const maxLeft = window.innerWidth - Math.min(window.innerWidth * 0.9, bubbleWidth) - 24;
    const clampLeft = (value: number) => Math.max(24, Math.min(maxLeft, value));

    if (resolved === 'top') {
      return { top: Math.max(24, targetRect.top - bubbleHeight - margin), left: clampLeft(targetRect.left), maxWidth: 'min(90vw, 420px)' };
    }
    if (resolved === 'left') {
      return { top: Math.max(24, targetRect.top), left: Math.max(24, targetRect.left - bubbleWidth - margin), maxWidth: 'min(90vw, 420px)' };
    }
    if (resolved === 'right') {
      return {
        top: Math.max(24, targetRect.top),
        left: clampLeft(targetRect.left + targetRect.width + margin),
        maxWidth: 'min(90vw, 420px)'
      };
    }
    return {
      top: Math.min(window.innerHeight - bubbleHeight - 24, targetRect.top + targetRect.height + margin),
      left: clampLeft(targetRect.left),
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
            style={{ top: Math.max(0, targetRect.top - margin), left: targetRect.left + targetRect.width + margin, right: 0, height: targetRect.height + margin * 2 }}
          />
          <div className="tutorial-mask tutorial-mask-bottom" style={{ top: targetRect.top + targetRect.height + margin, bottom: 0 }} />
          <div className="tutorial-focus-ring" style={{ top: targetRect.top - 8, left: targetRect.left - 8, width: targetRect.width + 16, height: targetRect.height + 16 }} />
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
