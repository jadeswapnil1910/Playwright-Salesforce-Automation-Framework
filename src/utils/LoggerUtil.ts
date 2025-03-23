import winston from "winston";
import path from "path";
import moment from "moment-timezone";

const currentDir = __dirname;

// Go one level above (back to 'src')
const srcDir = path.resolve(currentDir, "..");

// cahnge path to 'loggin' folder
const loggingDir = path.resolve(srcDir, "logging");


// Function to format log entries with timestmap and timezone
const customFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

// Set desired timezone
// const timeZone = "Europe/London";
// const timeZone = "America/New_york";
const timeZone = "Asia/Kolkata";

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: ()=> moment().tz(timeZone).format() }),
        customFormat
    ),

    transports: [

        // Log to console at level = "debug"
        new winston.transports.Console({ level : "debug" }),

        // Log "info" to file --> test_run.log
        new winston.transports.File({
            filename: path.join(loggingDir, "test_run.log"),
            maxFiles: 5,
            maxsize: 10 * 1024,
            level: "info",
        }),

        // Log "info" to file --> test_error.log
        new winston.transports.File({
            filename: path.join(loggingDir, "test_error.log"),
            maxFiles: 5,
            maxsize: 10 * 1024,
            level: "error",
        })

    ],
});


export default logger;