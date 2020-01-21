import React, { useEffect, useState } from "react";
import Card from "components/Card";
import API from "utils/API";
import Pagination from "components/Pagination";
import { Section, H4, SortFilterContainer, Text, P } from "./styles";
import { Container, Row, Col, Form } from "react-bootstrap";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [dataClone, setDataClone] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("Ascending");
  const [species, setSpecies] = useState([]);
  const [genders, setGenders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (data.length === 0 && loading) {
      API.get("/").then(res => {
        const { data: { results = [], info } = {} } = res;
        setData(results);
        setDataClone(results);
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
      setDataClone(results);
      setSpecies([]);
      setGenders([]);
      setSortBy("Ascending");
      setLoading(false);
    });
    setCurrentPage(pageNo);
  };

  const FilterComponent = () => {
    const getSpecies = apiData => {
      const speciesList = [...new Set(apiData.map(res => res.species))];
      return speciesList.map(type => ({ type: type, value: true }));
    };

    const getGenders = apiData => {
      const gendersList = [...new Set(apiData.map(res => res.gender))];
      return gendersList.map(gender => ({ type: gender, value: true }));
    };

    useEffect(() => {
      if (species.length === 0) {
        const speciesArr = getSpecies(dataClone);
        setSpecies(speciesArr);
      }
      if (genders.length === 0) {
        const gendersArr = getGenders(dataClone);
        setGenders(gendersArr);
      }
    }, [species, genders]);

    const handleSpecies = (index, e) => {
      const { checked } = e.target;
      species[index].value = checked;
      const selectedSpecies = species
        .filter(res => res.value)
        .map(res => res.type);
      const selectedGenders = genders
        .filter(res => res.value)
        .map(res => res.type);
      const filteredData = dataClone
        .filter(d => selectedSpecies.indexOf(d.species) > -1)
        .filter(d => selectedGenders.indexOf(d.gender) > -1);
      setData(filteredData);
      setSpecies([...species]);
    };

    const handleGenders = (index, e) => {
      const { checked } = e.target;
      genders[index].value = checked;
      const selectedSpecies = species
        .filter(res => res.value)
        .map(res => res.type);
      const selectedGenders = genders
        .filter(res => res.value)
        .map(res => res.type);
      const filteredData = dataClone
        .filter(d => selectedGenders.indexOf(d.gender) > -1)
        .filter(d => selectedSpecies.indexOf(d.species) > -1);
      setData(filteredData);
      setGenders([...genders]);
    };

    return (
      <Row>
        <Col xl={6} lg={6} md={12} sm={12}>
          <Text>Filter based on Species</Text>
          <Form>
            {species.map((obj, index) => (
              <Form.Check
                inline
                label={obj.type}
                key={obj.type}
                type="checkbox"
                checked={obj.value}
                onChange={e => handleSpecies(index, e)}
                id={`inline-${obj.type}-1`}
              />
            ))}
          </Form>
        </Col>
        <Col xl={6} lg={6} md={12} sm={12}>
          <Text>Filter based on Gender</Text>
          <Form>
            {genders.map((obj, index) => (
              <Form.Check
                inline
                label={obj.type}
                key={obj.type}
                type="checkbox"
                checked={obj.value}
                onChange={e => handleGenders(index, e)}
                id={`inline-${obj.type}-1`}
              />
            ))}
          </Form>
        </Col>
      </Row>
    );
  };

  const onSort = value => {
    setSortBy(value);
    let sortedData = [];
    if (value === "Ascending") {
      sortedData = data.sort((a, b) => a.id - b.id);
    } else {
      sortedData = data.sort((a, b) => b.id - a.id);
    }
    setData(sortedData);
  };

  return (
    <Section>
      <Container>
        <Row>
          <Col xl={12} lg={12} md={12} sm={12}>
            <H4>Rick and Morty Characters</H4>
          </Col>
        </Row>
        <SortFilterContainer>
          <Row>
            <Col xl={4} lg={4} md={12} sm={12}>
              <Text>Sort By</Text>
              <Form>
                {["Ascending", "Descending"].map((val, index) => (
                  <Form.Check
                    inline
                    key={val}
                    type="radio"
                    label={val}
                    name="sortByRadio"
                    checked={val === sortBy}
                    onChange={() => onSort(val)}
                    id={`sortByRadio-${index}`}
                  />
                ))}
              </Form>
            </Col>
            <Col xl={8} lg={8} md={12} sm={12}>
              <FilterComponent />
            </Col>
          </Row>
        </SortFilterContainer>
        <Row>
          {data.length === 0 ? (
            <Col>
              <P>No more data.</P>
            </Col>
          ) : (
            data.map(user => (
              <Col
                key={user.id}
                bsPrefix="spacing-col col"
                xl={3}
                lg={3}
                md={3}
                sm={6}
                xs={6}
              >
                <Card data={user} />
              </Col>
            ))
          )}
        </Row>
        {data.length > 0 && (
          <Row>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Pagination
                getPage={handlePage}
                totalPages={totalPages}
                currentPage={currentPage}
              />
            </Col>
          </Row>
        )}
      </Container>
    </Section>
  );
};

export default Dashboard;
