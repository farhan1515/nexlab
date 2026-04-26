import { useRef, useEffect, useState } from 'react';
import { Player } from '@remotion/player';
import type { PlayerRef } from '@remotion/player';
import {
  AppDevelopmentVideo,
  Web3DVideo,
  FlyerVideo,
  WhatsAppVideo,
  AIVoiceVideo,
  CustomAIVideo,
  GoogleAISearchVideo,
} from '../remotion';

interface ServiceVideoPlayerProps {
  serviceName: string;
  className?: string;
  isActive?: boolean; // Controlled from parent (scroll-driven)
}

// Map service names to video components and durations
const videoConfig: Record<string, { component: React.ComponentType; duration: number }> = {
  'App Development': { component: AppDevelopmentVideo, duration: 200 },
  '3D Web Development': { component: Web3DVideo, duration: 200 },
  'Flyer Creation': { component: FlyerVideo, duration: 150 },
  'Flyer & Brand Design': { component: FlyerVideo, duration: 150 },
  'WhatsApp Automation': { component: WhatsAppVideo, duration: 210 },
  'AI Voice Calling Agent': { component: AIVoiceVideo, duration: 210 },
  'Custom AI Solutions': { component: CustomAIVideo, duration: 200 },
  'Google & AI Search': { component: GoogleAISearchVideo, duration: 240 },
};

export const ServiceVideoPlayer = ({
  serviceName,
  className = '',
  isActive = false,
}: ServiceVideoPlayerProps) => {
  const playerRef = useRef<PlayerRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Get the video config for this service
  const config = videoConfig[serviceName];
  const VideoComponent = config?.component;
  const durationInFrames = config?.duration ?? 150;

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set loaded after a short delay (Player mounts quickly)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Control playback based on isActive prop (from scroll-driven parent)
  useEffect(() => {
    if (!playerRef.current || !isLoaded) return;

    if (isActive) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  }, [isActive, isLoaded]);

  if (!VideoComponent) {
    if (import.meta.env.DEV) {
      console.warn(`No video component found for service: ${serviceName}`);
    }
    return null;
  }

  // Responsive composition dimensions
  const compositionWidth = isMobile ? 360 : 480;
  const compositionHeight = isMobile ? 270 : 360;

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-2xl ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(15,15,26,0.9), rgba(10,10,20,0.95))',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      }}
    >
      {/* Remotion Player - Responsive */}
      <div className="w-full h-full flex items-center justify-center">
        <Player
          ref={playerRef}
          component={VideoComponent}
          durationInFrames={durationInFrames}
          compositionWidth={compositionWidth}
          compositionHeight={compositionHeight}
          fps={30}
          controls={false}
          autoPlay={false}
          loop={true}
          clickToPlay={false}
          doubleClickToFullscreen={false}
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '100%',
            aspectRatio: `${compositionWidth}/${compositionHeight}`,
          }}
          acknowledgeRemotionLicense
        />
      </div>

      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark/50 z-10">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ServiceVideoPlayer;
