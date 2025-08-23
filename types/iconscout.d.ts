declare module '@iconscout/react-unicons' {
  import type { FC, SVGProps } from 'react';

  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    className?: string;
  }

  export const UilPen: FC<IconProps>;
  export const UilApps: FC<IconProps>;
  export const UilArrowLeft: FC<IconProps>;
  export const UilMoon: FC<IconProps>;
  export const UilMultiply: FC<IconProps>;
  export const UilSun: FC<IconProps>;
  export const UilBitcoinCircle: FC<IconProps>;
  export const UilHome: FC<IconProps>;
  export const UilUser: FC<IconProps>;
  export const UilCheckCircle: FC<IconProps>;
  export const UilCopy: FC<IconProps>;
  export const UilGithub: FC<IconProps>;
  export const UilLinkedin: FC<IconProps>;
}
