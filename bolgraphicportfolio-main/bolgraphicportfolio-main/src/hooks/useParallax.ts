import { useEffect, useRef, useState } from 'react';

interface ParallaxOptions {
  intensity?: number; // Multiplier for movement (default: 1)
  enableTouch?: boolean; // Enable touch-based parallax (default: true)
  enableGyroscope?: boolean; // Enable gyroscope-based parallax (default: true)
  maxMovement?: number; // Maximum movement in pixels (default: 12 for mobile, 18 for desktop)
  smoothing?: number; // Smoothing factor for movement (0-1, default: 0.15)
  deadZone?: number; // Dead zone for touch to prevent jitter (default: 5)
}

interface ParallaxValues {
  x: number;
  y: number;
}

/**
 * Custom hook for mouse, touch, and gyroscope-based parallax effects.
 * 
 * This hook provides smooth parallax values based on:
 * - Desktop: Mouse movement relative to screen center
 * - Mobile: Touch drag and device orientation (gyroscope)
 * 
 * Usage:
 * const { x, y } = useParallax({ intensity: 1.5, maxMovement: 20 });
 * 
 * Apply to motion components:
 * <motion.div style={{ x, y }} />
 * 
 * Or with transform:
 * <motion.div style={{ transform: `translate3d(${x}px, ${y}px, 0)` }} />
 */
export function useParallax(options: ParallaxOptions = {}) {
  const {
    intensity = 1,
    enableTouch = true,
    enableGyroscope = true,
    maxMovement,
    smoothing = 0.15,
    deadZone = 5,
  } = options;

  // Auto-detect device type and set appropriate maxMovement
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const finalMaxMovement = maxMovement || (isMobile ? 12 : 18);

  // Store current parallax values in refs to avoid re-renders
  const targetRef = useRef<ParallaxValues>({ x: 0, y: 0 });
  const currentRef = useRef<ParallaxValues>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // State for parallax values (only updated when needed)
  const [parallaxValues, setParallaxValues] = useState<ParallaxValues>({ x: 0, y: 0 });

  // Check if user prefers reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // Skip if reduced motion is preferred
    if (prefersReducedMotion) {
      return;
    }

    // Smooth animation loop using requestAnimationFrame
    const animate = () => {
      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;

      // Apply smoothing using linear interpolation (lerp)
      currentRef.current.x += dx * smoothing;
      currentRef.current.y += dy * smoothing;

      // Update state (triggers re-render)
      setParallaxValues({
        x: currentRef.current.x,
        y: currentRef.current.y,
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Handle mouse movement (desktop)
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate offset from center (-1 to 1)
      const offsetX = (e.clientX - centerX) / centerX;
      const offsetY = (e.clientY - centerY) / centerY;

      // Apply intensity and max movement
      targetRef.current.x = Math.max(
        -finalMaxMovement,
        Math.min(finalMaxMovement, offsetX * finalMaxMovement * intensity)
      );
      targetRef.current.y = Math.max(
        -finalMaxMovement,
        Math.min(finalMaxMovement, offsetY * finalMaxMovement * intensity)
      );
    };

    // Handle touch movement (mobile)
    const handleTouchStart = (e: TouchEvent) => {
      if (!enableTouch) return;
      
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!enableTouch || !touchStartRef.current) return;

      const touch = e.touches[0];
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate current touch position relative to center
      const offsetX = (touch.clientX - centerX) / centerX;
      const offsetY = (touch.clientY - centerY) / centerY;

      // Apply dead zone to prevent jitter
      const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
      const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

      if (deltaX < deadZone && deltaY < deadZone) {
        return;
      }

      // Apply intensity and max movement
      targetRef.current.x = Math.max(
        -finalMaxMovement,
        Math.min(finalMaxMovement, offsetX * finalMaxMovement * intensity)
      );
      targetRef.current.y = Math.max(
        -finalMaxMovement,
        Math.min(finalMaxMovement, offsetY * finalMaxMovement * intensity)
      );
    };

    const handleTouchEnd = () => {
      touchStartRef.current = null;
    };

    // Handle device orientation (gyroscope) - fallback for mobile
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!enableGyroscope || !isMobile) return;

      // beta: front-to-back tilt (-180 to 180)
      // gamma: left-to-right tilt (-90 to 90)
      const beta = e.beta || 0;
      const gamma = e.gamma || 0;

      // Normalize and clamp values
      // For portrait orientation
      const normalizedX = Math.max(-1, Math.min(1, gamma / 45)); // -45 to 45 degrees
      const normalizedY = Math.max(-1, Math.min(1, (beta - 90) / 45)); // 45 to 135 degrees (centered at 90)

      // Apply intensity and max movement
      targetRef.current.x = normalizedX * finalMaxMovement * intensity * 0.5; // Reduce intensity for gyro
      targetRef.current.y = normalizedY * finalMaxMovement * intensity * 0.5;
    };

    // Add event listeners
    if (!isMobile) {
      // Desktop: mouse tracking
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    } else if (enableTouch) {
      // Mobile: touch tracking
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    // Gyroscope support (with permission for iOS 13+)
    if (enableGyroscope && isMobile) {
      // Check if DeviceOrientationEvent requires permission (iOS 13+)
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof (DeviceOrientationEvent as any).requestPermission === 'function'
      ) {
        // Permission will be requested via user interaction (see useGyroscopePermission hook)
        // For now, just add the listener (it won't fire without permission)
        window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
      } else if (typeof DeviceOrientationEvent !== 'undefined') {
        // Android or older iOS - no permission needed
        window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
      }
    }

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [intensity, enableTouch, enableGyroscope, finalMaxMovement, smoothing, deadZone, prefersReducedMotion, isMobile]);

  return parallaxValues;
}

/**
 * Hook to request gyroscope permission on iOS devices.
 * Call this from a user interaction (e.g., button click).
 */
export function useGyroscopePermission() {
  const [permission, setPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  const requestPermission = async () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        setPermission(response);
        return response === 'granted';
      } catch (error) {
        console.error('Error requesting device orientation permission:', error);
        setPermission('denied');
        return false;
      }
    } else {
      // Not iOS 13+ or not supported
      setPermission('granted');
      return true;
    }
  };

  return { permission, requestPermission };
}
