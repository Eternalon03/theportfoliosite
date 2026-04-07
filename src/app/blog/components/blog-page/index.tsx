"use client";
import styles from "./BlogPage.module.css";
import FutureHeader from "@/app/futureHeader/FutureHeader";
import dynamic from "next/dynamic";

const CodeBlock = dynamic(
  () => import("react-code-blocks").then((mod) => mod.CodeBlock),
  { ssr: false }
);

const BlogPage = () => {
  const apiCommands = [
    {
      id: 1,
      title: "begin()",
      category: "Hardware",
      excerpt: "Initializes the Artemis hardware. Must be called first in every script after importing."
    },
    {
      id: 2,
      title: "display.fill(color)",
      category: "Display",
      excerpt: "Fills the entire screen. display.fill(0) clears the screen to black."
    },
    {
      id: 3,
      title: "display.rect(x, y, width, height, color, filled)",
      category: "Display",
      excerpt: "Draws a rectangle. filled is a True/False boolean."
    },
    {
      id: 4,
      title: "display.ellipse(x, y, rx, ry, color, filled)",
      category: "Display",
      excerpt: "Draws an oval/circle. rx and ry are horizontal/vertical radii."
    },
    {
      id: 5,
      title: "display.text('string', x, y, color)",
      category: "Display",
      excerpt: "Prints text to the screen at the given coordinates."
    },
    {
      id: 6,
      title: "display.blit(buffer, x, y, transparent_color)",
      category: "Display",
      excerpt: "Draws a complex graphic (like a sprite) using a FrameBuffer."
    },
    {
      id: 7,
      title: "display.commit()",
      category: "Display",
      excerpt: "Crucial: Pushes drawings to the actual screen. Required to update the display."
    },
    {
      id: 8,
      title: "Display.Color.[Color]",
      category: "Display",
      excerpt: "Built-in colors: Red, Green, Blue, Yellow, Magenta, Cyan, White."
    },
    {
      id: 9,
      title: "buttons.scan()",
      category: "Input",
      excerpt: "Crucial: Reads physical buttons. Must be inside the while True loop."
    },
    {
      id: 10,
      title: "buttons.on_press(button, function)",
      category: "Input",
      excerpt: "Links a button press to a function (callback)."
    },
    {
      id: 11,
      title: "Buttons.[Name]",
      category: "Input",
      excerpt: "Physical buttons: Buttons.Up, Buttons.Down, Buttons.Select, Buttons.Back."
    },
    {
      id: 12,
      title: "imu.get_accel_x()",
      category: "Sensors",
      excerpt: "Returns acceleration in the x direction."
    },
    {
      id: 13,
      title: "imu.get_accel_y()",
      category: "Sensors",
      excerpt: "Returns acceleration in the y direction."
    },
    {
      id: 14,
      title: "imu.get_accel_z()",
      category: "Sensors",
      excerpt: "Returns acceleration in the z direction."
    },
    {
      id: 15,
      title: "imu.get_gyro_x()",
      category: "Sensors",
      excerpt: "Returns tilt in x direction (Pitch: tilting wrist up/down)."
    },
    {
      id: 16,
      title: "imu.get_gyro_y()",
      category: "Sensors",
      excerpt: "Returns tilt in y direction (Roll: twisting forearm)."
    },
    {
      id: 17,
      title: "imu.get_gyro_z()",
      category: "Sensors",
      excerpt: "Returns tilt in z direction (Yaw: sweeping arm left/right)."
    },
    {
      id: 18,
      title: "piezo.tone(frequency, duration)",
      category: "Audio",
      excerpt: "Plays a note. Frequency in Hertz, duration in milliseconds."
    },
    {
      id: 19,
      title: `for i in range(6):
	leds[i].on() // or off
	time.sleep_ms(200)`,
      category: "LEDs",
      excerpt: "Turns specific LEDs (0-5) on or off."
    },
    {
      id: 20,
      title: "rgb.set(r, g, b)",
      category: "LEDs",
      excerpt: "Sets the secret LED at the front (values 0 or 100)."
    },
    {
      id: 21,
      title: "time.sleep(seconds)",
      category: "Utilities",
      excerpt: "Pauses execution for a specified number of seconds."
    },
    {
      id: 22,
      title: "rtc.set_time(Time())",
      category: "Time",
      excerpt: "Sets the time on the watch."
    },
    {
      id: 23,
      title: "rtc.get_time()",
      category: "Time",
      excerpt: "Gets the current time from the watch."
    },
    {
      id: 24,
      title: "rtc.get_time().{property}",
      category: "Time",
      excerpt: "Access time properties: hours, minutes, seconds, month, day, year."
    }
  ];

  const customClasses = [
    {
      id: 25,
      title: `class Time:
 year = 0
 month = 0
 day = 0
 hours = 0
 minutes = 0
 seconds = 0`,
      category: "Time Class",
      excerpt: "Custom Time class structure for time management in Artemis applications."
    }
  ];

  const osLibrary = [
    {
      id: 26,
      title: "import os",
      category: "OS Library",
      excerpt: "Import the OS library for file system operations."
    },
    {
      id: 27,
      title: "os.listdir()",
      category: "OS Library",
      excerpt: "List all the files in the root directory."
    },
    {
      id: 28,
      title: `with open("settings.json", "w") as f:
 f.write('{"brightness": 80, "theme": "dark"}')`,
      category: "OS Library",
      excerpt: "Writes a file with JSON content."
    },
    {
      id: 29,
      title: 'os.remove("settings.json")',
      category: "OS Library",
      excerpt: "Deletes a file from the file system."
    }
  ];

  const programPatterns = [
    {
      id: 30,
      title: "The Anatomy of an Artemis Program",
      category: "Patterns",
      excerpt: "Every Artemis app follows this pattern: Import → Setup → Variables → Callbacks → Infinite Loop."
    }
  ];

  return (
    <div className={styles.blogContainer} data-page="blog">
      <div className="container">
        <div className={styles.blogHeader}>
          <FutureHeader level={1} text="Artemis Smartwatch API" color="var(--medium-blue)"/>
          <p className={styles.blogDescription}>
            Complete API documentation for the Artemis ESP-32 smartwatch development platform
          </p>
        </div>
        
        <div className={styles.blogTableContainer}>
          <h2 className={styles.tableTitle}>API Reference</h2>
          <table className={styles.blogTable}>
            <thead>
              <tr>
                <th>Command</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {apiCommands.map((command) => (
                <tr key={command.id} className={styles.blogRow}>
                  <td className={styles.titleCell}>
                    <CodeBlock 
                      text={command.title}
                      language="python"
                      theme="dracula"
                    />
                  </td>
                  <td className={styles.detailsCell}>
                    <div className={styles.postDetails}>
                      <span className={styles.category}>{command.category}</span>
                    </div>
                    <div className={styles.excerpt}>{command.excerpt}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.blogTableContainer}>
          <h2 className={styles.tableTitle}>Custom Classes</h2>
          <div className={styles.textSection}>
            {customClasses.map((item) => (
              <div key={item.id} className={styles.textItem}>
                <h3 className={styles.textTitle}>{item.category}</h3>
                <CodeBlock 
                  text={item.title}
                  language="python"
                  theme="dracula"
                />
                <p className={styles.textExcerpt}>{item.excerpt}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.blogTableContainer}>
          <h2 className={styles.tableTitle}>OS Library</h2>
          <table className={styles.blogTable}>
            <thead>
              <tr>
                <th>Function</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {osLibrary.map((item) => (
                <tr key={item.id} className={styles.blogRow}>
                  <td className={styles.titleCell}>
                    <CodeBlock 
                      text={item.title}
                      language="python"
                      theme="dracula"
                    />
                  </td>
                  <td className={styles.detailsCell}>
                    <div className={styles.postDetails}>
                      <span className={styles.category}>{item.category}</span>
                    </div>
                    <div className={styles.excerpt}>{item.excerpt}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.blogTableContainer}>
          <h2 className={styles.tableTitle}>Program Patterns</h2>
          <div className={styles.textSection}>
            <div className={styles.textItem}>
              <h3 className={styles.textTitle}>The Anatomy of an Artemis Program</h3>
              <div className={styles.anatomyText}>
                <p>Every Artemis app follows this pattern:</p>
                <p><strong>Import:</strong> Bring in Artemis and time.</p>
                <p><strong>Setup:</strong> Run begin().</p>
                <p><strong>Variables:</strong> Set up your starting X/Y positions or scores.</p>
                <p><strong>Callbacks:</strong> Define what happens when buttons are pressed using buttons.on_press().</p>
                <p><strong>The Infinite Loop:</strong> * A while True: loop runs forever.</p>
                <ul className={styles.anatomyList}>
                  <li>buttons.scan() checks for inputs.</li>
                  <li>Do your math/logic.</li>
                  <li>Draw your shapes (display.rect(), display.text()).</li>
                  <li>display.commit() updates the screen.</li>
                  <li>time.sleep_ms(20) pauses briefly so the watch doesn't crash from thinking too fast.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.homeButtonContainer}>
        <a href="https://nicoleplaneta.com" className={styles.homeButton} target="_blank" rel="noopener noreferrer">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default BlogPage;
