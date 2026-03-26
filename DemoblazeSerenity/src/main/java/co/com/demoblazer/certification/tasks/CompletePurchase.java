package co.com.demoblazer.certification.tasks;

import co.com.demoblazer.certification.models.PurchaseData;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import net.serenitybdd.screenplay.questions.Text;

import static co.com.demoblazer.certification.userinterfaces.CartPage.*;

public class CompletePurchase implements Task {

    private final PurchaseData purchaseData;

    protected CompletePurchase(PurchaseData purchaseData) {
        this.purchaseData = purchaseData;
    }

    public static CompletePurchase with(PurchaseData purchaseData) {
        return Tasks.instrumented(CompletePurchase.class, purchaseData);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                RememberPurchaseTotal.now(),
                Click.on(PLACE_ORDER_BUTTON),
                Enter.theValue(purchaseData.name()).into(NAME_FIELD),
                Enter.theValue(purchaseData.country()).into(COUNTRY_FIELD),
                Enter.theValue(purchaseData.city()).into(CITY_FIELD),
                Enter.theValue(purchaseData.card()).into(CARD_FIELD),
                Enter.theValue(purchaseData.month()).into(MONTH_FIELD),
                Enter.theValue(purchaseData.year()).into(YEAR_FIELD),
                Click.on(PURCHASE_BUTTON)
        );
    }
}
