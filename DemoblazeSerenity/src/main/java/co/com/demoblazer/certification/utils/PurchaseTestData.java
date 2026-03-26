package co.com.demoblazer.certification.utils;

import co.com.demoblazer.certification.models.PurchaseData;

public class PurchaseTestData {

    private PurchaseTestData() {
    }

    public static final PurchaseData VALID_PURCHASE = new PurchaseData(
            "Marlon",
            "Colombia",
            "Bogota",
            "4111111111111111",
            "03",
            "2026"
    );
}