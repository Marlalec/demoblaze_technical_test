package co.com.demoblazer.certification.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Click;

import static co.com.demoblazer.certification.userinterfaces.HomePage.CART_BUTTON;

public class OpenShoppingCart implements Task {

    public static OpenShoppingCart now() {
        return Tasks.instrumented(OpenShoppingCart.class);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(CART_BUTTON)
        );
    }
}
