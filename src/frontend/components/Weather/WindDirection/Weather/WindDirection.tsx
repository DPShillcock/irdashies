import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useTrackWeather } from '../../../Standings/hooks/useTrackWetness';

export const WindDirection = () => {
  const windVelocity = (): number => {
    return weather.windVelo?.value[0] * (18 / 5) || 0;
  };

  const windDirection = (): number => {
    return weather.windDirection?.value[0] - weather.windYaw?.value[0] || 0;
  };

  /**
   *
   * @param color1  first color
   * @param color2  second color
   * @param factor factor
   * @returns Returns an interpolated color
   */
  const interpolateColor = (
    color1: string,
    color2: string,
    factor: number
  ): string => {
    const hex = (color: string) => {
      const bigint = parseInt(color.slice(1), 16);
      return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    };

    const color1RGB = hex(color1);
    const color2RGB = hex(color2);

    const resultRGB = color1RGB.map((c1, i) => {
      const c2 = color2RGB[i];
      const val = Math.round(c1 + (c2 - c1) * factor).toString(16);
      return val.length === 1 ? '0' + val : val;
    });

    return `#${resultRGB.join('')}`;
  };

  /**
   *
   * @param windSpeed The windspeed to use
   * @returns Returns a colour to represent  wind strength.
   */
  const getColorByWindSpeed = (windSpeed: number): string => {
    const minSpeed = 0;
    const maxSpeed = 40;
    const lowColor = '#00ff00'; // Green for calm wind
    const highColor = '#ff0000'; // Red for strong wind

    const factor = Math.max(
      0,
      Math.min((windSpeed - minSpeed) / (maxSpeed - minSpeed), 1)
    );
    return interpolateColor(lowColor, highColor, factor);
  };

  const [parent] = useAutoAnimate();
  const weather = useTrackWeather();

  const WIND_STRENGTH_COLOR: React.CSSProperties = {
    color: `${getColorByWindSpeed(windVelocity())}`,
  };

  const WIND_DIRECTION: React.CSSProperties = {
    ...WIND_STRENGTH_COLOR,
    rotate: `calc(${windDirection()} * 1rad + 0.5turn)`,
  };

  return (
    <div
      id="wind"
      ref={parent}
      className="flex shrink h-full relative min-h-[200px] bg-slate-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-2 -2 64 64"
        className="absolute stroke-current stroke-4 w-full h-full box-border fill-none  origin-center transform-gpu"
        style={WIND_DIRECTION}
      >
        <path d="M50.0262 7.6624A29.9248 29.9248 90 0160 30c0 16.5685-13.4315 30-30 30S0 46.5685 0 30A29.9254 29.9254 90 0110.0078 7.632M21.5147 8.5 30 .0147 38.4853 8.5" />
      </svg>
      <div
        className="absolute w-full h-full flex justify-center items-center text-[15vmin]"
        style={WIND_STRENGTH_COLOR}
      >
        {windVelocity().toFixed()}
      </div>
    </div>
  );
};
