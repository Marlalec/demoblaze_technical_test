package co.com.demoblazer.certification.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Click;

import co.com.demoblazer.certification.interactions.AcceptAlert;

import static co.com.demoblazer.certification.userinterfaces.HomePage.*;
import static co.com.demoblazer.certification.userinterfaces.ProductPage.ADD_TO_CART_BUTTON;

public class AddProductToCart implements Task {

    private final String productName;

    public AddProductToCart(String productName) {
        this.productName = productName;
    }

    public static AddProductToCart called(String productName) {
        return Tasks.instrumented(AddProductToCart.class, productName);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(PRODUCT_NAME.of(productName)),
                Click.on(ADD_TO_CART_BUTTON),
                AcceptAlert.now(),
                Click.on(HOME_BUTTON)
        );
    }
}
