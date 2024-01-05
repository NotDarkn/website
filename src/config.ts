import type { NavItems } from "./types";

export const NAV_ITEMS: NavItems = {
	blog: {
		path: "/",
		title: "blog",
};

export const SITE = {
	// Your site's detail?
	name: "Darkn's Blog",
	title: "osu.bio",
	description: "Clean, minimal, personal blog for Darkn",
	url: "https://blog.osu.bio",
	githubUrl: "https://github.com/NotDarkn/website",
	listDrafts: false,
	image:
		"https://github.com/NotDarkn.png",
	// YT video channel Id (used in media.astro)
	ytChannelId: "",
	// Optional, user/author settings (example)
	// Author: name
	author: "Darkn", // Example: Fred K. Schott
	// Author: Twitter handler
	authorTwitter: "NotDarkn", // Example: FredKSchott
	// Author: Image external source
	authorImage: "https://github.com/NotDarkn.png", // Example: https://pbs.twimg.com/profile_images/1272979356529221632/sxvncugt_400x400.jpg, https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png
	// Author: Bio
	authorBio:
		"✨ a (shit) web developer interested in Chromebooks and iOS jailbreaks. currently 15 years old! 🌎",
};

// Ink - Theme configuration
export const PAGE_SIZE = 8;
export const USE_POST_IMG_OVERLAY = false;
export const USE_MEDIA_THUMBNAIL = true;

export const USE_AUTHOR_CARD = true;
export const USE_SUBSCRIPTION = false; /* works only when USE_AUTHOR_CARD is true */

export const USE_VIEW_STATS = true;
