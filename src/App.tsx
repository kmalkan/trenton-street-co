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

  font-size: 2vw;

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
  height: 200px;

  @media screen and (min-width: 636px) {
    margin-top: 16px;
    font-size: 18px;
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
  isComplete: boolean;
}

const stages: StageConfig[] = [
  {
    name: "Fabrics",
    isComplete: true,
  },
  {
    name: "Garments",
    isComplete: true,
  },
  {
    name: "Designs",
    isComplete: true,
  },
  {
    name: "Customer",
    isComplete: true,
  },
  {
    name: "Impact",
    isComplete: false,
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
                  key={stage.name}
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
                      {stage.name}

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
        <StepDetails>{stages[selectedStepIndex].name}</StepDetails>
      </TrackerBox>
    </Container>
  );
};

export default App;
