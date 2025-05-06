# Airalo UI Automation Test with Cucumber & Playwright

This project implements UI test automation for the [Airalo](https://www.airalo.com) website using **Cucumber (Gherkin)** for behavior-driven development (BDD) and **Playwright** for browser automation.

## Project Structure
├── features/
│ ├── airalo.feature # Gherkin scenarios
│ └── step_definitions/
│ └── airalo.steps.js # Step definitions using Playwright
├── package.json
├── README.md
└── playwright.config.js

## Installation

1. **Clone the repository**

   git clone <your-repo-url>
   cd <your-repo-directory>

2. Install dependencies

    npm install

3. Install Playwright browsers

    npx playwright install

4. To run all test scenarios:
    npx cucumber-js   

## Implementation Highlights

Cookie Banner Handling: Gracefully accepts if shown.
Popup Handling: Detects and closes marketing popups.
Autocomplete Search: Inputs country and selects from specific segment.
eSIM Selection: Clicks the first available eSIM package.
Package Detail Validation: Matches values against data from the feature file.


