package co.com.demoblazer.certification.hooks;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import net.serenitybdd.annotations.Managed;
import net.serenitybdd.screenplay.abilities.BrowseTheWeb;
import net.serenitybdd.screenplay.actors.OnStage;
import net.serenitybdd.screenplay.actors.OnlineCast;
import org.openqa.selenium.WebDriver;

public class Hooks {

    @Managed(driver = "chrome")
    WebDriver driver;

    @Before
    public void setUp() {
        OnStage.setTheStage(new OnlineCast());
        OnStage.theActorCalled("QA Engineer")
                .can(BrowseTheWeb.with(driver));
    }

    @After
    public void tearDown() {
        OnStage.drawTheCurtain();
    }
}