/**
 * Online Services Page - PWD Accessibility Enhancements
 * Implements WCAG 2.x Level AA features for Persons with Disabilities
 */

(function() {
  'use strict';

  // ===========================
  // FLOATING ACCESSIBILITY MENU
  // ===========================
  const accessibilityToggle = document.getElementById('accessibility-toggle');
  const accessibilityMenu = document.getElementById('accessibility-menu');
  
  if (accessibilityToggle && accessibilityMenu) {
    accessibilityToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      accessibilityMenu.hidden = isExpanded;
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.floating-accessibility')) {
        if (accessibilityToggle.getAttribute('aria-expanded') === 'true') {
          accessibilityToggle.setAttribute('aria-expanded', 'false');
          accessibilityMenu.hidden = true;
        }
      }
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && accessibilityToggle.getAttribute('aria-expanded') === 'true') {
        accessibilityToggle.setAttribute('aria-expanded', 'false');
        accessibilityMenu.hidden = true;
        accessibilityToggle.focus();
      }
    });
  }

  // ===========================
  // 1. HIGH CONTRAST MODE TOGGLE
  // ===========================
  const contrastToggle = document.getElementById('contrast-toggle');
  const body = document.body;

  // Load saved preference
  const savedContrast = localStorage.getItem('high-contrast');
  if (savedContrast === 'enabled') {
    body.classList.add('high-contrast');
    if (contrastToggle) {
      contrastToggle.setAttribute('aria-pressed', 'true');
    }
  }

  if (contrastToggle) {
    contrastToggle.addEventListener('click', function() {
      body.classList.toggle('high-contrast');
      const isEnabled = body.classList.contains('high-contrast');
      
      this.setAttribute('aria-pressed', isEnabled);
      localStorage.setItem('high-contrast', isEnabled ? 'enabled' : 'disabled');
      
      announceToScreenReader(
        isEnabled ? 'High contrast mode enabled' : 'High contrast mode disabled'
      );
    });
  }

  // ===========================
  // 2. TEXT SIZE ADJUSTMENT
  // ===========================
  const textSizeToggle = document.getElementById('text-size-toggle');
  let textSizeLevel = parseInt(localStorage.getItem('text-size-level') || '0');

  // Apply saved text size
  if (textSizeLevel > 0) {
    body.classList.add('large-text');
  }

  if (textSizeToggle) {
    textSizeToggle.addEventListener('click', function() {
      textSizeLevel = (textSizeLevel + 1) % 3; // Cycles: 0 (normal), 1 (large), 2 (extra large)
      
      body.classList.remove('large-text', 'extra-large-text');
      
      if (textSizeLevel === 1) {
        body.classList.add('large-text');
        announceToScreenReader('Text size increased to large');
      } else if (textSizeLevel === 2) {
        body.classList.add('extra-large-text');
        announceToScreenReader('Text size increased to extra large');
      } else {
        announceToScreenReader('Text size reset to normal');
      }
      
      localStorage.setItem('text-size-level', textSizeLevel);
    });
  }

  // ===========================
  // 3. VOICE NAVIGATION COMMANDS
  // ===========================
  const voiceToggle = document.getElementById('voice-toggle');
  const voiceStatus = document.getElementById('voice-status');
  let recognition;
  let isVoiceActive = false;

  const voiceCommands = {
    'membership': () => scrollToSection('#membership', 'Navigating to Membership'),
    'contribution': () => scrollToSection('#contribution', 'Navigating to Contribution'),
    'collection': () => scrollToSection('#collection', 'Navigating to Collection'),
    'accreditation': () => scrollToSection('#accreditation', 'Navigating to Accreditation'),
    'benefits': () => scrollToSection('#benefits', 'Navigating to Benefits'),
    'search': () => {
      document.getElementById('service-search')?.focus();
      announceToScreenReader('Search box focused');
    },
    'top': () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      announceToScreenReader('Scrolling to top');
    },
    'help': () => {
      const helpMessage = 'Available commands: membership, contribution, collection, accreditation, benefits, search, or top';
      announceToScreenReader(helpMessage);
      alert(helpMessage); // Also show visually
    }
  };

  function scrollToSection(selector, message) {
    const section = document.querySelector(selector);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Add tabindex temporarily to make section focusable
      section.setAttribute('tabindex', '-1');
      section.focus();
      announceToScreenReader(message);
      
      // Remove tabindex after focus
      setTimeout(() => section.removeAttribute('tabindex'), 1000);
    } else {
      announceToScreenReader(`Section ${selector} not found`);
    }
  }

  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US'; // Changed from en-PH for better recognition
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log('Voice recognition started');
      if (voiceStatus) {
        voiceStatus.hidden = false;
        voiceStatus.querySelector('.voice-text').textContent = 'Listening...';
      }
    };

    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.toLowerCase().trim();
      const confidence = event.results[last][0].confidence;
      
      console.log('Voice detected:', command, 'Confidence:', confidence);
      
      // Update status
      if (voiceStatus) {
        voiceStatus.querySelector('.voice-text').textContent = `Heard: "${command}"`;
      }

      // Check for command matches (more flexible matching)
      let commandFound = false;
      for (const [key, action] of Object.entries(voiceCommands)) {
        if (command.includes(key)) {
          console.log('Executing command:', key);
          action();
          commandFound = true;
          
          // Flash success
          if (voiceStatus) {
            setTimeout(() => {
              voiceStatus.querySelector('.voice-text').textContent = 'Listening...';
            }, 1500);
          }
          break;
        }
      }
      
      if (!commandFound) {
        console.log('No matching command found for:', command);
        announceToScreenReader('Command not recognized. Say "help" for available commands.');
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      
      if (voiceStatus) {
        voiceStatus.querySelector('.voice-text').textContent = 'Error: ' + event.error;
      }
      
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        alert('Microphone access denied. Please allow microphone access in your browser settings and try again.');
        isVoiceActive = false;
        if (voiceToggle) voiceToggle.setAttribute('aria-pressed', 'false');
        if (voiceStatus) voiceStatus.hidden = true;
      } else if (event.error === 'no-speech') {
        console.log('No speech detected, continuing to listen...');
        if (voiceStatus) {
          voiceStatus.querySelector('.voice-text').textContent = 'No speech detected...';
          setTimeout(() => {
            if (isVoiceActive) {
              voiceStatus.querySelector('.voice-text').textContent = 'Listening...';
            }
          }, 2000);
        }
      } else if (event.error === 'network') {
        console.error('Network error - Voice recognition requires internet connection');
        isVoiceActive = false;
        if (voiceToggle) voiceToggle.setAttribute('aria-pressed', 'false');
        if (voiceStatus) {
          voiceStatus.querySelector('.voice-text').textContent = 'Network error';
          setTimeout(() => {
            voiceStatus.hidden = true;
          }, 3000);
        }
        alert('Voice navigation requires an internet connection.\n\nPlease check your connection or use keyboard shortcuts instead:\n• Alt+1 = Membership\n• Alt+2 = Contribution\n• Alt+3 = Collection\n• Alt+4 = Accreditation\n• Alt+5 = Benefits');
      } else {
        console.error('Voice recognition error:', event.error);
        // Don't stop on other errors, just log them
        if (voiceStatus) {
          setTimeout(() => {
            if (isVoiceActive) {
              voiceStatus.querySelector('.voice-text').textContent = 'Listening...';
            }
          }, 2000);
        }
      }
    };

    recognition.onend = () => {
      console.log('Voice recognition ended. Active:', isVoiceActive);
      if (isVoiceActive) {
        // Restart recognition if still active
        try {
          setTimeout(() => {
            if (isVoiceActive) {
              recognition.start();
              console.log('Recognition restarted');
            }
          }, 100); // Small delay before restart
        } catch (e) {
          console.error('Error restarting recognition:', e);
          // Stop trying if there's a persistent error
          isVoiceActive = false;
          if (voiceToggle) voiceToggle.setAttribute('aria-pressed', 'false');
          if (voiceStatus) voiceStatus.hidden = true;
        }
      } else {
        if (voiceStatus) voiceStatus.hidden = true;
      }
    };

    if (voiceToggle) {
      voiceToggle.addEventListener('click', async function() {
        isVoiceActive = !isVoiceActive;
        this.setAttribute('aria-pressed', isVoiceActive);

        if (isVoiceActive) {
          try {
            // Request microphone permission first
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
              await navigator.mediaDevices.getUserMedia({ audio: true });
            }
            
            recognition.start();
            if (voiceStatus) {
              voiceStatus.hidden = false;
              voiceStatus.querySelector('.voice-text').textContent = 'Starting...';
            }
            announceToScreenReader('Voice navigation enabled. Say a section name like "benefits" or say "help" for commands.');
            
            // Show help after 2 seconds
            setTimeout(() => {
              if (isVoiceActive) {
                console.log('Voice commands ready. Try saying: membership, benefits, contribution, collection, or accreditation');
              }
            }, 2000);
          } catch (e) {
            console.error('Could not start voice recognition:', e);
            isVoiceActive = false;
            this.setAttribute('aria-pressed', 'false');
            
            if (e.name === 'NotAllowedError') {
              alert('Microphone access is required for voice navigation. Please allow microphone access and try again.');
            } else {
              alert('Voice recognition failed to start: ' + e.message);
            }
          }
        } else {
          recognition.stop();
          if (voiceStatus) voiceStatus.hidden = true;
          announceToScreenReader('Voice navigation disabled');
        }
      });
    }
  } else {
    // Browser doesn't support voice recognition
    console.warn('Speech recognition not supported in this browser');
    if (voiceToggle) {
      voiceToggle.disabled = true;
      voiceToggle.title = 'Voice navigation not supported in this browser (try Chrome or Edge)';
      voiceToggle.style.opacity = '0.5';
      voiceToggle.style.cursor = 'not-allowed';
    }
  }

  // ===========================
  // 4. TOOLTIP MANAGEMENT
  // ===========================
  const tooltipButtons = document.querySelectorAll('.info-tooltip');
  let currentOpenTooltip = null;

  tooltipButtons.forEach(button => {
    const tooltipId = button.getAttribute('aria-controls');
    const tooltip = document.getElementById(tooltipId);

    if (!tooltip) return;

    // Position tooltip
    function positionTooltip() {
      const cardRect = button.closest('.service-card').getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      // Reset positioning
      tooltip.style.position = 'absolute';
      tooltip.style.left = '0';
      tooltip.style.right = 'auto';
      tooltip.style.top = '100%';
      tooltip.style.marginTop = '8px';
      
      // Check if tooltip would overflow viewport on the right
      setTimeout(() => {
        const tooltipRect = tooltip.getBoundingClientRect();
        if (tooltipRect.right > viewportWidth - 20) {
          tooltip.style.left = 'auto';
          tooltip.style.right = '0';
        }
      }, 0);
    }

    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const isExpanded = this.getAttribute('aria-expanded') === 'true';

      // Close currently open tooltip
      if (currentOpenTooltip && currentOpenTooltip !== tooltip) {
        currentOpenTooltip.hidden = true;
        currentOpenTooltip.previousElementSibling?.setAttribute('aria-expanded', 'false');
      }

      // Toggle current tooltip
      tooltip.hidden = isExpanded;
      this.setAttribute('aria-expanded', !isExpanded);

      if (!isExpanded) {
        currentOpenTooltip = tooltip;
        positionTooltip();
        announceToScreenReader('Tooltip opened');
      } else {
        currentOpenTooltip = null;
        announceToScreenReader('Tooltip closed');
      }
    });

    // Close tooltip on Escape key
    button.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && this.getAttribute('aria-expanded') === 'true') {
        tooltip.hidden = true;
        this.setAttribute('aria-expanded', 'false');
        currentOpenTooltip = null;
        announceToScreenReader('Tooltip closed');
      }
    });
  });

  // Close tooltips when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.info-tooltip') && !e.target.closest('.tooltip-content')) {
      tooltipButtons.forEach(button => {
        const tooltipId = button.getAttribute('aria-controls');
        const tooltip = document.getElementById(tooltipId);
        if (tooltip) {
          tooltip.hidden = true;
          button.setAttribute('aria-expanded', 'false');
        }
      });
      currentOpenTooltip = null;
    }
  });

  // ===========================
  // 5. SCROLL TO TOP BUTTON
  // ===========================
  const scrollTopBtn = document.getElementById('scroll-to-top');

  if (scrollTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    // Smooth scroll to top
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      announceToScreenReader('Scrolling to top of page');
      
      // Focus on skip link after scroll
      setTimeout(() => {
        document.querySelector('.skip-link')?.focus();
      }, 500);
    });
  }

  // ===========================
  // 6. KEYBOARD SHORTCUTS
  // ===========================
  document.addEventListener('keydown', function(e) {
    // Ignore if typing in input fields
    if (e.target.matches('input, textarea, select')) {
      return;
    }

    switch(e.key) {
      case '/':
        e.preventDefault();
        document.getElementById('service-search')?.focus();
        announceToScreenReader('Search box focused');
        break;
      
      case 'h':
      case 'H':
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          announceToScreenReader('Scrolling to top');
        }
        break;
      
      case '1':
        if (e.altKey) {
          e.preventDefault();
          scrollToSection('#membership', 'Navigating to Membership');
        }
        break;
      
      case '2':
        if (e.altKey) {
          e.preventDefault();
          scrollToSection('#contribution', 'Navigating to Contribution');
        }
        break;
      
      case '3':
        if (e.altKey) {
          e.preventDefault();
          scrollToSection('#collection', 'Navigating to Collection');
        }
        break;
      
      case '4':
        if (e.altKey) {
          e.preventDefault();
          scrollToSection('#accreditation', 'Navigating to Accreditation');
        }
        break;
      
      case '5':
        if (e.altKey) {
          e.preventDefault();
          scrollToSection('#benefits', 'Navigating to Benefits');
        }
        break;
    }
  });

  // ===========================
  // 7. ENHANCED FOCUS MANAGEMENT
  // ===========================
  
  // Skip to main content link
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', function(e) {
      e.preventDefault();
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus();
        mainContent.scrollIntoView({ behavior: 'smooth' });
        announceToScreenReader('Skipped to main content');
      }
    });
  }

  // Make service cards fully keyboard accessible
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    const firstLink = card.querySelector('.service-link');
    if (firstLink) {
      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target === card) {
          firstLink.click();
        }
      });
    }
  });

  // ===========================
  // 8. REDUCED MOTION SUPPORT
  // ===========================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    // Override smooth scrolling
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Disable animations
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    `;
    document.head.appendChild(style);
  }

  // ===========================
  // UTILITY FUNCTIONS
  // ===========================
  
  /**
   * Announce messages to screen readers
   * @param {string} message - Message to announce
   */
  function announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-region') || createLiveRegion();
    liveRegion.textContent = message;
    
    // Clear after announcement
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }

  /**
   * Create ARIA live region if it doesn't exist
   * @returns {HTMLElement} Live region element
   */
  function createLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.id = 'live-region';
    liveRegion.className = 'visually-hidden';
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    document.body.appendChild(liveRegion);
    return liveRegion;
  }

  // ===========================
  // INITIALIZATION
  // ===========================
  
  console.log('✓ PWD Accessibility features loaded');
  console.log('Keyboard shortcuts:');
  console.log('  / - Focus search');
  console.log('  H - Scroll to top');
  console.log('  Alt+1-5 - Navigate to sections');

})();
