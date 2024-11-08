import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Form } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import Message from './Message';  // You need to create this component for individual messages
import InfiniteScroll from 'react-infinite-scroll-component';
import Asset from '../../components/Asset'; // For loading spinner and no-results message
import { fetchMoreData } from '../../utils/utils'; // Utility for fetching more data
import { useLocation } from 'react-router';

function MessagesPage() {
    const [messages, setMessages] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await axiosReq.get(`/messages/?search=${query}`);
                setMessages(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchMessages();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [query, pathname]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <Form className="d-flex justify-content-center my-3">
                    <Form.Control
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        type="text"
                        placeholder="Search messages"
                    />
                </Form>

                {hasLoaded ? (
                    <>
                        {messages.results.length ? (
                            <InfiniteScroll
                                children={messages.results.map((message) => (
                                    <Message key={message.id} {...message} />
                                ))}
                                dataLength={messages.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!messages.next}
                                next={() => fetchMoreData(messages, setMessages)}
                            />
                        ) : (
                            <Container className="my-3">
                                <Asset message="No messages yet" />
                            </Container>
                        )}
                    </>
                ) : (
                    <Container className="my-3">
                        <Asset spinner />
                    </Container>
                )}
            </Col>
        </Row>
    );
}

export default MessagesPage;
