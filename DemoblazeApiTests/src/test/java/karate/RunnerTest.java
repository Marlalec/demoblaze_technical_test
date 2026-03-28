package karate;

import com.intuit.karate.Results;
import org.junit.jupiter.api.Test;
import utils.CucumberReport;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class RunnerTest {

    public RunnerTest() {
        super();
    }

    @Test
    void testParallel() {
        Results results = com.intuit.karate.Runner
                .path("classpath:karate")
                .outputCucumberJson(true)
                .parallel(1);

        CucumberReport.createCucumberReport(results.getReportDir());
        assertEquals(0, results.getFailCount(), results.getErrorMessages());
    }
}