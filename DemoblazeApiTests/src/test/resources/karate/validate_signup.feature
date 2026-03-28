Feature: Functional validation of the Demoblaze Signup endpoint

  Background: Base service configuration
    * url baseUrl
    * def testData = read('classpath:request/test-data.json')
    * header Content-Type = 'application/json'

  Scenario: Should successfully register a new user with valid credentials
    * set testData.username = 'User_' + RandomGenerator.generate(8)
    * set testData.password = 'Sofka123*'

    Given path 'signup'
    And print 'Signup request:', testData
    And request testData
    When method post
    And print 'Signup response:', response
    Then status 200
    And print response
    And match response.trim() == '""'
    And assert response != null

  Scenario: Should return an error when trying to register an existing user
    * set testData.username = 'User_MarlonC'
    * set testData.password = 'Sofka123*'

    Given path 'signup'
    And print 'Signup request:', testData
    And request testData
    When method post
    And print 'Signup response:', response
    Then status 200
    And match response.errorMessage == '#string'
    And match response.errorMessage == 'This user already exist.'
    And assert response.errorMessage.trim().length > 0
    And match karate.keysOf(response) == ['errorMessage']
