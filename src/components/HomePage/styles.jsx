import styled from "styled-components";

export const Section = styled.div`
  background-image: url("static/images/so-white.png");
  background-attachment: fixed;
  margin-bottom: 48px;
  height: 100vh;
  & > * {
    .spacing-col {
      padding: 12px;
    }
  }
`;

export const H4 = styled.h3`
  margin: 24px 0px;
`;

export const SortFilterContainer = styled.div`
  margin: 12px 0px;
`;

export const Text = styled.h6`
  margin: 12px 0px;
`;

export const P = styled.p`
  margin-top: 2rem;
`;