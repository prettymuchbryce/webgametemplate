var Game = function(element) {
	var stage;
	var renderer;
	var filter;
	var squaresFilter;
	var textContainer;
	var squaresContainer;
	var squares = [];
	
	var lastTime = Date.now();

	(function initPixi() {
		stage = new PIXI.Stage(0xe74c3c);
		renderer = PIXI.autoDetectRenderer(640, 480);
		element.append(renderer.view);
	})();

	(function startUpdateLoop() {
		requestAnimFrame(render);
		setInterval(update, 60 / 1000);
	})();

	(function addSomeTestContent() {		
		textContainer = new PIXI.DisplayObjectContainer();

		var text = new PIXI.Text("webgametemplate", {font:"100px Helvetica", fill:"#2b2b2b"});
		text.x = -text.width/2;
		text.y = -text.height/2;
		textContainer.addChild(text);

		var moreText = new PIXI.Text("git clone git@github.com:prettymuchbryce/webgametemplate.git\nnpm install\nnpm start\nhttp://127.0.0.1:3000", {font:"30px Consolas", fill:"#ecf0f1"});
		moreText.x = -moreText.width/2;
		moreText.y = -moreText.height/2 + 200;
		textContainer.addChild(moreText);

		filter = new PIXI.PixelateFilter();
		stage.filters = [filter];
		squaresFilter = new PIXI.PixelateFilter();

		squaresContainer = new PIXI.DisplayObjectContainer();
		squaresContainer.filters = [squaresFilter];

		for (var i = 0; i < 500; i++) {
			var sprite = new PIXI.Text(":D", {font:"20px Helvetica", fill:"#c0392b"});
			sprite.x = -100 + Math.random() * 2100;
			sprite.y = -100 + Math.random() * 1000;
			squares.push(sprite);
			squaresContainer.addChild(sprite);
		}

		stage.addChild(squaresContainer);
		stage.addChild(textContainer);

	})();

	(function setupResize() {
		window.addEventListener('resize', function() {
		    resize();
		});
		window.onorientationchange = resize;
		resize();
	})();

	function resize() {
		window.scrollTo(0, 0);
		var h = 640;
		var width = window.innerWidth || document.body.clientWidth; 
		var height = window.innerHeight || document.body.clientHeight; 
		        if (height < h) {
        	height = h;
        }
        var ratio = height / h;
        var view = renderer.view;
        view.style.height = h * ratio +"px";
        var newWidth = (width / ratio);
        view.style.width = width +"px";
        renderer.resize(newWidth , h);

        //Components
        if (width < 800) {
			textContainer.scale = new PIXI.Point(0.20, 0.20);
		} else if (width < 1550) {
			textContainer.scale = new PIXI.Point(0.50, 0.50);
		} else {
			textContainer.scale = new PIXI.Point(1, 1);
		}
	}

	function update() {
		var now = Date.now();
		var elapsed = now - lastTime;
		updateScene(elapsed);
		lastTime = now;
	}

	function render() {
		renderer.render(stage);
		requestAnimFrame(render);
	}

	function updateScene(elapsed) {
		squaresFilter.size = new PIXI.Point(Math.random()*20, 1);
		filter.size = new PIXI.Point(Math.random()*2, Math.random()*2);
		textContainer.x = renderer.view.width/2;
		textContainer.y = renderer.view.height/3;

		for (var i = 0; i < squares.length; i++) {
			squares[i].x += 5;
			if (squares[i].x > 2000) {
				squares[i].x = -100;
				squares[i].y = -100 + Math.random() * 1000;
			}
		}
	}
};