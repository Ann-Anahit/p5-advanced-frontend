import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import styles from "../../styles/Event.module.css";
import appStyles from "../../App.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Event from "./Event";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
import { fetchMoreData } from "../../utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";

function MyEvents({ message, filter = "" }) {
    const [event, setEvent] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [query, setQuery] = useState("");
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await axiosReq.get(
                    `/event/?${filter}search=${query}`
                );
                setEvent(data);
                setHasLoaded(true);
            } catch (err) {
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchEvent();
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
                        {event.results.length ? (
                            <InfiniteScroll
                                children={event.results.map((event) => (
                                    <Event key={event.id} {...event} setEvents={setEvent} />
                                ))}
                                dataLength={event.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!event.next}
                                next={() => fetchMoreData(event, setEvent)}
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