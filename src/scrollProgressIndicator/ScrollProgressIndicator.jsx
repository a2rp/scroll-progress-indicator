import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Button, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

const ScrollProgressIndicator = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [displayScroll, setDisplayScroll] = useState(0);

    const fetchData = async () => {
        try {
            const config = {
                method: "GET",
                url: "https://dummyjson.com/quotes?skip=0&limit=1000"
            };
            setIsLoading(true);
            const response = await axios(config);
            // console.log(response, "response");
            setData(response.data.quotes);
        } catch (error) {
            console.log(error, "eroor");
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        function getScrollPercent() {
            var h = document.documentElement,
                b = document.body,
                st = 'scrollTop',
                sh = 'scrollHeight';
            return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
        }
        window.addEventListener("scroll", () => {
            const value = getScrollPercent();
            setDisplayScroll(value);
            document.querySelector(".scrollToggle").style.cssText = `
                width: ${value}%;
            `;
        });
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.heading}>Scroll Progress Indicator</div>
                <div className={styles.content}>
                    <div className={styles.topSection}>
                        <Button
                            variant="contained"
                            className={styles.fetchDataButton}
                            disabled={isLoading}
                            onClick={fetchData}
                            fullWidth
                        >{isLoading ? <CircularProgress sx={{ padding: "10px" }} /> : "Fetch data"}</Button>
                        <div
                            className={styles.scrollIndicatorSection}
                        >
                            <div className={`${styles.scrollToggle} scrollToggle`}>
                                <span style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "#fff", padding: "15px" }}>
                                    {displayScroll.toFixed(2)}%
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.output} output`}>
                        {data && data.map(item => (
                            <div className={styles.item} key={item.id}>
                                <div className={styles.idAuthor}>{item.id}. {item.author}</div>
                                <div className={styles.quote}>{item.quote}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScrollProgressIndicator


