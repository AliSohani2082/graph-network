import React from "react";
import { Dispatch, SetStateAction } from "react";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type LefSideBarProps = {
  setCollideRadius: Dispatch<SetStateAction<number>>;
  setManyBodyStrength: Dispatch<SetStateAction<number>>;
  setForceYStrength: Dispatch<SetStateAction<number>>;
  setRadiusEffect: Dispatch<SetStateAction<number>>;
  collideRadius: number;
  manyBodyStrength: number;
  forceYStrength: number;
  radiusEffect: number;
};

const LeftSideBar: React.FC<LefSideBarProps> = ({
  collideRadius,
  setCollideRadius,
  manyBodyStrength,
  setManyBodyStrength,
  forceYStrength,
  setForceYStrength,
  radiusEffect,
  setRadiusEffect,
}) => {
  return (
    <nav className="hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px] bg-dark-2">
      <div className="w-full flex flex-col justify-start items-center mb-6">
        <Label className="mb-4">
          Radius used to avoid collision: {collideRadius}
        </Label>
        <Slider
          defaultValue={[25]}
          min={2}
          max={80}
          value={[collideRadius]}
          onValueChange={(value) => setCollideRadius(value[0])}
          step={1}
        />
      </div>
      <div className="w-full flex flex-col justify-start items-center mb-6">
        <Label className="mb-4">ManyBody strength: {manyBodyStrength}</Label>
        <Slider
          defaultValue={[0]}
          min={-60}
          max={60}
          value={[manyBodyStrength]}
          onValueChange={(value) => setManyBodyStrength(value[0])}
          step={1}
        />
      </div>
      <div className="w-full flex flex-col justify-start items-center mb-6">
        <Label className="mb-4">ForceY strength: {forceYStrength}</Label>
        <Slider
          defaultValue={[0.1]}
          min={0}
          max={1}
          value={[forceYStrength]}
          onValueChange={(value) => setForceYStrength(value[0])}
          step={0.1}
        />
      </div>
      <div className="w-full flex flex-col justify-start items-center mb-6">
        <Label className="mb-4">Size Effect on radius: {radiusEffect}</Label>
        <Slider
          defaultValue={[40]}
          min={0}
          max={100}
          value={[radiusEffect]}
          onValueChange={(value) => setRadiusEffect(value[0])}
          step={1}
        />
      </div>
    </nav>
  );
};

export default LeftSideBar;
