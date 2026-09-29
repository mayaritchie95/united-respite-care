# United Respite Care — Landing Page

A single-page, mobile-friendly landing page for United Respite Care Inc., built for
Google Ads traffic targeting **home care in Surrey and Langley, BC**.

Static site — plain HTML, CSS and JS. No build step, no dependencies.

## Files

```
index.html      The landing page
styles.css      Responsive styles
script.js       Form handling + selectable chips
assets/         Logo, photos, BBB seal, background texture
robots.txt
```

## Publish on GitHub Pages

1. Create a new repository and upload every file, keeping the `assets/` folder intact.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Save. Your page goes live at `https://<username>.github.io/<repo>/` within a minute or two.
5. To use your own domain (`unitedrespitecare.ca`), add it under **Settings → Pages → Custom domain**
   and point your DNS to GitHub. (Ask your domain provider or PagePros/LeadPRO to set the DNS records.)

## Make the contact form send emails

The form is pre-wired for **Formspree** (free tier is fine) with a **mailto fallback**.

**Option A — Formspree (recommended):**
1. Sign up at https://formspree.io with **info@unitedrespitecare.ca**.
2. Create a form; Formspree gives you an endpoint like `https://formspree.io/f/abcdwxyz`.
3. In `index.html`, find `action="https://formspree.io/f/YOUR_FORM_ID"` and replace
   `YOUR_FORM_ID` with your real ID.
4. Submissions now email straight to info@unitedrespitecare.ca. Done.

**Option B — do nothing:**
If you leave `YOUR_FORM_ID` in place, the form opens the visitor's email app with all
their answers pre-filled, addressed to info@unitedrespitecare.ca. It still works, it just
relies on the visitor pressing send.

## Tracking (for LeadPRO / your marketer)

Add these in the `<head>` of `index.html` when ready:
- **Google Analytics 4** tag
- **Google Ads** conversion tag, firing on the form's thank-you state
  (the `#thanks-panel` becoming visible) and on clicks of the `tel:` phone links
- **Google Search Console** verification meta tag

Lead-source note: the page already carries schema.org LocalBusiness markup and clean
section anchors (see `GOOGLE-ADS-SITELINKS.md`) so ad sitelinks can deep-link into it.

## Editing content

- **Phone number** appears in the header, hero, sticky mobile bar, service-area box and footer.
- **Reviews** are three real Google reviews (Dawn M, Michael Bodnarchuk, Anna & Richard Robinson).
- **Photos** are your supplied images. Swap any file in `assets/` keeping the same filename to update it.
- **Service area** is currently Surrey and Langley (plus South Surrey, Fleetwood, Cloverdale),
  matching the ad brief. Add Delta if you want it included.

## Brand

| Use | Colour |
|-----|--------|
| Main | `#2B274A` |
| Background | `#E5D3AA` |
| Accent (used sparingly) | `#ECB30F` |
| Button hover | `#1D92FF` |

Fonts: Newsreader (headings) and Atkinson Hyperlegible (body, chosen for readability by older visitors).
