import {useEffect, useRef} from 'react';
import QRCode from 'qrcode';

/**
 * Client-side QR code component that renders an SVG QR code.
 * Encodes a verification URL for the given discount code.
 *
 * @param {{code: string, size?: number, className?: string}} props
 */
export function DiscountQRCode({code, size = 200, className = ''}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !code) return;

    const url = `https://locallysauced.uk/verify/${encodeURIComponent(code)}`;

    QRCode.toCanvas(canvasRef.current, url, {
      width: size,
      margin: 2,
      color: {
        dark: '#5C1A1A', // brand burgundy
        light: '#FFFFFF',
      },
    }).catch((err) => console.error('QR code error:', err));
  }, [code, size]);

  return (
    <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
      <canvas ref={canvasRef} />
      <span className="text-xs font-mono text-muted-foreground select-all">
        {code}
      </span>
    </div>
  );
}
