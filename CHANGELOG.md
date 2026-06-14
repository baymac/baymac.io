# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0.4] - 2026-06-14

### Added
- Blog post update: `at`-command one-time scheduling section added to the Conductor session auto-resume post — shows how to use macOS `at` for a single-shot script run without a recurring launchd job
- Unit test coverage for `PostBannerProvider` (context propagation, `setPost`, `registerTitleEl`), `PostBanner` (all `secondsLeft` display branches, `aria-hidden` state), `BuyMeCryptoCard` (empty-wallets state, coin tab switching, copy error snackbar), and `lib/wallets` (structure + CI guard for uninitialised submodule)

## [0.1.0.3] - 2026-06-13

### Added
- Copy button on every code block in blog posts — one click copies the snippet to clipboard; button shows a checkmark for 2 s then resets
- Keyboard accessibility: `tabindex="0"` on `<pre>` and `<table>` elements rendered from Markdown

## [0.1.0.2] - 2026-06-12

### Added
- Blog post: how to permanently disable the Conductor session auto-resume launch agent (`launchctl disable`) so it stops restarting after every reboot

## [0.1.0.1] - 2026-06-04

### Changed
- Replaced Self Notes project (local RAG/Ollama) with pbrain (personal brain: Notion + vault + Claude Code)

### Removed
- Upload PDF to Drive and Publish Docs to Drive from the projects list
