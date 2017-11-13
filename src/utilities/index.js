import moment from 'moment';

export const setPageTitle = (title) => {
	document.title = title ? `${title} | YouTube` : 'YouTube';
};

export const formatNumber = (number, collapse, decimalPlaces) => {
	// Billion (BN)
	if (collapse && number > 999999999) {
		return `${(number / 1000000000).toFixed(decimalPlaces || 0)}BN`;
	}

	// Million (M)
	if (collapse && number > 999999) {
		return `${(number / 1000000).toFixed(decimalPlaces || 0)}M`;
	}

	// Thousand (K)
	if (collapse && number > 999) {
		return `${(number / 1000).toFixed(decimalPlaces || 0)}K`;
	}

	// Otherwise, commas and decimals
	return Number(number).toLocaleString(undefined, {
		minimumFractionDigits: decimalPlaces || 0,
		maximumFractionDigits: decimalPlaces || 0,
	});
};

export const standardiseVideoData = (video) => {
	let duration = moment.duration(video.contentDetails.duration, 'seconds');
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