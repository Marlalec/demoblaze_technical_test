package co.com.demoblazer.certification.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

import static co.com.demoblazer.certification.userinterfaces.ConfirmationPage.PURCHASE_DETAILS;

public class PurchaseTotalIs implements Question<Boolean> {

    public static PurchaseTotalIs displayedInConfirmation() {
        return new PurchaseTotalIs();
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        String rememberedTotal = actor.recall("purchaseTotal");
        String details = Text.of(PURCHASE_DETAILS)
                .answeredBy(actor);

        return details.contains("Amount: " + rememberedTotal + " USD");
    }
}
