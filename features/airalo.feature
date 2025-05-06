Feature: Airalo eSIM Purchase

  Scenario: Purchase Japan eSIM and verify package details
    Given I open Airalo website
    And I find the search bar on the home page
    And I input "JAPAN" into the search bar
    And I select "Japan" destination from the "Local" section in the autocomplete options
    And I select the first eSIM package
    And I click on "Buy Now"
    Then I should see package details:
      | Title    | Moshi Moshi |
      | Coverage | Japan       |
      | Data     | 1 GB        |
      | Validity | 7 days      |
      | Price    | 4.50 €       |
