import Hls from "hls.js";
import { ReactNode } from "react";

export interface PlayerContextType {
	setVideoRef: (ref: HTMLVideoElement) => void;
	getVideoRef: () => HTMLVideoElement | undefined;
	loadVideo?: LoadVideoFuncType;
	config: PlayerInstance;
	hls?: Hls;
	listenOnLoad: (() => void)[];
	state: PlayerState;
}

export type OnUpdateTimeType = {
	time: number;
	duration: number;
	percentage: number;
};

export type PlayerEventsType = {
	onUpdateTime: "onUpdateTime";
	onUpdateBuffer: "onUpdateBuffer";
	onLoading: "onLoading";
	onPlayPause: "onPlayPause";
	onEnd: "onEnd";
	onChangeLocale: "onChangeLocale";
	onChangeVolume: "onChangeVolume";
	onChangeMute: "onChangeMute";
	onReady: "onReady";
	onChangeSetting: "onChangeSetting";
	onActivateControls: "onActivateControls";
	onLoaded: "OnLoaded";
};

export interface PlayerConfigType {
	type: "HLS" | "MP4";
	loop: boolean;
	autoPlay: boolean;
	muted: boolean;
	locale: PlayerLocaleType;
	speeds: number[] | Record<string, number>;
	theme: "Red" | "Blue" | "Custom";
	timeForHideEl: number;
	icons: IconsType;
	style: StyleType;
	qualities: number[];
	audioTracks: string[];
	subTitle: any[];
	keyControl: boolean;
	defaultQuality?: string;
	thumbnail: string;
	ads?: AdType[];
	showToolbarOnAd?: boolean;
	showAdsAgain?: boolean;
	startTime?: number;
	onUpdateTime?: (e: OnUpdateTimeType) => void;
	// FIXME: we should fix this types
	onEnd?: (e: OnUpdateTimeType) => void;
	onLoading?: (e: boolean) => void;
	onPlayPause?: (e: OnUpdateTimeType) => void;
	onUpdateBuffer?: (e: number) => void;
	onChangeVolume?: (e: OnUpdateTimeType) => void;
	onChangeMute?: (e: boolean) => void;
	onReady?: () => void;
}

export type LoadVideoFuncType = (
	src: string,
	type?: string,
	startTime?: number
) => void;

export interface PlayerInstance extends PlayerConfigType {
	loadVideo: LoadVideoFuncType;
	changeLocale: (locale: PlayerLocaleType) => void;
	src?: string;
}

export type GenericEvents<T extends Record<string, string>> = {
	[eventName in keyof T]?: (data?: any) => void;
};

export type StyleType = {
	dir: "rtl" | "ltr";
	iconColor: string;
	settingTextColor: string;
	toolbarBg: string;
	settingBg: string;
	settingBgHover: string;
	rangeFrontBg: string;
	rangeBackBg: string;
	bufferBg: string;
	settingFontSize: string;
	toolbarFontSize: string;
	settingTitleTextColor: string;
};
export type IconsType = {
	setting: ReactNode;
	checkMark: ReactNode;
	arrow: ReactNode;
	play: ReactNode;
	pause: ReactNode;
	volumeUp: ReactNode;
	volumeDown: ReactNode;
	mute: ReactNode;
	picInPic: ReactNode;
	picOutPic: ReactNode;
	fullScreen: ReactNode;
	unFullScreen: ReactNode;
	speed: ReactNode;
	quality: ReactNode;
	subtitle: ReactNode;
	audioTrack: ReactNode;
	autoPlayOn: ReactNode;
	autoPlayOff: ReactNode;
	jumpBack: ReactNode;
	jumpForward: ReactNode;
	mic: ReactNode;
	playArrow: ReactNode;
};

export type PlayerLocaleType = {
	setting_menu_change_speed_title?: string;
	setting_menu_change_quality_title?: string;
	setting_menu_quality_list_item_auto?: string;
	setting_menu_quality_active_list?: string;
	setting_menu_change_audio_track_title?: string;
	setting_menu_change_subtitle?: string;
	setting_menu_subtitle_off?: string;
	can_skip_text?: string;
	skip_text?: string;
};

export type KeyValue = {
	key: string;
	value: number;
};

export type SubTitle = {
	url: string;
	title: string;
	id: string;
	code: string;
	is_selected: boolean;
};

export type PlayerState = {
	speeds?: KeyValue[];
	currentSpeed?: KeyValue;
	currentSubtitle?: SubTitle;
	subTitles: SubTitle[];
	currentBuffer?: { index: number; length: number };
	prevSubtitle?: number;
	prevSpeed?: number;
	currentPlayingAd?: AdType;
};

export type AdType = {
	src: string;
	startTime: number;
	canSkip?: boolean;
	skipTime?: number;
	hasPlayed?: boolean;
};
