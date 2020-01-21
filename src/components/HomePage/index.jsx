import React, { useEffect, useState } from "react";
import Card from "components/Card";
import API from "utils/API";
import Skeleton from "utils/Skeleton";
import Pagination from "components/Pagination";
import { Section, H4 } from "./styles";
import { Container, Row, Col } from "react-bootstrap";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data.length === 0) {
      API.get("/").then(res => {
        const { data: { results = [], info } = {} } = res;
        setData(results);
        setTotalPages(info.pages || 1);
        setLoading(false);
      });
    }
  }, [data]);

  const handlePage = pageNo => {
    API.get("/", {
      params: {
        page: pageNo
      }
    }).then(res => {
      const { data: { results = [], info } = {} } = res;
      setData(results);
      setLoading(false);
    });
  };

  return (
    <Section>
      <Container>
        <Row>
          <Col xl={6} lg={6} md={12} sm={12}>
            <H4>Rick and Morty Characters</H4>
          </Col>
          <Col xl={6} lg={6} md={12} sm={12}></Col>
        </Row>

        <Row>
          {loading ? (
            <Skeleton />
          ) : (
            data.map(user => (
              <Col
                key={user.id}
                bsPrefix="spacing-col col"
                xl={3}
                lg={3}
                md={3}
                sm={6}
              >
                <Card data={user} />
              </Col>
            ))
          )}
        </Row>
        <Pagination getPage={handlePage} totalPages={totalPages} />
      </Container>
    </Section>
  );
};

export default Dashboard;
