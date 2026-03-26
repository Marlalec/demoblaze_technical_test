package co.com.demoblazer.certification.stepdefinitions;

import co.com.demoblazer.certification.questions.ConfirmationMessageIs;
import co.com.demoblazer.certification.questions.PurchaseCardNumberIs;
import co.com.demoblazer.certification.questions.PurchaseNameIs;
import co.com.demoblazer.certification.questions.PurchaseTotalIs;
import co.com.demoblazer.certification.tasks.AddProductsToCart;
import co.com.demoblazer.certification.tasks.CompletePurchase;
import co.com.demoblazer.certification.tasks.OpenShoppingCart;
import co.com.demoblazer.certification.utils.PurchaseTestData;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Then;
import net.serenitybdd.screenplay.actions.Open;
import net.serenitybdd.screenplay.actors.OnStage;

import static co.com.demoblazer.certification.utils.Constants.*;
import static org.hamcrest.Matchers.is;
import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;

public class SuccessfullyPurchaseStepDefinitions {

    @Given("the user is on the Demoblaze website")
    public void the_user_is_on_the_demoblaze_website() {
        OnStage.theActorInTheSpotlight().attemptsTo(Open.url(BASE_URL));
    }

    @When("the user adds the products {string} and {string} to the cart")
    public void the_user_adds_the_products_and_to_the_cart(String firstProduct, String secondProduc) {
        OnStage.theActorInTheSpotlight().attemptsTo(AddProductsToCart.with(firstProduct,secondProduc));
    }

    @And("opens the shopping cart")
    public void opens_the_shopping_cart() {
        OnStage.theActorInTheSpotlight().attemptsTo(OpenShoppingCart.now());
    }

    @And("completes the purchase")
    public void completes_the_purchase() {
        OnStage.theActorInTheSpotlight().attemptsTo(CompletePurchase.with(PurchaseTestData.VALID_PURCHASE));
    }

    @Then("the user should see a successful purchase message and details")
    public void the_user_should_see_a_successful_purchase_message_and_details() {
        OnStage.theActorInTheSpotlight().should(seeThat(ConfirmationMessageIs.equalTo(SUCCESSFULL_MESSAGE), is(true)));
        OnStage.theActorInTheSpotlight().should(seeThat(PurchaseTotalIs.displayedInConfirmation(), is(true)));
        OnStage.theActorInTheSpotlight().should(seeThat(PurchaseNameIs.inConfirmation(), is(true)));
        OnStage.theActorInTheSpotlight().should(seeThat(PurchaseCardNumberIs.inConfirmation(), is(true)));
    }
}
