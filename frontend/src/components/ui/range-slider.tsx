import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface RangeSliderProps {
  title: string;
  min: number;
  max: number;
  step: number;
  currentMin?: number;
  currentMax?: number;
  unit?: string;
  onValueChange: (min: number | undefined, max: number | undefined) => void;
  className?: string;
}

export function RangeSlider({
  title,
  min,
  max,
  step,
  currentMin,
  currentMax,
  unit = "",
  onValueChange,
  className,
}: RangeSliderProps) {
  const [minVal, setMinVal] = useState(currentMin ?? min);
  const [maxVal, setMaxVal] = useState(currentMax ?? max);
  const [minInput, setMinInput] = useState(currentMin ?? min);
  const [maxInput, setMaxInput] = useState(currentMax ?? max);
  const [isDragging, setIsDragging] = useState(false);
  const sliderTrackRef = useRef<HTMLDivElement>(null);

  const minGap = step;

  useEffect(() => {
    setSliderTrack();
  }, [minVal, maxVal]);

  const setSliderTrack = () => {
    if (sliderTrackRef.current) {
      const minPercent = ((minVal - min) / (max - min)) * 100;
      const maxPercent = ((maxVal - min) / (max - min)) * 100;
      sliderTrackRef.current.style.left = `${minPercent}%`;
      sliderTrackRef.current.style.right = `${100 - maxPercent}%`;
    }
  };

  const slideMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= min && maxVal - value >= minGap) {
      setMinVal(value);
      setMinInput(value);
      onValueChange(value === min ? undefined : value, maxVal === max ? undefined : maxVal);
    }
  };

  const slideMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value <= max && value - minVal >= minGap) {
      setMaxVal(value);
      setMaxInput(value);
      onValueChange(minVal === min ? undefined : minVal, value === max ? undefined : value);
    }
  };

  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? min : parseInt(e.target.value, 10);
    if (value >= min && value < maxVal - minGap) {
      setMinInput(value);
      setMinVal(value);
      onValueChange(value === min ? undefined : value, maxVal === max ? undefined : maxVal);
    }
  };

  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? max : parseInt(e.target.value, 10);
    if (value <= max && value > minVal + minGap) {
      setMaxInput(value);
      setMaxVal(value);
      onValueChange(minVal === min ? undefined : minVal, value === max ? undefined : value);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, type: 'min' | 'max') => {
    if (e.key === "Enter") {
      const value = parseInt((e.target as HTMLInputElement).value, 10);
      if (type === "min" && value >= min && value < maxVal - minGap) {
        setMinVal(value);
      } else if (type === "max" && value <= max && value > minVal + minGap) {
        setMaxVal(value);
      }
    }
  };

  const startDrag = () => setIsDragging(true);
  const stopDrag = () => setIsDragging(false);

  return (
    <div className={cn("space-y-4 pt-2", className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-white">{title}</span>
      </div>
      <div className="double-slider-box">
        <div className="input-box">
          <div className="min-box">
            <input
              type="number"
              value={minInput}
              onChange={handleMinInput}
              onKeyDown={(e) => handleInputKeyDown(e, "min")}
              min={min}
              max={maxVal - minGap}
              step={step}
            />
          </div>
          <div className="max-box">
            <input
              type="number"
              value={maxInput}
              onChange={handleMaxInput}
              onKeyDown={(e) => handleInputKeyDown(e, "max")}
              min={minVal + minGap}
              max={max}
              step={step}
            />
          </div>
        </div>
        <div className="range-slider">
          <div ref={sliderTrackRef} className="slider-track" />
          <input
            type="range"
            min={min}
            max={max}
            value={minVal}
            step={step}
            onChange={slideMin}
            onMouseDown={startDrag}
            onMouseUp={stopDrag}
            onTouchStart={startDrag}
            onTouchEnd={stopDrag}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            step={step}
            onChange={slideMax}
            onMouseDown={startDrag}
            onMouseUp={stopDrag}
            onTouchStart={startDrag}
            onTouchEnd={stopDrag}
          />
          {isDragging && (
            <>
              <div className="min-tooltip">
                {minVal}{unit}
              </div>
              <div className="max-tooltip">
                {maxVal}{unit}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}