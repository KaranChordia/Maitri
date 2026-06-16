# Maitri Dolls

Maitri Dolls is a story-first companion doll universe inspired by remarkable women from India's history and present day.

The project currently focuses on the accepted foundation retainer: website interest capture, Manu's character universe, and Instagram + YouTube presence before heavier school, preorder, product launch, or AI workflow expansion.

The latest product-development direction is to launch one complete first-box experience before scaling the wider ecosystem. For Manu, this means a doll plus a 32-page storybook, letter, activities, and stickers, with accessories and playsets held as separate add-on revenue streams.

## Project Structure

- `00_project_admin/` - project notes, meeting notes, status trackers, and operating docs.
- `01_strategy/` - brand positioning, execution plans, roadmap documents, and strategy drafts.
- `02_character_universe/` - character bibles, story source files, character templates, and worldbuilding notes.
- `03_content/` - Instagram, YouTube Shorts, newsletters, and historical storytelling content.
- `04_community/` - parent community, beta reader, and school workshop planning.
- `05_waitlist_preorder/` - landing page copy, waitlist flows, preorder strategy, and founder circle planning.
- `06_demand_validation/` - surveys, research, validation experiments, and demand signal tracking.
- `07_ai_workflows/` - internal and client-facing AI workflow maps, prompts, and system designs.
- `08_assets/` - doll samples, visual references, brand assets, and image files.
- `09_demos/` - website, content, prototype, and interactive demo work.
- `10_source_context/` - original email context, reference links, and supplied source material.
- `11_product_development/` - first doll box, storybook packaging, add-on revenue, manufacturing readiness, and product testing.

## Current Strategic Direction

Maitri should launch first as a character and storytelling universe, then convert that community into waitlist interest, beta readers, school pilots, and eventually preorder demand.

The first product should stay focused: make parents feel the doll is educational and meaningful, and make children fall in love with Manu.

## Foundation Retainer Source Files

- 90-day operating plan: `00_project_admin/monthly_retainer_foundation_plan.md`
- Manu character bible v1: `02_character_universe/manu/manu_character_bible_v1.md`
- Manu story content set: `02_character_universe/manu/manu_story_content_set_v1.md`
- Month-one Instagram + YouTube calendar: `03_content/social_media/month_1_instagram_youtube_calendar.md`
- Letters from Maitri drafts: `03_content/story_newsletters/letters_from_maitri_month_1.md`
- Live interest capture plan: `05_waitlist_preorder/live_interest_capture_plan.md`
- Monthly signal report template: `06_demand_validation/monthly_signal_report_template.md`
- Foundation operating map: `00_project_admin/maitri_foundation_map.md`
- First box launch decision: `01_strategy/launch_decisions/2026-06-15_first_box_launch_decision.md`
- First doll box blueprint: `11_product_development/first_doll_box/maitri_first_box_blueprint.md`
- Manu 32-page storybook blueprint: `11_product_development/first_doll_box/manu_32_page_storybook_blueprint.md`
- Add-on revenue roadmap: `11_product_development/add_on_revenue/accessory_roadmap.md`
- ChatGPT Business setup plan: `07_ai_workflows/chatgpt_business_setup/Maitri_ChatGPT_Business_Setup_Plan.md`

## Website Demo

The pre-launch website lives in `09_demos/website`.

To run it locally:

```bash
cd 09_demos/website
npm run dev
```

Then open `http://localhost:4173`.

The repository includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml` that publishes this folder to GitHub Pages. In GitHub, enable Pages for the repository and set the build source to **GitHub Actions**.

The Sites-ready version lives in `09_demos/maitri-sites` and includes the D1-backed live interest capture flow for deployment through Sites.
