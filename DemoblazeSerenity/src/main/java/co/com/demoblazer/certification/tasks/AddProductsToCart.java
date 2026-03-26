package co.com.demoblazer.certification.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;

public class AddProductsToCart implements Task {

    private final String firstProduct;
    private final String secondProduct;

    public AddProductsToCart(String firstProduct, String secondProduct) {
        this.firstProduct = firstProduct;
        this.secondProduct = secondProduct;
    }

    public static AddProductsToCart with(String firstProduct, String secondProduct) {
        return Tasks.instrumented(AddProductsToCart.class, firstProduct, secondProduct);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                AddProductToCart.called(firstProduct),
                AddProductToCart.called(secondProduct)
        );
    }
}
