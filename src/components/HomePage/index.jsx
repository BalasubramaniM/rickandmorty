import React, { useEffect, useState } from "react";
import Card from "components/Card";
import API from "utils/API";
import {Section, H4} from './styles';
import { Container, Row, Col } from "react-bootstrap";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data.length === 0) {
      API.get("/").then(res => {
        const { data: { results = [] } = {} } = res;
        setData(results);
      });
    }
  }, [data]);

  return (
    <Section>
    <Container>
    <Row>
      <Col xl={6} lg={6} md={12} sm={12}>
      <H4>Rick and Morty Characters</H4>
      </Col>
      <Col xl={6} lg={6} md={12} sm={12}>
      </Col>
    </Row>
      
      <Row>
        {data.map(user => (
          <Col key={user.id} bsPrefix="spacing-col col" xl={3} lg={3} md={3} sm={6}>
            <Card data={user} />
          </Col>
        ))}
      </Row>
    </Container>
    </Section>
  );
};

export default Dashboard;
