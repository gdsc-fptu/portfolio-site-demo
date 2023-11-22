# GDSC Portfolio Site

## How to run 🚀

- Clone project

```bash
git clone https://github.com/GDSC-FPTU-DN/portfolio-site.git
```

- Install node requirements

```bash
npm install
```

- Start app

```bash
npm run dev
```

## Technologies 🧑‍💻

- Main framework `ReactJS + JavaScript`
- Style `sass`
- Class manipulation `clsx`
- Router `react-router-dom`
- State management `zustand`

## Documentation 📃

### Add new color

- In `src/utils/enum/color.ts`.

```js
export enum GoogleColor {
    ...
    newColor = "COLOR_ALIAS"
}

export function getHexByColor(color: GoogleColor) {
    ...
    if (color === GoogleColor.newColor) {
        return "HEX_CODE_OF_COLOR";
    }
}
```

- In `src/index.css`.

```css
:root {
    ...
    /* Colors */
    --color-new-color: #HEX_CODE_OF_COLOR;
}
```

- In `src/components/Shared/Background/style.module.scss`.

```css
... &_COLOR_ALIAS {
  @extend .background_dotted;
  background-image: radial-gradient(
    var(--color-new-color) 0.106rem,
    transparent 0
  );
}
```

- In `src/components/Shared/Badges/style.module.scss`.

```css
... &_COLOR_ALIAS {
  @extend .badge;
  background-color: var(--color-new-color);

  &:hover {
    box-shadow: 0 0.5rem 1rem 0 var(--color-new-color);
  }
}
```

- In `src/pages/PortfolioPage/style.module.scss`.

```css
/* Find the comment */
// NEW COLORS APPEND HERE 👇

/* And add new color here */
```
