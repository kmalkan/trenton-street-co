import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import globe from "./globe.svg";

const TrackerBox = styled(motion.div)`
  margin-left: 5em;
  margin-right: 5em;
  border-radius: 1.5em;
  border: 3px solid #a2f2bd;
  background-color: #f2ece4;
  padding: 2em;
  display: flex;
  position: relative;
  justify-content: center;
  height: 100%;
  flex-direction: column;
`;

const TrackerBarHeader = styled(motion.div)`
  display: flex;
  margin-top: 2em;
  margin-left: 5em;
  margin-right: 5em;
  margin-bottom: 2em;

  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const TrackerBarTitle = styled(motion.div)`
  font-size: 32px;
  margin-bottom: 0.5em;
  text-align: center;
`;

const TrackerBarContainer = styled(motion.div)`
  display: flex;
  position: relative;
  height: 5em;
  width: 100%;
`;

interface TrackerBaseProps {
  progressPercentage: number;
}

const TrackerBaseComplete = styled(motion.div)<TrackerBaseProps>`
  z-index: 0;
  width: ${(p) => `${p.progressPercentage}%`};
  background-color: #fcc5e3;
  height: 100%;
  border-radius: 2.5em;
  position: absolute;
  display: flex;
  align-items: center;
`;

const ProgressMarkerBase = styled(motion.div)<TrackerBaseProps>`
  z-index: 2;
  width: ${(p) => `${p.progressPercentage}%`};
  height: 100%;
  border-radius: 2.5em;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  pointer-events: none;
`;

const ProgressMarker = styled(motion.img)`
  height: 4em;
  z-index: 3;
  margin-left: 7px;
  margin-right: 10px;
  pointer-events: none;
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
  font-size: 16px;
  text-align: center;
  font-style: italic;
  &:hover {
    color: #ff76c1;
  }
`;

const StepDetails = styled(motion.div)`
  margin-top: 1.5em;
  height: 200px;
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
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  return (
    <>
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
              layout
              initial={{ justifyContent: "flex-start" }}
              animate={{ justifyContent: "flex-end" }}
              transition={{
                type: "spring",
                delay: 1,
                duration: 1,
                stiffness: 700,
                damping: 30,
              }}
            >
              <ProgressMarker src={globe} />
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
                >
                  {stage.name}
                </Stage>
              ))}
            </Stages>
          </TrackerBar>
        </TrackerBarContainer>
        <StepDetails>{stages[selectedStepIndex].name}</StepDetails>
      </TrackerBox>
    </>
  );
};

export default App;
