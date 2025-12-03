import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

export interface VoiceCommand {
  command: string
  action: () => void
  description: string
}

export const useAccessibility = () => {
  // High Contrast Mode
  const isHighContrast = ref(false)
  
  // Text Size (0 = normal, 1 = large, 2 = extra large)
  const textSizeLevel = ref(0)
  
  // Voice Navigation
  const isVoiceActive = ref(false)
  const voiceStatus = ref('')
  const voiceSupported = ref(false)
  
  // Speech Recognition
  let recognition: any = null

  /**
   * Toggle High Contrast Mode
   */
  const toggleHighContrast = () => {
    isHighContrast.value = !isHighContrast.value
    
    if (process.client) {
      if (isHighContrast.value) {
        document.body.classList.add('high-contrast')
        localStorage.setItem('philhealth_high_contrast', 'enabled')
      } else {
        document.body.classList.remove('high-contrast')
        localStorage.setItem('philhealth_high_contrast', 'disabled')
      }
      
      announceToScreenReader(
        isHighContrast.value ? 'High contrast mode enabled' : 'High contrast mode disabled'
      )
    }
  }

  /**
   * Cycle through text sizes
   */
  const cycleTextSize = () => {
    textSizeLevel.value = (textSizeLevel.value + 1) % 3
    
    if (process.client) {
      document.body.classList.remove('large-text', 'extra-large-text')
      
      if (textSizeLevel.value === 1) {
        document.body.classList.add('large-text')
        announceToScreenReader('Text size increased to large')
      } else if (textSizeLevel.value === 2) {
        document.body.classList.add('extra-large-text')
        announceToScreenReader('Text size increased to extra large')
      } else {
        announceToScreenReader('Text size reset to normal')
      }
      
      localStorage.setItem('philhealth_text_size', textSizeLevel.value.toString())
    }
  }

  /**
   * Get text size label
   */
  const textSizeLabel = computed(() => {
    switch (textSizeLevel.value) {
      case 1: return 'Large'
      case 2: return 'Extra Large'
      default: return 'Normal'
    }
  })

  /**
   * Initialize Voice Navigation
   */
  const initVoiceNavigation = (commands: VoiceCommand[]) => {
    if (!process.client) return

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      voiceSupported.value = false
      console.warn('Speech recognition not supported in this browser')
      return
    }

    voiceSupported.value = true
    recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      voiceStatus.value = 'Listening...'
    }

    recognition.onresult = (event: any) => {
      const last = event.results.length - 1
      const command = event.results[last][0].transcript.toLowerCase().trim()
      
      voiceStatus.value = `Heard: "${command}"`

      // Find matching command
      let commandFound = false
      for (const cmd of commands) {
        if (command.includes(cmd.command.toLowerCase())) {
          cmd.action()
          commandFound = true
          setTimeout(() => {
            if (isVoiceActive.value) {
              voiceStatus.value = 'Listening...'
            }
          }, 1500)
          break
        }
      }

      if (!commandFound) {
        voiceStatus.value = 'Command not recognized'
        setTimeout(() => {
          if (isVoiceActive.value) {
            voiceStatus.value = 'Listening...'
          }
        }, 2000)
      }
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        voiceStatus.value = 'Microphone access denied'
        isVoiceActive.value = false
      } else if (event.error === 'network') {
        voiceStatus.value = 'Network error - check connection'
        isVoiceActive.value = false
      } else {
        voiceStatus.value = 'Error: ' + event.error
      }
    }

    recognition.onend = () => {
      if (isVoiceActive.value) {
        try {
          setTimeout(() => {
            if (isVoiceActive.value && recognition) {
              recognition.start()
            }
          }, 100)
        } catch (e) {
          console.error('Error restarting recognition:', e)
          isVoiceActive.value = false
        }
      } else {
        voiceStatus.value = ''
      }
    }
  }

  /**
   * Toggle Voice Navigation
   */
  const toggleVoiceNavigation = async () => {
    if (!voiceSupported.value) {
      alert('Voice navigation is not supported in this browser. Please use Chrome or Edge.')
      return
    }

    isVoiceActive.value = !isVoiceActive.value

    if (isVoiceActive.value) {
      try {
        // Request microphone permission
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          await navigator.mediaDevices.getUserMedia({ audio: true })
        }

        recognition?.start()
        voiceStatus.value = 'Starting...'
        announceToScreenReader('Voice navigation enabled. Say a command or say "help"')
      } catch (e: any) {
        console.error('Could not start voice recognition:', e)
        isVoiceActive.value = false
        
        if (e.name === 'NotAllowedError') {
          alert('Microphone access is required for voice navigation. Please allow microphone access and try again.')
        } else {
          alert('Voice recognition failed to start: ' + e.message)
        }
      }
    } else {
      recognition?.stop()
      voiceStatus.value = ''
      announceToScreenReader('Voice navigation disabled')
    }
  }

  /**
   * Announce message to screen readers
   */
  const announceToScreenReader = (message: string) => {
    if (!process.client) return

    let liveRegion = document.getElementById('a11y-live-region')
    
    if (!liveRegion) {
      liveRegion = document.createElement('div')
      liveRegion.id = 'a11y-live-region'
      liveRegion.className = 'sr-only'
      liveRegion.setAttribute('role', 'status')
      liveRegion.setAttribute('aria-live', 'polite')
      liveRegion.setAttribute('aria-atomic', 'true')
      document.body.appendChild(liveRegion)
    }

    liveRegion.textContent = message

    // Clear after announcement
    setTimeout(() => {
      liveRegion!.textContent = ''
    }, 1000)
  }

  /**
   * Scroll to section smoothly
   */
  const scrollToSection = (selector: string, message?: string) => {
    if (!process.client) return

    const section = document.querySelector(selector)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      
      // Make section focusable temporarily
      section.setAttribute('tabindex', '-1')
      ;(section as HTMLElement).focus()
      
      if (message) {
        announceToScreenReader(message)
      }

      // Remove tabindex after focus
      setTimeout(() => section.removeAttribute('tabindex'), 1000)
    }
  }

  /**
   * Load saved preferences
   */
  const loadPreferences = () => {
    if (!process.client) return

    // High contrast
    const savedContrast = localStorage.getItem('philhealth_high_contrast')
    if (savedContrast === 'enabled') {
      isHighContrast.value = true
      document.body.classList.add('high-contrast')
    }

    // Text size
    const savedTextSize = localStorage.getItem('philhealth_text_size')
    if (savedTextSize) {
      textSizeLevel.value = parseInt(savedTextSize, 10)
      
      if (textSizeLevel.value === 1) {
        document.body.classList.add('large-text')
      } else if (textSizeLevel.value === 2) {
        document.body.classList.add('extra-large-text')
      }
    }
  }

  /**
   * Cleanup on component unmount
   */
  const cleanup = () => {
    if (recognition) {
      recognition.stop()
      recognition = null
    }
  }

  // Initialize on mount
  onMounted(() => {
    loadPreferences()
  })

  onBeforeUnmount(() => {
    cleanup()
  })

  return {
    // State
    isHighContrast,
    textSizeLevel,
    textSizeLabel,
    isVoiceActive,
    voiceStatus,
    voiceSupported,

    // Methods
    toggleHighContrast,
    cycleTextSize,
    initVoiceNavigation,
    toggleVoiceNavigation,
    announceToScreenReader,
    scrollToSection,
    loadPreferences
  }
}
