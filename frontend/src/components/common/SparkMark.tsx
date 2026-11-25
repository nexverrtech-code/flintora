// The official FLINTORA spark F, traced as vector from the logo artwork (viewBox 486 x 735).
export const SPARK_TOP = 'M96 227 486 0 413 181 16 416z';
export const SPARK_TOP_SHADE = 'M16 416 376 125 413 181z';
export const SPARK_TOP_HI = 'M486 0 413 181 376 125z';
export const SPARK_BOTTOM = 'M169 327 338 403 0 735z';
export const SPARK_BOTTOM_HI = 'M291 385 338 403 0 735z';

interface Props {
  className?: string;
  mono?: boolean;
  title?: string;
}

export function SparkMark({ className, mono, title }: Props) {
  return (
    <svg
      viewBox="0 0 486 735"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path fill={mono ? 'currentColor' : '#FF800D'} d={SPARK_TOP} />
      {!mono && <path fill="#FF9810" d={SPARK_TOP_SHADE} />}
      {!mono && <path fill="#FFA912" d={SPARK_TOP_HI} />}
      <path fill={mono ? 'currentColor' : '#FF800D'} d={SPARK_BOTTOM} />
      {!mono && <path fill="#FFA912" d={SPARK_BOTTOM_HI} />}
    </svg>
  );
}
