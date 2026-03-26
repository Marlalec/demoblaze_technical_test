package co.com.demoblazer.certification.questions;

import co.com.demoblazer.certification.utils.PurchaseTestData;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

import static co.com.demoblazer.certification.userinterfaces.ConfirmationPage.PURCHASE_DETAILS;

public class PurchaseNameIs implements Question<Boolean> {

    public static PurchaseNameIs inConfirmation() {
        return new PurchaseNameIs();
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        String details = Text.of(PURCHASE_DETAILS)
                .answeredBy(actor);

        return details.contains("Name: " + PurchaseTestData.VALID_PURCHASE.name());
    }
}
