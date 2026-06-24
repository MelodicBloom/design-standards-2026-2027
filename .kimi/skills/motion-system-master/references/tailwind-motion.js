// tailwind.config.js — motion theme extension
module.exports = {
  theme: {
    extend: {
      transitionTimingFunction: {
        'organic':        'cubic-bezier(0.22, 1, 0.36, 1)',
        'organic-accent': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'structured':     'cubic-bezier(0.4,  0, 0.2,  1)',
      },
      transitionDuration: {
        'xxs': '120ms',
        'xs':  '180ms',
        'sm':  '240ms',
        'md':  '320ms',
        'lg':  '520ms',
        'xl':  '700ms',
      },
      animationDuration: {
        'xxs': '120ms',
        'xs':  '180ms',
        'sm':  '240ms',
        'md':  '320ms',
        'lg':  '520ms',
        'xl':  '700ms',
      },
    },
  },
}
