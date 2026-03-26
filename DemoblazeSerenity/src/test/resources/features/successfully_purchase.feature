#language: en
#encoding: UTF-8

@e2e
@purchase
Feature: Purchase flow in Demoblaze
  As a Demoblaze user
  I want to purchase products
  So that I can validate the end-to-end purchase flow works correctly

  Scenario: Successfully purchase two products
    Given the user is on the Demoblaze website
    When the user adds the products "Samsung galaxy s6" and "Nokia lumia 1520" to the cart
    And opens the shopping cart
    And completes the purchase
    Then the user should see a successful purchase message and details