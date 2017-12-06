import moment from 'moment';

export const setPageTitle = (title) => {
	document.title = title ? `${title} | YouTube` : 'YouTube';
};

export const formatNumber = (number, collapse, decimalPlaces) => {
	if (collapse && number > 999999999) {
		return `${(number / 1000000000).toFixed(decimalPlaces || 1)}BN`;
	}
	if (collapse && number > 999999) {
		return `${(number / 1000000).toFixed(decimalPlaces || 0)}M`;
	}
	if (collapse && number > 999) {
		return `${(number / 1000).toFixed(decimalPlaces || 0)}K`;
	}

	return Number(number).toLocaleString(undefined, {
		minimumFractionDigits: decimalPlaces || 0,
		maximumFractionDigits: decimalPlaces || 0,
	});
};

export const getThumbnailUrl = (thumbnailsObj) => {
	let thumbnail = '';

	if (!thumbnailsObj) {
		return thumbnail;
	}

	if (thumbnailsObj.standard) {
		thumbnail = thumbnailsObj.standard.url;
	} else if (thumbnailsObj.high) {
		thumbnail = thumbnailsObj.high.url;
	} else if (thumbnailsObj.medium) {
		thumbnail = thumbnailsObj.medium.url;
	}

	return thumbnail;
};

export const standardiseVideoData = (video) => {
	const { contentDetails } = video;
	const duration = moment.duration(contentDetails ? contentDetails.duration : 0, 'seconds');
	const format = duration._data.hours > 0 ? 'H:mm:ss' : 'm:ss';
	const displayDuration = moment.utc(duration.as('milliseconds')).format(format);
	const videoThumbnail = getThumbnailUrl(video.snippet.thumbnails);

	return {
		id: video.id,
		title: video.snippet.title,
		description: video.snippet.description,
		createdAt: video.snippet.publishedAt,
		views: video.statistics.viewCount,
		commentCount: video.statistics.commentCount,
		likes: video.statistics.likeCount,
		dislikes: video.statistics.dislikeCount,
		duration: displayDuration,
		thumbnail: videoThumbnail,
		channel: {
			id: video.snippet.channelId,
			name: video.snippet.channelTitle,
		},
	};
};

export const standardiseChannelData = (channel) => {
	const channelAvatar = getThumbnailUrl(channel.snippet.thumbnails);

	return {
		id: channel.id,
		name: channel.snippet.title,
		description: channel.snippet.description,
		createdAt: channel.snippet.publishedAt,
		country: channel.snippet.country,
		viewCount: channel.statistics.viewCount,
		videoCount: channel.statistics.videoCount,
		commentCount: channel.statistics.commentCount,
		subscriberCount: channel.statistics.subscriberCount,
		avatar: channelAvatar,
	};
};

export const standardiseCommentData = (commentObj) => {
	const comment = commentObj.snippet.topLevelComment.snippet;

	return {
		id: commentObj.id,
		text: comment.textOriginal,
		likeCount: comment.likeCount,
		createdAt: comment.publishedAt,
		channel: {
			id: comment.authorChannelId.value,
			name: comment.authorDisplayName,
			avatar: comment.authorProfileImageUrl,
		},
	};
};

export const scrollToTop = () => {
	document.body.scrollTop = document.documentElement.scrollTop = 0;
	return true;
};
