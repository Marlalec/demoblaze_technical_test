package co.com.demoblazer.certification.userinterfaces;

import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.screenplay.targets.Target;

public class CartPage {
    public static final Target PLACE_ORDER_BUTTON = Target.the("Place order button")
            .locatedBy("//button[normalize-space()='Place Order']");

    public static final Target NAME_FIELD = Target.the("Name field")
            .located(By.id("name"));

    public static final Target COUNTRY_FIELD = Target.the("Country field")
            .located(By.id("country"));

    public static final Target CITY_FIELD = Target.the("City field")
            .located(By.id("city"));

    public static final Target CARD_FIELD = Target.the("Credit card field")
            .located(By.id("card"));

    public static final Target MONTH_FIELD = Target.the("Month field")
            .located(By.id("month"));

    public static final Target YEAR_FIELD = Target.the("Year field")
            .located(By.id("year"));

    public static final Target PURCHASE_BUTTON = Target.the("Purchase button")
            .locatedBy("//button[normalize-space()='Purchase']");

    public static final Target TOTAL_PRICE = Target.the("Total price")
            .located(By.xpath("//h3[@id='totalp']"));
}