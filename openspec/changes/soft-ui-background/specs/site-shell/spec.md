## MODIFIED Requirements

### Requirement: Playful visual theme
The site SHALL use a soft, lower-contrast color palette, rounded corners, large friendly typography, and smooth transitions to create an engaging, eye-friendly aesthetic. The global background SHALL use a soft slate tone (e.g. `slate-100`) rather than pure white or high-vibrancy violet, ensuring a comfortable viewing experience during extended use.

#### Scenario: Visual consistency
- **WHEN** the user visits any page
- **THEN** the page uses the shared color palette (slate-100 background), typography scale, and spacing defined in the design tokens (no plain-HTML default styling visible)

#### Scenario: Comfortable viewing
- **WHEN** the user views large container panels
- **THEN** the panels are clearly defined but do not cause eye strain from high-brightness contrast against the global background
