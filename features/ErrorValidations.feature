Feature: Ecommerce validation
  @Validation
  @foo

  #set scenarios as parameterized
  Scenario Outline: Placing the Order 
    Given a login to the Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error Message is displayed

#displays datasets required for the scenario 1st row = columnn names, the rest of the rows are values
  Examples: 
      | username        | password      | 
      | junny@gmail.com | Learn@123     | 
      | hello@1123.com  | Learning@123  | 