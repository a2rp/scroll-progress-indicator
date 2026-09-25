import { useEffect, useState } from "react";
import { FiArrowUp, FiBookOpen, FiCoffee, FiDownload, FiGithub, FiGlobe, FiHeart, FiLinkedin, FiMail, FiMessageCircle, FiYoutube } from "react-icons/fi";
import { FaCodepen, FaFacebookF } from "react-icons/fa6";
import { Button, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import styles from "./styles.module.scss";

const publicAsset = (name) => `${process.env.PUBLIC_URL || ""}/${name}`;

const socialLinks = [
    { label: "Portfolio", href: "https://www.ashishranjan.net/", Icon: FiGlobe },
    { label: "GitHub", href: "https://github.com/a2rp", Icon: FiGithub },
    { label: "CodePen", href: "https://codepen.io/ash1198", Icon: FaCodepen },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aashishranjan", Icon: FiLinkedin },
    { label: "Facebook", href: "https://www.facebook.com/theash.ashish/", Icon: FaFacebookF },
    { label: "YouTube", href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", Icon: FiYoutube },
    { label: "Email", href: "mailto:ash.ranjan09@gmail.com", Icon: FiMail },
];

const supportLinks = [
    { label: "Support", href: "https://a2rp-donation-page.netlify.app/", Icon: FiHeart },
    { label: "Buy Me a Coffee", href: "https://buymeacoffee.com/a2rp", Icon: FiCoffee },
    { label: "Patreon", href: "https://patreon.com/a2rp", Icon: FiBookOpen },
];

function LinkIcons({ links }) {
    return (
        <div className={styles.iconLinks}>
            {links.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                    <Icon aria-hidden="true" />
                </a>
            ))}
        </div>
    );
}

function getScrollPercent() {
    const documentElement = document.documentElement;
    const scrollableHeight = documentElement.scrollHeight - documentElement.clientHeight;
    if (scrollableHeight <= 0) return 0;
    return Math.min(100, Math.max(0, (window.scrollY / scrollableHeight) * 100));
}

function ScrollProgressIndicator() {
    const [isLoading, setIsLoading] = useState(false);
    const [quotes, setQuotes] = useState([]);
    const [scrollPercent, setScrollPercent] = useState(0);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("https://dummyjson.com/quotes?skip=0&limit=1000");
            setQuotes(response.data?.quotes || []);
        } catch (error) {
            toast.error(error.message || "Unable to fetch quotes.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const updateScrollProgress = () => setScrollPercent(getScrollPercent());
        updateScrollProgress();
        window.addEventListener("scroll", updateScrollProgress, { passive: true });
        window.addEventListener("resize", updateScrollProgress);
        return () => {
            window.removeEventListener("scroll", updateScrollProgress);
            window.removeEventListener("resize", updateScrollProgress);
        };
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.progressBar} aria-hidden="true">
                <div className={styles.progressValue} style={{ width: `${scrollPercent}%` }} />
            </div>

            <header className={styles.header}>
                <a className={styles.brand} href="#top" aria-label="Scroll Progress Indicator home">
                    <img src={publicAsset("logo.png")} alt="" />
                    <span><small>A2RP LAB</small>Scroll Progress</span>
                </a>
                <div className={styles.headerNote}>Scroll to track your reading</div>
            </header>

            <main className={styles.container} id="top">
                <section className={styles.hero}>
                    <div>
                        <p className={styles.kicker}>READING TOOLKIT</p>
                        <h1>Scroll Progress Indicator</h1>
                        <p className={styles.intro}>
                            Load a stream of quotes and follow your reading position with a clear,
                            responsive progress bar that stays visible while you browse.
                        </p>
                    </div>
                    <div className={styles.progressCard} aria-live="polite">
                        <span className={styles.progressIcon}><FiDownload aria-hidden="true" /></span>
                        <strong>{scrollPercent.toFixed(0)}%</strong>
                        <span>page progress</span>
                    </div>
                </section>

                <section className={styles.controlPanel} aria-label="Quote controls">
                    <div>
                        <p className={styles.panelLabel}>DEMO CONTENT</p>
                        <h2>Fill the page with quotes</h2>
                        <p>Fetch a large set of quotes to create a realistic scrollable reading experience.</p>
                    </div>
                    <Button
                        variant="contained"
                        className={styles.fetchDataButton}
                        disabled={isLoading}
                        onClick={fetchData}
                        startIcon={isLoading ? <CircularProgress size={17} color="inherit" /> : <FiDownload />}
                    >
                        {isLoading ? "Loading..." : "Fetch quotes"}
                    </Button>
                </section>

                <section className={styles.quoteSection} aria-live="polite">
                    {quotes.length === 0 ? (
                        <div className={styles.emptyState}>
                            <FiMessageCircle aria-hidden="true" />
                            <h2>No quotes loaded yet</h2>
                            <p>Use the button above to add demo content and test the indicator.</p>
                        </div>
                    ) : (
                        <div className={styles.quoteGrid}>
                            {quotes.map((item) => (
                                <article className={styles.item} key={item.id}>
                                    <div className={styles.itemMeta}><span>#{item.id}</span><span>{item.author}</span></div>
                                    <p>{item.quote}</p>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <footer className={styles.footer}>
                <div className={styles.footerMain}>
                    <div className={styles.footerTop}>
                        <strong>Keep moving, keep learning.</strong>
                        <span>Copyright © {new Date().getFullYear()} <a href="https://www.ashishranjan.net/" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a></span>
                    </div>
                    <div className={styles.footerGroups}>
                        <div><span>Connect</span><LinkIcons links={socialLinks} /></div>
                        <div><span>Support</span><LinkIcons links={supportLinks} /></div>
                    </div>
                </div>
            </footer>

            {scrollPercent > 35 && (
                <button className={styles.goTop} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top" title="Scroll to top">
                    <FiArrowUp aria-hidden="true" />
                </button>
            )}
        </div>
    );
}

export default ScrollProgressIndicator;
