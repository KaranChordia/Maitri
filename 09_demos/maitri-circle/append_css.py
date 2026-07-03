new_css = """
/* Immersive Storybook Reader */
.storybook-immersive-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(20px, 4vw, 60px);
}

.storybook-immersive-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 1;
  animation: fadeIn 0.4s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.storybook-immersive-modal {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1400px;
  height: 90vh;
  background: var(--cream);
  border-radius: 32px;
  box-shadow: 0 40px 100px rgba(0,0,0,0.5);
  overflow: hidden;
  animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUpFade {
  from { opacity: 0; transform: translateY(40px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

:root[data-theme="dark"] .storybook-immersive-modal {
  background: var(--ink);
  border: 1px solid rgba(255,255,255,0.1);
}

.storybook-close-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 10;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--ink);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
}

.storybook-close-btn:hover {
  transform: scale(1.1);
  background: var(--rose);
  color: white;
}

.storybook-spread {
  display: flex;
  height: 100%;
  width: 100%;
}

.storybook-page {
  flex: 1;
  height: 100%;
  overflow-y: auto;
}

.storybook-left-page {
  background: var(--blush);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.storybook-full-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.storybook-right-page {
  padding: clamp(40px, 6vw, 80px);
  background: white;
}

:root[data-theme="dark"] .storybook-right-page {
  background: var(--body);
}

.storybook-tag {
  display: inline-block;
  padding: 6px 16px;
  background: var(--aqua-2);
  color: var(--teal-deep);
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 24px;
}

:root[data-theme="dark"] .storybook-tag {
  background: rgba(24, 154, 147, 0.2);
  color: var(--teal);
}

.storybook-right-page h2 {
  font-size: clamp(36px, 4vw, 54px);
  line-height: 1.1;
  margin: 0 0 16px 0;
  color: var(--ink);
}

:root[data-theme="dark"] .storybook-right-page h2 {
  color: white;
}

.storybook-right-page h4 {
  font-size: 20px;
  color: var(--ink-soft);
  margin: 0 0 40px 0;
  line-height: 1.5;
  font-weight: 400;
}

:root[data-theme="dark"] .storybook-right-page h4 {
  color: rgba(255,255,255,0.7);
}

.storybook-text-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.storybook-text-content article strong {
  display: block;
  font-size: 14px;
  color: var(--rose);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.storybook-text-content article h5 {
  font-size: 24px;
  margin: 0 0 12px 0;
  color: var(--ink);
}

:root[data-theme="dark"] .storybook-text-content article h5 {
  color: white;
}

.storybook-text-content article p {
  font-size: 18px;
  line-height: 1.6;
  color: var(--ink-soft);
  margin: 0;
}

:root[data-theme="dark"] .storybook-text-content article p {
  color: rgba(255,255,255,0.8);
}

@media (max-width: 900px) {
  .storybook-spread {
    flex-direction: column;
  }
  .storybook-left-page {
    height: 40vh;
    flex: none;
  }
  .storybook-right-page {
    height: 60vh;
    flex: none;
  }
}
"""

with open('src/character-page.css', 'a') as f:
    f.write(new_css)

