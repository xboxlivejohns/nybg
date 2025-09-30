# North Yorkshire Bottled Gas Static Site

Marketing-focused static site for North Yorkshire Bottled Gas, a Flogas LPG stockist serving homes and businesses across the county. The site includes a service overview, delivery information, and a dedicated contact form suitable for GitHub Pages hosting.

## Deploy to GitHub Pages
1. Push the contents of this repository to the `main` branch on GitHub.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Branch: `main`** and **Folder: `/ (root)`**.
4. Save. Pages will publish shortly at `https://<your-username>.github.io/<repository>/`.

## Customise content
- **Colours**: Update the CSS custom properties at the top of [`assets/css/style.css`](assets/css/style.css) to adjust background and accent colours.
- **Telephone &amp; email links**: Replace the `tel:` and `mailto:` values in [`index.html`](index.html) and [`pages/contact.html`](pages/contact.html) with the latest business contact details.
- **FormSubmit action**: Swap `https://formsubmit.co/orders@northyorkshirebottledgas.co.uk` in [`pages/contact.html`](pages/contact.html) with the FormSubmit endpoint generated for your email address.
- **Structured data**: Update [`structured-data.json`](structured-data.json) if your address, phone number, or hours change.

## Accessibility
- Semantic HTML structure with skip link and focus outlines.
- Prefers-reduced-motion respected for users who disable animations.
