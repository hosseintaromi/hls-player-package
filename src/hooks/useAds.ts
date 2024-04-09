import { useContext } from "react";
import { AdType } from "../@types";
import { AdsContext } from "../contexts/AdsContextProvider";

export interface AdTypeWithDuration extends AdType {
	duration?: number;
}

export const useAds = () => useContext(AdsContext);
