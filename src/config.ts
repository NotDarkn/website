import type { NavItems } from "./types";

export const NAV_ITEMS: NavItems = {
	home: {
		path: "/",
		title: "home",
	},
	blog: {
		path: "/blog",
		title: "blog",
	},
};

export const SITE = {
	// Your site's detail?
	name: "Darkn's Blog",
	title: "osu.bio",
	description: "Written Blogs by Darkn",
	url: "https://blog.osu.bio",
	githubUrl: "https://github.com/NotDarkn/website",
	listDrafts: false,
	image:
		"https://github.com/NotDarkn.png",
	// YT video channel Id (used in media.astro)
	ytChannelId: "",
	// Optional, user/author settings
	// Author: name
	author: "Darkn",
	// Author: Twitter handler
	authorTwitter: "NotDarkn",
	// Author: Image external source
	authorImage: "https://github.com/NotDarkn.png",
	// Author: Bio
	authorBio:
		"✨ a 15-year-old web developer interested in Chromebooks and iOS jailbreaks! 🌎",
};

// Ink - Theme configuration
export const PAGE_SIZE = 8;
export const USE_POST_IMG_OVERLAY = false;
export const USE_MEDIA_THUMBNAIL = true;

export const USE_AUTHOR_CARD = true;
export const USE_SUBSCRIPTION = false; /* works only when USE_AUTHOR_CARD is true */

export const USE_VIEW_STATS = true;
