const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let spots = [];
let hue = 0;

const mouse = {
	x: undefined,
	y: undefined,
};

window.addEventListener("mousemove", (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
	for (let i = 0; i < 3; i++) {
		spots.push(new Particle(mouse.x, mouse.y));
	}
});

class Particle {
	constructor() {
		this.x = mouse.x;
		this.y = mouse.y;
		this.size = Math.random() * 2 + 0.1;
		this.speedX = Math.random() * 2 - 1;
		this.speedY = Math.random() * 2 - 1;
		this.color = "hsl(" + hue + ", 100%, 50%)";
	}
	update() {
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.size > 0.1) this.size -= 0.03;
	}
	draw() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}

function handleParticles() {
	for (let i = 0; i < spots.length; i++) {
		spots[i].update();
		spots[i].draw();
		for (let j = i; j < spots.length; j++) {
			const dx = spots[i].x - spots[j].x;
			const dy = spots[i].y - spots[j].y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < 90) {
				ctx.beginPath();
				ctx.strokeStyle = spots[i].color;
				ctx.lineWidth = spots[i].size / 10;
				ctx.moveTo(spots[i].x, spots[i].y);
				ctx.lineTo(spots[j].x, spots[j].y);
				ctx.stroke();
			}
		}
		if (spots[i].size <= 0.3) {
			spots.splice(i, 1);
			i--;
		}
	}
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	handleParticles();
	hue += 1;
	requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

window.addEventListener("mouseout", () => {
	mouse.x = undefined;
	mouse.y = undefined;
});

animate();

// Demo click button /////////////////////////////////////////////
// function myFunction() {
// 	alert("Hello! I am an alert box!!");
// }
// content.addEventListener("mouseenter", () => {
// 	//lấy phần tử
// 	var x = document.getElementById("content");
// 	var btn = document.getElementById("button");

// 	setTimeout(() => {
// 		// random top
// 		x.style.top = Math.floor(Math.random() * 90) + 10 + "%";
// 		// random left
// 		x.style.left = Math.floor(Math.random() * 90) + 10 + "%";

// 		// thay đổi nội dung button
// 		btn.innerText = "Click vào tôi nhanh đi !!!";
// 		btn.style.width = "fit-content";
// 	}, 150);
// });

// Demo content mouseenter ////////////////////////////////////////
// Throttling Function
const throttleFunction = (func, delay) => {
	// Previously called time of the function
	let prev = 0;
	return (...args) => {
		// Current called time of the function
		let now = new Date().getTime();

		// Logging the difference between previously
		// called and current called timings
		// console.log(now - prev, delay, "throttle");

		// If difference is greater than delay call
		// the function again.
		if (now - prev > delay) {
			prev = now;

			// "..." is the spread operator here
			// returning the function with the
			// array of arguments
			return func(...args);
		}
	};
};

const transfrom = throttleFunction((x, randomX, randomY) => {
	x.style.transform = `translate(${randomX}%, ${randomY}%)`;
}, 100);

document.addEventListener("mousemove", (e) => {
	var x = document.getElementById("box_1");

	let _x = e.clientX / window.innerWidth * 600 ;
    let _y = e.clientY / window.innerHeight * 600;

	transfrom(x, _x, _y);
});
