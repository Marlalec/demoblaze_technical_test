Feature: Functional validation of the Demoblaze Login endpoint

  Background: Base service configuration
    * url baseUrl
    * def testData = read('classpath:request/test-data.json')
    * header Content-Type = 'application/json'

  Scenario: Should successfully login with valid credentials
    * set testData.username = 'User_MarlonC'
    * set testData.password = 'Sofka123*'

    Given path 'login'
    And print 'Login request:', testData
    And request testData
    When method post
    And print 'Login response:', response
    Then status 200
    And assert response != null
    And match response == '#string'
    And assert response.trim().length > 0

  Scenario: Should return an error when trying to login with invalid credentials
    * set testData.username = 'User_MarlonC'
    * set testData.password = 'WrongPassword123'

    Given path 'login'
    And print 'Login request:', testData
    And request testData
    When method post
    And print 'Login response:', response
    Then status 200
    And match response.errorMessage == '#string'
    And match response.errorMessage == 'Wrong password.'
    And assert response.errorMessage.trim().length > 0
    And match karate.keysOf(response) == ['errorMessage']