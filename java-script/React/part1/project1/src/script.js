function button() {
	return "button";
}

class Slider {
	constructor(width, height, count) {
		this.width = width;
		this.height = height;
		this.count = count;
	}
	nextSlide() {
		console.log("mov forvard");
	}
	prevSlide() {
		console.log("mov back");
	}
	whoAmI() {
		console.log(this.width, this.height, this.count);
	}
}
class Autoslider extends Slider {
	constructor(width, height, count, auto) {
		super(width, height, count);
		this.auto = auto;
	}
	play() {
		console.log(`Autoplay:${this.auto}`);
	}
}

const someSlider = new Autoslider(200,300,5,false);
someSlider.whoAmI();
someSlider.play();


export {button as btn};
export default Slider;
