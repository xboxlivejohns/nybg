# Eciggy UK Static Brochure

Fruity-themed static site for Eciggy UK, suitable for GitHub Pages hosting. Includes hero content, product showcase, and a dedicated contact page with FormSubmit integration.

## Deploy to GitHub Pages
1. Push the contents of this repository to the `main` branch on GitHub.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Branch: `main`** and **Folder: `/ (root)`**.
4. Save. Pages will publish shortly at `https://<your-username>.github.io/<repository>/`.

## Customise content
- **Colours**: Update the CSS custom properties at the top of [`assets/css/style.css`](assets/css/style.css) to adjust background and accent colours.
- **Telephone link**: Replace the `tel:` value in [`index.html`](index.html) and [`pages/contact.html`](pages/contact.html) with your store's phone number.
- **FormSubmit action**: Swap `https://formsubmit.co/your-form-id` in [`pages/contact.html`](pages/contact.html) with the FormSubmit endpoint generated for your email address.

## Accessibility
- Semantic HTML structure with skip link and focus outlines.
- Prefers-reduced-motion respected for users who disable animations.
