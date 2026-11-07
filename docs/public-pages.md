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
Each page is a plain JavaScript function component with standard HTML and CSS.
Form messages use useState; inputs use native required, email, and password-length
validation. Registration also checks that the passwords match.

These pages do not implement authentication. Submissions show that account actions
are unavailable; no account is created, no login session is opened, and no reset
email is sent. Form values are not logged or saved to browser storage.

The header links to Home, Login, and Register. Password recovery is linked from the
login page and footer. The landing page links directly to registration and login.
CSS provides layouts for desktop and small screens with visible keyboard focus.
