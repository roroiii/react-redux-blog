import React from "react";
import styled from "styled-components";
import { MEDIA_QUERY_M } from "../../constants/breakpoint";

const Banner = styled.div`
  position: relative;
  background-image: url("https://picsum.photos/id/1025/1200");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  width: 100%;
  height: 450px;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 30px;
  text-align: center;
`;

const AboutText = styled.div`
  width: 600px;
  margin: 40px auto;
  line-height: 1.5;
  font-size: 18px;
  color: #5d5d5d;
  padding: 20px;
  background-color: #faf7f3;
  p {
    margin-bottom: 12px;
  }

  ${MEDIA_QUERY_M} {
    width: 100%;
  }
`;

export default function AboutPage() {
  return (
    <>
      <Banner>
        <Title>ABOUT US</Title>
      </Banner>
      <AboutText>
        <p>
          Good food and great company is our measure of happiness, we encourage
          you to explore and share the amazing opportunities that your community
          has to offer.
        </p>
        <p>
          There are amazing things happening around you. Your city is full of
          opportunities and possibilities for you to enjoy, and all you have to
          do is step out from the hypnotizing comfort of your own home.
        </p>
        <p>
          We want you to support your local community by participating and
          sharing.
        </p>
        <p>
          Interesting cities are only interesting because of the people, and in
          the end it's you who have the power to make things great.
        </p>
        <p>
          We support businesses, and are always on the lookout for new stores,
          products, restaurants, coffee shops, bars and experiences.
        </p>
        <p>
          Nothing gets us as exited as a well made product with a striking
          story, or a small bar around the corner that genuinely feels that they
          are adding something special to the society around them.
        </p>
        <p>
          They are the small, and sometimes hidden, jewels in our communities
          that brings out the passion, beauty, innovation, and heart involved in
          doing business.
        </p>
      </AboutText>
    </>
  );
}
