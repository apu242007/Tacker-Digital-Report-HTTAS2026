import React, { useRef, useEffect, useState } from 'react';
import { Eraser } from 'lucide-react';

interface Props {
  value: string; // base64 string
  onChange: (value: string) => void;
  label?: string;
}

export const SignaturePad: React.FC<Props> = ({ value, onChange, label }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  // Initialize canvas
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      // Set actual resolution
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.lineWidth = 2;
        context.lineCap = 'round';
        context.strokeStyle = '#000000';
        setCtx(context);
      }
    }
  }, []);

  // Redraw if value comes in (e.g. from saved state)
  useEffect(() => {
      if (value && canvasRef.current && ctx) {
          const image = new Image();
          image.onload = () => {
             ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
             ctx.drawImage(image, 0, 0);
          };
          image.src = value;
      } else if (!value && canvasRef.current && ctx) {
          ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      }
  }, [value, ctx]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (ctx) {
        ctx.beginPath(); // Reset path
        // Save to state
        if (canvasRef.current) {
            onChange(canvasRef.current.toDataURL());
        }
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !ctx || !canvasRef.current) return;
    
    e.preventDefault(); // Prevent scrolling on touch

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    let x, y;
    if ('touches' in e) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    } else {
        x = (e as React.MouseEvent).clientX - rect.left;
        y = (e as React.MouseEvent).clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clear = () => {
      if (ctx && canvasRef.current) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          onChange('');
      }
  };

  return (
    <div className="w-full">
        {label && <div className="text-sm font-bold mb-1">{label}</div>}
        <div className="relative border border-gray-400 border-dashed bg-white h-32 w-full touch-none group">
            <canvas
                ref={canvasRef}
                className="w-full h-full cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchEnd={stopDrawing}
                onTouchMove={draw}
            />
            {/* Overlay hint if empty */}
            {!value && !isDrawing && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 text-gray-500 font-bold uppercase text-xs">
                    Firmar Aquí
                </div>
            )}
            
            {/* Clear Button */}
            {(value || isDrawing) && (
                <button 
                    onClick={clear}
                    className="absolute top-1 right-1 p-1 bg-white border border-gray-300 rounded hover:bg-red-50 text-red-500 print:hidden opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Borrar firma"
                >
                    <Eraser size={14} />
                </button>
            )}
        </div>
    </div>
  );
}; 
