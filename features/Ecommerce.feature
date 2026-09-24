Feature: Ecommerce validations
  @Regression
  Scenario: Placing the Order
    Given a login to the Ecommerce application with "junny@gmail.com" and "Learn@123"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and Place the Order 
    Then Verify the order is present in the OrderHistory
   
  @Validation
  #set scenarios as parameterized
  Scenario Outline: Placing the Order 
    Given a login to the Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error Message is displayed

#displays datasets required for the scenario 1st row = columnn names, the rest of the rows are values
  Examples: 
      | username        | password      | 
      | junny@gmail.com | Learn@123     | 
      | hello@1123.com  | Learning@123  | 


az role assignment create \ 
--assignee "52380a9d-78eb-40f7-b84c-e3893c3f19eb" \
--role “Storage Blob Data Contributor” \
--scope “$(az storage account show —-name "pwstrgrrde8d9"  —-resource-group "rrd"   —-query id -o tsv)”  

az role assignment create \ 
--assignee "$(az ad sp list --display-name 'github-playwright' --query '[0].appId' -o tsv)" \
--role “Storage Blob Data Contributor” \
--scope “$(az storage account show —-name "pwstrgrrde8d9"  —-resource-group "rrd"   —-query id -o tsv)”  

az ad sp create-for-rbac \ 
--name "github-playwright" \ 
--role "Contributor" \ 
--scopes "/subscriptions/0349e49e-1efc-412e-91cb-b57eb93dc604/resourceGroups/rrd" \ 
--json-auth

az ad sp create-for-rbac \
--name "github-playwright" \
--role "Contributor" \
--scopes "/subscriptions/0349e49e-1efc-412e-91cb-b57eb93dc604/resourceGroups/rrd" \
--json-auth

az role assignment create --assignee "$(az ad sp list --display-name 'github-playwright' --query '[0].appId' -o tsv)" --role "Storage Blob Data Contributor" --scope “$(az storage account show --name "pwstrgrrde8d9" --resource-group "rrd" --query id -o tsv)”  


az ad sp create-for-rbac --name "github-playwright" --role Contributor --scopes "/subscriptions/0349e49e-1efc-412e-91cb-b57eb93dc604/resourceGroups/rrd" --json-auth