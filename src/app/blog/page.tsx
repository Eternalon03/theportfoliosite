import styles from "./components/blog-page/BlogPage.module.css";
import FutureHeader from "@/app/futureHeader/FutureHeader";

export default function Blog() {
  return (
    <div className={styles.blogContainer} data-page="blog">
      <div className="container">
        <div className={styles.blogHeader}>
          <FutureHeader level={1} text="Artemis Smartwatch Documentation" color="var(--medium-blue)"/>
          <p className={styles.blogDescription}>
            Complete API documentation and getting started guide for the Artemis ESP-32 smartwatch development platform
          </p>
        </div>
        
        <div className={styles.blogTableContainer}>
          <h2 className={styles.tableTitle}>Available Articles</h2>
          <div className={styles.textSection}>
            <div className={styles.textItem}>
              <h3 className={styles.textTitle}>API Reference & Getting Started Guide</h3>
              <p className={styles.textExcerpt}>
                Complete API documentation for all Artemis smartwatch functions including display controls, 
                button inputs, sensor data, and program structure. Includes comprehensive getting started 
                guide with best practices and examples.
              </p>
              <div className={styles.articleLinkContainer}>
                <a href="/blog/article1" className={styles.articleLink}>
                  Read Full Documentation &rarr;
                </a>
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
    </div>
  );
}
