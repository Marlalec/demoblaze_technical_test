package co.com.demoblazer.certification.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;

public class ConfirmationPage {

    public static final Target SUCCESS_MESSAGE = Target.the("Successful purchase message")
            .locatedBy("//h2[normalize-space()='Thank you for your purchase!']");

    public static final Target PURCHASE_DETAILS = Target.the("Purchase details")
            .locatedBy("//p[contains(@class,'lead')]");
}
