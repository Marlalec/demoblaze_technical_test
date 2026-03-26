package co.com.demoblazer.certification.questions;

import co.com.demoblazer.certification.utils.PurchaseTestData;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

import static co.com.demoblazer.certification.userinterfaces.ConfirmationPage.PURCHASE_DETAILS;

public class PurchaseCardNumberIs implements Question<Boolean> {

    public static PurchaseCardNumberIs inConfirmation() {
        return new PurchaseCardNumberIs();
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        String details = Text.of(PURCHASE_DETAILS)
                .answeredBy(actor);

        return details.contains("Card Number: " + PurchaseTestData.VALID_PURCHASE.card());
    }
}