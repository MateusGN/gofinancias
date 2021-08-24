import "styled-components";
import theme from "./theme";

declare module "styled-componenets" {
  type ThemeType = typeof theme;

  export interface DefaultTheme extends ThemeType {}
}
