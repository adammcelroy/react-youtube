export const checkProps = (target, _Component, expected) => {
	const got = _Component[target];
	let correct = Object.keys(got).length === Object.keys(expected).length;

	for (let prop in got) {
		if (got.hasOwnProperty(prop)) {
			if (got[prop] !== expected[prop]) {
				correct = false;
			}
		}
	}
	return correct;
};
