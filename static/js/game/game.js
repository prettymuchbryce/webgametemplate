var Game = function(element) {
	var stage;
	var renderer;
	var filter;
	var textContainer;

	(function initPixi() {
		stage = new PIXI.Stage(0xe74c3c);
		renderer = PIXI.autoDetectRenderer(640, 480);
		element.append(renderer.view);
	})();

	(function setupResize() {
		window.addEventListener('resize', function() {
		    resize();
		});
		window.onorientationchange = resize;
		resize();
	})();

	(function startUpdateLoop() {
		requestAnimFrame(requestAnimationFrame);
	})();

	(function addSomeTestContent() {		
		textContainer = new PIXI.DisplayObjectContainer();
		stage.addChild(textContainer);

		var text = new PIXI.Text("webgametemplate", {font:"100px Helvetica", fill:"#2b2b2b"});
		text.x = -text.width/2;
		text.y = -text.height/2;
		textContainer.addChild(text);

		var moreText = new PIXI.Text("it works", {font:"30px Helvetica", fill:"#ecf0f1"});
		moreText.x = -moreText.width/2;
		moreText.y = -moreText.height/2 + 50;
		textContainer.addChild(moreText);

		filter = new PIXI.PixelateFilter();
		textContainer.filters = [filter];
	})();

	function resize() {
		window.scrollTo(0, 0);
		var h = 640;
		var width = window.innerWidth || document.body.clientWidth; 
		var height = window.innerHeight || document.body.clientHeight; 
        var ratio = height / h;
        var view = renderer.view;
        view.style.height = h * ratio +"px";
        var newWidth = (width / ratio);
        view.style.width = width +"px";
        renderer.resize(newWidth , h);
	}

	function requestAnimationFrame() {
		update();
		render();
		requestAnimFrame(requestAnimationFrame);
	}

	function render() {
		renderer.render(stage);
	}

	function update() {
		filter.size = new PIXI.Point(Math.random()*2, Math.random()*2);
		textContainer.x = renderer.view.width/2;
		textContainer.y = renderer.view.height/3;
	}
};