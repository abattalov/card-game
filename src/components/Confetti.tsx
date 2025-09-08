import React, { useEffect, useRef, useState } from 'react';

interface ConfettiPiece {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  gravity: number;
  friction: number;
  opacity: number;
  shape: 'square' | 'circle';
}

interface ConfettiProps {
  trigger?: boolean;
  onComplete?: () => void;
  particleCount?: number;
  spread?: number;
  colors?: string[];
}

const Confetti: React.FC<ConfettiProps> = ({
  trigger = false,
  onComplete,
  particleCount = 100,
  spread = 2,
  colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8', '#26de81', '#fc5c65']
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(100);
  const confettiPiecesRef = useRef<ConfettiPiece[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const createConfettiPiece = (x: number, y: number): ConfettiPiece => {
    return {
      x,
      y,
      velocityX: (Math.random() - 0.5) * 10 * spread,
      velocityY: (Math.random() - 0.5) * 10 * spread - 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.1,
      friction: 0.99,
      opacity: 1,
      shape: Math.random() > 0.5 ? 'square' : 'circle'
    };
  };

  const updateConfettiPiece = (piece: ConfettiPiece, canvas: HTMLCanvasElement): boolean => {
    piece.velocityY += piece.gravity;
    piece.velocityX *= piece.friction;
    piece.velocityY *= piece.friction;
    
    piece.x += piece.velocityX;
    piece.y += piece.velocityY;
    piece.rotation += piece.rotationSpeed;
    
    if (piece.y > canvas.height + 10) {
      piece.opacity -= 0.05;
    }
    
    return piece.opacity > 0 && piece.y < canvas.height + 50;
  };

  const drawConfettiPiece = (ctx: CanvasRenderingContext2D, piece: ConfettiPiece) => {
    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation * Math.PI / 180);
    ctx.globalAlpha = piece.opacity;
    ctx.fillStyle = piece.color;
    
    if (piece.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, piece.size, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(-piece.size/2, -piece.size/2, piece.size, piece.size);
    }
    
    ctx.restore();
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    confettiPiecesRef.current = confettiPiecesRef.current.filter(piece => {
      const shouldKeep = updateConfettiPiece(piece, canvas);
      if (shouldKeep) {
        drawConfettiPiece(ctx, piece);
      }
      return shouldKeep;
    });
    
    if (confettiPiecesRef.current.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setIsAnimating(false);
      onComplete?.();
    }
  };

  const burst = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    confettiPiecesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      confettiPiecesRef.current.push(createConfettiPiece(centerX, centerY));
    }
    
    setIsAnimating(true);
    animate();
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (trigger) {
      burst();
    }
  }, [trigger]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
        style={{ display: isAnimating ? 'block' : 'none' }}
      />
    </>
  );
};

export default Confetti;