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

export const standardiseVideoData = (video) => {
	const { contentDetails } = video;
	const duration = moment.duration(contentDetails ? contentDetails.duration : 0, 'seconds');
	const format = duration._data.hours > 0 ? 'H:mm:ss' : 'm:ss';
	const displayDuration = moment.utc(duration.as('milliseconds')).format(format);

	let thumbnail = '';
	if (video.snippet.thumbnails.standard) {
		thumbnail = video.snippet.thumbnails.standard.url;
	} else if (video.snippet.thumbnails.high) {
		thumbnail = video.snippet.thumbnails.high.url;
	}

	return {
		id: video.id,
		title: video.snippet.title,
		description: video.snippet.description,
		publishedAt: video.snippet.publishedAt,
		views: video.statistics.viewCount,
		commentCount: video.statistics.commentCount,
		likes: video.statistics.likeCount,
		dislikes: video.statistics.dislikeCount,
		duration: displayDuration,
		channel: {
			id: video.snippet.channelId,
			name: video.snippet.channelTitle,
		},
		thumbnail,
	};
};

export const standardiseCommentData = (originalComment) => {
	const comment = originalComment.snippet.topLevelComment.snippet;

	return {
		id: originalComment.id,
		text: comment.textOriginal,
		likeCount: comment.likeCount,
		publishedAt: comment.publishedAt,
		channel: {
			id: comment.authorChannelId.value,
			name: comment.authorDisplayName,
			avatar: comment.authorProfileImageUrl,
		},
	};
};
