package co.com.demoblazer.certification.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

import static co.com.demoblazer.certification.userinterfaces.ConfirmationPage.SUCCESS_MESSAGE;

public class ConfirmationMessageIs implements Question<Boolean> {

    private final String expectedMessage;

    private ConfirmationMessageIs(String expectedMessage) {this.expectedMessage = expectedMessage;}

    public static ConfirmationMessageIs equalTo(String expectedMessage) {
        return new ConfirmationMessageIs(expectedMessage);
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        String currentMessage = Text.of(SUCCESS_MESSAGE).answeredBy(actor);
        return currentMessage.trim().equals(expectedMessage);
    }
}