
module.exports = {

  'Test Case:Check automationpractice.com login field, take screenshots': (browser) => {
        browser
            .url('http://automationpractice.com')
            .waitForElementVisible('body', 1000)
            .assert.title('My Store')
            .assert.elementPresent( 'a[class="login"]') 
            .click('a[class="login"]')
            .saveScreenshot('./tests_output/screenshots/01signinpage.png')
            .pause(1000)
    },
    
  'Test Case 2: Log in on automationpractice.com, make actions, take screenshots': (browser) => {
      browser
        .setValue('input[id=email]', 'testselenium@test.com')
        .setValue('input[id=passwd]', 'K8S@K8s')
        .click('button[name=SubmitLogin]')
        .saveScreenshot('./tests_output/screenshots/02loginsuccess.png')
  },
  
  'Test Case 3: Search Skirt, show the results, take screenshots': (browser) => {
      browser
        .pause(1000)    
        .setValue('input[name=search_query]', 'Skirt')
        .click('button[name=submit_search]')
        .pause(500)
        .assert.title('Search - My Store')
        .saveScreenshot('./tests_output/screenshots/03searchvisible.png')
  },
  
  'Test Case 4: Add the product to Cart, take screenshots': (browser) => {
      browser
        .pause(1000)
        .assert.elementPresent('a[class="product_img_link"]')
        .assert.elementPresent('a[class="button ajax_add_to_cart_button btn btn-default"]')
        .assert.elementPresent('a[title="Add to cart')
        .click('a[title="Add to cart"]')
        .pause(1000)
        .assert.elementPresent('div[id="layer_cart')
        .saveScreenshot('./tests_output/screenshots/04addtocart.png')  
  },
  
  'Test Case 5: Back to the store, take screenshots': (browser) => {
      browser
        .pause(1000)
        .assert.elementPresent('span[class="continue btn btn-default button exclusive-medium')
        .click('span[class="continue btn btn-default button exclusive-medium')
        .pause(5000)
        .saveScreenshot('./tests_output/screenshots/05backshopping.png')
  },
  
  'Test Case 6: Show the homepage take screenshots': (browser) => {
      browser
        .pause(1000)
        .assert.elementPresent('div[id="header_logo')
        .click('a[title="My Store"]')
        .saveScreenshot('./tests_output/screenshots/06backmystore.png')
  },
  
  'Test Case 7: Log out of the store, take screenshots': (browser) => {
      browser
        .pause(1000)
        .assert.elementPresent( 'a[class="logout"]') 
        .click('a[class="logout"]')
        .saveScreenshot('./tests_output/screenshots/07logout.png')
        .pause(1000)
        .end();  
  },
  };
  