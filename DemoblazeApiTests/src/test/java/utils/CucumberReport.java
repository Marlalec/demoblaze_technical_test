package utils;

import net.masterthought.cucumber.Configuration;
import net.masterthought.cucumber.ReportBuilder;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class CucumberReport {

    private static final String FORMAT_FILES = "json";
    private static final String PATH_REPORT = "target";
    private static final String NAME_REPORT = "Demoblaze_Auth_API_Report";

    public CucumberReport() {
        super();
    }

    public static void createCucumberReport(String karateOutputPath) {
        Collection<File> jsonFiles = FileUtils.listFiles(new File(karateOutputPath), new String[]{FORMAT_FILES},
                Boolean.TRUE);
        List<String> jsonPaths = new ArrayList<>(jsonFiles.size());
        jsonFiles.forEach(file -> jsonPaths.add(file.getAbsolutePath()));
        Configuration config = new Configuration(new File(PATH_REPORT), NAME_REPORT);
        ReportBuilder reportBuilder = new ReportBuilder(jsonPaths, config);
        reportBuilder.generateReports();
    }

}
