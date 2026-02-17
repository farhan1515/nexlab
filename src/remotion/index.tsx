// Export all service videos
export { AppDevelopmentVideo } from './AppDevelopmentVideo';
export { Web3DVideo } from './Web3DVideo';
export { FlyerVideo } from './FlyerVideo';
export { WhatsAppVideo } from './WhatsAppVideo';
export { AIVoiceVideo } from './AIVoiceVideo';
export { CustomAIVideo } from './CustomAIVideo';

// Video configuration
export const videoConfig = {
  fps: 30,
  durationInFrames: 150, // 5 seconds
  compositionWidth: 400,
  compositionHeight: 300,
};

// Service to video component mapping
export const serviceVideos = {
  'App Development': 'AppDevelopmentVideo',
  '3D Web Development': 'Web3DVideo',
  'Flyer Creation': 'FlyerVideo',
  'WhatsApp Automation': 'WhatsAppVideo',
  'AI Voice Calling Agent': 'AIVoiceVideo',
  'Custom AI Solutions': 'CustomAIVideo',
};
