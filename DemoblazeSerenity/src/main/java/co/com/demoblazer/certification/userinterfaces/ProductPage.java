package co.com.demoblazer.certification.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;

public class ProductPage {

    public static final Target ADD_TO_CART_BUTTON = Target.the("Add to cart button")
            .locatedBy("//a[normalize-space()='Add to cart']");

}
