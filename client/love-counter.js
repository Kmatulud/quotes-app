export default function LoveCounter() {
	return {
		loveCounter: 0,
		love() {
			this.loveCounter++;
		},
		hearts() {
			if (this.loveCounter <= 0) {
				return "💔";
			}

			if (this.loveCounter > 0 && this.loveCounter <= 5) {
				return "💚";
			} else if (this.loveCounter <= 10) {
				return "💚💚";
			} else {
				return "💚💚💚";
			}
		},
	};
}
