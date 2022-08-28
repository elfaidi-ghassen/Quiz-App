function randInt(a, b) {
	return a + Math.floor(Math.random(b - a) * (b - a));
}

function shuffle(arr) {
	let shuffled = [];
	while (arr.length > 0) {
		let r = randInt(0, arr.length);
		shuffled.push(arr[r]);
		arr = arr.filter((_, i) => i != r);
	}
	return shuffled;
}

function getRank(ans, goal, format = false) {
	return ans == goal
		? "perfect" + (format ? "!" : "")
		: ans > goal / 2
		? "good" + (format ? ", " : "")
		: "bad" + (format ? ", " : "");
}
