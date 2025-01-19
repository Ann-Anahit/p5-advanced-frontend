import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import styles from "../../styles/EventsFeed.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Events from "./Events";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
import { fetchMoreData } from "../../utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";

function MyEvents({ message, filter = "" }) {
    const [events, setEvents] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axiosReq.get(`/event/?${filter}&search=${query}`);
                setEvents(data);
                setHasLoaded(true);
            } catch (err) {
                console.error(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchEvents();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, pathname]);

    return (
        <Row className="h-100 d-flex justify-content-center align-items-center">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <i class={`fa-solid fa-magnifying-glass ${styles.SearchIcon}`} />
                <Form
                    className={styles.SearchBar}
                    onSubmit={(event) => event.preventDefault()}
                >
                    <Form.Control
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        type="text"
                        className="mr-sm-2"
                        placeholder="Search events"
                    />
                </Form>
                {hasLoaded ? (
                    <>
                        {events.results.length ? (
                            <InfiniteScroll
                                children={events.results.map((event) => (
                                    <Events key={event.id} {...event} setEvents={setEvents} />
                                ))}
                                dataLength={events.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!events.next}
                                next={() => fetchMoreData(events, setEvents)}
                            />
                        ) : (
                            <Container
                                className={`d-flex flex-column justify-content-center align-items-center ${appStyles.Content}`}
                            >
                                <Asset src={NoResults} message={message} />
                            </Container>
                        )}
                    </>
                ) : (
                    <Container
                        className={`d-flex flex-column justify-content-center align-items-center ${appStyles.Content}`}
                    >
                        <Asset spinner />
                    </Container>
                )}
            </Col>
        </Row>
    );
}

export default MyEvents;
