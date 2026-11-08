# Public pages and navigation

| Route | Component | Purpose |
| --- | --- | --- |
| `/` | HomePage.jsx | Landing page, explanation, and registration/login links. |
| `/login` | LoginPage.jsx | Email/password form, register link, and forgot-password link. |
| `/register` | RegisterPage.jsx | Name, email, password, and confirm-password form. |
| `/forgot-password` | ForgotPasswordPage.jsx | Email form and return-to-login link. |
| `/about` | AboutPage.jsx | Existing project introduction, linked from the footer. |
| Other paths | App.jsx fallback | Missing-page message and home link. |

Navigation uses React Router's BrowserRouter, Routes, Route, Link, and NavLink.
Each page is a plain JavaScript function component with standard HTML and Tailwind CSS.
Form messages use useState; inputs use native required, email, and password-length
validation. Registration also checks that the passwords match.

These pages do not implement authentication. Submissions show that account actions
are unavailable; no account is created, no login session is opened, and no reset
email is sent. Form values are not logged or saved to browser storage.

The header links to Home, Login, Register, and the landing page's How it works,
Explore skills, and Community sections. Password recovery is linked from the login
page and footer. The landing page's primary buttons link to registration.

## Tailwind design

- Tailwind CSS 4 and its official Vite plugin are installed as development dependencies.
- `index.css` imports Tailwind and defines a few readable shared classes, including
  `btn-primary`, `btn-secondary`, `form-input`, and `form-label`.
- `Brand.jsx` shares the logo; `AuthLayout.jsx` shares the account-page layout.
- Responsive grid/flex utilities stack content on small screens.
- A soft purple/pink background, gradient buttons, rounded cards, and visible focus
  states follow the supplied visual reference without external images or fonts.
- The login page includes a show/hide password button with an accessible label.
- Landing-page partners are clearly identified as illustrative profiles.

Setup follows the [official Tailwind Vite guide](https://tailwindcss.com/docs/installation/using-vite).
No TypeScript, UI kit, form library, or global state library is required.
