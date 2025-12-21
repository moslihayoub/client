
import React from 'react';

export interface LogMessage {
  role: 'user' | 'system' | 'model';
  text: string;
  timestamp: Date;
}

export interface VisualizerState {
  isTalking: boolean;
  volume: number; // 0.0 to 1.0
}

export enum AppState {
  IDLE = 'IDLE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  ERROR = 'ERROR'
}

// Fix: Standard HTML elements were disappearing because of a global JSX namespace shadow.
// Instead of augmenting global JSX here, we handle custom elements locally in components using type assertions.
