import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import globe from "./globe.svg";

const Container = styled.div`
  display: flex;
  max-width: 1000px;
  justify-content: center;
  flex-direction: column;
  margin: auto;
`;

const TrackerBox = styled(motion.div)`
  margin-left: 5vw;
  margin-right: 5vw;
  border-radius: 1.5em;
  border: 3px solid #a2f2bd;
  background-color: #f2ece4;
  padding: 4vw;
  display: flex;
  position: relative;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  font-size: 2vw;
`;

const TrackerBarHeader = styled(motion.div)`
  display: flex;
  margin-top: 3vw;
  margin-left: 5vw;
  margin-right: 5vw;
  margin-bottom: 3vw;

  flex-direction: column;
  justify-content: center;
  text-align: center;

  font-size: 2.5vw;

  @media screen and (min-width: 636px) {
    font-size: 16px;
  }
`;

const TrackerBarTitle = styled(motion.div)`
  font-size: 6vw;
  margin-bottom: 0.5em;
  text-align: center;

  @media screen and (min-width: 636px) {
    font-size: 32px;
  }
`;

const TrackerBarContainer = styled(motion.div)`
  display: flex;
  position: relative;
  height: 6vw;
  max-height: 40px;
  width: 100%;
`;

interface TrackerBaseProps {
  progressPercentage: number;
}

const TrackerBaseComplete = styled(motion.div)<TrackerBaseProps>`
  z-index: 0;
  width: ${(p: TrackerBaseProps) => `${p.progressPercentage}%`};
  background-color: #fcc5e3;
  height: 100%;
  border-radius: 2.5em;
  position: absolute;
  display: grid;
  align-items: center;
`;

interface ProgressMarkerBaseProps extends TrackerBaseProps {
  progressMarkerAlignment: string;
}

const ProgressMarkerBase = styled(motion.div)<ProgressMarkerBaseProps>`
  z-index: 2;
  width: ${(p) => `${p.progressPercentage}%`};
  height: 100%;
  border-radius: 2.5em;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: ${(p: ProgressMarkerBaseProps) =>
    `${p.progressMarkerAlignment}`};
  pointer-events: none;
`;

const ProgressMarker = styled(motion.img)`
  display: block;
  height: 4.5vw;
  max-height: 32px;
  z-index: 3;
  margin-left: 0.75vw;
  margin-right: 1vw;
  pointer-events: none;

  @media screen and (min-width: 636px) {
    margin-left: 6px;
    margin-right: 8px;
  }
`;

const TrackerBaseEmpty = styled(motion.div)<TrackerBaseProps>`
  z-index: 0;
  width: ${(p) => `${100 - p.progressPercentage}%`};
  background-color: white;
  height: 100%;
  border-radius: 0 2.5em 2.5em 0;
  position: absolute;
  right: 0;
`;

const TrackerBar = styled(motion.div)`
  display: flex;
  height: 100%;
  width: 100%;
`;

const Stages = styled(motion.div)`
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-self: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 2.625em;
  cursor: pointer;
  overflow: hidden;
`;

interface StageProps {
  index: number;
  isComplete: boolean;
}

const Stage = styled(motion.div)<StageProps>`
  border-right: 3px solid #f2ece4;
  border-top: 3px solid #f2ece4;
  border-bottom: 3px solid #f2ece4;
  background-color: ${(p) => (p.isComplete ? "#fcc5e3" : "white")};
  height: 100%;
  border-radius: 0 2.5em 2.5em 0;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2vw;
  text-align: center;
  font-style: italic;
  &:hover {
    color: #ff76c1;
  }

  @media screen and (min-width: 636px) {
    font-size: 16px;
  }
`;

const StageText = styled(motion.div)<StageProps>`
  z-index: 3;
  position: relative;
  height: 100%;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2vw;
  text-align: center;
  font-style: italic;
  &:hover {
    color: #ff76c1;
  }

  @media screen and (min-width: 636px) {
    font-size: 16px;
  }
`;

const StepDetails = styled(motion.div)`
  margin-top: 2vw;
  h1 {
    font-size: 4vw;
  }
  p {
    font-size: 2.5vw;
  }

  @media screen and (min-width: 636px) {
    margin-top: 16px;
    h1 {
      font-size: 18px;
    }
    p {
      font-size: 14px;
    }
  }
`;

const Underline = styled(motion.div)`
  position: absolute;
  z-index: 5;
  bottom: -2px;
  border-radius: 10px;
  left: 0;
  margin-left: -1vw;
  right: 2.5vw;
  height: 4px;
  background: #ff76c1;

  @media screen and (min-width: 636px) {
    margin-left: -8px;
    right: 16px;
  }
`;

interface StageConfig {
  name: string;
  shortName: string;
  isComplete: boolean;
  description: JSX.Element | string;
}

const stages: StageConfig[] = [
  {
    name: "Textile and Fabric Manufactured",
    shortName: "Textiles",
    isComplete: true,
    description: (
      <>
        <p>
          Our supplier’s farms are globally certified through third-party
          verifiers and signify land and human stewardship. Independent
          verifiers ensure that safe, responsible, and organic practices have to
          be proven at the farm level and team members involved in garment
          production have a safe and equitable workplace. These farms are
          located in San Joaquin Valley, CA.
        </p>
        <p>
          Global Organic Textile Standard, or GOTS®, certification means the
          production facilities must adhere to working and social condition
          requirements equivalent to leading social sustainability standards
          from the International Labor Organization (ILO), United Nations
          Guiding Principles on Business and Human Rights (UNGPs) and
          Organization for Economic Cooperation and Development (OECD).
        </p>
      </>
    ),
  },
  {
    name: "Garment and Blank Manufactured",
    shortName: "Garments",
    isComplete: true,
    description: (
      <>
        <p>
          Our garment production facilities are Worldwide Responsible Accredited
          Production, or WRAP, certified and remain industry examples of social
          responsibility to their employees. Guided by 12 ordinance principles,
          WRAP certification confirms that the facility is law-abiding, using
          fair and just labor practices, anti-discriminatory, and committed to
          the health, safety, and security of the workplace.
        </p>
        <p>
          The production facilities also work in tandem with Fairtrade Labeling
          Organizations (FLO) to alleviate poverty afflicting the world&apos;s
          farmers and workers by setting and certifying the compliance of
          stringent, socially-conscious production standards. FLO believes the
          best work environments yield the best production, and we are proud to
          source from facilities boasting this certification. The sweats and
          fleeces we use are stitched in Lahore, Pakistan while the t-shirts are
          stitched in Tirupur, India.
        </p>
      </>
    ),
  },
  {
    name: "Design Printed",
    shortName: "Designs",
    isComplete: true,
    description: (
      <>
        <p>
          Our designs are produced on the garments using two of the most
          eco-friendly processes in the industry – Direct-to-Garment Printing
          (DTG) and Embroidery. With water-based chemistry behind the inks and
          less machine usage needed for production, DTG promotes waste reduction
          and works best with natural fibers like those used to make our
          garments.
        </p>
        <p>All printing and embroidery are completed in Manhattan, NYC.</p>
      </>
    ),
  },
  {
    name: "Delivered to Customer",
    shortName: "Customer",
    isComplete: true,
    description: (
      <>
        <p>
          Where you come in. We believe that single-use plastic should be a
          relic of an unsustainable past so our products are shipped to you in
          plant-based mailers! These mailers are made from corn that will break
          down in 3 months at a commercial compost facility and 6 months in a
          home compost bin.
        </p>
        <p>
          Once you receive your Trenton Street merch, you become a change agent.
          Someone who is willing to invest in a brand committed to solving the
          issues of tomorrow, today.
        </p>
      </>
    ),
  },
  {
    name: "Customer Becomes Change Agent",
    shortName: "Impact",
    isComplete: false,
    description: (
      <>
        <p>
          Your purchase does not only promote sustainability, it directly
          supports TSCO’s impact initiatives and infrastructure development.
        </p>
        <p>
          With your support from this purchase, Trenton Street was able to cover
          the cost of Jordan’s, our partner student’s, tuition at Our Lady of
          Mercy Primary School in Nairobi, Kenya. This was the first of many
          semesters that Trenton Street Co. plans to sponsor for students
          internationally! Today is One Day!
        </p>
      </>
    ),
  },
];

const baseBackgroundPercentage =
  (stages.filter((stage) => stage.isComplete).length / stages.length) * 90;
const progressPercentage =
  (stages.filter((stage) => stage.isComplete).length / stages.length) * 100;

const App: React.FC = () => {
  const [progressMarkerAlignment, setProgressMarkerAlignment] =
    useState("flex-start");
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setProgressMarkerAlignment("flex-end");
    }, 500);
  });
  return (
    <Container>
      <TrackerBarHeader>
        <TrackerBarTitle>Impact Tracker</TrackerBarTitle>
        <div>
          We believe that there is no sustainability without transparency and
          this Impact Tracker is our company’s first step towards transparent
          business practices. Here, you can see the entire supply chain of the
          product you just purchased. When it comes to sustainable products, the
          impact occurs post-purchase so our supply chain does not end at the
          customer. Check in here to see periodic updates on the impact that
          your purchase had! Today is One Day!
        </div>
      </TrackerBarHeader>
      <TrackerBox>
        <TrackerBarContainer>
          <TrackerBar>
            <TrackerBaseComplete
              progressPercentage={baseBackgroundPercentage}
            ></TrackerBaseComplete>
            <ProgressMarkerBase
              progressPercentage={progressPercentage}
              progressMarkerAlignment={progressMarkerAlignment}
              layout
            >
              <ProgressMarker
                src={globe}
                layout
                transition={{
                  duration: 3,
                  type: "spring",
                  damping: 20,
                  stiffness: 50,
                }}
              />
            </ProgressMarkerBase>
            <TrackerBaseEmpty progressPercentage={baseBackgroundPercentage} />
            <Stages>
              {stages.map((stage, index) => (
                <Stage
                  index={index}
                  isComplete={stage.isComplete}
                  key={stage.shortName}
                  onClick={() => {
                    setSelectedStepIndex(index);
                  }}
                ></Stage>
              ))}
            </Stages>
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            >
              <Stages style={{ backgroundColor: "transparent" }}>
                {stages.map((stage, index) => (
                  <>
                    <StageText
                      index={index}
                      isComplete={stage.isComplete}
                      key={stage.name}
                      onClick={() => {
                        setSelectedStepIndex(index);
                      }}
                    >
                      {stage.shortName}
                      {index === selectedStepIndex ? (
                        <Underline layoutId="underline" />
                      ) : null}
                    </StageText>
                  </>
                ))}
              </Stages>
            </div>
          </TrackerBar>
        </TrackerBarContainer>
        <StepDetails>
          <>
            <h1>{stages[selectedStepIndex].name}</h1>
            {stages[selectedStepIndex].description}
          </>
        </StepDetails>
      </TrackerBox>
    </Container>
  );
};

export default App;
