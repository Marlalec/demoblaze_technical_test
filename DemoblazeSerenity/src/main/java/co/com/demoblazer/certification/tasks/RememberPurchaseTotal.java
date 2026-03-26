package co.com.demoblazer.certification.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.matchers.WebElementStateMatchers;
import net.serenitybdd.screenplay.questions.Text;
import net.serenitybdd.screenplay.waits.WaitUntil;

import static co.com.demoblazer.certification.userinterfaces.CartPage.TOTAL_PRICE;

public class RememberPurchaseTotal implements Task {

    public static RememberPurchaseTotal now() {
        return Tasks.instrumented(RememberPurchaseTotal.class);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                WaitUntil.the(TOTAL_PRICE, WebElementStateMatchers.isVisible())
                        .forNoMoreThan(5)
                        .seconds()
        );

        actor.remember(
                "purchaseTotal",
                Text.of(TOTAL_PRICE).answeredBy(actor).trim()
        );
    }
}