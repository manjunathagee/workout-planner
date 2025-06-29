import { Howl } from 'howler';

// Create audio instances for different workout sounds
const sounds = {
  // Timer end sound
  timerEnd: new Howl({
    src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAaByCA0/HKdSMGKnvG8NyVQQsUVrLq66dTEgpJpODwtGQdBjOZ1/LNeSsFJHPJ8N2QQgoVYrPk66dVEgpKnN/ztmciByN6yO/dlUEJElyx5uumVBMKRZze8rhmIAYmiL/y2YU8CRdPw+Xo2I87ChVet+f6wm0rByJ8yvDjkUAJElKx6O62XSUKOoS98t2eQQgPVb7c5r52MQoQQMbVwX07DRVZ0ujp5mEfBip7z/DhlUMKD1Oz5eyrXSICJ3fH8N2QQAoUXrTp66dTEgpJpODwtGQdBjOZ1/LNeSsFJHPJ8N2QQgoVYrPk66dVEgpKnN/ztmciByJ8yvDjkUAJElKx6O62XSQKOoS98t2eQQgPVb7c5r52MQoQQMbVwX07DRVZ0ujp5mEfBip7z/DhlUMKD1Oz5eyrXSICJ3fH8N2QQAoUXrTp66dTEgpJpODwtGQdBjOZ1/LNeSsFJHPJ8N2QQgoVYrPk66dVEgpKnN/ztmciByJ8yvDjkUAJElKx6O62XSQKOoS98t2eQQgPVb7c5r52MQoQQMbVwX07DRVZ0ujp5mEfBip7z/DhlUMKD1Oz5eyrXSICJ3fH8N2QQAoUXrTp66dTEgpJpODwtGQdBjOZ1/LNeSsFJHPJ8N2QQgoVYrPk66dVEgpKnN/ztmciByJ8yvDjkUAJElKx6O62XSQKOoS98t2eQQgPVb7c5r52MQoQQMbVwX07DRVZ0ujp5mEfBip7z/DhlUMKD1Oz5eyrXSICJ3fH8N2QQAoUXrTp66dTEgpJpODwtGQdBjOZ1/LNeSsFJHPJ8N2QQgoVYrPk66dVEgpKnN/ztmciByJ8yvDjkUAJElKx6O62XSQKOoS98t2eQQgPVb7c5r52MQoQQMbVwX07DRVZ0ujp5mEfBip7z/DhlUMKD1Oz5eyrXSICJ3fH8N2QQAoUXrTp66dTEgpJpODwtGQdBjOZ1/LNeSsFJHPJ8N2QQgoVYrPk66dVEgpKnN/ztmciByJ8yvDjkUAJElKx6O62XSUKOoS98t2eQQgPVb7c5r52MQoQQMbVwX07DRVZ0ujp5mEfBip7z/DhlUMKD1Oz5eyrXSICJ3fH8N2QQAoUXrTp66dTEgpJpODwtGQdBjOZ1/LNeSsFJHPJ8N2QQgoVYrPk66dVEgpKnN/ztmciByJ8yvDjkUAJElKx6O62XSQKOoS98t2eQQgPVb7c5r52MQoQQMbVwX07DRVZ0ujp5mEfBip7z/DhlUMKD1Oz5eyrXSICJ3fH8N2QQAoUXrTp66dTEgpJpODwtGQdBjOZ1/LNeSsFJHPJ8N2QQgoVYrPk66dVEgpKnN/ztmciByJ8yvDjkUAJElKx6O62XSQKOoS98t2eQQgPVb7c5r52MQoQQMbVwX07DRs='],
    volume: 0.5
  }),
  
  // Set complete sound
  setComplete: new Howl({
    src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAaByCA0/HKdSMGKnvG8NyVQQsUVrLq66dTEgpJpODwtGQdBjOZ1/LNeSsFJHPJ8N2QQgoVYrPk66dVEgpKnN/ztmciByN6yO/dlUEJElyx5uumVBMKRZze8rhmIAYmiL/y2YU8CRdPw+Xo2I87ChVet+f6wm0rByJ8yvDjkUAJElKx6O62XSUKOoS98t2eQQgPVb7c5r52MQoQQMbVwX07DRs='],
    volume: 0.3
  }),
  
  // Workout complete sound
  workoutComplete: new Howl({
    src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAaByCA0/HKdSMGKnvG8NyVQQsUVrLq66dTEgpJpODwtGQdBjOZ1/LNeSsFJHPJ8N2QQgoVYrPk66dVEgpKnN/ztmciByN6yO/dlUEJElyx5uumVBMKRZze8rhmIAYmiL/y2YU8CRdPw+Xo2I87ChVet+f6wm0rByJ8yvDjkUAJElKx6O62XSUKOoS98t2eQQgPVb7c5r52MQoQQMbVwX07DRVZ0ujp5mEfBip7z/DhlUMKD1Oz5eyrXSICJ3fH8N2QQAoUXrTp66dTEgpJpODwtGQdBjOZ1/LNeSsFJHPJ8N2QQgoVYrPk66dVEgpKnN/ztmciByJ8yvDjkUAJElKx6O62XSQKOoS98t2eQQgPVb7c5r52MQoQQMbVwX07DRs='],
    volume: 0.7
  }),
  
  // 10 second warning
  warning: new Howl({
    src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAaByCA0/HKdSMGKnvG8NyVQQsUVrLq66dTEgpJpODwtGQdBjOZ1/LNeSsFJHPJ8N2QQgoVYrPk66dVEgpKnN/ztmciByN6yO/dlUEJElyx5uumVBMKRZze8rhmIAYmiL/y2YU8CRdPw+Xo2I87ChVet+f6wm0rByJ8yvDjkUAJElKx6O62XSUKOoS98t2eQQgPVb7c5r52MQoQQMbVwX07DRVZ0ujp5mEfBip7z/DhlUMKD1Oz5eyrXSICJ3fH8N2QQAoUXrTp66dTEgpJpODwtGQdBjOZ1/LNeSsFJHPJ8N2QQgoVYrPk66dVEgpKnN/ztmciByJ8yvDjkUAJElKx6O62XSQKOoS98t2eQQgPVb7c5r52MQoQQMbVwX07DRVZ0ujp5mEfBip7z/DhlUMKD1Oz5eyrXSICJ3fH8N2QQAoUXrTp66dTEgpJpODwtGQdBjOZ1/LNeSsFJHPJ8N2QQgoVYrPk66dVEgpKnN/ztmciByJ8yvDjkUAJElKx6O62XSQKOoS98t2eQQgPVb7c5r52MQoQQMbVwX07DRs='],
    volume: 0.4
  })
};

export class AudioManager {
  private static instance: AudioManager;
  private soundEnabled = true;

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  playTimerEnd() {
    if (this.soundEnabled) {
      sounds.timerEnd.play();
    }
  }

  playSetComplete() {
    if (this.soundEnabled) {
      sounds.setComplete.play();
    }
  }

  playWorkoutComplete() {
    if (this.soundEnabled) {
      sounds.workoutComplete.play();
    }
  }

  playWarning() {
    if (this.soundEnabled) {
      sounds.warning.play();
    }
  }

  // Alternative method using Web Audio API for custom beep sounds
  playBeep(frequency = 800, duration = 200, volume = 0.3) {
    if (!this.soundEnabled) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }

  // Play different beep patterns
  playStartBeep() {
    if (this.soundEnabled) {
      this.playBeep(800, 200);
      setTimeout(() => this.playBeep(1000, 200), 300);
      setTimeout(() => this.playBeep(1200, 300), 600);
    }
  }

  playEndBeep() {
    if (this.soundEnabled) {
      this.playBeep(1200, 200);
      setTimeout(() => this.playBeep(1000, 200), 300);
      setTimeout(() => this.playBeep(800, 300), 600);
    }
  }

  playCountdownBeep() {
    if (this.soundEnabled) {
      this.playBeep(600, 150);
    }
  }
}

export const audioManager = AudioManager.getInstance();