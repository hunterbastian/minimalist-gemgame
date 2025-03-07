# Changelog

All notable changes to the Minimalist Gem Game will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-03-06

### Features and Changes
- Initial project setup with README and CHANGELOG
- Basic HTML structure with minimalistic game UI layout
- CSS styling with minimalistic greyscale design
- Core gameplay mechanics:
  - Rock clicking to collect minerals
  - Simple +1 increment per click
  - Floating text animations for feedback
- Minimalistic game interface with smaller rock size
- Compact layout with 500px max-width container
- Roboto Mono font throughout for code-like aesthetic
- Angular design with no rounded corners
- Light color scheme with blue-green gradient (darkened for optimal contrast)
- Stone positioned higher on page for better visual balance
- Box around stone features sharp corners
- Footer with copyright information positioned at absolute bottom of viewport
- All text in lowercase for minimalist aesthetic
- No divider between header and game content
- Centered title with compact minerals counter (150px width) in cool light blue
- Enhanced 3D stone appearance against cool toned background:
  - Multi-layered shadows for depth
  - Directional light gradient
  - Interactive shadow effects on hover and click
  - Subtle background gradient in cool blue tones
- Consistent color palette with cool light blue tones for both mining area and minerals display
- Vertically adjusted layout with mining area positioned higher for improved focus
- Complete overhaul of floating text implementation:
  - Switched from CSS animations to JavaScript for more control
  - Using span elements instead of divs for better rendering
  - Implemented aggressive CSS overrides to prevent visual artifacts
  - Simplified animation with requestAnimationFrame API

### Removed
- Upgrade system temporarily removed:
  - Pickaxe upgrades to increase click power
  - Auto miner functionality
  - Upgrade shop UI section
- Gem discovery feature removed for simplicity:
  - No more random gem bonuses
  - Removed all gem-related animations and visuals
  - Simplified game logic to focus on core clicking mechanic



