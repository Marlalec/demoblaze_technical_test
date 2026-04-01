package co.com.demoblazer.certification.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.abilities.BrowseTheWeb;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static co.com.demoblazer.certification.userinterfaces.CartPage.TOTAL_PRICE;

public class RememberPurchaseTotal implements Task {

    private static final String PURCHASE_TOTAL_KEY = "purchaseTotal";
    private static final Duration TOTAL_PRICE_TIMEOUT = Duration.ofSeconds(15);

    public static RememberPurchaseTotal now() {
        return Tasks.instrumented(RememberPurchaseTotal.class);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        String totalPrice = waitForDisplayedTotalPrice(actor);
        actor.remember(PURCHASE_TOTAL_KEY, totalPrice);
    }

    private <T extends Actor> String waitForDisplayedTotalPrice(T actor) {
        try {
            return new WebDriverWait(BrowseTheWeb.as(actor).getDriver(), TOTAL_PRICE_TIMEOUT)
                    .until(driver -> {
                        String displayedValue = TOTAL_PRICE.resolveFor(actor).getText().trim();
                        return displayedValue.matches("\\d+") ? displayedValue : null;
                    });
        } catch (TimeoutException exception) {
            throw new IllegalStateException(
                    "The purchase total was not displayed with a valid numeric value within the expected time.",
                    exception
            );
        }
    }
}