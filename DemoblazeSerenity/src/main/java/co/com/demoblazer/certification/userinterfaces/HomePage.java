package co.com.demoblazer.certification.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;

public class HomePage {

    public static final Target PRODUCT_NAME = Target.the("Product with name '{0}'")
            .locatedBy("//a[normalize-space()='{0}']");

    public static final Target HOME_BUTTON = Target.the("Home button")
            .locatedBy("//a[contains(.,'Home')]");

    public static final Target CART_BUTTON = Target.the("Cart button")
            .locatedBy("//a[contains(.,'Cart')]");
}
